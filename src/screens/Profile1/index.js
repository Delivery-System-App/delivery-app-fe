import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import contactData from "../../mocks/contact.json";

import Profile from "./Profile";
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";

const ProfileScreen2 = ({ navigation }) => {
  const isfocused = useIsFocused();
  const state = useSelector((reduxState) => reduxState);
  const data = state.getUser.data.data;
  const [Data, setData] = useState({});
  useEffect(() => {
    if (isfocused) {
      navigation.navigate("Home", { name: "Profile" });
    }
    setData(state.getUser.data.data);
  });

  return <Profile {...data} />;
};

ProfileScreen2.navigationOptions = () => ({
  header: null,
});

ProfileScreen2.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default ProfileScreen2;
