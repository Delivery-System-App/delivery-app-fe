import React, { useState, useEffect } from "react";
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
import { Provider } from "react-redux";
import ProfileScreen from "./src/screens/ProfileScreen";
import ProfileScreen2 from "./src/screens/Profile1/index";
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

const Stack = createStackNavigator();
const Stack2 = createStackNavigator();
const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Hotels"
        component={ListHotels}
        options={{
          title: "Hotel",
          // tabBarIcon: () => (
          //   <svg
          //     // xmlns="http://www.w3.org/2000/svg"
          //     height="24"
          //     viewBox="0 0 24 24"
          //     width="24"
          //     fill="green"
          //   >
          //     <path d="M0 0h24v24H0z" fill="none" />
          //     <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          //   </svg>
          // ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={
          {
            // tabBarIcon: () => (
            //   <svg
            //     // xmlns="http://www.w3.org/2000/svg"
            //     viewBox="0 0 24 24"
            //     fill="green"
            //     width="18px"
            //     height="18px"
            //   >
            //     <path d="M0 0h24v24H0z" fill="none" />
            //     <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
            //   </svg>
            // ),
          }
        }
      />
      <Tab.Screen
        name="UserProfile"
        component={ProfileScreen}
        options={
          {
            // tabBarIcon: () => (
            //   <svg
            //     // xmlns="http://www.w3.org/2000/svg"
            //     height="24"
            //     viewBox="0 0 24 24"
            //     fill="green"
            //     width="24"
            //   >
            //     <path d="M0 0h24v24H0z" fill="none" />
            //     <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
            //   </svg>
            // ),
          }
        }
      />
    </Tab.Navigator>
  );
};

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
            component={Home}
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
            component={Home}
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
