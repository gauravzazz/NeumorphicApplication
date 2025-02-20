import AsyncStorage from '@react-native-async-storage/async-storage';

export interface BookmarkedQuestion {
  id: string;
  question: string;
  options: string[];
  correctOption: number;
  explanation: string;
  topicId: string;
  topicName: string;
  dateBookmarked: string;
}

const BOOKMARKS_KEY = '@bookmarked_questions';

export const getBookmarkedQuestions = async (): Promise<BookmarkedQuestion[]> => {
  try {
    const bookmarks = await AsyncStorage.getItem(BOOKMARKS_KEY);
    return bookmarks ? JSON.parse(bookmarks) : [];
  } catch (error) {
    console.error('Error getting bookmarked questions:', error);
    return [];
  }
};

export const saveBookmarkedQuestion = async (question: BookmarkedQuestion): Promise<{ success: boolean; bookmarks: BookmarkedQuestion[] }> => {
  try {
    const bookmarks = await getBookmarkedQuestions();
    // Check if question is already bookmarked
    const existingIndex = bookmarks.findIndex(q => q.id === question.id);
    
    let updatedBookmarks = [...bookmarks];
    if (existingIndex >= 0) {
      // Remove the bookmark if it exists
      updatedBookmarks.splice(existingIndex, 1);
    } else {
      // Add new bookmark
      updatedBookmarks.unshift(question);
    }
    
    await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updatedBookmarks));
    return { success: true, bookmarks: updatedBookmarks };
  } catch (error) {
    console.error('Error saving bookmarked question:', error);
    return { success: false, bookmarks: [] };
  }
};

export const removeBookmarkedQuestion = async (questionId: string): Promise<{ success: boolean; bookmarks: BookmarkedQuestion[] }> => {
  try {
    const bookmarks = await getBookmarkedQuestions();
    const updatedBookmarks = bookmarks.filter(q => q.id !== questionId);
    await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updatedBookmarks));
    return { success: true, bookmarks: updatedBookmarks };
  } catch (error) {
    console.error('Error removing bookmarked question:', error);
    return { success: false, bookmarks: [] };
  }
};

export const clearBookmarks = async (): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(BOOKMARKS_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing bookmarks:', error);
    return false;
  }
};