import { Component } from "react";
import { View, Text, SafeAreaView, StyleSheet, Image } from 'react-native';
import { Product } from "../../models/Product";
import COLORS from "../../Styles/color";
import Icon from 'react-native-vector-icons/MaterialIcons';
import CartIcon from "../../components/CartIcon"
import { localStorageService } from "../../Service/LocalStorageService";
import { TouchableOpacity } from "react-native-gesture-handler";

interface ProductDetailState {
  product: Product,
  quantity: number
}

export default class ProductDetail extends Component<any, ProductDetailState> {
  constructor(props: {}) {
    super(props as any);

    this.state = {
      product: this.props.route?.params as any,
      quantity: 1
    }
  }

  addItemToCart = async () => {
    await localStorageService.addOrUpdateCartItems(this.state.product, ((quantity) => quantity + this.state.quantity));
  };

  increment = async () => {
    this.setState({ quantity: this.state.quantity + 1 });
  };

  decrement = async () => {

    if(this.state.quantity == 1) {
      return;
    }

    this.setState({ quantity: this.state.quantity - 1 });
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
          <CartIcon navigation={this.props.navigation} />
        </View>
        <View style={style.imageContainer}>
          <Image
            source={this.state.product?.img}
            style={{ resizeMode: "contain", flex: 1 }}
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
                <TouchableOpacity onPress={() => this.decrement()}>
                  <View style={style.borderBtn}>
                    <Text style={style.borderBtnText}>-</Text>
                  </View>
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 20,
                    marginHorizontal: 10,
                    fontWeight: "bold",
                  }}
                >
                  {this.state.quantity}
                </Text>
                <TouchableOpacity onPress={() => this.increment()}>
                  <View style={style.borderBtn}>
                    <Text style={style.borderBtnText}>+</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={() => this.addItemToCart()}>
                <View style={style.buyBtn}>
                  <Text
                    style={{
                      color: COLORS.white,
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    Add to Cart
                  </Text>
                </View>
              </TouchableOpacity>
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
