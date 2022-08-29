import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "../Core/Config";
import { doc, onSnapshot } from "firebase/firestore";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";

const DishRow = ({ id }) => {
  let [dish, setDish] = useState();
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "dishes", id), (doc) => {
      dish = doc.data();
      setDish(dish);
    });
  }, []);

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsPressed(!isPressed)}
        className={`bg-white p-4 border border-gray-200 ${
          isPressed && "border-b-0"
        }`}
      >
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

      {isPressed && (
        <View className="bg-white px-4">
          <View className="flex-row space-x-2 items-center pb-3">
            <TouchableOpacity>
              <MinusCircleIcon
                color="#00CCBB"
                // color={items.length > 0 ? "#00CCBB" : "gray"}
                size={40}
              />
            </TouchableOpacity>
            <Text>0</Text>
            <TouchableOpacity>
              <PlusCircleIcon
                color="#00CCBB"
                // color={items.length > 0 ? "#00CCBB" : "gray"}
                size={40}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default DishRow;
