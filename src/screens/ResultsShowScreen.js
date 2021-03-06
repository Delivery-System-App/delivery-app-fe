import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { addReview, resDetail } from "../redux/actions";
import Loader from "../../utils/loader";
import { Container, Content, Fab, Icon, Badge } from "native-base";
import MainScreenBanner from "../components/RestaurantItem/MainScreenBanner";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ShowModal from "../components/RestaurantItem/ShowModal";
import { Rating, AirbnbRating } from "react-native-ratings";
import { TextInput } from "react-native-paper";
import { notify } from "./../../utils/notify";
const image = require("./../../images/circle.png");

const ResultsShowScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState("");
  const [star, setStars] = useState(4);
  const [active, setActive] = useState(false);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [photos, setPhotos] = useState([
    "https://www.visituganda.com/uploads/noimage.png",
  ]);
  const getResult = async (id) => {
    try {
      setLoading(true);
      dispatch(resDetail([id])).then((res) => {
        if (res.data) {
          if (res.data.banner) {
            let imageArr = [];
            const Banners = res.data.banner;
            if (Banners[0].banner !== null) {
              for (let i = 0; i < Banners.length; i++) {
                imageArr = imageArr.concat(Banners[i].banner);
              }
              // console.log(imageArr, Banners[0].banner);
              setPhotos(imageArr);
            }
          }
          setResult(res.data);
          /*  res.data.photos && res.data.photos.length > 0
            ? setPhotos(res.data.photos)
            : setPhotos([
                "http://tutofox.com/foodapp//banner/banner-1.jpg",
                "http://tutofox.com/foodapp//banner/banner-2.jpg",
                "http://tutofox.com/foodapp//banner/banner-3.png",
              ]);*/
          setLoading(false);

          // setCusines(["Veg", "Non-Veg"]); //to be done
          // setCurrency("₹" + " " + res.data.totaldishprice / res.data.noofdishes);
        }
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getResult(id);
  }, []);

  const handleSubmitReview = (id) => {
    let body = {
      feedback: review,
      star: star,
    };
    setReviewLoading(true);
    dispatch(addReview(id, body)).then((res) => {
      if (res.status === 201) {
        setReviewLoading(false);
        notify("feedback submitted");
        setReview("");
        setStars(4);
      } else {
        notify("review couldn't submit");
        setReviewLoading(false);
      }
    });
  };

  const id = route.params.id;
  return loading ? (
    <Loader />
  ) : (
    <>
      <Container style={{ backgroundColor: "#eeeeee" }}>
        <Content padder>
          <MainScreenBanner photos={photos} />
          <ImageBackground
            source={image}
            style={{
              flex: 1,
              resizeMode: "cover",
              justifyContent: "center",
              opacity: 0.9,
            }}
          >
            <Text
              style={{
                marginVertical: 10,
                flex: 1,
                fontSize: 25,
                textAlign: "center",
                color: "#6B46C1",
                borderRadius: 10,
                textShadowRadius: 8,
                fontWeight: "normal",
              }}
            >
              {result.name}
            </Text>

            <Text style={{ textAlign: "center", marginBottom: 5 }}>
              {result.timings
                ? `Timings: ${result.timings.formatted.open} - ${result.timings.formatted.close}`
                : "Timings not provided!!"}
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                marginVertical: 5,
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
                paddingHorizontal: 40,
              }}
            >
              <View style={{ marginBottom: 20 }}>
                <AirbnbRating
                  selectedColor={"#ffab40"}
                  reviewColor={"#ab47bc"}
                  count={5}
                  reviews={["Terrible", "Bad", "OK", "Good", "Amazing"]}
                  ratingColor={"red"}
                  defaultRating={4}
                  size={40}
                  onFinishRating={(rating) => setStars(rating)}
                />
              </View>

              <TextInput
                multiline
                value={review}
                onChangeText={setReview}
                placeholder="write your feedback here.."
                style={{
                  borderColor: "transparent",
                }}
              />
              <TouchableOpacity
                style={{
                  backgroundColor: "#0d47a1",
                  padding: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 40,
                  marginTop: 10,
                  marginHorizontal: 40,
                }}
                onPress={() => handleSubmitReview(result.id)}
              >
                {reviewLoading ? (
                  <Loader />
                ) : (
                  <Text
                    style={{ textAlign: "center", color: "#FFF", fontSize: 16 }}
                  >
                    Submit Feedback
                  </Text>
                )}
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginTop: 20,
                paddingHorizontal: 80,
                marginBottom: 10,
              }}
            >
              <ShowModal address={result.address} />
            </View>
          </ImageBackground>
        </Content>
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
