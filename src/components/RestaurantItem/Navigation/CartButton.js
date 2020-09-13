import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

const CartButton = ({ resId }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{ marginEnd: 20 }}
      onPress={() => navigation.navigate("Cart", { resId })}
    >
      <MaterialCommunityIcons name="cart" color="green" size={32} />
    </TouchableOpacity>
  );
};

export default CartButton;
