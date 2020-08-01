import React, { useContext, useEffect } from "react";
import { Context as AuthContext } from "./../context/AuthContext";

export default function ResolveAuthScreen({ navigation }) {
  const { tryLocalSignIn } = useContext(AuthContext);
  useEffect(() => {
    tryLocalSignIn(navigation);
  }, []);
  return null;
}
