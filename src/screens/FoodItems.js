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
import Loader from "../../utils/loader";
import Icon from "react-native-vector-icons/EvilIcons";
var { height, width } = Dimensions.get("window");

const FoodItems = ({ route, navigation }) => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  //we get the restaurant id
  const id = route.params.id;

  const getMenuList = async (id) => {
    try {
      setLoading(true);
      dispatch(menuList([id])).then((res) => {
        if (res.data) {
          setMenu(res.data.data);
        }
        setLoading(false);
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    getMenuList(id);
  }, []);

  const _renderItemFood = (item) => {
    const menuId = item.id;
    return (
      <TouchableOpacity
        style={styles.divFood}
        onPress={() => navigation.navigate("ShowDishes", { id, menuId })}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              marginTop: 10,
              fontSize: 20,
              marginBottom: 10,
              fontFamily: "sans-serif",
              fontStyle: "normal",
              color: "grey",
            }}
          >
            {item.name}
          </Text>
          <Icon
            style={{ marginHorizontal: 5 }}
            name="arrow-right"
            size={30}
            color={"red"}
          />
        </View>

        {/* <TouchableOpacity
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
              fontSize: 18,
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            View Menu
          </Text>
          <View style={{ width: 10 }} />
        </TouchableOpacity> */}
      </TouchableOpacity>
    );
  };
  return loading ? (
    <Loader />
  ) : (
    // <SafeAreaView style={{ flex: 1 }}>
    <View
      style={{
        flex: 1,
        marginBottom: 5,
        width: width,
        borderRadius: 20,
      }}
    >
      <FlatList
        data={menu}
        numColumns={1}
        renderItem={({ item }) => _renderItemFood(item)}
        keyExtractor={(item) => item.id}
      />
    </View>
    // </SafeAreaView>
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
    borderRadius: 20,
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
