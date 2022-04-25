import React from "react";
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./src/Pages/Products/HomeScreen";
import ProductDetail from "./src/Pages/Products/ProductDetail";
import CartItems from "./src/Pages/Products/CartItems";
import Checkout from "./src/Pages/Products/Checkout";

const Stack = createNativeStackNavigator();

const App  = () => {

  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="CartItems" component={CartItems} />
      <Stack.Screen name="Checkout" component={Checkout} />
    </Stack.Navigator>
  </NavigationContainer>
  );
};

export default App;


