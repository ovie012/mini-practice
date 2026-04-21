import React, { useState, useRef, useEffect } from "react";
import { BlurView } from "expo-blur";
import DownArrow from "@/assets/images/icon-down-arrow.svg"
import RestartIcon from "@/assets/images/icon-restart.svg"
import { Text, View, ScrollView, StyleSheet, Pressable, TextInput } from "react-native";

const typingPage = (
    { 
        setSubmitted, currentWPM, accuracy, mistakes, 
        setCurrentWPM, setAccuracy, setMistakes, paragraph, 
        setParagraph, getRandomParagraph, correctWrong, setCorrectWrong, 
        resetTest, seconds, setSeconds, minute, setMinute, difficulty, 
        setDifficulty, timeOrPassage, setTimeOrPassage, started, 
        setStarted, charIndex, setCharIndex, isTyping, setIsTyping, 
        maxTime,
    } : { 
        setSubmitted: (val: boolean) => void;
        currentWPM: number;
        accuracy: number;
        mistakes: number;
        setCurrentWPM: (val: number) => void;
        setAccuracy: (val: number) => void;
        setMistakes: (val: number) => void;
        paragraph: string;
        setParagraph: (val: string) => void;
        getRandomParagraph: (level: string) => string;
        correctWrong: string[];
        setCorrectWrong: (val: string[]) => void;
        resetTest: () => void;
        seconds: number;
        setSeconds: (val: number) => void;
        minute: number;
        setMinute: (val: number) => void;
        difficulty: string;
        setDifficulty: (val: string) => void;
        timeOrPassage: string;
        setTimeOrPassage: (val: string) => void;
        started: boolean;
        setStarted: (val: boolean) => void;
        charIndex: number;
        setCharIndex: (val: number) => void;
        isTyping: boolean;
        setIsTyping: (val: boolean) => void;
        maxTime: number;
    }
    
) => {

    const [timeDropDown, setTimeDropDown] = useState(false);
    const [difficultyDropDown, setDifficultyDropDown] = useState(false);
    const [isPassageMode, setIsPassageMode] = useState(false);

    const inputRef = useRef<TextInput>(null);
    const charRefs = useRef<(Text | null)[]>([]);
    const scrollRef = useRef<ScrollView>(null);
    // const charPositions = useRef<number[]>([]);


    useEffect(() => {
        inputRef.current?.focus();
        setCorrectWrong(Array(charRefs.current.length).fill(""))
    }, [])

    useEffect(() => {
        let interval: any;
        if(isTyping && seconds > 0) {
            interval = setInterval(() => {
                setSeconds(seconds - 1);
                let correctChars = charIndex - mistakes;
                let totalTime = (maxTime - seconds);
                let wpm = Math.round((correctChars / 5) / totalTime * 60);
                wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;

                setCurrentWPM(wpm);
                setAccuracy(Math.round((correctChars / charIndex) * 100) || 0);
            }, 1000);
        } else if(seconds === 0 && !isPassageMode) {
            clearInterval(interval);
            setIsTyping(false);
            setSubmitted(true);
            setSeconds(0);
        }
        return () => clearInterval(interval);
    }, [isTyping, seconds])

    const handleChange = (e: string) => {
        const characters = charRefs.current;
        let currentChar = paragraph[charIndex];
        let typedChar = e.slice(-1);

        if(charIndex < characters.length && seconds > 0) {
            if(!isTyping) {
                setIsTyping(true);
            }

            if(typedChar === currentChar) {
                setCharIndex(charIndex + 1);
                correctWrong[charIndex] = " text-typingChallenge-Green500 "
            } else {
                setCharIndex(charIndex + 1);
                setMistakes(mistakes + 1);
                correctWrong[charIndex] = " text-typingChallenge-Red500 underline decoration-typingChallenge-Red500 decoration-8 decoration-solid border border-b-8 border-typingChallenge-Red500 "
            }

            if(charIndex === characters.length - 1) {
                setCurrentWPM(Math.round(((charIndex + 1 - mistakes) / 5) / (maxTime - seconds) * 60));
                setAccuracy(Math.round(((charIndex + 1 - mistakes) / (charIndex + 1)) * 100));
                setSubmitted(true);
                setIsTyping(false);
            }
        } else {
            setIsTyping(false)
        }
    }

    useEffect(() => {
        if (!scrollRef.current) return;

        const progress = charIndex / paragraph.length;

        scrollRef.current.scrollTo({
            y: progress * 600,
            animated: true,
        });
    }, [charIndex]);

    const resetDifficultyAndMode = () => {
        setCurrentWPM(0);
        setAccuracy(100);
        setSeconds(maxTime);
        setMinute(0);
        setStarted(true);
        setMistakes(0);
        setCharIndex(0);
        setIsTyping(false);
        setCorrectWrong([]);
    }

    const timeUsed = `${minute} : ${seconds}`;


    const details = [
        {
            top: "WPM",
            bottom: currentWPM
        },
        {
            top: "Accuracy",
            bottom: `${accuracy}%`
        },
        {
            top: `${isPassageMode ? "Progress" : "Time"}`,
            bottom: `${isPassageMode ? `${charIndex}/${paragraph.length}` : timeUsed}`
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
        resetDifficultyAndMode();
    };

    const handleModeChange = (mode: any) => {
        setTimeOrPassage(mode.label);
        setTimeDropDown(false);
        resetDifficultyAndMode();

        if (mode.key === "timed") {
            setSeconds(mode.duration);
            setMinute(0);
        }

        if (mode.key === "passage") {
            setIsPassageMode(true);
        } else {
            setIsPassageMode(false);
        }
    };
  return (
    <View className="mt-5 relative">
        <View className="flex gap-2 items-center z-50">
            <View className="w-full flex flex-row justify-between gap-0 items-center px-1 mb-3">
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
        {!started && (
            <>
                <View className="absolute top-40 left-[-16px] right-[-16px] bottom-[-80px] bg-black/30 z-30 rounded-lg flex items-center justify-center gap-4 pb-28">
                <Pressable
                    className="flex flex-row items-center gap-3 bg-typingChallenge-Blue600 p-5 capitalize rounded-lg z-50"
                    onPress={() => setStarted(true)}
                >
                    <Text className="capitalize text-typingChallenge-Neutral0 font-soraBold text-2xl">
                        Start Typing Test
                    </Text>
                </Pressable>
                <Text className="text-typingChallenge-Neutral0 font-soraBold text-2xl">
                    Or Click The Text And Start Typing
                </Text>
                </View>

                <BlurView 
                    intensity={30}
                    tint="dark"
                    className="absolute top-40 left-[-16px] right-[-16px] bottom-[-80px] z-20 rounded-lg flex items-center justify-center"
                />
            </>
        )}
        <ScrollView
            ref={scrollRef}
            contentContainerStyle={{ paddingBottom: 80 }}
            showsVerticalScrollIndicator={false}
            className={`gap-2 mb-5 relative`}
        >
            <TextInput
                ref={inputRef}
                style={{
                    zIndex: -999,
                    position: "absolute",
                    opacity: 0
                }}
                onChangeText={handleChange}
                className={`
                    ${mistakes ? "text-typingChallenge-Red500" : "text-typingChallenge-Green500"} 
                    font-soraSemiBold text-4xl absolute
                `}
                keyboardType="default"
            />
            <Text className="text-typingChallenge-Neutral400 font-soraSemiBold text-4xl rounded-lg">
                {
                    paragraph.split("").map((char, index) => (
                        <Text
                            key={index}
                            // onLayout={(e) => {
                            //     charPositions.current[index] = e.nativeEvent.layout.y;
                            // }}
                            className={`
                                ${correctWrong[index]}
                                ${index === charIndex ? "bg-typingChallenge-Neutral500 rounded-lg p-1" : ""}
                            `}
                            ref={
                                (e) => { charRefs.current[index] = e
                            }}
                        >
                            {char}
                        </Text>
                    ))
                }
            </Text>
        </ScrollView>
        {started && (
            <>
                <View
                    style={{
                        height: StyleSheet.hairlineWidth,
                        backgroundColor: 'hsl(240, 3%, 46%)',
                        opacity: 1,
                    }}
                />
                <Pressable 
                    className="flex flex-row items-center gap-3 mt-5 self-center bg-typingChallenge-Neutral800 p-4 rounded-lg mb-[-20px]" 
                    onPress={() => { resetTest(); }}
                >
                    <Text className="text-typingChallenge-Neutral0 font-soraSemiBold text-2xl text-center capitalize">
                        Restart Test
                    </Text>
                    <RestartIcon color={"#fff"} fill={"#fff"} />
                </Pressable>
            </>
        )}
    </View>
  );
};

export default typingPage;
