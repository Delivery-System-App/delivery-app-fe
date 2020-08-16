import React from "react";
import PropTypes from "prop-types";

import contactData from "../../mocks/contact.json";

import Profile from "./Profile";

const ProfileScreen2 = () => <Profile {...contactData} />;

ProfileScreen2.navigationOptions = () => ({
  header: null,
});

ProfileScreen2.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default ProfileScreen2;
