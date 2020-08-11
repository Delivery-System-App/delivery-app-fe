import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import ResultsDetail from "./ResultsDetail";
import { TouchableOpacity } from "react-native-gesture-handler";

const ResultList = ({ title, results, navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        horizontal
        showsVerticalScrollIndicator={false}
        data={results}
        keyExtractor={(result) => result.restaurant.id}
        renderItem={({ item }) => {
          const id = item.restaurant.id;
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("ShowResult", { id })}
            >
              <ResultsDetail result={item.restaurant} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 15,
    marginBottom: 5,
  },
});
export default ResultList;
