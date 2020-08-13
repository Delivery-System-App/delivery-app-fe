import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainScreen from "./src/screens/MainScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignUp from "./src/screens/SignUpScreen";
import ForgotPassword from "./src/screens/ForgotPassword";
import ListHotels from "./src/screens/ListHotels";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import ResultsShowScreen from "./src/screens/ResultsShowScreen";
import FoodItems from "./src/screens/FoodItems";
import Cart from "./src/screens/cart";

const Stack = createStackNavigator();
const Stack2 = createStackNavigator();
const Tab = createBottomTabNavigator();

function Home() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Hotels"
        component={ListHotels}
        options={{ title: "Hotel" }}
      />
      <Tab.Screen name="Cart" component={Cart} />
      {/* needs to add profile screen when done */}
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading">
        <Stack.Screen name="Loading" component={ResolveAuthScreen} />
        <Stack.Screen name="Food Delivery App" component={MainScreen} />
        <Stack.Screen name="Signup" component={SignUp} />
        <Stack.Screen name="Signin" component={LoginScreen} />
        <Stack.Screen name="ForgotPasswd" component={ForgotPassword} />
        <Stack.Screen name="Hotels" component={ListHotels} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ShowResult" component={ResultsShowScreen} />
        <Stack.Screen name="FoodItems" component={FoodItems} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const App = MyStack;

export default () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};
