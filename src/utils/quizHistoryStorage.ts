import AsyncStorage from '@react-native-async-storage/async-storage';

export interface QuizHistoryItem {
  id: string;
  date: string;
  topicId: string;
  topicTitle: string;
  mode: 'test' | 'practice';
  score: {
    correct: number;
    total: number;
    percentage: number;
  };
  timeSpent: number;
  questions: Array<{
    id: string;
    question: string;
    options: string[];
    correctOption: number;
    explanation: string;
    difficulty?: 'easy' | 'hard' | null;
    isBookmarked?: boolean;
  }>;
  answers: { [key: string]: number };
}

const QUIZ_HISTORY_KEY = '@quiz_history';

export const saveQuizHistory = async (quizData: QuizHistoryItem) => {
  try {
    const existingHistory = await getQuizHistory();
    const updatedHistory = [quizData, ...existingHistory];
    await AsyncStorage.setItem(QUIZ_HISTORY_KEY, JSON.stringify(updatedHistory));
    return true;
  } catch (error) {
    console.error('Error saving quiz history:', error);
    return false;
  }
};

export const getQuizHistory = async (): Promise<QuizHistoryItem[]> => {
  try {
    const history = await AsyncStorage.getItem(QUIZ_HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error getting quiz history:', error);
    return [];
  }
};

export const clearQuizHistory = async () => {
  try {
    await AsyncStorage.removeItem(QUIZ_HISTORY_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing quiz history:', error);
    return false;
  }
};