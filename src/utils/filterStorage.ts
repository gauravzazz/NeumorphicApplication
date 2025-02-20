import AsyncStorage from '@react-native-async-storage/async-storage';

export interface FilterData {
  subjects: string[];
  topics: { [key: string]: string[] };
}

const FILTER_DATA_KEY = '@filter_data';

// Initial dummy data
const initialFilterData: FilterData = {
  subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science'],
  topics: {
    Mathematics: ['Algebra', 'Calculus', 'Geometry', 'Trigonometry', 'Statistics'],
    Physics: ['Mechanics', 'Thermodynamics', 'Optics', 'Electromagnetism', 'Quantum Physics'],
    Chemistry: ['Organic', 'Inorganic', 'Physical', 'Analytical', 'Biochemistry'],
    Biology: ['Zoology', 'Botany', 'Genetics', 'Ecology', 'Microbiology'],
    'Computer Science': ['Programming', 'Data Structures', 'Algorithms', 'Database', 'Networking']
  }
};

export const initializeFilterData = async (): Promise<void> => {
  try {
    const existingData = await AsyncStorage.getItem(FILTER_DATA_KEY);
    if (!existingData) {
      await AsyncStorage.setItem(FILTER_DATA_KEY, JSON.stringify(initialFilterData));
    }
  } catch (error) {
    console.error('Error initializing filter data:', error);
  }
};

export const getFilterData = async (): Promise<FilterData | null> => {
  try {
    const data = await AsyncStorage.getItem(FILTER_DATA_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getting filter data:', error);
    return null;
  }
};

export const updateFilterData = async (newData: FilterData): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(FILTER_DATA_KEY, JSON.stringify(newData));
    return true;
  } catch (error) {
    console.error('Error updating filter data:', error);
    return false;
  }
};