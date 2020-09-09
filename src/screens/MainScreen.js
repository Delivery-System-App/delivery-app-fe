import React from "react";
import { Text, StyleSheet, View, Button, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const MainScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        style={{ width: "100%", height: 300 }}
        source={require("../../images/login-logo.png")}
        resizeMode="contain"
      />
      <Text style={{ fontSize: 40, fontWeight: "bold" }}>Hello</Text>
      <Text
        style={{
          fontSize: 16,
          color: "gray",
          textAlign: "center",
          marginHorizontal: 20,
        }}
      >
        Welcome To SKOSH. Login now to enjoy the best food services.
      </Text>
      <View style={{ flexDirection: "row", margin: 20, paddingVertical: 20 }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#0d47a1",
            padding: 10,
            width: 150,
            borderRadius: 30,
            marginHorizontal: 2,
          }}
          onPress={() => {
            navigation.navigate("Signin");
          }}
        >
          <Text style={{ textAlign: "center", color: "#fff", fontSize: 18 }}>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#FFF",
            padding: 10,
            width: 150,
            borderRadius: 30,
            marginHorizontal: 2,
            borderWidth: 1,
            borderColor: "#0d47a1",
          }}
          onPress={() => {
            navigation.navigate("Signup");
          }}
        >
          <Text style={{ textAlign: "center", color: "#0d47a1", fontSize: 18 }}>
            Sign up
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={{ fontSize: 16, marginTop: 10 }}>Or via social media</Text>
      <View style={{ flexDirection: "row", marginTop: 20 }}>
        <View
          style={{
            height: 40,
            width: 40,
            borderRadius: 40 / 2,
            backgroundColor: "#3f51b5",
            alignItems: "center",
            justifyContent: "center",
            marginHorizontal: 10,
          }}
        >
          <Text style={{ fontSize: 25, fontWeight: "bold", color: "#FFF" }}>
            f
          </Text>
        </View>
        <View
          style={{
            height: 40,
            width: 40,
            borderRadius: 40 / 2,
            backgroundColor: "#f44336",
            alignItems: "center",
            justifyContent: "center",
            marginHorizontal: 10,
          }}
        >
          <Text style={{ fontSize: 25, fontWeight: "bold", color: "#FFF" }}>
            G
          </Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default MainScreen;
