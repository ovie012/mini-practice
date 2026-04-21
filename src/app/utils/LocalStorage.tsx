import AsyncStorage from '@react-native-async-storage/async-storage';

export async function setHighScore(score: number) {
  try {
    await AsyncStorage.setItem('typingChallengeHighScore', score.toString());
  } catch (error) {
    // console.error('Error setting high score:', error);
  }
}

export async function getHighScore(): Promise<number> {
  try {
    const storedScore = await AsyncStorage.getItem('typingChallengeHighScore');
    return storedScore ? parseInt(storedScore, 10) : 0;
  } catch (error) {
    // console.error('Error getting high score:', error);
    return 0;
  }
}