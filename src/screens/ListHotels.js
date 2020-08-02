import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import SearchBar from "../components/RestaurantItem/SearchBar";
import restaurantApi from "../api/restaurantApi";

const ListHotels = () => {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    searchApi("pasta");
  }, []);

  const searchApi = async (searchTerm) => {
    try {
      const response = await restaurantApi.get("/search", {
        params: {
          count: 50,
          entity_id: 4,
          entity_type: "city",
          q: searchTerm,
        },
      });
      setResults(response.data.restaurants);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };
  return (
    <View>
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={() => searchApi(term)}
      />
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      <Text>we have found: {results.length} restaurants</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
export default ListHotels;
