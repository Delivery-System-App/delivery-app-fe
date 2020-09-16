import React, { useState, useContext, useRef } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import * as Animatable from "react-native-animatable";
import Loader from "../../../../utils/loader";
import { Button } from "native-base";
import { notify } from "../../../../utils/notify";
import { isNumber } from "../../../../utils/validation";
import { addUserAddress } from "../../../redux/actions";
import { useDispatch } from "react-redux";

const DeliveryAddress = () => {
  const initError = {
    address: "",
    housename: "",
    pincode: "",
  };
  const dispatch = useDispatch();
  const [address, setAddress] = useState("");
  const [flatnumber, setFlatNumber] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pincode, setPincode] = useState("");
  const [housename, setHouseName] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(initError);

  function validInputs() {
    let formValid = true;
    let err = Object.assign({}, initError);
    if (address === "") {
      err["address"] = "Enter you address";
      formValid = false;
    }
    if (!isNumber(pincode) || pincode == "") {
      err["pincode"] = "Enter a valid pincode";
      formValid = false;
    }
    if (housename === "") {
      err["housename"] = "Enter your housename";
      formValid = false;
    }
    setError(err);
    return formValid;
  }

  const handleSubmit = () => {
    if (validInputs()) {
      setLoading(true);
      //need to do api call
      dispatch(
        addUserAddress({
          address: { address, housename, flatnumber, landmark, pincode },
        })
      ).then((res) => {
        console.log(res, "rws");
        if (res && res.data) {
          if (res.data.success) {
            setEmail("");
            setName("");
            setConfirm("");
            setPassword("");
            notify("address added!!");
          }
        }
        setLoading(false);
      });
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <View style={styles.container}>
        <Text style={{ fontSize: 16, color: "gray" }}>
          Add your delivery address
        </Text>
        {/* <Animatable.View> */}
        <TextInput
          style={{
            marginTop: 40,
            borderBottomColor: "#ddd",
            borderBottomWidth: 1,
            paddingBottom: 20,
          }}
          value={address}
          name="addr"
          onChangeText={setAddress}
          autoCapitalize="none"
          placeholder="Address"
          autoCorrect={false}
        />
        {error && error["address"] ? (
          <Text style={{ textAlign: "left", color: "red", fontSize: 12 }}>
            {error["address"]}
          </Text>
        ) : null}
        <TextInput
          style={{
            marginTop: 40,
            borderBottomColor: "#ddd",
            borderBottomWidth: 1,
            paddingBottom: 20,
          }}
          placeholder="Housename/Flatname"
          value={housename}
          name="housename"
          onChangeText={setHouseName}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {error && error["housename"] ? (
          <Text style={{ textAlign: "left", color: "red", fontSize: 12 }}>
            {error["housename"]}
          </Text>
        ) : null}
        <TextInput
          style={{
            marginTop: 40,
            borderBottomColor: "#ddd",
            borderBottomWidth: 1,
            paddingBottom: 20,
          }}
          placeholder="House number/Flat number"
          value={flatnumber}
          name="flatnumber"
          onChangeText={setFlatNumber}
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
          placeholder="Landmark"
          value={landmark}
          name="landmark"
          onChangeText={setLandmark}
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
          placeholder="Pincode"
          value={pincode}
          name="pincode"
          onChangeText={setPincode}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {error && error["pincode"] ? (
          <Text style={{ textAlign: "left", color: "red", fontSize: 12 }}>
            {error["pincode"]}
          </Text>
        ) : null}

        {/* </Animatable.View> */}
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
                Add address
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 20,
  },
});
export default DeliveryAddress;
