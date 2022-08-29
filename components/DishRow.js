import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "../Core/Config";
import { doc, onSnapshot } from "firebase/firestore";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  selectBasketItemsWithId,
  removeFromBasket,
} from "../slices/basketSlice";

const DishRow = ({ id }) => {
  let [dish, setDish] = useState();
  const [isPressed, setIsPressed] = useState(false);
  const items = useSelector((state) =>
    selectBasketItemsWithId(state, dish?.id)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "dishes", id), (doc) => {
      dish = doc.data();
      setDish(dish);
    });
  }, []);

  const addItemsToBasket = () => {
    dispatch(addToBasket(dish));
  };

  const removeItemsFromBasket = () => {
    if (!items.length > 0) return;
    dispatch(removeFromBasket(dish));
  };

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
            <TouchableOpacity onPress={removeItemsFromBasket}>
              <MinusCircleIcon
                color={items.length > 0 ? "#00CCBB" : "gray"}
                size={40}
              />
            </TouchableOpacity>
            <Text>{items.length}</Text>
            <TouchableOpacity onPress={addItemsToBasket}>
              <PlusCircleIcon color="#00CCBB" size={40} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default DishRow;
