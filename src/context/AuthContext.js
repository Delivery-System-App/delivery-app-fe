import createDataContext from "./createDataContext";

const authReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const signup = (dispatch) => {
  return ({
    name,
    email,
    password,
    confirmPassword,
    location,
    phone,
    type,
  }) => {
    //try to sign in
    //handle success by updating states
    //handle failue by showing error messages
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
  { isSignedIn: false }
);
