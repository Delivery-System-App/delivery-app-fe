import React, { useContext } from "react";
import { Text, View, StyleSheet, Image, Dimensions } from "react-native";
import { Button } from "react-native-elements";
import { Context as AuthContext } from "./../context/AuthContext";
import { useSelector } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
const foodImage = require("./../../assets/foods.jpg");
var { height, width } = Dimensions.get("window");

const ProfileScreen = ({ navigation }) => {
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
      <Button title="Sign Out" onPress={() => signout(navigation)} />
      <View style={{ marginTop: 10 }}>
        <Button
          title="update profile"
          onPress={() => navigation.navigate("updateProfile")}
        ></Button>
      </View>
      <View style={{ marginTop: 10 }}>
        <Button
          title="Add delivery address"
          onPress={() => navigation.navigate("DeliveryAddress")}
        ></Button>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
