import React, { useState } from "react";
import { View, StyleSheet, TextInput, Button, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
export default function Login({ onLoginStatus, navigation }) {
  const [state, setState] = useState({
    userId: "",
    password: "",
  });
  const onLogin = () => {
    const { userId, password } = state;
    setSignedIn(true);
  };
  const [signedIn, setSignedIn] = useState(false);
  return (
    <View>
      <Text>Username</Text>
      <TextInput
        value={state.userId}
        onChangeText={(userId) => setState({ ...state, userId })}
        placeholder={"UserId"}
        style={styles.input}
      />
      <Text>Password</Text>
      <TextInput
        value={state.password}
        onChangeText={(password) => setState({ ...state, password })}
        placeholder={"Password"}
        secureTextEntry={true}
        style={styles.input}
      />

      <Button title={"Login"} onPress={onLogin} />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ForgotPasswd");
        }}
      >
        <Text>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Signup");
        }}
      >
        <Text>Don't have an account?</Text>
      </TouchableOpacity>
      {signedIn ? navigation.navigate("Home") : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
  },
});
