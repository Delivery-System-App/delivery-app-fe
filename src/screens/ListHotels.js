import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import SearchBar from "../components/RestaurantItem/SearchBar";
import useResults from "../hooks/useResults";
import ResultList from "../components/RestaurantItem/ResultsList";
import MainScreenBanner from "../components/RestaurantItem/MainScreenBanner";
import FoodCategories from "../components/RestaurantItem/FoodCategories";
import { useIsFocused } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Loader from "../../utils/loader";
import ShowLocationPicker from "../components/RestaurantItem/Delivery/ShowLocationPicker";

const ListHotels = ({ navigation }) => {
  const [term, setTerm] = useState("");
  const [searchApi, results, errorMessage, loading] = useResults("");
  const [city, setCity] = useState("ernakulam");
  const isfocused = useIsFocused();
  // useEffect(() => {
  //   if (isfocused) {
  //     navigation.navigate("Home", { name: "Hotels" });
  //   }
  // });
  const handleCityChange = (city) => {
    setCity(city);
  };
  if (!results) {
    return <Loader />;
  }
  const filterResultsByPrice = (price) => {
    return results.filter((result) => {
      return result.rating === price;
    });
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={() => searchApi(term, city)}
      />
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      {loading ? (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator />
        </View>
      ) : (
        <ScrollView style={{ marginTop: 10 }}>
          <MainScreenBanner />
          <View
            style={{
              paddingHorizontal: 20,
              // marginTop: 50,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Address Location
            </Text>
          </View>
          <ShowLocationPicker city={city} handleCityChange={handleCityChange} />
          <FoodCategories />
          <View
            style={{
              paddingHorizontal: 15,
              marginTop: 10,
            }}
          >
            <Text
              style={{
                fontSize: 25,
                fontWeight: "bold",
              }}
            >
              Food that
            </Text>
            <Text
              style={{
                fontSize: 25,
                fontWeight: "bold",
              }}
            >
              meets your needs
            </Text>
          </View>
          <ResultList
            navigation={navigation}
            results={filterResultsByPrice(1)}
            title="Cost Effective"
          />
          <ResultList
            navigation={navigation}
            results={filterResultsByPrice(2)}
            title="Bit Spender"
          />
          <ResultList
            navigation={navigation}
            results={filterResultsByPrice(3)}
            title="Bit Pricer"
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
export default ListHotels;
