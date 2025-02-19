import AsyncStorage from '@react-native-async-storage/async-storage';
import { Subject } from '../types';

const RECENT_SUBJECTS_KEY = '@recent_subjects';
const MAX_RECENT_SUBJECTS = 5;

export const getRecentSubjects = async (): Promise<Subject[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(RECENT_SUBJECTS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Error getting recent subjects:', error);
    return [];
  }
};

export const addRecentSubject = async (subject: Subject): Promise<void> => {
  try {
    const recentSubjects = await getRecentSubjects();
    
    // Remove the subject if it already exists
    const filteredSubjects = recentSubjects.filter(s => s.id !== subject.id);
    
    // Add the new subject to the beginning of the array
    const updatedSubjects = [subject, ...filteredSubjects].slice(0, MAX_RECENT_SUBJECTS);
    
    await AsyncStorage.setItem(RECENT_SUBJECTS_KEY, JSON.stringify(updatedSubjects));
  } catch (error) {
    console.error('Error adding recent subject:', error);
  }
};