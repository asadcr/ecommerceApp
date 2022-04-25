import { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { localStorageService } from "../Service/LocalStorageService";

interface CartIconProps {
  totalCartItem: number;
  navigation : any
}

export default class CartIcon extends Component<CartIconProps, {}> {

  constructor(props: {}) {
    super(props as any);

  }

  render() {
    return (
      <>
        {
        this.props.totalCartItem != 0 && <View style={{
            width: 30,
            height: 30,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(245, 42, 42,0.2)",
            marginLeft: "auto",
          }}
        >
          <Text>{this.props.totalCartItem}</Text>
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
