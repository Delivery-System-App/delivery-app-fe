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
      <Text style={styles.instruction}>Login </Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder={"Email-ID"}
        style={styles.input}
      />

      <TextInput
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

      <View style={styles.innerContainer1}>
        <TouchableOpacity
          style={styles.link}
          onPress={() => {
            navigation.navigate("ForgotPasswd");
          }}
        >
          <Text style={styles.btnTxt}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
          <Text style={styles.btnTxt}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.innerContainer2}>
        <TouchableOpacity
          style={styles.link}
          onPress={() => {
            navigation.navigate("Signup");
          }}
        >
          <Text style={styles.BtnTxt}>New here? Signup Instead</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
  loginButton: {
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

export default Login;
