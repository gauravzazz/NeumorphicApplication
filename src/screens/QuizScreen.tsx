import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { QuizConfigModal } from '../components/QuizConfigModal';
import { QuizHeader } from '../components/QuizHeader';
import { QuizQuestion } from '../components/QuizQuestion';
import { QuizOption } from '../components/QuizOption';

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
  const [showConfigModal, setShowConfigModal] = useState(false);

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
    // Validate if all questions have been answered
    const answeredQuestions = Object.keys(answers).length;
    const isComplete = answeredQuestions === questions.length;

    // Calculate time spent, ensuring it's non-negative
    const timeSpent = Math.max(0, timeLimit * questionCount * 60 - timeRemaining);

    // If in practice mode or all questions are answered, proceed to results
    if (mode === 'practice' || isComplete) {
      navigation.navigate('Result', {
        answers,
        questions,
        timeSpent,
        mode
      });
    } else {
      // Alert user about unanswered questions in test mode
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

  const handleCloseModal = () => {
    setShowConfigModal(false);
  };

  const handleStartQuiz = (selectedQuestionCount: number, selectedMode: 'test' | 'practice') => {
    // Update quiz configuration
    const updatedQuestions = questions.slice(0, selectedQuestionCount);
    const updatedTimeLimit = selectedMode === 'test' ? timeLimit : 0;

    // Reset quiz state
    setTimeRemaining(updatedTimeLimit * selectedQuestionCount * 60);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setAnswers({});
    setShowConfigModal(false);

    // Update navigation params and trigger state update
    const updatedParams = {
      mode: selectedMode,
      questionCount: selectedQuestionCount,
      timeLimit: updatedTimeLimit,
      questions: updatedQuestions
    };

    // Update route params and trigger re-render
    navigation.setParams(updatedParams);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <QuizHeader
        timeRemaining={timeRemaining}
        mode={mode}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={questions.length}
        onSubmit={handleSubmit}
      />

      <View style={styles.content}>
        <QuizQuestion
          question={questions[currentQuestionIndex].question}
          questionNumber={currentQuestionIndex + 1}
          mode={mode}
        />

        <View style={styles.optionsContainer}>
          {questions[currentQuestionIndex].options.map((option, index) => (
            <QuizOption
              key={index}
              option={option}
              index={index}
              isSelected={selectedOption === index}
              onSelect={() => handleOptionSelect(index)}
            />
          ))}
        </View>
      </View>

      <QuizConfigModal
        visible={showConfigModal}
        onClose={handleCloseModal}
        onStart={handleStartQuiz}
        topicTitle="Quiz Configuration"
        maxQuestions={questions.length}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  optionsContainer: {
    marginTop: 24,
  },
  timerContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 12,
    borderRadius: 12,
    zIndex: 1,
  },
  timerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});