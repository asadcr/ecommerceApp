import { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { localStorageService } from "../Service/LocalStorageService";
import { CartItem, Product } from '../models/Product';
import EventEmitter, { Events } from '../Service/eventemitter';

interface CartIconProps {
  navigation : any
}

interface CartIconState {
  cartItems : number
}

export default class CartIcon extends Component<CartIconProps, CartIconState> {

  constructor(props: {}) {
    super(props as any);

    this.state = {
      cartItems: 0
    }

    EventEmitter.on(Events.onCartUpdate, this.onCartUpdate);
  }

  async componentDidMount() {
    this.onCartUpdate();
  }

  componentDidUpdate() {
    this.onCartUpdate();
  }

  onCartUpdate = async () => {
    var cartItems = await localStorageService.getCartItems();
    this.setState({ cartItems: cartItems.reduce(((pre, cur) => pre + cur.quantity), 0) });
  }

  render() {
    return (
      <>
        {
        this.state.cartItems != 0 && <View style={{
            width: 30,
            height: 30,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(245, 42, 42,0.2)",
            marginLeft: "auto",
          }}
        >
          <Text>{this.state.cartItems}</Text>
        </View>
        }
        <Icon
          name="shopping-cart"
          size={40}
          onPress={() => this.props.navigation.navigate("CartItems")}
        ></Icon>
      </>
    );
  }
}

const style = StyleSheet.create({});
