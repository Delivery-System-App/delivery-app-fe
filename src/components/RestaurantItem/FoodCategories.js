import React, { useState } from "react";
import { StyleSheet, View, Text, Dimensions, Image } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
var { height, width } = Dimensions.get("window");

const FoodCategories = () => {
  const [selectCatg, setSelectCatg] = useState(0);
  const dataCategories = [
    {
      id: 1,
      name: "Food",
      color: "#fbc831",
      image: "http://tutofox.com/foodapp//categories/american.png",
    },
    {
      id: 2,
      name: "Grocery",
      color: "#9fd236",
      image:
        "http://www.pngall.com/wp-content/uploads/4/Grocery-Transparent-Background.png",
    },
    {
      id: 3,
      name: "Bakery",
      color: "orange",
      image: "http://pngimg.com/uploads/cake/cake_PNG13140.png",
    },
    {
      id: 4,
      name: "Drink",
      color: "#f2f2f2",
      image: "http://tutofox.com/foodapp//categories/drink.png",
    },
  ];
  const _renderItem = (item) => {
    return (
      <TouchableOpacity
        style={[styles.divCategorie, { backgroundColor: item.color }]}
        onPress={() => setSelectCatg(item.id)}
      >
        <Image
          style={{ width: 100, height: 80 }}
          resizeMode="contain"
          source={{ uri: item.image }}
        />
        <Text style={{ fontWeight: "bold", fontSize: 22 }}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={{
        width: width - 30,
        borderRadius: 20,
        paddingVertical: 20,
        backgroundColor: "white",
        marginHorizontal: 15,
      }}
    >
      <Text style={styles.titleCatg}>Categories {selectCatg}</Text>
      <FlatList
        horizontal={true}
        data={dataCategories}
        renderItem={({ item }) => _renderItem(item)}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={{ height: 20 }} />
    </View>
  );
};
const styles = StyleSheet.create({
  divCategorie: {
    backgroundColor: "red",
    margin: 5,
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
  },
  titleCatg: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
});
export default FoodCategories;
