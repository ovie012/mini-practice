import React from "react";
import "../global.css"
import { Text, View, ScrollView } from "react-native";
import Header from "../components/Header";
import BannerSection from "../components/BannerSection";
 
export default function App() {
  return (
    <View className="flex-1 bg-background">
      <Header />
      <ScrollView>
        <BannerSection />
      </ScrollView>
    </View>
  );
}