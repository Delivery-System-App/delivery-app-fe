import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, Button, Text, TextInput } from "react-native";
import { Input } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Context as AuthContext } from "./../context/AuthContext";
import { register } from "../redux/actions";
import { useDispatch } from "react-redux";
import * as Animatable from "react-native-animatable";

const SignUp = ({ navigation }) => {
  const dispatch = useDispatch();
  const { state, signup, clearErrorMessages } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [type, setType] = useState("customer");
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      clearErrorMessages();
    });
    return unsubscribe;
  }, [navigation]);

  const handleSubmit = () => {
    dispatch(
      register({ name, email, password, confirm, type: "customer" })
    ).then((res) => {
      if (res && res.data) {
        if (res.data.success) {
          setEmail("");
          setName("");
          setConfirm("");
          setPassword("");
        }
      }
    });
  };
  /*
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
        <TouchableOpacity style={styles.signupButton} onPress={handleSubmit}>
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
  );*/

  return (
    <View style={styles.container}>
      <View style={{ margin: "0px auto", alignItems: "center" }}>
        <Text style={{ fontSize: 25, marginTop: 20 }}>Welcome back!</Text>
        <Text style={{ fontSize: 16, color: "gray", marginTop: 20 }}>
          Sign in to continue
        </Text>
      </View>
      <Animatable.View style={{ margin: "0px auto", alignItems: "center" }}>
        <TextInput
          style={{
            marginTop: 40,
            borderBottomColor: "#ddd",
            borderBottomWidth: 1,
            paddingBottom: 20,
            width: "100%",
            maxWidth: "400px",
          }}
          value={name}
          onChangeText={setName}
          autoCapitalize="none"
          placeholder="Name"
          autoCorrect={false}
        />

        <TextInput
          style={{
            marginTop: 40,
            borderBottomColor: "#ddd",
            borderBottomWidth: 1,
            paddingBottom: 20,
            width: "100%",
            maxWidth: "400px",
          }}
          placeholder="Email"
          value={email}
          type="email"
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={{
            marginTop: 40,
            borderBottomColor: "#ddd",
            borderBottomWidth: 1,
            paddingBottom: 20,
            width: "100%",
            maxWidth: "400px",
          }}
          placeholder="password"
          value={password}
          type="password"
          onChangeText={setPassword}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
        />
        <TextInput
          style={{
            marginTop: 40,
            borderBottomColor: "#ddd",
            borderBottomWidth: 1,
            paddingBottom: 20,
            width: "100%",
            maxWidth: "400px",
          }}
          placeholder="confirm password"
          value={confirm}
          type="password"
          onChangeText={setConfirm}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
        />

        {state.errorMessage ? (
          <Text style={{ color: "red", textAlign: "center", marginTop: 10 }}>
            {state.errorMessage}
          </Text>
        ) : null}
      </Animatable.View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 40,
        }}
      >
        <TouchableOpacity
          style={{
            width: 200,
            backgroundColor: "#0d47a1",
            padding: 10,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 40,
            marginTop: 30,
          }}
          onPress={handleSubmit}
        >
          {false ? (
            <Loader />
          ) : (
            <Text style={{ textAlign: "center", color: "#FFF", fontSize: 16 }}>
              Sign up
            </Text>
          )}
        </TouchableOpacity>
        <View style={{ flexDirection: "row", marginTop: 40 }}>
          <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
            <Text style={{ color: "gray" }}>Have an account?</Text>
            <Text style={{ fontWeight: "bold" }}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    margin: "0px auto",
    backgroundColor: "#FFF",
    padding: 20,
  },
});
/*
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
    margin: 20,
    color: "#fff",
  },
  signupButton: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 15,
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
*/
