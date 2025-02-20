import React, { useState, useEffect } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { QuestionCard } from '../../components/ui/QuestionCard';
import { QuizHeader } from './components/QuizHeader';
import { QuizOptions } from './components/QuizOptions';
import { QuizNavigation } from './components/QuizNavigation';

type QuizScreenRouteProp = RouteProp<{
  Quiz: {
    topicId: string;
    mode: 'test' | 'practice';
    questionCount: number;
    timeLimit: number;
    questions: Array<{
      id: string;
      question: string;
      options: string[];
      correctOption: number;
      explanation: string;
    }>;
  };
}, 'Quiz'>;

export const QuizScreen = () => {
  const theme = useTheme();
  const route = useRoute<QuizScreenRouteProp>();
  const navigation = useNavigation();
  const { mode, questionCount, timeLimit, questions } = route.params;

  const [timeRemaining, setTimeRemaining] = useState(timeLimit * questionCount * 60);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    if (mode === 'test' && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [mode, timeRemaining]);

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestionIndex].id]: optionIndex
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
    }
  };

  const handleSubmit = () => {
    const answeredQuestions = Object.keys(answers).length;
    const isComplete = answeredQuestions === questions.length;
    const timeSpent = Math.max(0, timeLimit * questionCount * 60 - timeRemaining);

    if (mode === 'practice' || isComplete) {
      navigation.navigate('Result', {
        answers,
        questions,
        timeSpent,
        mode
      });
    } else {
      Alert.alert(
        'Incomplete Quiz',
        `You have answered ${answeredQuestions} out of ${questions.length} questions. Are you sure you want to submit?`,
        [
          {
            text: 'Continue Quiz',
            style: 'cancel'
          },
          {
            text: 'Submit Anyway',
            onPress: () => {
              navigation.navigate('Result', {
                answers,
                questions,
                timeSpent,
                mode
              });
            }
          }
        ]
      );
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedOption(answers[questions[currentQuestionIndex - 1].id] ?? null);
    }
  };

  const handleSkipQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
    } else {
      handleSubmit();
    }
  };

  const handleSummary = () => {
    Alert.alert(
      'Question Summary',
      `Answered: ${Object.keys(answers).length}\nRemaining: ${questions.length - Object.keys(answers).length}`,
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <QuizHeader
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={questions.length}
        timeRemaining={timeRemaining}
        mode={mode}
        onSubmit={handleSubmit}
        onSummary={handleSummary}
      />

      <QuestionCard
        questionNumber={currentQuestionIndex + 1}
        question={questions[currentQuestionIndex].question}
        style={styles.questionCard}
      />

      <QuizOptions
        options={questions[currentQuestionIndex].options}
        selectedOption={selectedOption}
        onOptionSelect={handleOptionSelect}
      />

      <QuizNavigation
        onPrevious={handlePreviousQuestion}
        onNext={handleNextQuestion}
        onSkip={handleSkipQuestion}
        onSubmit={handleSubmit}
        isFirstQuestion={currentQuestionIndex === 0}
        isLastQuestion={currentQuestionIndex === questions.length - 1}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  questionCard: {
    marginBottom: 32,
  },
});
