import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, Dimensions } from "react-native";
import { Context as AuthContext } from "./../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-navigation";
const foodImage = require("./../../assets/on.png");
var { height, width } = Dimensions.get("window");
import Constants from "expo-constants";
import { getUser } from "../redux/actions";
import Loader from "../../utils/loader";

const ProfileScreen = ({ navigation }) => {
  const { signout } = useContext(AuthContext);
  const state = useSelector((reduxState) => reduxState);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [User, setUser] = useState([]);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      console.log("called");
      setLoading(true);
      dispatch(getUser()).then((res) => {
        if (res && res.status === 200) {
          setUser(res.data.data);
          setLoading(false);
        }
      });
      return unsubscribe;
    });
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <Image style={styles.image} source={foodImage} />
        </View>

        <View style={styles.textview}>
          <Text style={styles.nametext}>{User.name}</Text>
          <Text style={styles.mailtext}>{User.email}</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginVertical: 15,
          }}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("updateProfile")}
          >
            <Text>Update Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("DeliveryAddress")}
          >
            <Text>Address</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => signout(navigation)}
          >
            <Text>Sign Out</Text>
          </TouchableOpacity>
        </View>

        {/* <Text>{(User.address[1].address, console.log(User))}</Text> */}
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: Constants.statusBarHeight,
    // alignItems: "center",
    // justifyContent: "center",
  },
  scrollView: {
    marginHorizontal: 1,
  },
  button: {
    // backgroundColor: "#DDDDDD",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#ed64a6",
  },
  textview: {
    alignItems: "center",
    textAlign: "center",
  },
  image: {
    marginTop: 10,
    width: width / 2 - 20 - 30,
    height: width / 2 - 20 - 30,
    borderRadius: width,
    backgroundColor: "grey",
  },
  nametext: {
    fontSize: 30,
    color: "darkblue",
    alignItems: "center",
    fontWeight: "100",
  },
  mailtext: {
    fontSize: 20,
    color: "black",
    alignItems: "center",
    fontWeight: "100",
  },
});
export default ProfileScreen;
