import { View, Text, ScrollView } from "react-native";
import React from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import RestaurantCard from "./RestaurantCard";

const FeaturedRow = ({ id, title, description }) => {
  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon color="#00CCBB" />
      </View>

      <Text className="text-xs text-gray-500 px-4">{description}</Text>

      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        <RestaurantCard
          id={0}
          imgUrl="https://links.papareact.com/gn7"
          title="Shushi"
          rating={4.5}
          genre="Japanese"
          address="123 Main St"
          short_description="Test"
          dishes={[]}
          long={20}
          lat={10}
        />
        <RestaurantCard
          id={0}
          imgUrl="https://links.papareact.com/gn7"
          title="Shushi"
          rating={4.5}
          genre="Japanese"
          address="123 Main St"
          short_description="Test"
          dishes={[]}
          long={20}
          lat={10}
        />
        <RestaurantCard
          id={0}
          imgUrl="https://links.papareact.com/gn7"
          title="Shushi"
          rating={4.5}
          genre="Japanese"
          address="123 Main St"
          short_description="Test"
          dishes={[]}
          long={20}
          lat={10}
        />
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
