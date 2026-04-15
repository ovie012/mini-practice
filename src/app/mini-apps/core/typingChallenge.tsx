import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { cn } from "@/src/app/utils/cn";
import TypingLogo from "@/assets/images/logo-small.svg"
import PersonalBestLogo from "@/assets/images/icon-personal-best.svg"
import ScorePage from '../core-components/typingChallengeComponents/scorePage';
import TypingPage from '../core-components/typingChallengeComponents/typingPage';

const typingChallenge = () => {
    const [submitted, setSubmitted] = useState(false);
    const [topScore, setTopScore] = useState(0);

  return (
    <View className='bg-typingChallenge-Neutral900 px-4 py-28 flex-1 items-center'>
        <View className='flex flex-row justify-between items-center w-full'>
            <TypingLogo width={35} height={35} />
            <View className='flex flex-row items-center justify-between gap-3'>
                <PersonalBestLogo width={25} height={25} />
                <Text className='flex text-xl flex-row items-center justify-between gap-2 text-typingChallenge-Neutral500 font-soraSemiBold'>
                    Best:
                    <Text className='text-white'>{" "}
                        {topScore} WPM
                    </Text> 
                </Text>
            </View>
        </View>
        {!submitted ? (
            <TypingPage />
        ) : (
            <ScorePage />
        )}
    </View>
  )
}

export default typingChallenge;