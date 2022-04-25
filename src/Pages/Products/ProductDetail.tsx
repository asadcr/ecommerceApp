import { Component } from "react";
import { View, Text, SafeAreaView, StyleSheet, Image } from 'react-native';
import { Product } from "../../models/Product";
import COLORS from "../../Styles/color";
import Icon from 'react-native-vector-icons/MaterialIcons';
import CartIcon from "../../components/CartIcon"
import { localStorageService } from "../../Service/LocalStorageService";


interface ProductDetailState {
    product: Product | null
    totalCartItem : number
    totalQuantity : number
}

export default class ProductDetail extends Component<any, ProductDetailState> {

  itemQuantity: Map<number, number> = new Map<number, number>();

    constructor(props: {}) {
        super(props as any);

        this.state = {
            product: this.props.route?.params as any,
            totalCartItem : 0,
            totalQuantity : 1
        }
    }
    async componentDidMount() {
      let totalQuantity = 1

      var totalCartItem = await localStorageService.getTotalCartItem();


      var itemQuantity = await localStorageService.getItemQuantity();

      itemQuantity.forEach((item) => { 
        this.itemQuantity.set(item.productId, item.quantity);
      });
      
      let result = this.itemQuantity.get(this.state.product!.id)!;

      if( result != undefined) {
        totalQuantity = result;
      }

      this.setState({ totalCartItem: totalCartItem , totalQuantity : totalQuantity });
    }


    increment = async (item: Product) => {

      let count =  this.itemQuantity.get(item.id);
   
      if(count! >= 1) {
   
       this.itemQuantity.set(item.id,count! + 1)
   
       await localStorageService.updateItemQuantity({productId : item.id , quantity : count! + 1});
   
       this.setState({ totalQuantity : this.state.totalQuantity + 1 })
   
      }
      
   
     };
   
     decrement = async (item: Product) => {
       let count =  this.itemQuantity.get(item.id);
   
       if(count! > 1) {
   
       this.itemQuantity.set(item.id,count! - 1)
    
       await localStorageService.updateItemQuantity({productId : item.id , quantity : count! - 1});
    
       this.setState({ totalQuantity : this.state.totalQuantity - 1 })
       
       }
     };
   
    render() {
        return (
          <SafeAreaView
            style={{
              flex: 1,
              backgroundColor: COLORS.white,
            }}
          >
            <View style={style.header}>
              <Icon name="arrow-back" size={28} onPress={() => this.props.navigation.goBack()} />
              {/* cart item icon with count  */}
            <CartIcon totalCartItem={this.state.totalCartItem} navigation={this.props.navigation} />
            </View>
            <View style={style.imageContainer}>
              <Image
                source={this.state.product?.img}
                style={{ resizeMode: "contain", flex: 1 , display : 'contents'}}
              />
            </View>
            <View style={style.detailsContainer}>
              <View
                style={{
                  marginLeft: 20,
                  flexDirection: "row",
                  alignItems: "flex-end",
                }}
              >
                <View style={style.line} />
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  Best choice
                </Text>
              </View>
              <View
                style={{
                  marginLeft: 20,
                  marginTop: 20,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                  {this.state.product?.name}
                </Text>
                <View style={style.priceTag}>
                  <Text
                    style={{
                      marginLeft: 15,
                      color: COLORS.white,
                      fontWeight: "bold",
                      fontSize: 16,
                    }}
                  >
                    ${this.state.product?.price}
                  </Text>
                </View>
              </View>
              <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>About</Text>
                <Text
                  style={{
                    color: "grey",
                    fontSize: 16,
                    lineHeight: 22,
                    marginTop: 10,
                  }}
                >
                  {this.state.product?.detail}
                </Text>
                <View
                  style={{
                    marginTop: 20,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View style={style.borderBtn}>
                      <Text style={style.borderBtnText}>-</Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 20,
                        marginHorizontal: 10,
                        fontWeight: "bold",
                      }}
                    >
                     {this.state.totalQuantity}
                    </Text>
                    <View style={style.borderBtn}>
                      <Text style={style.borderBtnText}>+</Text>
                    </View>
                  </View>

                  <View style={style.buyBtn}>
                    <Text
                      style={{
                        color: COLORS.white,
                        fontSize: 18,
                        fontWeight: "bold",
                      }}
                    >
                      Buy
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </SafeAreaView>
        );
    }


}

const style = StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    imageContainer: {
        flex: 0.45,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    detailsContainer: {
        flex: 1,
        backgroundColor: COLORS.light,
        marginHorizontal: 7,
        marginBottom: 7,
        borderRadius: 20,
        marginTop: 30,
        paddingTop: 30,
    },
    line: {
        width: 25,
        height: 2,
        backgroundColor: COLORS.dark,
        marginBottom: 5,
        marginRight: 3,
    },
    borderBtn: {
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 40,
    },
    borderBtnText: { fontWeight: 'bold', fontSize: 28 },
    buyBtn: {
        width: 130,
        height: 50,
        backgroundColor: COLORS.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
    priceTag: {
        backgroundColor: COLORS.green,
        width: 80,
        height: 40,
        justifyContent: 'center',
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
    },
});
