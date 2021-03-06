import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const ResultsDetail = ({ result }) => {
  const defaultImg = require("./../../../assets/foods.jpg");
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={result.photos !== "" ? { uri: result.photos[0] } : defaultImg}
        // resizeMode="cover"
      />
      <Text style={styles.name}>{result.name}</Text>
      <Text>
        At {result.location} {result.rating} stars
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
