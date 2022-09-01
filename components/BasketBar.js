import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { selectBasketItems, selectBasketTotal } from "../slices/basketSlice";
import { useSelector } from "react-redux";
import Currency from "react-currency-formatter";

const Basket = () => {
  const navigation = useNavigation();
  const items = useSelector(selectBasketItems);
  const total = useSelector(selectBasketTotal);

  if (items.length === 0) return null;

  return (
    <View className="absolute bottom-10 w-full z-50">
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Basket");
        }}
        className="bg-[#00CCBB] flex-row p-4 mx-5 rounded-lg items-center space-x-1"
      >
        <Text className="text-white font-extrabold text-lg py-1 px-2 bg-[#01A296] rounded">
          {items.length}
        </Text>
        <Text className="flex-1 text-white font-extrabold text-lg text-center">
          View Basket
        </Text>
        <Text className="text-lg text-white font-extrabold">
          <Currency quantity={total} />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Basket;
