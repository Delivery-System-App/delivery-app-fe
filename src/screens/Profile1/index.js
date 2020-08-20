import React, { useEffect } from "react";
import PropTypes from "prop-types";

import contactData from "../../mocks/contact.json";

import Profile from "./Profile";
import { useIsFocused } from "@react-navigation/native";

const ProfileScreen2 = ({ navigation }) => {
  const isfocused = useIsFocused();
  useEffect(() => {
    if (isfocused) {
      navigation.navigate("Home", { name: "Profile" });
    }
  });

  return <Profile {...contactData} />;
};

ProfileScreen2.navigationOptions = () => ({
  header: null,
});

ProfileScreen2.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default ProfileScreen2;
