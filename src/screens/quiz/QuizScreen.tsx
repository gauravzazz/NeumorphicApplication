import React, { useState, useEffect, useCallback, useRef } from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { Toast } from '../../components/ui/Toast';
import { CustomAlert } from '../../components/ui/CustomAlert';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { QuestionCard } from '../../components/ui/QuestionCard';
import { QuizHeader } from './components/QuizHeader';
import { QuizOptions } from './components/QuizOptions';
import { QuizNavigation } from './components/QuizNavigation';
import { QuestionSummaryModal } from '../../components/modals/QuestionSummaryModal';
import { QuestionService, Question } from '../../services/questionService';
import { logger } from '../../utils/logger';

type QuizScreenRouteProp = RouteProp<{
  Quiz: {
    topicId: string;
    topicTitle: string;
    subjectName: string;
    mode: 'test' | 'practice';
    questionCount: number;
    timeLimit: number;
  };
}, 'Quiz'>;

export const QuizScreen = () => {
  const theme = useTheme();
  const route = useRoute<QuizScreenRouteProp>();
  const navigation = useNavigation();
  const { mode, timeLimit, topicId, topicTitle, subjectName, questionCount } = route.params;

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const autoNavigateRef = useRef<NodeJS.Timeout | null>(null);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [timeRemaining, setTimeRemaining] = useState(timeLimit * 60);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isQuestionTrayVisible, setIsQuestionTrayVisible] = useState(false);
  const [showSubmitAlert, setShowSubmitAlert] = useState(false);
  const [showToast, setShowToast] = useState(true);

  const cleanup = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (autoNavigateRef.current) {
      clearTimeout(autoNavigateRef.current);
      autoNavigateRef.current = null;
    }
  }, []);

  const navigateToResult = useCallback(() => {
    cleanup();
    navigation.navigate('Result', {
      answers,
      questions,
      timeSpent: Math.max(0, timeLimit * 60 - timeRemaining),
      mode,
      topicId,
      topicTitle,
      subjectName
    });
  }, [answers, questions, timeRemaining, mode, topicId, topicTitle, subjectName, navigation, timeLimit, cleanup]);

  const loadQuestions = useCallback(async () => {
    try {
      setIsLoading(true);
      const fetchedQuestions = QuestionService.fetchQuizQuestions(topicId, questionCount);
      if (fetchedQuestions.length === 0) {
        throw new Error('No questions available');
      }
      setQuestions(fetchedQuestions);
      setCurrentQuestionIndex(0);
      setSelectedOption(null);
      setAnswers({});
      setTimeRemaining(timeLimit * 60);
      setShowCorrectAnswer(false);
      setShowToast(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load questions';
      setError(errorMessage);
      navigation.goBack();
    } finally {
      setIsLoading(false);
    }
  }, [topicId, questionCount, timeLimit, navigation]);

  const resetQuiz = useCallback(() => {
    cleanup();
    loadQuestions();
  }, [cleanup, loadQuestions]);

  useEffect(() => {
    loadQuestions();
    return cleanup;
  }, [loadQuestions, cleanup]);

  useEffect(() => {
    if (mode === 'test' && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            cleanup();
            navigateToResult();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return cleanup;
  }, [mode, timeRemaining, cleanup, navigateToResult]);

  const handleOptionSelect = useCallback((optionIndex: number) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return;

    setSelectedOption(optionIndex);
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionIndex
    }));

    if (mode === 'practice') {
      setShowCorrectAnswer(true);
      
      autoNavigateRef.current = setTimeout(() => {
        if (currentQuestionIndex === questions.length - 1) {
          navigateToResult();
        } else {
          setCurrentQuestionIndex(prev => prev + 1);
          setSelectedOption(null);
          setShowCorrectAnswer(false);
        }
      }, 2000);
    }
  }, [currentQuestionIndex, questions, mode, navigateToResult]);

  const handleNextQuestion = useCallback(() => {
    if (mode === 'test' && currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(answers[questions[currentQuestionIndex + 1]?.id] ?? null);
    }
  }, [currentQuestionIndex, questions, mode, answers]);

  const handlePreviousQuestion = useCallback(() => {
    if (mode === 'test' && currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedOption(answers[questions[currentQuestionIndex - 1]?.id] ?? null);
    }
  }, [currentQuestionIndex, mode, answers, questions]);

  const handleSkipQuestion = useCallback(() => {
    if (mode === 'test') {
      const currentQuestion = questions[currentQuestionIndex];
      if (currentQuestion) {
        setAnswers(prev => {
          const updatedAnswers = { ...prev };
          delete updatedAnswers[currentQuestion.id];
          return updatedAnswers;
        });
      }
      handleNextQuestion();
    }
  }, [currentQuestionIndex, questions, mode, handleNextQuestion]);

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={[styles.loadingText, { color: theme.colors.onSurface }]}>
            Loading questions...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !questions.length) return null;

  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion) return null;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Toast 
        visible={showToast} 
        message={`Starting ${mode} mode quiz for ${topicTitle}`} 
        onHide={() => setShowToast(false)} 
        style={styles.toast} 
      />
      
      <QuizHeader 
        currentQuestion={currentQuestionIndex + 1} 
        totalQuestions={questionCount} 
        timeRemaining={timeRemaining} 
        mode={mode} 
        onSubmit={() => setShowSubmitAlert(true)} 
        onSummary={() => setIsQuestionTrayVisible(true)}
        topicTitle={topicTitle}
        subjectName={subjectName}
      />

      <View style={styles.contentContainer}>
        <QuestionCard 
          questionNumber={currentQuestionIndex + 1} 
          question={currentQuestion.question} 
          style={styles.questionCard} 
        />
        <View style={styles.optionsContainer}>
          <QuizOptions 
            options={currentQuestion.options} 
            selectedOption={selectedOption} 
            onOptionSelect={handleOptionSelect} 
            mode={mode}
            correctOption={showCorrectAnswer ? currentQuestion.correctOption : undefined}
            disabled={mode === 'practice' && selectedOption !== null}
          />
        </View>
      </View>

      {mode === 'test' ? (
        <QuizNavigation 
          onPrevious={handlePreviousQuestion} 
          onNext={handleNextQuestion} 
          onSkip={handleSkipQuestion} 
          onSubmit={() => setShowSubmitAlert(true)} 
          isFirstQuestion={currentQuestionIndex === 0} 
          isLastQuestion={currentQuestionIndex === questions.length - 1} 
          mode="test"
          style={styles.navigationContainer} 
        />
      ) : (
        <QuizNavigation 
          onSkip={() => {}}
          onSubmit={() => {}}
          onReset={resetQuiz}
          isFirstQuestion={currentQuestionIndex === 0}
          isLastQuestion={currentQuestionIndex === questions.length - 1}
          mode="practice"
          style={styles.navigationContainer}
        />
      )}

      <QuestionSummaryModal 
        visible={isQuestionTrayVisible} 
        onClose={() => setIsQuestionTrayVisible(false)} 
        questions={questions} 
        currentQuestionIndex={currentQuestionIndex} 
        answers={Object.values(answers)}
        onQuestionSelect={mode === 'test' ? setCurrentQuestionIndex : undefined}
        mode={mode}
      />

      <CustomAlert 
        visible={showSubmitAlert} 
        title="Submit Quiz" 
        message={`You have answered ${Object.keys(answers).length} out of ${questions.length} questions. Are you sure you want to submit?`} 
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  optionsContainer: {
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  questionCard: {
    marginBottom: 24,
    marginTop: 16,
    paddingHorizontal: 8,
  },
  navigationContainer: {
    padding: 16,
    backgroundColor: 'transparent',
    marginTop: 'auto',
  },
  toast: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    zIndex: 9999,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
});