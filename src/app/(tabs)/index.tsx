import React from "react";
import "../global.css"
import { Text, View } from "react-native";
 
export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-xl font-bold text-blue-500">
        Welcome to Nativewind!
      </Text>
      <Text className="text-lg font-bold mt-4 text-light-100">
        Legend is codinggg
      </Text>
    </View>
  );
}