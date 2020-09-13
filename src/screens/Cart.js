import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { Text, View, Image, TouchableOpacity, Dimensions } from "react-native";
var { width } = Dimensions.get("window");
import Icon from "react-native-vector-icons/Ionicons";
import { AsyncStorage } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { bookDishes } from "../redux/actions";
import { notify } from "../../utils/notify";
import { ActivityIndicator, Title } from "react-native-paper";
import { Body, Container, Header } from "native-base";

const Cart = ({ navigation, route }) => {
  const [dataCart, setDataCart] = useState([]);
  const dispatch = useDispatch();
  const isfocused = useIsFocused();
  const [loading, setLoading] = useState(false);

  if (isfocused) {
    navigation.navigate("Home", { name: "Cart" });
  }
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getInitialData();
    });
    return unsubscribe;
  }, []);

  const getInitialData = async () => {
    AsyncStorage.getItem("cart")
      .then((cart) => {
        if (cart !== null) {
          const cartfood = JSON.parse(cart);
          setDataCart(cartfood);
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
  const onChangeQual = async (i, type) => {
    const dataCar = dataCart;
    let cantd = dataCar[i].quantity;

    if (type) {
      cantd = cantd + 1;
      dataCar[i].quantity = cantd;
      console.log("qty" + dataCar[i].quantity);
      setDataCart(dataCar);
      await AsyncStorage.setItem("cart", JSON.stringify(dataCart));
      getInitialData();
    } else if (type == false && cantd >= 2) {
      cantd = cantd - 1;
      dataCar[i].quantity = cantd;
      await setDataCart(dataCar);
      AsyncStorage.setItem("cart", JSON.stringify(dataCart));
      getInitialData();
    } else if (type == false && cantd == 1) {
      dataCar.splice(i, 1);
      setDataCart(dataCar);
      await AsyncStorage.setItem("cart", JSON.stringify(dataCart));
      getInitialData();
    }
  };

  const checkout = () => {
    if (Array.isArray(dataCart) && dataCart.length) {
      const booking = {
        restaurantId: dataCart[0].restaurantId,
        dishIds: [],
        qty: [],
      };
      dataCart.map((item) => {
        !booking.dishIds.includes(item.food.dishId)
          ? booking.dishIds.push(item.food.dishId) &&
            booking.qty.push(item.quantity)
          : null;
      });
      setLoading(true);
      dispatch(bookDishes(booking)).then(async (res) => {
        console.log(res);
        if (res.data) {
          await AsyncStorage.removeItem("cart");
          setDataCart([]);
          notify("bookin successfull");
          setLoading(false);
        }
        if (res.error) {
          console.log(error.message);
          setLoading(false);
        }
      });
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={{ height: 40 }} />
      <Text style={{ fontSize: 32, fontWeight: "bold", color: "#33c37d" }}>
        Cart food
      </Text>
      <View style={{ height: 10 }} />

      <View style={{ flex: 1 }}>
        <ScrollView>
          {dataCart.map((item, i) => {
            return (
              <View
                key={i}
                style={{
                  width: width - 20,
                  margin: 10,
                  backgroundColor: "transparent",
                  flexDirection: "row",
                  borderBottomWidth: 2,
                  borderColor: "#cccccc",
                  paddingBottom: 10,
                }}
              >
                <Image
                  style={{
                    width: width / 3,
                    height: width / 3,
                    borderRadius: width / 3,
                  }}
                  source={{ uri: item.food.photos[0] }}
                />
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "trangraysparent",
                    padding: 10,
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                      {item.food.name}
                    </Text>
                    <Text>Lorem Ipsum de food</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        color: "#33c37d",
                        fontSize: 20,
                      }}
                    >
                      Rs.{item.price * item.quantity}
                    </Text>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <TouchableOpacity onPress={() => onChangeQual(i, false)}>
                        <Icon
                          name="ios-remove-circle"
                          size={35}
                          color={"#33c37d"}
                        />
                      </TouchableOpacity>
                      <Text
                        style={{
                          paddingHorizontal: 8,
                          fontWeight: "bold",
                          fontSize: 18,
                        }}
                      >
                        {item.quantity}
                      </Text>
                      <TouchableOpacity onPress={() => onChangeQual(i, true)}>
                        <Icon
                          name="ios-add-circle"
                          size={35}
                          color={"#33c37d"}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}

          <View style={{ height: 20 }} />

          <TouchableOpacity
            onPress={() => checkout()}
            style={{
              backgroundColor: "#33c37d",
              width: width - 40,
              alignItems: "center",
              padding: 10,
              borderRadius: 5,
              margin: 20,
            }}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#00ff00" />
            ) : (
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                CHECKOUT
              </Text>
            )}
          </TouchableOpacity>

          <View style={{ height: 20 }} />
        </ScrollView>
      </View>
    </View>
  );
};

export default Cart;
