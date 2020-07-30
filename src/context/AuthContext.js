import createDataContext from "./createDataContext";
import DeliveryApi from "./../api/deliveryapp";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

const signup = (dispatch) => {
  return async ({ name, email, password }) => {
    try {
      const response = await DeliveryApi.post("/signup", {
        name,
        email,
        password,
      });
      console.log(response.data);
    } catch (err) {
      dispatch({
        type: "add_error",
        payload: "Somwthing went wrong with signup!!",
      });
    }
  };
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
  { isSignedIn: false, errorMessage: "" }
);
