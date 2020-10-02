import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  Alert,
  Pressable,
  ImageBackground,
} from "react-native";
import { Context as AuthContext } from "./../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-navigation";
const foodImage = require("./../../assets/on.png");
var { height, width } = Dimensions.get("window");
import Constants from "expo-constants";
import { deleteUserAddress, getUser } from "../redux/actions";
import { notify } from "./../../utils/notify";
import Loader from "../../utils/loader";
import { Body, Button, Card, CardItem, Icon } from "native-base";

const ProfileScreen = ({ navigation }) => {
  const { signout } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState([]);
  const [render, setRerender] = useState(Math.random());
  const dispatch = useDispatch();
  const [User, setUser] = useState([]);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setLoading(true);
      dispatch(getUser()).then((res) => {
        if (res && res.status === 200) {
          setUser(res.data.data);
          setAddress(res.data.data.address);
          setLoading(false);
        }
      });
      return unsubscribe;
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    dispatch(getUser()).then((res) => {
      if (res && res.status === 200) {
        setUser(res.data.data);
        setAddress(res.data.data.address);
        setLoading(false);
      }
    });
  }, [render]);

  const createTwoButtonAlert = () => {
    Alert.alert(
      "Signout",
      `${User.name},Are you sure you want to signout of the application?`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => signout(navigation) },
      ]
      // { cancelable: false }
    );
  };

  const confirmDeleteAddress = (id) => {
    // console.log("id", id);
    Alert.alert(
      "Delete Address",
      `${User.name},Are you sure you want to delete the delivery address?`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => deleteDeliveryAddress(id) },
      ],
      { cancelable: false }
    );
  };

  const deleteDeliveryAddress = (id) => {
    console.log("ready to delete!!");
    setLoading(true);
    dispatch(deleteUserAddress([id])).then((res) => {
      if (res && res.status === 201) {
        setRerender(Math.random());
        notify("address deleted");
      }
      setLoading(false);
    });
  };

  return loading ? (
    <Loader />
  ) : (
    <View style={styles.container}>
      <ImageBackground
        style={{ width: "100%", height: "50%" }}
        resizeMode="stretch"
        source={require("./../../images/mycurve.png")}
      >
        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
            color: "#fff",
            textAlign: "center",
            marginTop: 40,
          }}
        >
          Welcome
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 4,
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
            onPress={() => createTwoButtonAlert()}
          >
            <Text>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <ScrollView style={styles.scrollView}>
        {address ? (
          <View
            style={{
              marginVertical: 2,
              marginHorizontal: width - (width - 25),
            }}
          >
            <Text style={{ textAlign: "center" }}>Your Saved Address</Text>

            {address.map((item) => {
              return (
                <Card style={{ width: width - 50 }} key={item.id}>
                  <CardItem>
                    <Body>
                      <Text style={styles.addressText}>{item.flatnumber}</Text>
                      <Text style={styles.addressText}>{item.housename}</Text>
                      <Text style={styles.addressText}>{item.address}</Text>
                      <Text style={styles.addressText}>
                        near {item.landmark}
                      </Text>
                      <Text style={styles.addressText}>{item.pincode}</Text>
                    </Body>
                  </CardItem>
                  <CardItem
                    footer
                    bordered
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button
                      transparent
                      bordered
                      onPress={() => confirmDeleteAddress(item.id)}
                    >
                      <Icon name="trash" />
                    </Button>
                  </CardItem>
                </Card>
              );
            })}
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "red",
    // marginTop: Constants.statusBarHeight,
    // alignItems: "center",
    // justifyContent: "center",
  },
  addressText: {
    fontSize: 20,
  },
  scrollView: {
    marginHorizontal: 1,
    marginTop: "10%",
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
