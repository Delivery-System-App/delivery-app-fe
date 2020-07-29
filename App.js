import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "./src/screens/MainScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignUp from "./src/screens/SignUpScreen";
const Stack = createStackNavigator();

function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Food Delivery App" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default MyStack;
