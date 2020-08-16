import React, { useContext, useEffect } from "react";
import { Context as AuthContext } from "./../context/AuthContext";

const ResolveAuthScreen = ({ navigation }) => {
  const { tryLocalSignIn } = useContext(AuthContext);
  useEffect(() => {
    tryLocalSignIn(navigation);
  }, []);
  return null;
};

export default ResolveAuthScreen;
