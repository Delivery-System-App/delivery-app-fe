import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import SearchBar from "../components/RestaurantItem/SearchBar";

const ListHotels = () => {
  const [term, setTerm] = useState("");
  return (
    <View>
      <SearchBar
        term={term}
        onTermChange={(newTerm) => setTerm(newTerm)}
        onTermSubmit={() => console.log("submitted")}
      />
      <p>{term}</p>
    </View>
  );
};

const styles = StyleSheet.create({});
export default ListHotels;
