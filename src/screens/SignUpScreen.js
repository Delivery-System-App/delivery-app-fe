import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, Button, Text, TextInput } from "react-native";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
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

  return (
    <ScrollView>
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
