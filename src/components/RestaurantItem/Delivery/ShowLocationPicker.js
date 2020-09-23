import { Picker, Text, View } from "native-base";
import React, { useState } from "react";
const ShowLocationPicker = ({ city, handleCityChange }) => {
  return (
    <View
      style={{
        marginTop: 10,
        backgroundColor: "#F0EEEE",
        height: 50,
        borderRadius: 5,
        marginHorizontal: 15,
        flexDirection: "row",
        marginBottom: 10,
      }}
    >
      <Picker
        selectedValue={city}
        style={{ height: 50, width: 160 }}
        onValueChange={(itemValue, itemIndex) => handleCityChange(itemValue)}
      >
        <Picker.Item
          label="Ernakulam"
          value="ernakulam"
          style={{ fontWeight: "bold" }}
        />
        <Picker.Item
          label="Thrissur"
          value="thrissur"
          style={{ fontWeight: "bold" }}
        />
        <Picker.Item
          label="Thiruvananthapuram"
          value="thiruvananthapuram"
          style={{ fontWeight: "bold" }}
        />
      </Picker>
    </View>
  );
};

export default ShowLocationPicker;
