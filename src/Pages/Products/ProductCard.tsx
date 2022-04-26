import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
} from "react-native";
import { Product } from "../../models/Product";
import COLORS from "../../Styles/color";
import { localStorageService } from "../../Service/LocalStorageService";
import {
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";

interface productProps {
  navigation: any;
  searchText: string;
}

interface ProductState {
  products: Product[] | null;
}

const width = Dimensions.get("window").width / 2 - 30;

export default class ProductCard extends Component<productProps, ProductState> {
  constructor(props: any) {
    super(props as any);

    this.state = {
      products: null,
    };
  }

  loadProducts = () => {
    setTimeout(async () => {
      var products = await localStorageService.getProducts();
      this.setState({ products: products });
    }, 1000);
  };

  componentDidMount() {
    this.loadProducts();
  }

  addItem = async (item: Product) => {
    await localStorageService.addOrUpdateCartItems(item, ((quantity) => quantity + 1));
  };

  renderCard = (item: Product) => {
    return (
      <View style={style.card} key={item.id}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            this.props.navigation.navigate("ProductDetail", item);
          }}
        >
          <View
            style={{
              height: 100,
              alignItems: "center",
            }}
          >
            <Image source={item.img} style={style.imageLayout} />
          </View>

          <Text style={{ fontWeight: "bold", fontSize: 17, marginTop: 10 }}>
            {item.name}
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 5,
          }}
        >
          <Text style={{ fontSize: 19, fontWeight: "bold" }}>
            ${item.price}
          </Text>

          <View
            style={{
              height: 30,
              width: 25,
              backgroundColor: COLORS.green,
              borderRadius: 5,
              alignItems: "center",
            }}
          >
            <TouchableHighlight onPress={() => this.addItem(item)}>
              <Text
                style={{
                  fontSize: 22,
                  color: COLORS.white,
                  fontWeight: "bold",
                }}
              >
                +
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  };

  getProducts = () => {
    if(this.props.searchText.length > 0) {
      return this.state.products?.filter(f => f.name.toLowerCase().includes(this.props.searchText.toLowerCase()));
    }
    
    return this.state.products;
  }

  render() {
    return (
      <FlatList
        columnWrapperStyle={{ justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 10,
          paddingBottom: 50,
        }}
        numColumns={2}
        data={this.getProducts()}
        renderItem={({ item }) => {
          return this.renderCard(item);
        }}
      />
    );
  }
}

const style = StyleSheet.create({
  card: {
    height: 225,
    backgroundColor: COLORS.light,
    width,
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
  },
  imageLayout: {
    flex: 1,
    resizeMode: "contain"
  },
});
