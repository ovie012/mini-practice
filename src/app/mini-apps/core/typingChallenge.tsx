import data from "../core-components/typingChallengeComponents/data.json";
import { View, Text } from 'react-native'
import { setHighScore, getHighScore } from "../../utils/LocalStorage";
import React, { useRef, useState, useEffect, use } from 'react'
import { cn } from "@/src/app/utils/cn";
import TypingLogo from "@/assets/images/logo-small.svg"
import PersonalBestLogo from "@/assets/images/icon-personal-best.svg"
import ScorePage from '../core-components/typingChallengeComponents/scorePage';
import TypingPage from '../core-components/typingChallengeComponents/typingPage';

const typingChallenge = () => {
    const [submitted, setSubmitted] = useState(false);
    const [previousTopScore, setPreviousTopScore] = useState(0);
    const [topScore, setTopScore] = useState(0);
    const [currentWPM, setCurrentWPM] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [mistakes, setMistakes] = useState(0);
    const maxTime = 60;
    const [seconds, setSeconds] = useState(maxTime);
    const [minute, setMinute] = useState(0);
    const [difficulty, setDifficulty] = useState("easy");
    const [timeOrPassage, setTimeOrPassage] = useState("timed (60s)");
    const [started, setStarted] = useState(false);
    const [charIndex, setCharIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const [correctWrong, setCorrectWrong] = useState<string[]>([]);

    
    const getRandomParagraph = (level: string) => {
        const pool = data[level as keyof typeof data]; // data.easy, data.medium, data.hard
        const randomIndex = Math.floor(Math.random() * pool.length);
        return pool[randomIndex].text;
    };
    const [paragraph, setParagraph] = useState(getRandomParagraph("easy"));
    
    const resetTest = () => {
        setCurrentWPM(0);
        setAccuracy(100);
        setSeconds(maxTime);
        setMinute(0);
        setDifficulty("easy");
        setTimeOrPassage("timed (60s)");
        setStarted(false);
        setMistakes(0);
        setCharIndex(0);
        setIsTyping(false);
        setCorrectWrong([]);
        setParagraph(getRandomParagraph("easy"));
    }
    
    useEffect(() => {
        const loadScore = async () => {
            const stored = await getHighScore();
            setTopScore(stored);
        };

        loadScore();
    }, []);

    useEffect(() => {
        const updateScore = async () => {
            if (!submitted) return;

            const stored = await getHighScore();

            if (currentWPM > stored) {
                await setHighScore(currentWPM);
                setTopScore(currentWPM);
            }
        };

        updateScore();
    }, [submitted, currentWPM]);

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
            <TypingPage 
                setSubmitted={setSubmitted} 
                currentWPM={currentWPM}
                accuracy={accuracy}
                mistakes={mistakes}
                setCurrentWPM={setCurrentWPM}
                setAccuracy={setAccuracy}
                setMistakes={setMistakes}
                paragraph={paragraph}
                setParagraph={setParagraph}
                getRandomParagraph={getRandomParagraph}
                seconds={seconds}
                setSeconds={setSeconds}
                minute={minute}
                setMinute={setMinute}
                difficulty={difficulty}
                setDifficulty={setDifficulty}
                timeOrPassage={timeOrPassage}
                setTimeOrPassage={setTimeOrPassage}
                started={started}
                setStarted={setStarted}
                charIndex={charIndex}
                setCharIndex={setCharIndex}
                isTyping={isTyping}
                setIsTyping={setIsTyping}
                correctWrong={correctWrong}
                setCorrectWrong={setCorrectWrong}
                resetTest={resetTest}
                maxTime={maxTime}
            />
        ) : (
            <ScorePage 
                setSubmitted={setSubmitted} 
                currentWPM={currentWPM}
                accuracy={accuracy}
                mistakes={mistakes}
                paragraph={paragraph}
                topScore={topScore}
                previousTopScore={previousTopScore}
                setPreviousTopScore={setPreviousTopScore}
                resetTest={resetTest}
            />
        )}
    </View>
  )
}

export default typingChallenge;