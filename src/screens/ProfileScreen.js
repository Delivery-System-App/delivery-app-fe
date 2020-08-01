import React, { useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { Context as AuthContext } from "./../context/AuthContext";

const ProfileScreen = ({ navigation }) => {
  const { signout } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
      <Button title="Sign Out" onPress={() => signout(navigation)} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default ProfileScreen;
