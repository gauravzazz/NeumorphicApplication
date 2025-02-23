import AsyncStorage from '@react-native-async-storage/async-storage';

const QUIZ_SETTINGS_KEY = '@quiz_settings';

interface QuizSettings {
  timePerQuestion: number;
}

const defaultSettings: QuizSettings = {
  timePerQuestion: 60, // Default 60 seconds per question
};

export const initializeQuizSettings = async (): Promise<void> => {
  try {
    const existingSettings = await AsyncStorage.getItem(QUIZ_SETTINGS_KEY);
    if (!existingSettings) {
      await AsyncStorage.setItem(QUIZ_SETTINGS_KEY, JSON.stringify(defaultSettings));
    }
  } catch (error) {
    console.error('Error initializing quiz settings:', error);
  }
};

export const getQuizSettings = async (): Promise<QuizSettings> => {
  try {
    const settings = await AsyncStorage.getItem(QUIZ_SETTINGS_KEY);
    return settings ? JSON.parse(settings) : defaultSettings;
  } catch (error) {
    console.error('Error getting quiz settings:', error);
    return defaultSettings;
  }
};

export const updateQuizSettings = async (settings: Partial<QuizSettings>): Promise<boolean> => {
  try {
    const currentSettings = await getQuizSettings();
    const newSettings = { ...currentSettings, ...settings };
    await AsyncStorage.setItem(QUIZ_SETTINGS_KEY, JSON.stringify(newSettings));
    return true;
  } catch (error) {
    console.error('Error updating quiz settings:', error);
    return false;
  }
};