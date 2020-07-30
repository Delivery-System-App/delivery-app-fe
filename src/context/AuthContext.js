import { AsyncStorage } from "react-native";
import createDataContext from "./createDataContext";
import DeliveryApi from "./../api/deliveryapp";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signup":
      return { errorMessage: "", token: action.payload };
    default:
      return state;
  }
};

const signup = (dispatch) => async ({
  name,
  email,
  password,
  handleSuccess,
}) => {
  try {
    const response = await DeliveryApi.post("/signup", {
      name,
      email,
      password,
    });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({ type: "signup", payload: response.data.token });
    handleSuccess();
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Somwthing went wrong with signup!!",
    });
  }
};

const signin = (dispatch) => {
  return ({ email, password }) => {
    //try to sign in
    //handle success by updating states
    //handle failue by showing error messages
  };
};

const signout = (dispatch) => {
  return () => {
    //somehow signout
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, signin, signout },
  { token: null, errorMessage: "" }
);
