import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import {
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native-gesture-handler";
import { useEffect } from "react";
import { menuList } from "../redux/actions";
import { useDispatch } from "react-redux";
import { SafeAreaView } from "react-navigation";

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
  useEffect(() => {
    getMenuList(id);
  }, []);

  const _renderItemFood = (item) => {
    const menuId = item.id;
    return (
      <TouchableOpacity style={styles.divFood}>
        <Text
          style={{
            marginTop: 10,
            fontWeight: "bold",
            fontSize: 25,
            marginBottom: 10,
          }}
        >
          {item.name}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("ShowDishes", { id, menuId })}
          style={{
            width: width - 40,
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
              fontSize: 18,
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            View Menu
          </Text>
          <View style={{ width: 10 }} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          marginTop: 40,
          marginBottom: 10,
          width: width,
          borderRadius: 20,
          paddingVertical: 20,
        }}
      >
        <Text style={styles.titleCatg}>MENU</Text>
        <SafeAreaView
          style={{
            flex: 1,
            borderRadius: 20,
          }}
        >
          <FlatList
            data={menu}
            numColumns={1}
            renderItem={({ item }) => _renderItemFood(item)}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  titleCatg: {
    color: "#33c37d",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  divFood: {
    width: width - 20,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
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
