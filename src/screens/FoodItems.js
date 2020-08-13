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

var { height, width } = Dimensions.get("window");

const FoodItems = () => {
  const dataFood = [
    {
      id: 1,
      name: "American",
      image: "http://tutofox.com/foodapp//categories/american.png",
      price: 750,
      categorie: "BreakFast",
    },
    {
      id: 2,
      name: "Burger",
      image: "http://tutofox.com/foodapp//categories/burger.png",
      price: 10,
      categorie: "BreakFast",
    },
    {
      id: 3,
      name: "Pizza",
      image: "http://tutofox.com/foodapp//categories/pizza.png",
      price: 200,
      categorie: "BreakFast",
    },
    {
      id: 4,
      name: "Drink",
      image: "http://tutofox.com/foodapp//categories/drink.png",
      price: 100,
      categorie: "BreakFast",
    },
  ];
  const _renderItemFood = (item) => {
    let catg = 0;
    if (catg == 0 || catg == item.categorie) {
      return (
        <TouchableOpacity style={styles.divFood}>
          <Image
            style={styles.imageFood}
            resizeMode="contain"
            source={{ uri: item.image }}
          />
          <View
            style={{
              height: width / 2 - 20 - 90,
              backgroundColor: "transparent",
              width: width / 2 - 20 - 10,
            }}
          />
          <Text
            style={{ fontWeight: "bold", fontSize: 22, textAlign: "center" }}
          >
            {item.name}
          </Text>
          <Text>Descp Food and Details</Text>
          <Text style={{ fontSize: 20, color: "green" }}>Rs.{item.price}</Text>
        </TouchableOpacity>
      );
    }
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
          <Text style={styles.titleCatg}>Food Items</Text>
          <FlatList
            data={dataFood}
            numColumns={2}
            renderItem={({ item }) => _renderItemFood(item)}
            keyExtractor={(item, index) => index.toString()}
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
