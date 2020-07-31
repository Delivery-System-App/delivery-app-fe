import React, { useContext, useEffect } from "react";
import { Text, StyleSheet, View, Button } from "react-native";
import { Context as AuthContext } from "./../context/AuthContext";

const MainScreen = ({ navigation }) => {
  const { tryLocalSignIn } = useContext(AuthContext);
  useEffect(() => {
    tryLocalSignIn(navigation);
  }, []);
  return (
    <View>
      <Text style={styles.welcomeMsg}>Welcome To Geomata</Text>
      <Button
        onPress={() => {
          navigation.navigate("Signin");
        }}
        title="Signin"
        color="#f194ff"
      />
      <Button
        onPress={() => {
          navigation.navigate("Signup");
        }}
        title="Signup"
        color="#f194ff"
      />
    </View>
  );
};
const styles = StyleSheet.create({
  welcomeMsg: {
    color: "gray",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 50,
    marginTop: 50,
    marginBottom: 20,
  },
});
export default MainScreen;
