export interface Subject {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  topicsCount: number;
  questionsCount: number;
  lastUpdated: string;
  icon: string;
  progress: number;
}

export interface Topic {
  id: string;
  subjectId: string;
  name: string;
  description: string;
  imageUrl?: string;
  questionsCount: number;
  difficulty: 'easy' | 'medium' | 'hard';
  isImportant: boolean;
  lastAttempted?: string;
}

export interface Question {
  id: string;
  topicId: string;
  question: string;
  options: string[];
  correctOption: number;
  explanation?: string;
}

export interface UserProgress {
  topicId: string;
  questionsAttempted: number;
  correctAnswers: number;
  lastAttempted: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type?: 'info' | 'success' | 'warning' | 'error';
}

export interface Settings {
  darkMode: boolean;
  language: string;
  timePerQuestion: number;
  examName: string;
  backgroundSound: boolean;
  dictationEnabled: boolean;
  selectedExams?: string[];
}