import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "./src/screens/MainScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignUp from "./src/screens/SignUpScreen";
import ForgotPassword from "./src/screens/ForgotPassword";
import ListHotels from "./src/screens/ListHotels";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";
import { Provider } from "react-redux";
import ResultsShowScreen from "./src/screens/ResultsShowScreen";
import FoodItems from "./src/screens/FoodItems";
import Cart from "./src/screens/Cart";
import reducer from "./src/redux/reducer";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./src/redux/actions";
import ShowDishes from "./src/screens/ShowDishes";
import OnBoardingScreen from "./src/screens/OnBoardingScreen";
import AsyncStorage from "@react-native-community/async-storage";
import BottomTabNavigator from "./src/components/RestaurantItem/BottomTabNavigator";

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
const App = MyStack;

export default () => {
  const store = createStore(reducer, applyMiddleware(thunk));

  return (
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  );
};
