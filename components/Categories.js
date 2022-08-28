import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import { db } from "../Core/Config";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";

const Categories = () => {
  const [categories, setCategories] = useState();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "categories"), orderBy("name"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const categories = [];
      querySnapshot.forEach((doc) => {
        categories.push(doc.data());
      });
      setCategories(categories);
      setLoading(false);
    });
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {isLoading ? (
        <View>
          <ActivityIndicator
            className="py-5 px-44"
            size="large"
            color="#00CCBB"
          />
        </View>
      ) : (
        categories.map((category) => (
          <CategoryCard
            key={category.id}
            imgUrl={category.image}
            title={category.name}
          />
        ))
      )}
    </ScrollView>
  );
};

export default Categories;
