import CompletedIcon from "@/assets/images/icon-completed.svg";
import RestartIcon from "@/assets/images/icon-restart.svg";
import Confetti from "@/assets/images/pattern-confetti.svg";
import TopStar from "@/assets/images/pattern-star-2.svg";
import BottomStar from "@/assets/images/pattern-star-1.svg";
import TopScoreIcon from "@/assets/images/icon-new-pb.svg";
import React, { useState, useEffect } from "react";
import { Pressable, Text, View } from "react-native";

const scorePage = (
  { 
    setSubmitted, 
    currentWPM,
    accuracy,
    mistakes,
    paragraph,
    topScore,
    previousTopScore,
    setPreviousTopScore,
    resetTest,
  }: { 
    setSubmitted: (val: boolean) => void 
    currentWPM: number;
    accuracy: number;
    mistakes: number;
    paragraph: string;
    topScore: number;
    previousTopScore: number;
    setPreviousTopScore: (val: number) => void;
    resetTest: () => void;
  }
) => {
  const [highScoreSmashed, setHighScoreSmashed] = useState(false);

  useEffect(() => {
    if (previousTopScore === 0) return;
    if (currentWPM > previousTopScore) {
      setHighScoreSmashed(true);
    } else {
      setHighScoreSmashed(false);
    }
  }, [currentWPM, previousTopScore]);

  return (
    <View className="mt-5 flex items-center relative">
      {highScoreSmashed ? (
        <TopScoreIcon
          width={65}
          height={65}
          style={{
            marginBottom: 35,
          }}
        />
      ) : (
        <View className="border-8 rounded-full border-typingChallenge-GreenShadowTwo mb-2 flex items-center justify-center">
          <View className="border-8 rounded-full border-typingChallenge-GreenShadowOne flex items-center justify-center">
            <CompletedIcon width={65} height={65} />
          </View>
        </View>
      )}
      <Text className="text-typingChallenge-Neutral0 text-3xl font-soraSemiBold">
        {previousTopScore === 0 ? "Baseline Established!" : highScoreSmashed ? "High Score Smashed!" : "Test Complete!"}
      </Text>
      <Text className="text-typingChallenge-Neutral400 text-xl text-center font-soraMedium mt-2">
        {previousTopScore === 0
          ? "You've set the bar. Now the real challenge begins-time to beat it."
          : highScoreSmashed ? 
          "You're getting faster. That was incredible typing." 
          : "Solid run. Keep pushing to beat your high score."}
      </Text>
      <View className="flex w-full gap-3 items-center mt-6">
        <View className="px-5 py-3 border border-typingChallenge-Neutral500 min-w-full gap-3 justify-start rounded-lg">
          <Text className="text-typingChallenge-Neutral400 text-2xl font-soraMedium">
            WPM:
          </Text>
          <Text className="text-typingChallenge-Neutral0 text-3xl font-soraBold">
            {currentWPM}
          </Text>
        </View>
        <View className="px-5 py-3 border border-typingChallenge-Neutral500 min-w-full gap-3 justify-start rounded-lg">
          <Text className="text-typingChallenge-Neutral400 text-2xl font-soraMedium">
            Accuracy:
          </Text>
          <Text className={`${accuracy < 100 ? 'text-typingChallenge-Red500' : 'text-typingChallenge-Green500'} text-3xl font-soraBold`}>
            {accuracy}%
          </Text>
        </View>
        <View className="px-5 py-3 border border-typingChallenge-Neutral500 min-w-full gap-3 justify-start rounded-lg">
          <Text className="text-typingChallenge-Neutral400 text-2xl font-soraMedium">
            Characters:
          </Text>
          <Text className="text-typingChallenge-Neutral400 text-3xl font-soraBold">
            <Text className="text-typingChallenge-Green500">{paragraph.length}</Text>/
            <Text className="text-typingChallenge-Red500">{mistakes}</Text>
          </Text>
        </View>
      </View>
      <Pressable
        onPress={() => {
          resetTest();
          setSubmitted(false);
          setPreviousTopScore(currentWPM);
        }}
        className="flex z-10 flex-row items-center bg-typingChallenge-Neutral0 w-fit p-5 gap-3 rounded-lg mt-8"
      >
        <Text className="text-typingChallenge-Neutral900 text-2xl font-soraSemiBold">
          {previousTopScore > 0 ? "Go Again" : "Beat This Score"}
        </Text>
        <RestartIcon color={"#000"} fill={"#000"} className="color-black" />
      </Pressable>
      {highScoreSmashed ? (
        <Confetti
          width={650}
          height={150}
          style={{
            position: "absolute",
            bottom: -100,
            left: -50,
            right: 0,
            zIndex: 0,
          }}
        />
      ) : (
        <>
          <TopStar
            width={25}
            height={25}
            style={{
              position: "absolute",
              top: 40,
              left: 5,
              zIndex: 0,
            }}
          />
          <BottomStar
            width={55}
            height={55}
            style={{
              position: "absolute",
              bottom: -70,
              right: 5,
              zIndex: 0,
            }}
          />
        </>
      )}
    </View>
  );
};

export default scorePage;
