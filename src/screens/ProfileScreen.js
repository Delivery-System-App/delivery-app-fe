import React, { useContext, useState } from "react";
import { Text, View, StyleSheet, Image, Dimensions } from "react-native";
import { Button } from "react-native-elements";
import { Context as AuthContext } from "./../context/AuthContext";
import { useSelector } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
const foodImage = require("./../../assets/foods.jpg");
var { height, width } = Dimensions.get("window");
import Loader from "./../../utils/loader";

const ProfileScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const { signout } = useContext(AuthContext);
  const state = useSelector((reduxState) => reduxState);
  const User = state.getUser.data.data;

  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.image} source={foodImage} />
      </View>
      <View style={styles.textview}>
        <Text style={styles.nametext}>{User.name}</Text>
        <Text style={styles.mailtext}>{User.email}</Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("updateProfile")}
        >
          <Text>Update Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("DeliveryAddress")}
        >
          <Text>Address</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => signout(navigation)}
        >
          <Text>Sign Out</Text>
        </TouchableOpacity>
      </View>

      <Text>{User.address[1].address}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#DDDDDD",
    padding: 10,
    marginHorizontal: 2,
  },
  textview: {
    alignItems: "center",
    textAlign: "center",
  },
  image: {
    marginTop: 10,
    width: width / 2 - 20 - 30,
    height: width / 2 - 20 - 30,
    borderRadius: width,
    backgroundColor: "transparent",
  },
  nametext: {
    fontSize: 30,
    color: "darkblue",
    padding: 10,
    alignItems: "center",
    fontWeight: "100",
  },
  mailtext: {
    fontSize: 20,
    color: "darkblue",
    padding: 10,
    marginTop: 5,
    alignItems: "center",
    fontWeight: "100",
  },
});
export default ProfileScreen;
