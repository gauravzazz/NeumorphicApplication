import AsyncStorage from '@react-native-async-storage/async-storage';
import { Settings } from '../types';

export const INITIAL_SETTINGS: Settings = {
  darkMode: false,
  language: 'English',
  timePerQuestion: 60,
  examName: 'JEE',
  backgroundSound: true,
  dictationEnabled: false,
  selectedExams: ['JEE'],
};

export const INDIAN_LANGUAGES = ['English', 'Hindi', 'Bengali', 'Tamil', 'Telugu', 'Marathi', 'Gujarati'];
export const INDIAN_EXAMS = ['JEE', 'GATE', 'UPSC', 'CAT', 'NEET', 'SSC'];

export const loadSettings = async (): Promise<Settings | null> => {
  try {
    const savedSettings = await AsyncStorage.getItem('userSettings');
    if (savedSettings) {
      return JSON.parse(savedSettings);
    }
    return null;
  } catch (error) {
    console.error('Error loading settings:', error);
    return null;
  }
};

export const saveSettings = async (settings: Settings): Promise<boolean> => {
  try {
    await AsyncStorage.setItem('userSettings', JSON.stringify(settings));
    return true;
  } catch (error) {
    console.error('Error saving settings:', error);
    return false;
  }
};