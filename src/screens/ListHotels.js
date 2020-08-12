import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import SearchBar from "../components/RestaurantItem/SearchBar";
import restaurantApi from "../api/restaurantApi";
import useResults from "../hooks/useResults";
import ResultList from "../components/RestaurantItem/ResultsList";
import MainScreenBanner from "../components/RestaurantItem/MainScreenBanner";
import FoodCategories from "../components/RestaurantItem/FoodCategories";

const ListHotels = ({ navigation }) => {
  const [term, setTerm] = useState("");
  const [searchApi, results, errorMessage] = useResults("");

  const filterResultsByPrice = (price) => {
    return results.filter((result) => {
      return result.restaurant.price_range === price;
    });
  };
  return (
    <>
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={() => searchApi(term)}
      />
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      <ScrollView style={{ marginTop: 10 }}>
        <MainScreenBanner />
        <FoodCategories />
        <ResultList
          navigation={navigation}
          results={filterResultsByPrice(2)}
          title="Cost Effective"
        />
        <ResultList
          navigation={navigation}
          results={filterResultsByPrice(3)}
          title="Bit Spender"
        />
        <ResultList
          navigation={navigation}
          results={filterResultsByPrice(4)}
          title="Bit Pricer"
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({});
export default ListHotels;
