import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import restaurantApi from "../api/restaurantApi";
import { FAB, Badge, Drawer } from "react-native-paper";
import { ListItem } from "react-native-elements";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { resDetail } from "../redux/actions";
import Loader from "../../utils/loader";
import { Container, Content } from "native-base";
import MainScreenBanner from "../components/RestaurantItem/MainScreenBanner";

const ResultsShowScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  // const [cuisines, setCusines] = useState([]);
  // const [currency, setCurrency] = useState("");
  const getResult = async (id) => {
    try {
      setLoading(true);
      dispatch(resDetail([id])).then((res) => {
        if (res.data) {
          setResult(res.data);
          res.data.photos && res.data.photos.length > 0
            ? setPhotos(res.data.photos)
            : setPhotos([
                "http://tutofox.com/foodapp//banner/banner-1.jpg",
                "http://tutofox.com/foodapp//banner/banner-2.jpg",
                "http://tutofox.com/foodapp//banner/banner-3.png",
              ]);
          setLoading(false);

          // setCusines(["Veg", "Non-Veg"]); //to be done
          // setCurrency("₹" + " " + res.data.totaldishprice / res.data.noofdishes);
        }
        console.log(result);
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getResult(id);
  }, []);

  const id = route.params.id;
  return loading ? (
    <Loader />
  ) : (
    <>
      {/* <View style={styles.container}> */}
      {/* <ScrollView>
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
          <Drawer.Item icon="star" label={"9am - 12am"} /> */}
      {/*tobedone*/}

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
      {/* </ScrollView> */}
      {/* <FAB
          style={styles.fab}
          small
          icon="plus"
          label="Menu"
          onPress={() => navigation.navigate("FoodItems", { id })}
        /> */}
      {/* </View> */}
      <Container>
        <Content padder>
          <MainScreenBanner photos={photos} />
        </Content>
      </Container>
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
    fontSize: 14,
    height: "20px",
    width: "auto",
  },
  PeopleImage: {
    borderRadius: 50,
  },
  HiglightsFlatList: {
    backgroundColor: "white",
  },
  HighlightsListItem: {
    backgroundColor: "white",
  },
  fab: {
    resizeMode: "contain",
    position: "relative",
    margin: 16,
    right: 0,
    bottom: 0,
  },

  //text-white px-4  h-8 bg-red-600 rounded-full
});

export default ResultsShowScreen;
