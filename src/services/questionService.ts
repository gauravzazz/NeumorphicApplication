import { mockHotTopics, mockQuestions } from '../data/mockData';

export interface Question {
  id: string;
  topicId: string;
  question: string;
  options: string[];
  correctOption: number;
  explanation: string;
}

export class QuestionService {
  static fetchQuizQuestions(topicId: string, count: number): Question[] {
    if (!topicId) {
      throw new Error('Topic ID is required');
    }

    if (!count || count < 1) {
      throw new Error('Invalid question count');
    }

    // Get questions from both mockQuestions and mockHotTopics
    const mockTopicQuestions = mockQuestions.filter(q => q.topicId === topicId);
    
    // Find the hot topic and get its questions
    const hotTopic = mockHotTopics.find(topic => topic.id === topicId);
    const hotTopicQuestions = hotTopic?.questions || [];

    // Combine questions from both sources
    const allQuestions = [...mockTopicQuestions, ...hotTopicQuestions];

    if (allQuestions.length === 0) {
      throw new Error('No questions available for this topic');
    }

    // Ensure we don't request more questions than available
    const requestedCount = Math.min(count, allQuestions.length);

    // Randomly select questions
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    const selectedQuestions = shuffled.slice(0, requestedCount);

    return selectedQuestions;
  }
}