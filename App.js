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
import { Provider as PaperProvider } from 'react-native-paper';

const Stack = createStackNavigator();
const Stack2 = createStackNavigator();
const Tab = createBottomTabNavigator();

function Home() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Hotels" component={ListHotels} />
      {/* needs to add profile screen when done */}
      <Tab.Screen name="My Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function MyStack() {
  return (
    <NavigationContainer>
      
        <Stack.Navigator initialRouteName="Loadings">
          
        <Stack.Screen name="Hotels" component={ListHotels} />
        <Stack.Screen name="Loading" component={ResolveAuthScreen} />
        <Stack.Screen name="Food Delivery App" component={MainScreen} />
        <Stack.Screen name="Signup" component={SignUp} />
        <Stack.Screen name="Signin" component={LoginScreen} />
        <Stack.Screen name="ForgotPasswd" component={ForgotPassword} />
        
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ShowResult" component={ResultsShowScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const App = MyStack;

export default () => {
  return (
    <PaperProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
    </PaperProvider>
  );
};
