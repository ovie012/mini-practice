import { View, Text } from 'react-native'
import React from 'react'
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Header = () => {
  return (
    <View className='sticky flex flex-row items-center top-16 w-full bg-background h-24 px-6 z-10'>
        <View className='flex-1 flex-row items-center gap-4 space-x-2'>
            <MaterialCommunityIcons name="hub" size={48} color="#fff" />
            <Text className='text-boldText text-xl font-bold' >Legend RN Mastery Hub</Text>
        </View>
        <View className='w-[40px] h-[40px] rounded-full bg-[#1E293B] border-[#334155] border-2'>
            <Fontisto name="search" size={18} color="#fff" style={{ alignSelf: 'center', marginTop: 10 }} />
        </View>
    </View>
  )
}

export default Header;