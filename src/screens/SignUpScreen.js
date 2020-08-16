import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, Button, Text, TextInput } from "react-native";
import { Input } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Context as AuthContext } from "./../context/AuthContext";

const SignUp = ({ navigation }) => {
  const { state, signup, clearErrorMessages } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [type, setType] = useState("");
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      clearErrorMessages();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.instruction}>Signup</Text>
      <TextInput
        label="Enter your name"
        value={name}
        onChangeText={setName}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder={"name"}
        style={styles.input}
      />

      <TextInput
        label="Enter your email address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder={"Email"}
        style={styles.input}
      />

      <TextInput
        label="Enter your password"
        value={password}
        onChangeText={setPassword}
        placeholder={"Password"}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
        style={styles.input}
      />

      <TextInput
        label="Confirm your password"
        value={confirm}
        onChangeText={setConfirm}
        placeholder={"Confirm Password"}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
        style={styles.input}
      />

      <TextInput
        label="type"
        value={type}
        onChangeText={setType}
        placeholder={"customer/owner"}
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.input}
      />

      {state.errorMessage ? (
        <Text style={styles.errorMessage}>{state.errorMessage}</Text>
      ) : null}

      <View>
        <TouchableOpacity
          style={styles.signupButton}
          onPress={() => {
            signup({ name, email, password, confirm, type, navigation });
          }}
        >
          <Text style={styles.btnTxt}>Signup</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.innerContainer2}>
        <TouchableOpacity
          style={styles.link}
          onPress={() => navigation.navigate("Signin")}
        >
          <Text style={styles.BtnTxt}>Already Have An Account,SignIn?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#008080",
  },
  input: {
    width: "90%",
    padding: 15,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  errorMessage: {
    fontSize: 10,
    color: "red",
    marginVertical: 10,
    marginTop: 15,
  },
  instruction: {
    fontSize: 25,
    textAlign: "center",
    fontFamily: "DancingScript-Bold",
    margin: 20,
    color: "#fff",
  },
  signupButton: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: "15%",
  },
  innerContainer1: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 250,
  },
  innerContainer2: {
    width: "90%",
    height: "10%",
    alignItems: "center",
    marginBottom: 0,
  },
  btnTxt: {
    fontSize: 18,
    textAlign: "center",
  },
  linkTxt: {
    fontSize: 18,
    textAlign: "center",
    fontFamily: "bold",
  },
  link: {
    width: "100%",
    padding: 15,
    marginBottom: 10,
  },
});
