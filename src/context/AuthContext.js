import { AsyncStorage } from "react-native";
import createDataContext from "./createDataContext";
import DeliveryApi from "./../api/deliveryapp";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "signin":
      return { errorMessage: "", token: action.payload };
    case "signout":
      return { token: null, errorMessage: "" };
    default:
      return state;
  }
};

const tryLocalSignIn = (dispatch) => async (navigation) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({ type: "signin", payload: token });
    navigation.navigate("Hotels");
  } else {
    navigation.navigate("Signin");
  }
};

const clearErrorMessages = (dispatch) => () => {
  dispatch({ type: "clear_error_message" });
};

const signup = (dispatch) => async ({
  name,
  email,
  password,
  confirm,
  type,
  handleSuccess,
}) => {
  try {
    const response = await DeliveryApi.post("/register", {
      name,
      email,
      password,
      confirm,
      type,
    });
    const token = response.data.data.access_token;
    if (token) {
      await AsyncStorage.setItem("token", token);
      dispatch({ type: "signin", payload: token });
      handleSuccess();
    } else {
      dispatch({
        type: "add_error",
        //need to display a valid error message
        payload: "Can't register!!",
      });
    }
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong with signup!!" + err,
    });
  }
};

const signin = (dispatch) => async ({ email, password, handleSignin }) => {
  try {
    const response = await DeliveryApi.post("login", {
      email,
      password,
    });
    const token = response.data.access_token;
    if (token) {
      await AsyncStorage.setItem("token", token);
      dispatch({ type: "signin", payload: token });
      handleSignin();
    } else {
      dispatch({
        type: "add_error",
        //need to display a valid error message
        payload: "Can't sign you in!!",
      });
    }
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong with signin!!" + err,
    });
  }
};

const signout = (dispatch) => async (navigation) => {
  await AsyncStorage.removeItem("token");
  dispatch({ type: "signout" });
  navigation.navigate("Food Delivery App");
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, signin, signout, clearErrorMessages, tryLocalSignIn },
  { token: null, errorMessage: "" }
);
