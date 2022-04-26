import { Component } from "react";
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import COLORS from "../../Styles/color";
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProductCard from "./ProductCard";
import CartIcon from "../../components/CartIcon"
import { localStorageService } from "../../Service/LocalStorageService";
interface HomeState {
  selectCategory: number
  searchText: string
}

export default class HomeScreen extends Component<any, HomeState> {

  categoryTabs: string[] = ['POPULAR', 'ORGANIC', 'INDOORS', 'SYNTHETIC'];

  constructor(props: {}) {
    super(props as any);

    this.state = {
      selectCategory: 0,
      searchText: ''
    };
  }

  CategoryTabsList = () => {
    return (
      <View style={style.categoryContainer}>
        {this.categoryTabs.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => this.setState({ selectCategory: index })}
          >
            <Text
              style={[
                style.categoryText,
                this.state.selectCategory === index && style.categoryTextSelected,
              ]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };


  onChangeText = (text: string) => {
    this.setState({ searchText: text });
  }

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          paddingHorizontal: 20,
          backgroundColor: COLORS.white,
        }}
      >
        <View style={style.header}>
          <View>
            <Text style={{ fontSize: 25, fontWeight: "bold" }}>Welcome to</Text>
            <Text
              style={{ fontSize: 38, color: COLORS.green, fontWeight: "bold" }}
            >
              Green World
            </Text>
          </View>

          {/* cart item icon with count  */}
          <CartIcon navigation={this.props.navigation} />

        </View>

        <View style={{ marginTop: 30, flexDirection: "row" }}>
          <View style={style.searchContainer}>
            <Icon name="search" size={25} style={{ marginLeft: 20 }} />
            <TextInput placeholder="Search" style={style.input} onChangeText={this.onChangeText} value={this.state.searchText} />
          </View>
          <View style={style.sortBtn}>
            <Icon name="sort" size={30} color={COLORS.white} />
          </View>
        </View>

        {this.CategoryTabsList()}

        {/* product list component */}
        <ProductCard navigation={this.props.navigation} searchText={this.state.searchText} />

      </SafeAreaView>
    );
  }
}

const style = StyleSheet.create({

  header: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },


  searchContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    color: COLORS.dark,
  },
  sortBtn: {
    marginLeft: 10,
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: COLORS.green,
    justifyContent: 'center',
    alignItems: 'center',
  },


  categoryContainer: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 20,
    justifyContent: 'space-between',
  },

  categoryText: { fontSize: 16, color: 'grey', fontWeight: 'bold' },

  categoryTextSelected: {
    color: COLORS.green,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: COLORS.green,
  },

});