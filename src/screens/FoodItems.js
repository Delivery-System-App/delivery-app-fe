import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { AsyncStorage } from "react-native";
import menuApi from "../api/menuApi";
import { useEffect } from "react";
import { menuList } from "../redux/actions";
import { useDispatch } from "react-redux";

var { height, width } = Dimensions.get("window");

const FoodItems = ({ route, navigation }) => {
  const [menu, setMenu] = useState([]);
  const dispatch = useDispatch();
  //we get the restaurant id
  const id = route.params.id;
  const getMenuList = async (id) => {
    dispatch(menuList([id])).then((res) => {
      if (res.data) {
        setMenu(res.data.data);
      }
    });
  };
  const foodImage = require("./../../assets/foods.jpg");
  useEffect(() => {
    getMenuList(id);
  }, []);

  const _renderItemFood = (item) => {
    const menuId = item.id;
    return (
      <TouchableOpacity style={styles.divFood}>
        <Image
          style={styles.imageFood}
          resizeMode="contain"
          source={foodImage}
        />
        <View
          style={{
            height: width / 2 - 20 - 90,
            backgroundColor: "transparent",
            width: width / 2 - 20 - 10,
          }}
        />
        <Text style={{ marginTop: 10, fontWeight: "bold", fontSize: 15 }}>
          {item.name}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("ShowDishes", { id, menuId })}
          style={{
            width: width / 2 - 40,
            backgroundColor: "#33c37d",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 5,
            padding: 4,
          }}
        >
          <Text
            style={{
              marginBottom: 10,
              fontSize: 18,
              color: "white",
              fontWeight: "bold",
            }}
          >
            View Menu
          </Text>
          <View style={{ width: 10 }} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
    // }
  };
  return (
    <ScrollView>
      <View style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
        <View
          style={{
            width: width,
            borderRadius: 20,
            paddingVertical: 20,
            backgroundColor: "white",
          }}
        >
          <Text style={styles.titleCatg}>MENU LIST</Text>
          <FlatList
            data={menu}
            numColumns={2}
            renderItem={({ item }) => _renderItemFood(item)}
            keyExtractor={(item) => item.id}
          />
          <View style={{ height: 20 }} />
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  titleCatg: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  imageFood: {
    width: width / 2 - 20 - 10,
    height: width / 2 - 20 - 30,
    backgroundColor: "transparent",
    position: "absolute",
    top: -45,
  },
  divFood: {
    width: width / 2 - 20,
    padding: 10,
    borderRadius: 10,
    marginTop: 55,
    marginBottom: 5,
    marginLeft: 10,
    alignItems: "center",
    elevation: 8,
    shadowOpacity: 0.3,
    shadowRadius: 50,
    backgroundColor: "white",
  },
});
export default FoodItems;
