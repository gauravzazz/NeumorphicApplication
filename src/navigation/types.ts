import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  SubjectDetail: {
    subject: {
      id: string;
      name: string;
      description: string;
      imageUrl?: string;
    };
  };
  Quiz: {
    topicId: string;
    topicTitle: string;
    subjectName: string;
    mode: 'test' | 'practice';
    questionCount: number;
    timeLimit: number;
    questions?: Array<{
      id: string;
      question: string;
      options: string[];
      correctOption: number;
      explanation: string;
    }>;
  };
  Result: {
    answers: { [key: string]: number };
    questions: Array<{
      id: string;
      question: string;
      options: string[];
      correctOption: number;
      explanation: string;
    }>;
    timeSpent: number;
    mode: 'test' | 'practice';
    topicId: string;
    topicTitle: string;
    subjectName: string;
  };
  Profile: undefined;
  Settings: undefined;
  Bookmarks: undefined;
  History: undefined;
  Progress: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}