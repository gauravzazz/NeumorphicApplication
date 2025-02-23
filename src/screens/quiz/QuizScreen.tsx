import React, { useEffect, useState, useCallback } from 'react';
import { View, Text } from 'react-native';
import { QuestionService, Question } from '../../services/questionService';

interface QuizScreenProps {
  topicId: string;
  questionCount: number;
  mode: 'test' | 'practice';
}

export const QuizScreen: React.FC<QuizScreenProps> = ({ topicId, questionCount, mode }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(mode === 'test' ? 600 : 0);

  // Fetch quiz questions
  const initializeQuiz = useCallback(async () => {
    try {
      const fetchedQuestions = await QuestionService.fetchQuizQuestions(topicId, questionCount);
      setQuestions(fetchedQuestions);
      setCurrentQuestionIndex(0);
      setSelectedAnswers({});
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  }, [topicId, questionCount]);

  useEffect(() => {
    initializeQuiz();
  }, [initializeQuiz]);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    let isActive = true;

    if (mode === 'test' && timeRemaining > 0) {
      timer = setInterval(() => {
        if (isActive) {
          setTimeRemaining(prev => {
            if (prev <= 1) {
              handleTimeEnd();
              return 0;
            }
            return prev - 1;
          });
        }
      }, 1000);
    } else if (mode === 'practice') {
      timer = setInterval(() => {
        if (isActive) {
          setTimeRemaining(prev => prev + 1);
        }
      }, 1000);
    }

    return () => {
      isActive = false;
      if (timer) clearInterval(timer);
    };
  }, [timeRemaining, mode]);

  const handleTimeEnd = useCallback(() => {
    console.log('Time is up!');
  }, []);

  const handleOptionSelect = useCallback((option: string) => {
    setSelectedAnswers(prevAnswers => ({
      ...prevAnswers,
      [currentQuestionIndex]: option,
    }));
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      console.log('Quiz Finished!');
    }
  }, [currentQuestionIndex, questions.length]);

  return (
    <View>
      {questions.length > 0 ? (
        <View>
          <Text>{questions[currentQuestionIndex].question}</Text>
          {/* Render answer options here */}
        </View>
      ) : (
        <Text>Loading questions...</Text>
      )}
    </View>
  );
};

export default QuizScreen;
