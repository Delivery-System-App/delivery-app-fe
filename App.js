import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "./src/screens/MainScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignUp from "./src/screens/SignUpScreen";
import ForgotPassword from "./src/screens/ForgotPassword";
import ListHotels from "./src/screens/ListHotels";
const Stack = createStackNavigator();

function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Food Delivery App" component={ListHotels} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default MyStack;
