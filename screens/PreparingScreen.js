import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";

const PreparingScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Delivery");
    }, 2000);
  }, []);

  return (
    <SafeAreaView className="bg-[#00CCBB] flex-1 justify-center items-center">
      <Animatable.Image
        source={require("../assets/burger.gif")}
        animation="slideInUp"
        iterationCount={1}
        className="h-96 w-96"
      />

      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        className="text-lg mt-5 px-5 text-white font-semibold text-center"
      >
        Waiting for Restaurant to accept your order!
      </Animatable.Text>

      <Progress.Circle
        className="mt-10"
        size={50}
        indeterminate={true}
        color="white"
      />
    </SafeAreaView>
  );
};

export default PreparingScreen;
