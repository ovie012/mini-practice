import React from "react";
import { Stack } from "expo-router";
import "./global.css";
import { StatusBar } from "react-native";
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { Sora_400Regular, Sora_500Medium, Sora_600SemiBold, Sora_700Bold } from '@expo-google-fonts/sora';
import { NunitoSans_300Light, NunitoSans_400Regular, NunitoSans_500Medium, NunitoSans_600SemiBold, NunitoSans_700Bold, NunitoSans_800ExtraBold, } from "@expo-google-fonts/nunito-sans";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Sora_400Regular,
    Sora_500Medium,
    Sora_600SemiBold,
    Sora_700Bold,
    NunitoSans_300Light,
    NunitoSans_400Regular,
    NunitoSans_500Medium,
    NunitoSans_600SemiBold,
    NunitoSans_700Bold,
    NunitoSans_800ExtraBold,
  });

  // if (!fontsLoaded) {
  //   return null;
  // }

  return (
    <>
        {/* <StatusBar hidden={true} /> */}
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="mini-apps/[miniApp]" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
