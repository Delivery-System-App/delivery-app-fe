import React, { useContext, useState, useEffect } from "react";
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { Button } from "react-native-elements";
import { notify } from "../../utils/notify";
import { validatePassword, phonePreg } from "../../utils/validation";
import { useSelector, useDispatch } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
const foodImage = require("./../../assets/foods.jpg");
import { updateProfile, getUser } from "../redux/actions";

const ProfileScreen = ({ navigation }) => {
  //const state = useSelector((reduxState) => reduxState);
  //const User = state.getUser.data.data;
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  useEffect(() => {
    dispatch(getUser()).then((res) => {
      if (res.data) {
        setName(res.data.data.name);
        setNumber(res.data.data.number);
      }
    });
  }, []);

  const initError = {
    name: "",
    email: "",
    password: "",
    confirm: "",
  };
  const [error, setError] = useState(initError);
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
    if (!phonePreg(number)) {
      err["number"] = "Invalid Number";
      formValid = false;
    }
    if (password !== "") {
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
    }

    setError(err);
    return formValid;
  }
  const newres = async () => {
    const res = await dispatch(getUser());
    if (res.data) {
      console.log(res);
      navigation.navigate("Home");
    } else navigation.navigate("Signin");
  };
  const handleSubmit = () => {
    if (validInputs()) {
      dispatch(updateProfile({ name, password, confirm, number })).then(
        (res) => {
          if (res) {
            if (res.data.success) {
              notify("Profile updated");
            }
          }
        }
      );
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.nametext}>Edit profile</Text>
      <Animatable.View style={styles.anim}>
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
          onChange={() => {
            setError(initError);
          }}
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
          value={number}
          name="number"
          onChangeText={setNumber}
          autoCapitalize="none"
          placeholder="Mobile"
          onChange={() => {
            setError(initError);
          }}
          autoCorrect={false}
        />
        {error && error["number"] ? (
          <Text style={{ textAlign: "left", color: "red", fontSize: 12 }}>
            {error["number"]}
          </Text>
        ) : null}
        <TextInput
          style={{
            marginTop: 40,
            borderBottomColor: "#ddd",
            borderBottomWidth: 1,
            paddingBottom: 20,
          }}
          value={password}
          name="name"
          onChangeText={setPassword}
          autoCapitalize="none"
          placeholder="Password"
          type="password"
          autoCorrect={false}
          onChange={() => {
            setError(initError);
          }}
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
          value={confirm}
          name="confirm"
          onChangeText={setConfirm}
          autoCapitalize="none"
          placeholder="Confirm"
          type="password"
          onChange={() => {
            setError(initError);
          }}
          autoCorrect={false}
          secureTextEntry={true}
        />
        {error && error["confirm"] ? (
          <Text style={{ textAlign: "left", color: "red", fontSize: 12 }}>
            {error["confirm"]}
          </Text>
        ) : null}
        <View style={styles.button}>
          <Button title="Submit" onPress={handleSubmit}></Button>
        </View>
      </Animatable.View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    position: "absolute",
  },
  textview: {
    alignItems: "center",
    textAlign: "center",
  },

  nametext: {
    fontSize: 30,
    color: "darkblue",
    padding: 10,
    alignItems: "center",
    fontWeight: "100",
  },
  anim: {
    backgroundColor: "white",
    width: "100%",
    padding: 30,
  },
  button: {
    marginTop: 7,
  },
});
export default ProfileScreen;
