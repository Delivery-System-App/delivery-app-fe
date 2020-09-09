import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import ResolveAuthScreen from "../../../screens/ResolveAuthScreen";
import MainScreen from "../../../screens/MainScreen";
import SignUp from "../../../screens/SignUpScreen";
import LoginScreen from "../../../screens/LoginScreen";
import ForgotPassword from "../../../screens/ForgotPassword";
import ListHotels from "../../../screens/ListHotels";
import FoodItems from "../../../screens/FoodItems";
import ShowDishes from "../../../screens/ShowDishes";
import OnBoardingScreen from "../../../screens/OnBoardingScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import ResultsShowScreen from "../../../screens/ResultsShowScreen";
const Stack = createStackNavigator();
const Stack2 = createStackNavigator();

const MyStack = () => {
  const [user, setUser] = useState(false);
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunched").then((value) => {
      if (value == null) {
        AsyncStorage.setItem("alreadyLaunched", "true");
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch == true) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            options={{ headerLeft: null }}
            name="boardingScreen"
            component={OnBoardingScreen}
          />
          <Stack.Screen
            options={{ headerLeft: null }}
            name="Loading"
            component={ResolveAuthScreen}
          />
          <Stack.Screen
            options={{ headerLeft: null }}
            name="Food Delivery App"
            component={MainScreen}
          />
          <Stack.Screen
            options={{ headerLeft: null }}
            name="Signup"
            component={SignUp}
          />
          <Stack.Screen
            options={{ headerLeft: null }}
            name="Signin"
            component={LoginScreen}
          />
          <Stack.Screen name="ForgotPasswd" component={ForgotPassword} />
          <Stack.Screen name="Hotels" component={ListHotels} />
          <Stack.Screen
            options={({ route }) => ({
              // title: route.params.name,
              headerLeft: null,
            })}
            name="Home"
            component={BottomTabNavigator}
          />
          <Stack.Screen name="ShowResult" component={ResultsShowScreen} />
          <Stack.Screen name="FoodItems" component={FoodItems} />
          <Stack.Screen name="ShowDishes" component={ShowDishes} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Loading"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            options={{ headerLeft: null }}
            name="Loading"
            component={ResolveAuthScreen}
          />
          <Stack.Screen
            options={{ headerLeft: null }}
            name="Food Delivery App"
            component={MainScreen}
          />
          <Stack.Screen
            options={{ headerLeft: null }}
            name="Signup"
            component={SignUp}
          />
          <Stack.Screen
            options={{ headerLeft: null }}
            name="Signin"
            component={LoginScreen}
          />
          <Stack.Screen name="ForgotPasswd" component={ForgotPassword} />
          <Stack.Screen name="Hotels" component={ListHotels} />
          <Stack.Screen
            options={({ route }) => ({
              // title: route.params.name,
              headerLeft: null,
            })}
            name="Home"
            component={BottomTabNavigator}
          />
          <Stack.Screen name="ShowResult" component={ResultsShowScreen} />
          <Stack.Screen name="FoodItems" component={FoodItems} />
          <Stack.Screen name="ShowDishes" component={ShowDishes} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default MyStack;
