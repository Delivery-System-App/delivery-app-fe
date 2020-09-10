import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, Button, Text, TextInput } from "react-native";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { Context as AuthContext } from "./../context/AuthContext";
import { register } from "../redux/actions";
import { useDispatch } from "react-redux";
import * as Animatable from "react-native-animatable";
import {
  validateEmailAddress,
  validatePassword,
  phonePreg,
} from "../../utils/validation";
import { notify } from "../../utils/notify";
import Loader from "../../utils/loader";

const SignUp = ({ navigation }) => {
  const dispatch = useDispatch();
  const { state, signup, clearErrorMessages } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [type, setType] = useState("customer");
  const [loading, setloading] = useState(false);

  const initError = {
    name: "",
    email: "",
    password: "",
    confirm: "",
  };
  const [error, setError] = useState(initError);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      clearErrorMessages();
    });
    return unsubscribe;
  }, [navigation]);

  function validInputs() {
    let formValid = true;
    let err = Object.assign({}, initError);
    if (name === "") {
      err["name"] = "Enter your name";
      formValid = false;
    }
    if (password !== confirm) {
      err["confirm"] = "Passwords do not match";
      formValid = false;
    }
    if (!validateEmailAddress(email) || email == "") {
      err["email"] = "Enter a valid email";
      formValid = false;
    }
    if (password.length < 8) {
      err["password"] = "Must be atleast 8 characters";
      formValid = false;
    } else if (password.length > 49) {
      err["password"] = "Maximum 49 characters";
      formValid = false;
    } else if (!validatePassword(password)) {
      err["password"] = "Needed one upper one lower and one digit";
      formValid = false;
    }

    setError(err);
    return formValid;
  }

  const handleSubmit = () => {
    if (validInputs()) {
      setloading(true);
      dispatch(
        register({ name, email, password, confirm, type: "customer" })
      ).then((res) => {
        if (res && res.data) {
          if (res.data.success) {
            setEmail("");
            setName("");
            setConfirm("");
            setPassword("");
            notify("Registration success");
          }
        }
        setloading(false);
      });
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <View style={styles.container}>
        <Text style={{ fontSize: 25, marginTop: 20 }}>Welcome back!</Text>
        <Text style={{ fontSize: 16, color: "gray", marginTop: 20 }}>
          Sign in to continue
        </Text>
        <Animatable.View>
          <TextInput
            style={{
              marginTop: 40,
              borderBottomColor: "#ddd",
              borderBottomWidth: 1,
              paddingBottom: 20,
            }}
            value={name}
            name="name"
            onChangeText={setName}
            autoCapitalize="none"
            placeholder="Name"
            autoCorrect={false}
          />
          {error && error["name"] ? (
            <Text style={{ textAlign: "left", color: "red", fontSize: 12 }}>
              {error["name"]}
            </Text>
          ) : null}

          <TextInput
            style={{
              marginTop: 40,
              borderBottomColor: "#ddd",
              borderBottomWidth: 1,
              paddingBottom: 20,
            }}
            placeholder="Email"
            value={email}
            name="email"
            type="email"
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {error && error["email"] ? (
            <Text style={{ textAlign: "left", color: "red", fontSize: 12 }}>
              {error["email"]}
            </Text>
          ) : null}
          <TextInput
            style={{
              marginTop: 40,
              borderBottomColor: "#ddd",
              borderBottomWidth: 1,
              paddingBottom: 20,
            }}
            placeholder="password"
            value={password}
            name="password"
            type="password"
            onChangeText={setPassword}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
          />
          {error && error["password"] ? (
            <Text style={{ textAlign: "left", color: "red", fontSize: 12 }}>
              {error["password"]}
            </Text>
          ) : null}
          <TextInput
            style={{
              marginTop: 40,
              borderBottomColor: "#ddd",
              borderBottomWidth: 1,
              paddingBottom: 20,
            }}
            placeholder="confirm password"
            value={confirm}
            type="password"
            name="confirm"
            onChangeText={setConfirm}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
          />
          {error && error["confirm"] ? (
            <Text style={{ textAlign: "left", color: "red", fontSize: 12 }}>
              {error["confirm"]}
            </Text>
          ) : null}

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
            {loading ? (
              <Loader />
            ) : (
              <Text
                style={{ textAlign: "center", color: "#FFF", fontSize: 16 }}
              >
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
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 20,
  },
});
