import React from "react";
import { Stack } from "expo-router";
import "./global.css";
import { StatusBar } from "react-native";
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold
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
