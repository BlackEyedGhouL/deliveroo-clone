import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "../Core/Config";
import { doc, onSnapshot } from "firebase/firestore";
import RestaurantCard from "./RestaurantCard";

const Restaurants = (restaurantData) => {
  let [restaurant, setRestaurant] = useState();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "restaurants", restaurantData.id),
      (doc) => {
        restaurant = doc.data();
        setRestaurant(restaurant);
        setLoading(false);
      }
    );
  }, []);

  return (
    <View>
      {isLoading ? null : (
        <RestaurantCard
          id={restaurant.id}
          imgUrl={restaurant.image}
          title={restaurant.name}
          rating={restaurant.rating}
          genre={restaurant.type}
          address={restaurant.address}
          short_description={restaurant.short_description}
          dishes={restaurant.dishes}
          long={restaurant.long}
          lat={restaurant.lat}
        />
      )}
    </View>
  );
};

export default Restaurants;
