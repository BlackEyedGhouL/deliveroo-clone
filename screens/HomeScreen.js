import { View, Text, Image, TextInput, ScrollView } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  UserIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  AdjustmentsVerticalIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import { db } from "../Core/Config";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredLists, setfeaturedLists] = useState();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    const q = query(collection(db, "featuredLists"), orderBy("name"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const featuredLists = [];
      querySnapshot.forEach((doc) => {
        featuredLists.push(doc.data());
      });
      setfeaturedLists(featuredLists);
    });
  }, []);

  return (
    <SafeAreaView className="bg-white pt-4">
      <View className="flex-row pb-3 items-center mx-4 space-x-2">
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />

        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
          <Text className="font-bold text-xl">
            Current Location
            <ChevronDownIcon size={20} color="#00CCBB" />
          </Text>
        </View>

        <UserIcon size={35} color="#00CCBB" />
      </View>

      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex-row space-x-3 bg-gray-100 p-3 items-center rounded-lg flex-1">
          <MagnifyingGlassIcon size={20} color="gray" />
          <TextInput
            placeholder="Restaurants and cuisines"
            keyboardType="default"
          />
        </View>
        <AdjustmentsVerticalIcon color="#00CCBB" />
      </View>

      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{
          paddingBottom: 130,
        }}
      >
        <Categories />

        {featuredLists?.map((featuredList) => (
          <FeaturedRow
            key={featuredList.id}
            title={featuredList.name}
            description={featuredList.short_description}
            restaurantIds={featuredList.restaurants}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
