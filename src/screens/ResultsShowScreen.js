import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ImageBackground,
} from "react-native";
import restaurantApi from "../api/restaurantApi";
// import { FAB, Badge, Drawer } from "react-native-paper";
import { ListItem } from "react-native-elements";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { resDetail } from "../redux/actions";
import Loader from "../../utils/loader";
import {
  Container,
  Content,
  Fab,
  Icon,
  Button,
  CardItem,
  Badge,
  Accordion,
} from "native-base";
import MainScreenBanner from "../components/RestaurantItem/MainScreenBanner";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ShowModal from "../components/RestaurantItem/ShowModal";

const ResultsShowScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(false);
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
      <Container style={{ backgroundColor: "#F7FAFC" }}>
        <Content padder>
          <MainScreenBanner photos={photos} />
          <Text
            style={{
              marginVertical: 10,
              flex: 1,
              fontSize: 25,
              textAlign: "center",
              color: "#6B46C1",
              borderRadius: 10,
              textShadowRadius: 8,
              fontWeight: "bold",
              backgroundColor: "white",
            }}
          >
            {result.name}
          </Text>
        </Content>
        <View style={{ flex: 1 }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <Badge success>
              <Text style={{ padding: 4 }}>{result.status}</Text>
            </Badge>
            <Badge info>
              <Text style={{ padding: 4 }}>{result.contact}</Text>
            </Badge>
            <Badge>
              <Text style={{ padding: 4 }}>{result.location}</Text>
            </Badge>
          </View>
          <View
            style={{
              marginTop: 20,
              paddingHorizontal: 40,
            }}
          >
            <ShowModal address={result.address} />
          </View>
          <Fab
            active={active}
            direction="up"
            containerStyle={{}}
            style={{ backgroundColor: "#5067FF" }}
            position="bottomRight"
            onPress={() => setActive(!active)}
          >
            <MaterialCommunityIcons name="menu" />

            <TouchableOpacity disabled style={{ backgroundColor: "#34A34F" }}>
              <Icon name="logo-whatsapp" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ backgroundColor: "white" }}
              onPress={() => navigation.navigate("FoodItems", { id })}
            >
              <MaterialCommunityIcons name="food" size={25} color="red" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ backgroundColor: "#DD5144" }}
              onPress={() => navigation.navigate("Cart", { resId: id })}
            >
              <Icon name="cart" />
            </TouchableOpacity>
          </Fab>
        </View>
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
