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

const ListHotels = ({ navigation }) => {
  const [term, setTerm] = useState("");
  const [searchApi, results, errorMessage] = useResults("");
  const isfocused = useIsFocused();
  // useEffect(() => {
  //   if (isfocused) {
  //     navigation.navigate("Home", { name: "Hotels" });
  //   }
  // });
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
        onTermSubmit={() => searchApi(term)}
      />
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      {results.length == 0 ? (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator />
        </View>
      ) : (
        <ScrollView style={{ marginTop: 10 }}>
          <MainScreenBanner />
          <FoodCategories />
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
