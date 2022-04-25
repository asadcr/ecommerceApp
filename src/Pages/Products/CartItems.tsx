import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableHighlight,
  SafeAreaView,
} from "react-native";
import COLORS from "../../Styles/color";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Product } from "../../models/Product";
import { localStorageService } from "../../Service/LocalStorageService";


interface CartItemsProps {
  navigation: any;
}

interface CartItemsState {
  items: Product[] | null;
  totalPrice : number;
  totalQuantity : number
}

export default class CartItems extends Component<CartItemsProps, CartItemsState> {
  itemTabs: string[] = ["Name", "Total Price", "Quantity", "Remove"];

  itemQuantity: Map<number, number> = new Map<number, number>();

  constructor(props: {}) {
    super(props as any);

    this.state = {
      items: null,
      totalPrice: 0,
      totalQuantity : 0
    };
  }

 
  async componentDidMount() {

    let totalprice = 0;
    let totalQuantity = 0

    var items = await localStorageService.getCartItems();

    var itemQuantity = await localStorageService.getItemQuantity();

    itemQuantity.forEach((item) => { 
      totalQuantity = totalQuantity + item.quantity;
      this.itemQuantity.set(item.productId, item.quantity);
    });

    items.forEach((item) => { 
      totalprice = parseFloat(`${totalprice}`) + parseFloat(`${(item.price * this.itemQuantity.get(item.id)!)}`);
    });

   
    this.setState({ items: items , totalPrice : parseFloat(totalprice.toFixed(2)) , totalQuantity : totalQuantity });
    
  }

  itemsTabsList = () => {
    return (
      <View style={style.itemContainer}>
        {this.itemTabs.map((item, i) => (
          <Text key={i} style={[style.itemText]}>
            {item}
          </Text>
        ))}
      </View>
    );
  };

  removeFromCart = async (item: Product) => {
    var result = await localStorageService.deleteAddToCartItems(item);
    if(result){
      const items = this.state.items!.filter((items) => items.id != item.id);

      this.setState({
        items: items , 
        totalPrice :parseFloat( (parseFloat(`${this.state.totalPrice}`) - parseFloat(`${item.price * this.itemQuantity.get(item.id)!}`)).toFixed(2)),
        totalQuantity : this.state.totalQuantity - this.itemQuantity.get(item.id)!
      })

    }

  };

  increment = async (item: Product) => {

   let count =  this.itemQuantity.get(item.id);

   if(count! >= 1) {

    this.itemQuantity.set(item.id,count! + 1)

    await localStorageService.updateItemQuantity({productId : item.id , quantity : count! + 1});

    this.setState({totalQuantity : this.state.totalQuantity + 1 , totalPrice : parseFloat((parseFloat(`${this.state.totalPrice}`) + parseFloat(`${item.price}`)).toFixed(2))})

   }
   

  };

  decrement = async (item: Product) => {
    let count =  this.itemQuantity.get(item.id);

    if(count! > 1) {

    this.itemQuantity.set(item.id,count! - 1)
 
    await localStorageService.updateItemQuantity({productId : item.id , quantity : count! - 1});
 
    this.setState({totalQuantity : this.state.totalQuantity - 1 , totalPrice : parseFloat((parseFloat(`${this.state.totalPrice}`) - parseFloat(`${item.price}`)).toFixed(2))})
    
    }
  };

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          paddingHorizontal: 20,
          backgroundColor: COLORS.white,
        }}
      >
        <ScrollView>
          {this.itemsTabsList()}

          {this.state.items?.map((item, i) => {
            return (
              <View style={{ backgroundColor: COLORS.white, }} key={i}>
                <View
                  style={{
                    height: 90,
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                      <Image
                        style={{ width: 75, height: 75 , }}
                        source={item.img}
                      />
                      <Text style={{  color: "black" }}>{item.name}</Text>
                  </View>
                  <View
                    style={{
                      flex : 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        color: COLORS.dark,
                        fontWeight: "bold",
                      }}
                    >
                      ${item.price}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <TouchableHighlight onPress={() => this.decrement(item)}>
                      <View style={style.borderBtn}>
                        <Text style={style.borderBtnText} >-</Text>
                      </View>
                    </TouchableHighlight>
                    <Text
                      style={{
                        fontSize: 20,
                        marginHorizontal: 10,
                        fontWeight: "bold",
                      }}
                    >
                    {this.itemQuantity.get(item.id)}
                    </Text>
                    <TouchableHighlight onPress={() => this.increment(item)}>
                    <View style={style.borderBtn}>
                      <Text style={style.borderBtnText}>+</Text>
                    </View>
                    </TouchableHighlight>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <TouchableHighlight onPress={() => this.removeFromCart(item)}>
                      <Icon
                        color={COLORS.red}
                        size={40}
                        name="delete-forever"
                      />
                    </TouchableHighlight>
                  </View>
                </View>
              </View>
            );
          })}

          <View
            style={{
              paddingTop: 20,
              height: 60,
              flexDirection: "row",
              flex: 1,
              justifyContent: "space-between",
            }}
          >
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text style={{ color: COLORS.dark }}>Items</Text>
            </View>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text style={{ color: COLORS.dark }}>
                ${this.state.totalPrice}
              </Text>
            </View>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text style={{ color: COLORS.dark }}>
                {this.state.totalQuantity}
              </Text>
            </View>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Icon
                onPress={() => this.props.navigation.navigate("Checkout")}
                size={28}
                name="check-circle"
                style={{color: COLORS.green}}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const style = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    marginTop: 30,
    marginBottom: 20,
    justifyContent: "space-between",
  },

  itemText: { fontSize: 16, color: "grey", fontWeight: "bold" },

  borderBtn: {
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 40,
},
  borderBtnText: { fontWeight: 'bold', fontSize: 28 },
});
