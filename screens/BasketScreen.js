import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../slices/restaurantSlice";
import { removeFromBasket, selectBasketItems } from "../slices/basketSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import Currency from "react-currency-formatter";

const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const dispatch = useDispatch();
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});

    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  return (
    <SafeAreaView className="bg-white pt-4 flex-1">
      <View className="flex-1 bg-gray-100">
        <View className="pb-4 border-b border-[#00CCBB] bg-white shadow-xs flex-row">
          <TouchableOpacity
            className="left-5 top-1 p-3 bg-gray-100 rounded-full h-11"
            onPress={navigation.goBack}
          >
            <ArrowLeftIcon size={20} color="#00CCBB" />
          </TouchableOpacity>
          <View className="ml-28">
            <Text className="text-lg font-bold text-center">Basket</Text>
            <Text className="text-center text-gray-400">
              {restaurant.title}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Image
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
            source={{
              uri: "https://links.papareact.com/wru",
            }}
          />
          <Text className="flex-1">Deliver in 50-75 min</Text>
          <TouchableOpacity>
            <Text className="text-[#00CCBB]">Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            <View
              key={key}
              className="flex-row items-center bg-white py-2 px-5 space-x-4"
            >
              <Text className="text-[#00CCBB]">{items.length} x</Text>
              <Image
                className="h-12 w-12 rounded-full"
                source={{
                  uri: items[0]?.image,
                }}
              />
              <Text className="flex-1">{items[0]?.name}</Text>
              <Text className="text-gray-400">
                <Currency quantity={items[0]?.price} />
              </Text>
              <TouchableOpacity>
                <Text
                  className="text-[#00CCBB] text-xs"
                  onPress={() => dispatch(removeFromBasket({ id: key }))}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
