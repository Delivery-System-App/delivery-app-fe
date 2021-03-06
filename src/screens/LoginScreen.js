import React, { useState, useContext, useRef } from "react";
import { View, StyleSheet, Text, TextInput, AsyncStorage } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Context as AuthContext } from "./../context/AuthContext";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions";
import { validateEmailAddress } from "../../utils/validation";
import { notify } from "../../utils/notify";
import Loader from "../../utils/loader";
import * as Animatable from "react-native-animatable";
const splitterString = "%=%@~!lorem^ipsum^split~@%//+%";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const { state, signin, clearErrorMessages } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const validateInput = useRef(null);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      clearErrorMessages();
    });

    return unsubscribe;
  }, [navigation]);

  const handleSubmit = () => {
    if (validateEmailAddress(email)) {
      setLoading(true);
      const userMail =
        "EMAIL_AUTH" + splitterString + email + splitterString + "customer";
      dispatch(login({ email: userMail, password })).then((resp) => {
        if (resp) {
          const { data: res } = resp;
          const { status: statusCode } = resp;
          if (resp.data === undefined) {
            setLoading(false);
            validateInput.current.shake(800);
            notify("invalid credentials");
          }
          if (resp.data && statusCode === 201) {
            setLoading(false);
            AsyncStorage.setItem("access_token", res.access_token);
            navigation.navigate("Home");
          }
        }
      });
    } else {
      setLoading(false);
      validateInput.current.shake(800);
      notify("invalid email");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 25, marginTop: 20 }}>Welcome back!</Text>
      <Text style={{ fontSize: 16, color: "gray", marginTop: 20 }}>
        Sign in to continue
      </Text>
      <Animatable.View ref={validateInput}>
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
            <Text style={{ textAlign: "center", color: "#FFF", fontSize: 16 }}>
              Login Now
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ForgotPasswd");
          }}
        >
          <Text style={{ marginTop: 20 }}>Forgot Password?</Text>
        </TouchableOpacity>

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
