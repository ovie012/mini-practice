import data from "@/data.json";
import React, { useState } from "react";
import DownArrow from "@/assets/images/icon-down-arrow.svg"
import { Text, View, ScrollView, StyleSheet, Pressable } from "react-native";

const typingPage = () => {
  const [currentWPM, setCurrentWPM] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [seconds, setSeconds] = useState(0);
  const [minute, setMinute] = useState(0);
  const [difficulty, setDifficulty] = useState("easy");
  const [timeOrPassage, setTimeOrPassage] = useState("timed (60s)");
  const [timeDropDown, setTimeDropDown] = useState(false);
  const [difficultyDropDown, setDifficultyDropDown] = useState(false);

  const getRandomParagraph = (level: string) => {
    const pool = data[level as keyof typeof data]; // data.easy, data.medium, data.hard
    const randomIndex = Math.floor(Math.random() * pool.length);
    return pool[randomIndex].text;
};
const [paragraph, setParagraph] = useState(getRandomParagraph("easy"));

  const timeUsed = `${minute} : ${seconds}`;


  const details = [
    {
        top: "WPM",
        bottom: currentWPM
    },
    {
        top: "Accuracy",
        bottom: accuracy
    },
    {
        top: "Time",
        bottom: timeUsed
    },
  ]

  const difficultyOptions = [
    { label: "easy", key: "easy" },
    { label: "medium", key: "medium" },
    { label: "hard", key: "hard" },
    ];

    const modeOptions = [
    { label: "timed (60s)", key: "timed", duration: 60 },
    { label: "passage", key: "passage" },
    ];

    const handleDifficultyChange = (level: string) => {
    setDifficulty(level);
    setParagraph(getRandomParagraph(level));
    setDifficultyDropDown(false);
    };

    const handleModeChange = (mode: any) => {
    setTimeOrPassage(mode.label);
    setTimeDropDown(false);

    if (mode.key === "timed") {
        setSeconds(mode.duration);
        setMinute(0);
    }
    };
  return (
    <View className="mt-5">
        <View className="flex gap-2 items-center">
            <View className="w-full flex flex-row justify-between gap-7 items-center px-5 mb-3">
                {details.map((item, index) => (
                    <React.Fragment key={index}>
                        <View className="flex-1 items-center">
                            <Text className="text-typingChallenge-Neutral500 text-lg font-soraSemiBold">
                            {item.top}:
                            </Text>
                            <Text className="text-typingChallenge-Neutral0 text-3xl font-soraBold">
                            {item.bottom}
                            </Text>
                        </View>
                        {index !== details.length - 1 && (
                            <View
                            style={{
                                width: StyleSheet.hairlineWidth,
                                height: 55,
                                backgroundColor: "hsl(240, 3%, 46%)",
                            }}
                            />
                        )}
                    </React.Fragment>
                ))}
            </View>
            <View className="w-full flex flex-row justify-between items-center gap-2">
                <View className="relative flex items-center gap-1 w-[49%]">
                    <Pressable 
                        className="w-full flex-row items-center justify-center gap-3 px-4 py-2 rounded-lg border border-typingChallenge-Neutral0"
                        onPress={() => { setDifficultyDropDown(!difficultyDropDown) }}
                    >
                        <Text className="text-typingChallenge-Neutral0 capitalize font-soraMedium text-xl text-center">{difficulty}</Text>
                        <DownArrow width={15} height={15} />
                    </Pressable>
                    {difficultyDropDown && (
                        <View className="absolute top-[120%] w-full bg-typingChallenge-Neutral800 rounded-lg overflow-hidden z-10">
                            {difficultyOptions.map((item, index) => (
                            <React.Fragment key={item.key}>
                                <Pressable
                                onPress={() => handleDifficultyChange(item.key)}
                                className="p-2 flex-row items-center gap-3 px-4"
                                >
                                <View
                                    className={`w-5 h-5 rounded-full  border-typingChallenge-Neutral0 overflow-hidden p-[5px] ${
                                    difficulty === item.key ? "bg-typingChallenge-Blue400" : "border"
                                    }`
                                }
                                >
                                    <Text className={` rounded-full text-typingChallenge-Neutral900 font-soraBold flex justify-center items-center text-5xl text-center z-20 ${
                                    difficulty === item.key ? "bg-typingChallenge-Neutral900" : ""
                                    }`}>{" "}</Text>
                                    </View>
                                <Text className="text-typingChallenge-Neutral0 capitalize font-soraMedium text-xl">
                                    {item.label}
                                </Text>
                                </Pressable>

                                {index !== difficultyOptions.length - 1 && (
                                <View
                                    style={{
                                    height: StyleSheet.hairlineWidth,
                                    backgroundColor: "hsl(240, 3%, 46%)",
                                    }}
                                />
                                )}
                            </React.Fragment>
                        ))}
                    </View>
                )}
                </View>
                <View className="relative flex items-center gap-1 w-[49%]">
                    <Pressable 
                        className="w-full flex-row items-center justify-center gap-3 px-4 py-2 rounded-lg border border-typingChallenge-Neutral0"
                        onPress={() => { setTimeDropDown(!timeDropDown) }}
                    >
                        <Text className="text-typingChallenge-Neutral0 capitalize font-soraMedium text-xl text-center">{timeOrPassage}</Text>
                        <DownArrow width={15} height={15} />
                    </Pressable>
                    {timeDropDown && (
                        <View className="absolute top-[120%] w-full bg-typingChallenge-Neutral800 rounded-lg overflow-hidden z-10">
                            {modeOptions.map((item, index) => (
                            <React.Fragment key={item.key}>
                                <Pressable
                                onPress={() => handleModeChange(item)}
                                className="p-2 flex-row items-center gap-3 px-4"
                                >
                                <View
                                    className={`w-5 h-5 rounded-full border-typingChallenge-Neutral0 overflow-hidden p-[5px] ${
                                    timeOrPassage === item.label ? "bg-typingChallenge-Blue400" : "border"
                                    }`}
                                >
                                    <Text className={` rounded-full text-typingChallenge-Neutral900 font-soraBold flex justify-center items-center text-5xl text-center z-20 ${
                                    timeOrPassage === item.label ? "bg-typingChallenge-Neutral900" : ""
                                    }`}>{" "}</Text>
                                </View>
                                <Text className="text-typingChallenge-Neutral0 capitalize font-soraMedium text-xl">
                                    {item.label}
                                </Text>
                                </Pressable>

                                {index !== modeOptions.length - 1 && (
                                <View
                                    style={{
                                    height: StyleSheet.hairlineWidth,
                                    backgroundColor: "hsl(240, 3%, 46%)",
                                    }}
                                />
                                )}
                            </React.Fragment>
                            ))}
                        </View>
                    )}
                </View>
            </View>
        </View>
        <View
            style={{
                height: StyleSheet.hairlineWidth,
                backgroundColor: 'hsl(240, 3%, 46%)',
                opacity: 1,
                marginVertical: 16,
            }}
        />
        <ScrollView
            contentContainerStyle={{ paddingBottom: 80 }}
            showsVerticalScrollIndicator={false}
            className="gap-2 mb-5"
        >
            <Text className="text-typingChallenge-Neutral400 font-soraSemiBold text-4xl">
                {paragraph}
            </Text>
        </ScrollView>
        {/* <View
            style={{
                height: StyleSheet.hairlineWidth,
                backgroundColor: 'hsl(240, 3%, 46%)',
                opacity: 1,
                marginVertical: 16,
            }}
        /> */}
    </View>
  );
};

export default typingPage;
