import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const ResultsDetail = ({ result }) => {
  console.log(result.thumb);
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: result.thumb }} />
      <Text style={styles.name}>{result.name}</Text>
      <Text>
        {result.user_rating.aggregate_rating} stars {result.all_reviews_count}{" "}
        reviews
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
  },
  image: {
    width: 250,
    height: 120,
    borderRadius: 4,
    marginBottom: 5,
  },
  name: {
    fontWeight: "bold",
  },
});
export default ResultsDetail;
