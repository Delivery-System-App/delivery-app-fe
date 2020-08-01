import React, { useState, useContext } from "react";
import { View, StyleSheet, Button, Text } from "react-native";
import { Input } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Context as AuthContext } from "./../context/AuthContext";

export default function Login({ navigation }) {
  const { state, signin, clearErrorMessages } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      clearErrorMessages();
    });

    return unsubscribe;
  }, [navigation]);
  return (
    <View>
      <Input
        label="Enter your email address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder={"Email"}
        style={styles.input}
      />

      <Input
        label="Enter your password"
        value={password}
        onChangeText={setPassword}
        placeholder={"Password"}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
        style={styles.input}
      />

      {state.errorMessage ? (
        <Text style={styles.errorMessage}>{state.errorMessage}</Text>
      ) : null}

      <Button
        title={"Login"}
        onPress={() => signin({ email, password, navigation })}
      />
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
  errorMessage: {
    fontSize: 16,
    color: "red",
    marginVertical: 10,
    marginTop: 15,
  },
});
