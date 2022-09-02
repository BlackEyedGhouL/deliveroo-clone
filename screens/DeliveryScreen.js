import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { selectRestaurant } from "../slices/restaurantSlice";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { XMarkIcon } from "react-native-heroicons/solid";
import * as Progress from "react-native-progress";
import MapView, { Marker } from "react-native-maps";

const DeliveryScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);

  return (
    <View className="bg-[#00CCBB] flex-1">
      <SafeAreaView className="z-50">
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

      <MapView
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.long,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        }}
        className="flex-1 -mt-10 z-0"
        mapType="mutedStandard"
      >
        <Marker
          coordinate={{
            latitude: restaurant.lat,
            longitude: restaurant.long,
          }}
          title={restaurant.title}
          description={restaurant.short_description}
          identifier="origin"
          pinColor="#00CCBB"
        />
      </MapView>

      <View className="bg-white flex-row items-center space-x-5 h-20">
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className="h-12 w-12 bg-gray-300 rounded-full ml-5"
        />
        <View className="flex-1">
          <Text className="text-lg font-semibold">Senith Umesha</Text>
          <Text className="text-gray-400">Your Rider</Text>
        </View>

        <Text className="text-[#00CCBB] text-lg mr-5 font-bold">Call</Text>
      </View>
    </View>
  );
};

export default DeliveryScreen;
