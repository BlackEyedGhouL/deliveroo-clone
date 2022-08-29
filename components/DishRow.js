import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "../Core/Config";
import { doc, onSnapshot } from "firebase/firestore";

const DishRow = ({ id }) => {
  let [dish, setDish] = useState();

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "dishes", id), (doc) => {
      dish = doc.data();
      setDish(dish);
    });
  }, []);

  return (
    <TouchableOpacity className="bg-white p-4 border-y border-gray-200">
      <View className="flex-row items-center">
        <View className="flex-1 pr-2">
          <Text className="text-lg mb-1">{dish?.name}</Text>
          <Text className="text-gray-400">{dish?.short_description}</Text>
          <Text className="text-gray-400 mt-2">${dish?.price}</Text>
        </View>
        <View>
          <Image
            source={{
              uri: dish?.image,
            }}
            className="h-20 w-20 p-4 rounded"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DishRow;
