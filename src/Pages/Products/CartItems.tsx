import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableHighlight,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import COLORS from "../../Styles/color";
import Icon from "react-native-vector-icons/MaterialIcons";
import { CartItem } from "../../models/Product";
import { localStorageService } from "../../Service/LocalStorageService";

interface CartItemsProps {
  navigation: any;
}

interface CartItemsState {
  items: CartItem[];
  totalPrice: number;
}

export default class CartItems extends Component<CartItemsProps, CartItemsState> {
  itemTabs: string[] = ["Name", "Total Price", "Quantity", "Remove"];

  constructor(props: {}) {
    super(props as any);

    this.state = {
      items: [],
      totalPrice: 0,
    };
  }

  async componentDidMount() {
    this.getData();
  }

  getData = async () => {
    var items = await localStorageService.getCartItems();
    var totalprice = items.reduce((val, item) => val + (item.product.price * item.quantity), 0.0);
    this.setState({ items: items, totalPrice: parseFloat(totalprice.toFixed(2)) });
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

  removeFromCart = async (item: CartItem) => {
    await localStorageService.deleteItemsFromCart(item.product);
    this.getData();
  };

  increment = async (item: CartItem) => {
    localStorageService.addOrUpdateCartItems(item.product, ((quantity) => quantity + 1));
    this.getData();
  };

  decrement = async (item: CartItem) => {

    if (item.quantity == 1) {
      return;
    }

    localStorageService.addOrUpdateCartItems(item.product, ((quantity) => quantity - 1));
    this.getData();
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
                      style={{ width: 75, height: 75, }}
                      source={item.product.img}
                    />
                    <Text style={{ color: "black" }}>{item.product.name}</Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
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
                      ${item.product.price}
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
                      {item.quantity}
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
                {this.state.items.reduce((a, b) => a + b.quantity, 0)}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("Checkout")}>
                <View style={style.buyBtn}>
                  <Text
                    style={{
                      color: COLORS.white,
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    BUY NOW
                  </Text>
                </View>
              </TouchableOpacity>
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
  buyBtn: {
    width: 130,
    height: 50,
    backgroundColor: COLORS.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    margin: 20,
    textAlign: 'center'
  },
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
