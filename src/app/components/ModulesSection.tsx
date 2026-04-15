import { Link } from "expo-router";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

type Module = {
  id: number;
  title: string;
  description: string;
  icon: string;
  link: string;
};

const ModulesSection = () => {
  const modules: Module[] = [
    {
      id: 1,
      title: "Intro component with sign-up form",
      description: "Practice building out a sign-up form complete with client-side validation using JavaScript.",
      icon: "sign-in-alt",
      link: "introComponentSignup",
    },
    {
      id: 2,
      title: "Typing Challenge",
      description: "Test your typing speed and accuracy with our interactive typing challenge.",
      icon: "keyboard",
      link: "typingChallenge",
    },
  ];

  return (
    <View className="mt-6 p-4">
      <View className="w-full flex-row items-center justify-between mb-4">
        <Text className="text-boldText font-bold text-lg">
          Learning Modules
        </Text>
        <Text className="text-blueText font-semibold uppercase text-xs">
          {modules.length} Modules
        </Text>
      </View>
      <FlatList
        data={modules}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between", gap: 16 }}
        contentContainerStyle={{ gap: 16 }}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <Link 
            href={{
                pathname:`/mini-apps/[miniApp]`,
                params:{ miniApp: item.link },
            }}
            asChild
        >
            <TouchableOpacity className="w-[48%] gap-4 p-4 bg-[#1E293B] rounded-lg">
              <FontAwesome5Icon name={item.icon} size={24} color="#AB8BFF" />
              <View>
                <Text className="text-boldText font-semibold text-base">
                  {item.title}
                </Text>
                <Text className="text-normalText text-sm">
                  {item.description}
                </Text>
              </View>
            </TouchableOpacity>
          </Link>
        )}
      />
    </View>
  );
};

export default ModulesSection;
