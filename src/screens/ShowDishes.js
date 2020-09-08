import React from "react";
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
import Icon from "react-native-vector-icons/Ionicons";
import { useState } from "react";
import { useEffect } from "react";
import menuApi from "./../api/menuApi";
import { menuDishes } from "../redux/actions";
import { useDispatch } from "react-redux";

var { height, width } = Dimensions.get("window");

const ShowDishes = ({ route, navigation }) => {
  const menuId = route.params.menuId;
  const resId = route.params.id;
  const [dishes, setDishes] = useState([]);
  const dispatch = useDispatch();

  const foodImage = require("./../../assets/foods.jpg");

  const getMenuDishes = async (id) => {
    dispatch(menuDishes([id])).then((res) => {
      if (res.data) {
        setDishes(res.data.data);
      }
    });
  };
  useEffect(() => {
    getMenuDishes(menuId);
  }, []);

  const onClickAddCart = (data) => {
    const itemcart = {
      restaurantId: resId,
      food: data,
      quantity: 1,
      price: data.price,
    };

    AsyncStorage.getItem("cart")
      .then((datacart) => {
        if (datacart !== null) {
          // We have data!!
          const cart = JSON.parse(datacart);
          cart.push(itemcart);
          AsyncStorage.setItem("cart", JSON.stringify(cart));
        } else {
          const cart = [];
          cart.push(itemcart);
          AsyncStorage.setItem("cart", JSON.stringify(cart));
        }
        alert("Add Cart");
      })
      .catch((err) => {
        alert(err);
      });
  };
  const _renderItemFood = (item) => {
    return (
      <TouchableOpacity style={styles.divFood}>
        <Image
          style={styles.imageFood}
          resizeMode="contain"
          source={item.photos ? { uri: item.photos[0] } : foodImage}
        />
        <View
          style={{
            height: width / 2 - 20 - 90,
            backgroundColor: "transparent",
            width: width / 2 - 20 - 10,
          }}
        />
        <Text style={{ fontWeight: "bold", fontSize: 22, textAlign: "center" }}>
          {item.name}
        </Text>
        <Text style={{ fontSize: 20, color: "green" }}>Rs.{item.price}</Text>
        <TouchableOpacity
          onPress={() => onClickAddCart(item)}
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
          <Text style={{ fontSize: 18, color: "white", fontWeight: "bold" }}>
            Add Cart
          </Text>
          <View style={{ width: 10 }} />
          <Icon name="ios-add-circle" size={30} color={"white"} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
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
          <Text style={styles.titleCatg}>Menu Dishes</Text>
          <FlatList
            data={dishes}
            numColumns={2}
            renderItem={({ item }) => _renderItemFood(item)}
            keyExtractor={(item) => item.dishId}
          />
          <View style={{ height: 20 }} />
          <TouchableOpacity
            onPress={() => navigation.navigate("Cart", { resId })}
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
            <Text style={{ fontSize: 18, color: "white", fontWeight: "bold" }}>
              Go To Cart
            </Text>
            <View style={{ width: 10 }} />
          </TouchableOpacity>
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
    // width: 150,
    // height: 150,
    // borderRadius: (width / (2 - 20 - 10))/2,
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
export default ShowDishes;
