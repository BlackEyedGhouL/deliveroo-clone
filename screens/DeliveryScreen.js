import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { selectRestaurant } from "../slices/restaurantSlice";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { XMarkIcon } from "react-native-heroicons/solid";
import * as Progress from "react-native-progress";

const DeliveryScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);

  return (
    <SafeAreaView className="bg-[#00CCBB] flex-1">
      <View className="flex-row justify-between items-center p-5">
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <XMarkIcon size={30} color="white" />
        </TouchableOpacity>
        <Text className="font-light text-white text-lg">Order Help</Text>
      </View>

      <View className="bg-white mx-5 my-2 rounded-md p-6 shadow-md z-50">
        <View className="flex-row justify-between">
          <View>
            <Text className="text-lg text-gray-400">Estimated Arrival</Text>
            <Text className="text-3xl font-bold">45-55 Minutes</Text>
          </View>
          <Image
            className="h-20 w-20"
            source={{ uri: "https://links.papareact.com/fls" }}
          />
        </View>

        <Progress.Bar size={30} indeterminate={true} color="#00CCBB" />

        <Text className="mt-3 text-gray-500">
          Your order at {restaurant.title} is being prepared
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default DeliveryScreen;
