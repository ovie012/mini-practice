import { View, Text, Image } from 'react-native'
import React from 'react'
import bannerImage from "@/assets/images/AbstractGraphic.png"

const BannerSection = () => {
  return (
    <View className='mt-24 p-4'>
      <Text className='text-4xl text-boldText font-bold mb-2'>Build Small.</Text>
      <Text className='text-4xl text-blueText font-bold mb-3'>Master deeply.</Text>
      <Text className='text-normalText w-[250px] text-base font-normal mb-10'>A premium SaaS-style developer learning hub for React Native & TypeScript.</Text>
      <Image source={bannerImage} className='w-full rounded-2xl' />
    </View>
  )
}

export default BannerSection;