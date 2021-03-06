import React from "react";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider } from "react-redux";
import reducer from "./src/redux/reducer";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import MyStack from "./src/components/RestaurantItem/Navigation/MyStack";
import FontLoader from "./utils/FontLoader";

const App = MyStack;

export default () => {
  const store = createStore(reducer, applyMiddleware(thunk));

  return (
    <Provider store={store}>
      <FontLoader />
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  );
};
