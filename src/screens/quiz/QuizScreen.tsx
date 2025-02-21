import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { CustomAlert } from '../../components/ui/CustomAlert';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { QuestionCard } from '../../components/ui/QuestionCard';
import { QuizHeader } from './components/QuizHeader';
import { QuizOptions } from './components/QuizOptions';
import { QuizNavigation } from './components/QuizNavigation';
import { QuestionSummaryModal } from '../../components/modals/QuestionSummaryModal';

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

  const [timeRemaining, setTimeRemaining] = useState(mode === 'test' ? timeLimit * 60 : 0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const resetQuizState = () => {
      setCurrentQuestionIndex(0);
      setSelectedOption(null);
      setAnswers({});
      setTimeRemaining(mode === 'test' ? timeLimit * 60 : 0);
      setIsQuestionTrayVisible(false);
      setShowSubmitAlert(false);
    };

    // Reset states when component mounts
    resetQuizState();

    // Cleanup function to reset states when component unmounts
    return () => {
      resetQuizState();
    };
  }, [mode, timeLimit]);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    
    if (mode === 'test' && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            if (timer) clearInterval(timer);
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
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

  const answeredQuestions = Object.keys(answers).length;

  const handleSubmit = () => {
    const isComplete = answeredQuestions === questions.length;
    const timeSpent = Math.max(0, timeLimit * questionCount * 60 - timeRemaining);
    setShowSubmitAlert(true);
    
    // Reset quiz state when submitting
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setAnswers({});
    setTimeRemaining(0);
  };

  const navigateToResult = () => {
    navigation.navigate('Result', {
      answers,
      questions,
      timeSpent: Math.max(0, timeLimit * questionCount * 60 - timeRemaining),
      mode
    });
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
    setIsQuestionTrayVisible(true);
  };

  const [isQuestionTrayVisible, setIsQuestionTrayVisible] = useState(false);

  const handleQuestionSelect = (index: number) => {
    setCurrentQuestionIndex(index);
    setSelectedOption(answers[questions[index].id] ?? null);
    setIsQuestionTrayVisible(false);
  };

  const [filterSkipped, setFilterSkipped] = useState(false);
  const [showSubmitAlert, setShowSubmitAlert] = useState(false);

  const filteredQuestions = filterSkipped
    ? questions.filter((_, index) => !answers[questions[index].id])
    : questions;

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

      <View style={styles.optionsContainer}>
        <QuizOptions
          options={questions[currentQuestionIndex].options}
          selectedOption={selectedOption}
          onOptionSelect={handleOptionSelect}
        />
      </View>

      <QuizNavigation
        onPrevious={handlePreviousQuestion}
        onNext={handleNextQuestion}
        onSkip={handleSkipQuestion}
        onSubmit={handleSubmit}
        isFirstQuestion={currentQuestionIndex === 0}
        isLastQuestion={currentQuestionIndex === questions.length - 1}
        style={styles.navigationContainer}
      />

      <QuestionSummaryModal
        visible={isQuestionTrayVisible}
        onClose={() => setIsQuestionTrayVisible(false)}
        questions={questions}
        currentQuestionIndex={currentQuestionIndex}
        answers={answers}
        onQuestionSelect={handleQuestionSelect}
      />

      <CustomAlert
        visible={showSubmitAlert}
        title="Submit Quiz"
        message={answeredQuestions === questions.length
          ? 'Are you sure you want to submit your quiz?'
          : `You have answered ${Object.keys(answers).length} out of ${questions.length} questions. Are you sure you want to submit?`}
        onConfirm={() => {
          setShowSubmitAlert(false);
          navigateToResult();
        }}
        onCancel={() => setShowSubmitAlert(false)}
        confirmText="Submit"
        cancelText="Cancel"
      />
    </SafeAreaView>
  );
};

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SCREEN_WIDTH * 0.04,
  },
  optionsContainer: {
    marginBottom: SCREEN_WIDTH * 0.03,
  },
  questionCard: {
    flex: 1,
    marginBottom: SCREEN_WIDTH * 0.06,
    marginTop: SCREEN_WIDTH * 0.04,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SCREEN_WIDTH * 0.04,
  },
  navigationContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: SCREEN_WIDTH * 0.04,
    paddingBottom: SCREEN_WIDTH * 0.08,
    paddingTop: SCREEN_WIDTH * 0.04,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  }
});
