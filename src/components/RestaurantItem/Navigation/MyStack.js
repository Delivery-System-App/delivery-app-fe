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
import EditProfile from "../../../screens/UpdateProfile";
import CartButton from "./CartButton";
const Stack = createStackNavigator();

const MyStack = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

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
          <Stack.Screen
            options={{ headerLeft: null }}
            name="updateProfile"
            component={EditProfile}
          />
          <Stack.Screen
            name="ShowResult"
            component={ResultsShowScreen}
            options={{
              headerShown: true,
              title: "Restaurant Details",
              headerTintColor: "#000",
            }}
          />
          <Stack.Screen
            name="FoodItems"
            component={FoodItems}
            options={{
              headerShown: true,
              title: "Menu",
              headerTintColor: "#000",
            }}
          />
          <Stack.Screen
            name="ShowDishes"
            component={ShowDishes}
            options={({ route }) => ({
              headerShown: true,
              title: "Menu Items",
              headerRight: () => <CartButton resid={route.params.id} />,
            })}
          />
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
            name="updateProfile"
            component={EditProfile}
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
          <Stack.Screen
            name="ShowResult"
            component={ResultsShowScreen}
            options={{
              headerShown: true,
              title: "Restaurant Details",
              headerTintColor: "#000",
            }}
          />
          <Stack.Screen
            name="FoodItems"
            component={FoodItems}
            options={{
              headerShown: true,
              title: "Menu",
              headerTintColor: "#000",
            }}
          />
          <Stack.Screen
            name="ShowDishes"
            component={ShowDishes}
            options={({ route }) => ({
              headerShown: true,
              title: "Menu Items",
              headerRight: () => <CartButton resid={route.params.id} />,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default MyStack;
