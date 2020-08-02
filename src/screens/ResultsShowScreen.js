import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ResultsShowScreen = ({ route }) => {
  console.log(route.params.id);
  return (
    <View>
      <Text>hello</Text>
    </View>
  );
};
const styles = StyleSheet.create({});
export default ResultsShowScreen;
