import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import restaurantApi from "../api/restaurantApi";
import { FAB, Badge, Drawer } from "react-native-paper";
import { ListItem } from "react-native-elements";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

const ResultsShowScreen = ({ route, navigation }) => {
  const [result, setResult] = useState([]);
  const [cuisines, setCusines] = useState([]);
  const [currency, setCurrency] = useState("");
  const getResult = async (id) => {
    const response = await restaurantApi.get(`/${id}`);
    console.log(response.data.timings);
    setCusines(["Veg","Non-Veg"]);//to be done
    setCurrency(
      "₹" + " " + response.data.totaldishprice/response.data.noofdishes
    );
    setResult(response.data);
  };

  useEffect(() => {
    getResult(id);
  }, []);
  if (!result) {
    return null;
  }
  const id = route.params.id;
  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          <Image style={styles.image} source={{ uri: result.photos }} />
          <Text style={styles.title}>{result.name}</Text>
          <Text style={styles.name}>Average Cost For Two </Text>
          <Image source={require("../common/multiuser.png")} />
          <Drawer.Item icon="star" label={currency} />

          <Text style={styles.name}>Cuisines</Text>
          <FlatList
            horizontal
            showsVerticalScrollIndicator={false}
            data={cuisines}
            keyExtractor={(cuisines) => cuisines}
            renderItem={({ item }) => {
              return <Badge>{item}</Badge>;
            }}
          ></FlatList>

          <Text style={styles.name}>Timings</Text>
          <Drawer.Item icon="star" label={"9am - 12am"} />{/*tobedone*/}

          {/*<Text style={styles.name}>Highlights -</Text>
          <FlatList
            style={styles.HiglightsFlatList}
            data={result.highlights}
            keyExtractor={(it) => it}
            renderItem={({ item }) => {
              return (
                <ListItem
                  style={styles.HighlightsListItem}
                  leftAvatar={{
                    source: {
                      uri:
                        "https://img.icons8.com/all/500/verified-account.png",
                    },
                  }}
                  title={item}
                />
              );
            }}
          />*/}
          {/* <TouchableOpacity
            style={{ backgroundColor: "#33c37d" }}
            onPress={() => navigation.navigate("FoodItems")}
          >
            <Text>MENU</Text>
          </TouchableOpacity> */}
        </ScrollView>
        <FAB
          style={styles.fab}
          small
          icon="plus"
          label="Menu"
          onPress={() => navigation.navigate("FoodItems")}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
  },
  image: {
    width: "auto",
    height: 120,
    borderRadius: 4,
    marginVertical: 5,
  },
  name: {
    fontWeight: "bold",
    marginTop: 5,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    color: "blue",
  },
  TouchableOpacityStyle: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 30,
  },

  FloatingButtonStyle: {
    position: "absolute",
    resizeMode: "contain",
    width: 50,
    height: 50,
    //backgroundColor:'black'
  },
  CuisineText: {
    borderRadius: 12,
    backgroundColor: "red",
    color: "white",
    fontSize: "14px",
    height: "20px",
    width: "auto",
  },
  PeopleImage: {
    borderRadius: "50%",
  },
  HiglightsFlatList: {
    backgroundColor: "none",
  },
  HighlightsListItem: {
    backgroundColor: "none",
  },
  fab: {
    resizeMode: "contain",
    position: "fixed",
    margin: 16,
    right: 0,
    bottom: 0,
  },

  //text-white px-4  h-8 bg-red-600 rounded-full
});

export default ResultsShowScreen;
