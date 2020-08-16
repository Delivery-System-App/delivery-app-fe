import React, { Component } from "react";
import { Card, Icon } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import {
  Image,
  ImageBackground,
  Linking,
  ListView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import PropTypes from "prop-types";

import mainColor from "./constants";
import { TouchableOpacity } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#FFF",
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0,
  },
  container: {
    flex: 1,
  },
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 35,
  },
  headerContainer: {},
  headerColumn: {
    backgroundColor: "transparent",
    alignItems: "center",
  },
  placeIcon: {
    color: "white",
    fontSize: 26,
  },
  scroll: {
    backgroundColor: "#FFF",
  },

  userAddressRow: {
    alignItems: "center",
    flexDirection: "row",
  },
  userCityRow: {
    backgroundColor: "transparent",
  },
  userCityText: {
    color: "#A5A5A5",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
  userImage: {
    borderColor: mainColor,
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170,
  },
  userNameText: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "bold",
    paddingBottom: 8,
    textAlign: "center",
  },
  tabText: {
    fontSize: 20,
  },
  tabIcons: {
    // paddingLeft: 8,
    // width: 100,
    // flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

const Contact = (props) => {
  const propTypes = {
    avatar: PropTypes.string.isRequired,
    avatarBackground: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.shape({
      city: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
    }).isRequired,
  };

  const renderHeader = () => {
    const {
      avatar,
      avatarBackground,
      name,
      email,
      address: { city, country },
    } = props;

    return (
      <View style={styles.headerContainer}>
        <ImageBackground
          style={styles.headerBackgroundImage}
          blurRadius={10}
          source={{
            uri: avatarBackground,
          }}
        >
          <View style={styles.headerColumn}>
            <Image
              style={styles.userImage}
              source={{
                uri: avatar,
              }}
            />
            <Text style={styles.userNameText}>{name}</Text>
            <View style={styles.userAddressRow}>
              <View>
                <Icon
                  name="email"
                  underlayColor="transparent"
                  iconStyle={styles.placeIcon}
                />
              </View>
              <View style={styles.userCityRow}>
                <Text style={styles.userCityText}> {email}</Text>
              </View>
            </View>
            <View style={styles.userAddressRow}>
              <View>
                <Icon
                  name="place"
                  underlayColor="transparent"
                  iconStyle={styles.placeIcon}
                />
              </View>
              <View style={styles.userCityRow}>
                <Text style={styles.userCityText}>
                  {city}, {country}
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  };

  const renderTab = () => {
    return (
      <View
        style={{
          height: 100,
          // alignItems: "center",
          // justifyContent: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            paddingVertical: 10,
          }}
        >
          <View style={styles.tabIcons}>
            <TouchableOpacity onPress={() => {}}>
              <MaterialCommunityIcons
                style={{ padding: 5 }}
                name="cash"
                size={40}
                color="black"
              />
              <Text>Payments</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.tabIcons}>
            <TouchableOpacity onPress={() => {}}>
              <MaterialCommunityIcons
                style={{ padding: 5 }}
                name="settings"
                size={40}
                color="black"
              />
              <Text>Settings</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.tabIcons}>
            <TouchableOpacity onPress={() => {}}>
              <MaterialCommunityIcons
                style={{ padding: 5 }}
                name="bell"
                size={40}
                color="black"
              />
            </TouchableOpacity>
            <Text>Notifications</Text>
          </View>
          <View style={styles.tabIcons}>
            <TouchableOpacity onPress={() => {}}>
              <MaterialCommunityIcons
                style={{ padding: 5 }}
                name="bookmark"
                size={40}
                color="black"
              />
              <Text>Bookmarks</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <Card containerStyle={styles.cardContainer}>{renderHeader()}</Card>
      </View>
      <View style={styles.container}>
        <Card containerStyle={styles.cardContainer}>{renderTab()}</Card>
      </View>
    </ScrollView>
  );
};

export default Contact;
