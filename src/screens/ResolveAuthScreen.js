import React, { useState, useContext, useEffect } from "react";
import { Context as AuthContext } from "./../context/AuthContext";
import { getUser } from "../redux/actions";
import useAbort, { useAbortableEffect } from "./useAbort";
import { useDispatch } from "react-redux";
import { cos } from "react-native-reanimated";

const ResolveAuthScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [User, setUser] = useState("");

  useAbortableEffect(
    async (status) => {
      const access = localStorage.getItem("access_token");
      if (access) {
        const res = await dispatch(getUser());
        if (res.data) {
          console.log(res);
          navigation.navigate("Home");
        } else navigation.navigate("Signin");
      } else {
        navigation.navigate("Signin");
      }
    },
    [dispatch]
  );

  return null;
};

export default ResolveAuthScreen;
