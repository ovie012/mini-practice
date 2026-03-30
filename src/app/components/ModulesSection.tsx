import { View, Text, FlatList } from 'react-native'
import React from 'react'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'

const ModulesSection = () => {

    const modules = [
        {
            id: 1,
            title: "React Native Basics",
            description: "Learn the fundamentals of React Native development.",
            icon: "react"
        },
        {
            id: 2,
            title: "TypeScript Essentials",
            description: "Master TypeScript for safer and more efficient coding.",
            icon: "code"
        },
        {
            id: 3,
            title: "State Management",
            description: "Understand state management with Redux and Context API.",
            icon: "cubes"
        },
        {
            id: 4,
            title: "Navigation in React Native",
            description: "Implement navigation using React Navigation library.",
            icon: "route"
        },
        {
            id: 5,
            title: "Performance Optimization",
            description: "Learn techniques to optimize your React Native apps.",
            icon: "tachometer-alt"
        },
        {
            id: 6,
            title: "Testing and Debugging",
            description: "Master testing and debugging strategies for React Native.",
            icon: "bug"
        }
    ]

  return (
    <View className='mt-6 p-4'>
        <View className='w-full flex-row items-center justify-between mb-4'>
            <Text className='text-boldText font-bold text-lg'>Learning Modules</Text>
            <Text className='text-blueText font-semibold uppercase text-xs'>6 active</Text>
        </View>
        <FlatList
            data={modules}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between', gap: 16 }}
            contentContainerStyle={{ gap: 16 }}
            scrollEnabled={false}
            renderItem={({ item }) => (
                <View className='w-[48%] gap-4 p-4 bg-[#1E293B] rounded-lg'>
                    <FontAwesome5Icon name={item.icon} size={24} color="#AB8BFF" />
                    <View>
                        <Text className='text-boldText font-semibold text-base'>
                        {item.title}
                        </Text>
                        <Text className='text-normalText text-sm'>
                        {item.description}
                        </Text>
                    </View>
                </View>
            )}
        />
    </View>
  )
}

export default ModulesSection;