import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Button,
  Text,
  TextInput,
  AsyncStorage,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Context as AuthContext } from "./../context/AuthContext";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const { state, signin, clearErrorMessages } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      clearErrorMessages();
    });

    return unsubscribe;
  }, [navigation]);

  const handleSubmit = () => {
    dispatch(login({ email, password })).then((res) => {
      console.log(res);
      if (res.data) {
        AsyncStorage.setItem("access_token", res.data.access_token);
        navigation.navigate("Home");
      }
    });
  };
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 25, marginTop: 20 }}>Welcome back!</Text>
      <Text style={{ fontSize: 16, color: "gray", marginTop: 20 }}>
        Sign in to continue
      </Text>

      <TextInput
        style={{
          marginTop: 40,
          borderBottomColor: "#ddd",
          borderBottomWidth: 1,
          paddingBottom: 20,
        }}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        placeholder="Email"
        autoCorrect={false}
      />

      <TextInput
        style={{
          marginTop: 40,
          borderBottomColor: "#ddd",
          borderBottomWidth: 1,
          paddingBottom: 20,
        }}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
      />
      {state.errorMessage ? (
        <Text style={styles.errorMessage}>{state.errorMessage}</Text>
      ) : null}
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
          <Text style={{ textAlign: "center", color: "#FFF", fontSize: 16 }}>
            Login Now
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ForgotPasswd");
          }}
        >
          <Text style={{ marginTop: 20 }}>Forgot Password?</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: "row", marginTop: 60 }}>
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
        <View style={{ flexDirection: "row", marginTop: 40 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Signup");
            }}
          >
            <Text style={{ color: "gray" }}>Don't have an account?</Text>
            <Text style={{ fontWeight: "bold" }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 20,
  },
});

export default Login;
