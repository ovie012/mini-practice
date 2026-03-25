import { ImageBackground, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { images } from '@/constants/images'
import { icons } from '@/constants/icons'
import { BlurView } from 'expo-blur';

const TabIcon = ({ title, icon, focused }: any) =>{
    return (
        focused ? (
        <ImageBackground 
            className='flex w-full flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden'
        >
            <Image 
                source={icon} 
                tintColor="#137FEC" 
                className="size-7"
            />
            <Text 
                className='text-secondary text-base font-semibold ml-2'
            >{title}</Text>
        </ImageBackground>
        ) : (
             <View
                className='size-full justify-center min-w-[112px] min-h-16 items-center mt-4 rounded-full'
             >
                <Image 
                    source={icon} 
                    tintColor="#64748B" 
                    className="size-6"
                />
            <Text 
                className='text-[#64748B] text-base font-semibold ml-2'
            >{title}</Text>
             </View>
        )
    )
}


const _layout = () => {
  return (
    <Tabs
        screenOptions={{
            tabBarShowLabel: false,
            tabBarItemStyle: {
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
            },
            tabBarStyle: {
                backgroundColor: '#303f62cc',
                borderRadius: 50,
                marginHorizontal: 20,
                marginBottom: 36,
                paddingTop: 10,
                height: 75,
                position: 'absolute',
                overflow: 'hidden',
                borderWidth: 1,
                borderColor: '#1E293B',
                // display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-evenly',
            },
            tabBarBackground: () => (
                <BlurView
                    intensity={50}
                    tint="dark"
                    style={{ flex: 1, borderRadius: 50 }}
                />
            ),
        }}
    >
        <Tabs.Screen 
            name="index"
            options={{
                title: 'Home',
                headerShown: false,
                tabBarIcon: ({ focused }) => 
                    <TabIcon 
                        title="Home" 
                        icon={icons.home} 
                        focused={focused} 
                    />
            }}
        />
        <Tabs.Screen 
            name="profile"
            options={{
                title: 'Profile',
                headerShown: false,
                tabBarIcon: ({ focused }) => 
                    <TabIcon 
                        title="Profile" 
                        icon={icons.person} 
                        focused={focused} 
                    />
            }}
        />
    </Tabs>
  )
}

export default _layout;