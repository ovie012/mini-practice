import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { icons } from '@/constants/icons';
import login from "./core/login";
import signup from "./core/signup";
import introComponentSignup from './core/introComponentSignup';
import typingChallenge from './core/typingChallenge';
import restCountriesAPI from './core/restCountriesAPI';

const miniApps: Record<string, React.ComponentType> = {
  login,
  signup,
  introComponentSignup,
  typingChallenge,
  restCountriesAPI,
};

const MiniApp = () => {
  const { miniApp } = useLocalSearchParams() as { miniApp: string };

  const AppComponent = miniApps[miniApp]; // get the component dynamically

  if (!AppComponent) {
    return (
      <View className="flex-1 justify-center items-center bg-background">
        <Text className="text-red-500 text-lg">
          App "{miniApp}" not found
        </Text>
        <TouchableOpacity 
            className='absolute bottom-10 left-0 right-0 mx-5 bg-blueText rounded-lg 
            py-3.5 flex flex-row items-center justify-center z-50'
            onPress={router.back}
        >
            <Image 
            source={icons.arrow}
            className='size-5 mr-1 mt-0.5 rotate-180'
            tintColor={"#fff"}
            />
            <Text
            className='text-white font-semibold text-base'
            >
            Go Back
            </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <TouchableOpacity 
        className='absolute top-16 left-0 mx-4 bg-primary rounded-lg 
        py-3.5 px-3.5 flex flex-row items-center justify-center z-50 w-fit opacity-50'
        onPress={router.back}
      >
        <Image 
          source={icons.arrow}
          className='size-5 mr-1 mt-0.5 rotate-180'
          tintColor={"#fff"}
        />
        <Text
          className='text-white font-semibold text-base'
        >
          Back
        </Text>
      </TouchableOpacity>
      <AppComponent />
    </View>
  );
};

export default MiniApp;