import React, { useState } from "react";
import { View, StyleSheet, TextInput, Button, Text } from "react-native";
import tailwind from "tailwind-rn";
import { TouchableOpacity } from "react-native-gesture-handler";
export default function Login({ onLoginStatus, navigation }) {
  console.log(navigation);
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
    <View
      style={tailwind(
        "bg-blue-200 flex flex-col flex ml-auto mr-auto items-center w-full lg:w-2/3 md:w-3/5"
      )}
    >
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

      <Button
        title={"Login"}
        style={tailwind(
          "bg-blue-400 py-4 text-center px-17 md:px-12 md:py-4 text-white rounded leading-tight text-xl md:text-base font-sans mt-4 mb-20"
        )}
        onPress={onLogin}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ForgotPasswd");
        }}
      >
        <Text
          style={tailwind(
            "text-base text-white text-right font-roboto leading-normal hover:underline"
          )}
        >
          Forgot Password?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Signup");
        }}
      >
        <Text
          style={tailwind(
            "text-base text-white text-right font-roboto leading-normal hover:underline mb-6"
          )}
        >
          Don't have an account?
        </Text>
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

//export default LoginScreen;
