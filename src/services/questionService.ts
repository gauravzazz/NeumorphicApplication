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

    // Add debug logs
    console.log('Fetching questions for topic:', topicId);
    console.log('Requested count:', count);

    const mockTopicQuestions = mockQuestions.filter(q => q.topicId === topicId);
    console.log('Mock questions found:', mockTopicQuestions.length);
    
    const hotTopic = mockHotTopics.find(topic => topic.id === topicId);
    const hotTopicQuestions = hotTopic?.questions || [];
    console.log('Hot topic questions found:', hotTopicQuestions.length);

    const allQuestions = [...mockTopicQuestions, ...hotTopicQuestions];
    console.log('Total questions available:', allQuestions.length);

    if (allQuestions.length === 0) {
      throw new Error('No questions available for this topic');
    }

    const requestedCount = Math.min(count, allQuestions.length);
    const selectedQuestions = [...allQuestions]
      .sort(() => Math.random() - 0.5)
      .slice(0, requestedCount);

    return selectedQuestions;
  }
}