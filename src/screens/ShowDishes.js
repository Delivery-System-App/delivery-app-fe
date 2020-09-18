import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { AsyncStorage } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { menuDishes } from "../redux/actions";
import { useDispatch } from "react-redux";
import { notify } from "../../utils/notify";
import Loader from "../../utils/loader";

var { height, width } = Dimensions.get("window");

const ShowDishes = ({ route, navigation }) => {
  const menuId = route.params.menuId;
  const resId = route.params.id;
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const foodImage = require("./../../assets/foods.jpg");

  const getMenuDishes = async (id) => {
    try {
      setLoading(true);
      dispatch(menuDishes([id])).then((res) => {
        if (res.data) {
          console.log(res.data.data);
          setDishes(res.data.data);
        }
        setLoading(false);
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
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
        let error = { duplicate: false, restaurant: false };
        if (datacart !== null) {
          const cart = JSON.parse(datacart);
          for (let i = 0; i < cart.length; i++) {
            if (cart[i].restaurantId !== resId) {
              error.restaurant = true;
              break;
            }
            if (cart[i].food.dishId === data.dishId) {
              error.duplicate = true;
              break;
            }
          }
          if (!error.duplicate && !error.restaurant) {
            cart.push(itemcart);
            AsyncStorage.setItem("cart", JSON.stringify(cart));
          }
        } else {
          const cart = [];
          cart.push(itemcart);
          AsyncStorage.setItem("cart", JSON.stringify(cart));
        }
        if (!error.duplicate && !error.restaurant) notify("Added to Cart");
        else if (error.duplicate) {
          notify("Item alread added");
        } else if (error.restaurant) {
          notify("Please checkout cart");
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
  const _renderItemFood = (item) => {
    return (
      <TouchableOpacity style={styles.divFood}>
        <View
          style={{
            height: width / 2 - 20 - 90,
            backgroundColor: "transparent",
            width: width / 2 - 20 - 10,
          }}
        />
        <Image
          style={styles.imageFood}
          // resizeMode="contain"
          source={item.photos !== "" ? { uri: item.photos[0] } : foodImage}
        />
        <View
          style={{
            marginVertical: 30,
            // width: width / 2 - 20 - 30,
            // height: width / 2 - 150,
            backgroundColor: "transparent",
          }}
        />
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 15,
            textAlign: "center",
          }}
          numberOfLines={1}
        >
          {item.name}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Icon
            name="ios-square"
            size={30}
            color={
              item.category && item.category === "VEG"
                ? "green"
                : item.category && item.category === "NONVEG"
                ? "red"
                : null
            }
          />
          <Text style={{ fontSize: 15, marginLeft: 5 }}>
            {item.category && item.category === "VEG"
              ? "VEG"
              : item.category && item.category === "NONVEG"
              ? "NON_VEG"
              : "UNKNOWN"}
          </Text>
        </View>

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
  return loading ? (
    <Loader />
  ) : (
    // <SafeAreaView style={{ flex: 1 }}>
    <View style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
      <View
        style={{
          flex: 1,
          width: width,
          borderRadius: 20,
          paddingVertical: 2,
        }}
      >
        {/* <Text style={styles.titleCatg}>Menu Dishes</Text> */}

        <FlatList
          data={dishes}
          numColumns={2}
          renderItem={({ item }) => _renderItemFood(item)}
          keyExtractor={(item) => item.dishId}
        />

        <View
          style={{
            // flex: 1,
            marginTop: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        ></View>
      </View>
    </View>
    // </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  titleCatg: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#33c37d",
  },
  imageFood: {
    marginTop: 10,
    width: width / 2 - 20 - 30,
    height: width / 2 - 20 - 30,
    borderRadius: width,
    backgroundColor: "transparent",
    position: "absolute",
    // top: -45,
  },
  divFood: {
    width: width / 2 - 20,
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
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
