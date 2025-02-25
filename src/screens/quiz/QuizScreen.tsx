import React, { useState, useEffect, useCallback, useRef } from 'react';
  import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
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
  import { getQuizSettings } from '../../utils/quizSettingsStorage';
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
    const { mode, topicId, topicTitle, subjectName, questionCount } = route.params;

    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const autoNavigateRef = useRef<NodeJS.Timeout | null>(null);
  
    // Add timePerQuestion state
    const [timePerQuestion, setTimePerQuestion] = useState(60);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [answers, setAnswers] = useState<{ [key: string]: number }>({});
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isQuestionTrayVisible, setIsQuestionTrayVisible] = useState(false);
    const [showSubmitAlert, setShowSubmitAlert] = useState(false);
    const [showToast, setShowToast] = useState(true);
  
    // Add useEffect to load quiz settings
    useEffect(() => {
      const loadSettings = async () => {
        const settings = await getQuizSettings();
        setTimePerQuestion(settings.timePerQuestion);
        setTimeRemaining(questionCount * settings.timePerQuestion);
      };
      loadSettings();
    }, [questionCount]);
  
    // Update loadQuestions
    const loadQuestions = useCallback(async () => {
      try {
        setIsLoading(true);
        const fetchedQuestions = await QuestionService.fetchQuizQuestions(topicId, questionCount);
        if (fetchedQuestions.length === 0) {
          throw new Error('No questions available');
        }
        setQuestions(fetchedQuestions);
        setCurrentQuestionIndex(0);
        setSelectedOption(null);
        setAnswers({});
        setTimeRemaining(questionCount * timePerQuestion);
        setShowCorrectAnswer(false);
        setShowToast(true);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load questions';
        setError(errorMessage);
        navigation.goBack();
      } finally {
        setIsLoading(false);
      }
    }, [topicId, questionCount, timePerQuestion, navigation]);
  
    // Update navigateToResult
    const navigateToResult = useCallback(() => {
      cleanup();
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'Result',
            params: {
              answers,
              questions,
              timeSpent: Math.max(0, questionCount * timePerQuestion - timeRemaining),
              mode,
              topicId,
              topicTitle,
              subjectName,
            },
          },
        ],
      });
    }, [answers, questions, timeRemaining, mode, topicId, topicTitle, subjectName, navigation, questionCount, timePerQuestion,]);
  
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

    const resetQuiz = useCallback(() => {
      cleanup();
      loadQuestions();
    }, [cleanup, loadQuestions]);

    useEffect(() => {
      loadQuestions();
      return cleanup;
    }, [loadQuestions, cleanup]);

    useEffect(() => {
      if ( timeRemaining > 0) {
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

    // Auto-move to next question in practice mode
    useEffect(() => {
      if (mode === 'practice' && selectedOption !== null) {
        setShowCorrectAnswer(true);
        autoNavigateRef.current = setTimeout(() => {
          if (currentQuestionIndex === questions.length - 1) {
            navigateToResult();
          } else {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedOption(null); // Reset selected option for the next question
            setShowCorrectAnswer(false);
          }
        }, 1000); // 1 second delay before moving to the next question
      }
      return () => {
        if (autoNavigateRef.current) {
          clearTimeout(autoNavigateRef.current);
        }
      };
    }, [selectedOption, currentQuestionIndex, questions, mode, navigateToResult]);

    const handleOptionSelect = useCallback((optionIndex: number) => {
      const currentQuestion = questions[currentQuestionIndex];
      if (!currentQuestion) return;

      if (mode === 'practice') {
        if (selectedOption !== null) return;
        setShowCorrectAnswer(true);
        setSelectedOption(optionIndex);
        setAnswers(prev => ({
          ...prev,
          [currentQuestion.id]: optionIndex
        }));
      } else {
        // Test mode - allow changing selection at any time
        setSelectedOption(optionIndex);
        setAnswers(prev => ({
          ...prev,
          [currentQuestion.id]: optionIndex
        }));
      }
    }, [currentQuestionIndex, questions, mode]);

    useEffect(() => {
      if (mode === 'practice' && selectedOption !== null) {
        setShowCorrectAnswer(true);
        autoNavigateRef.current = setTimeout(() => {
          if (currentQuestionIndex === questions.length - 1) {
            navigateToResult();
          } else {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedOption(null);
            setShowCorrectAnswer(false);
          }
        }, 1500);
    
        return () => {
          if (autoNavigateRef.current) {
            clearTimeout(autoNavigateRef.current);
          }
        };
      }
    }, [selectedOption, currentQuestionIndex, questions.length, mode, navigateToResult]);

    const handleNextQuestion = useCallback(() => {
      if (mode === 'test' && currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedOption(answers[questions[currentQuestionIndex + 1]?.id] ?? null);
        setShowCorrectAnswer(false);
      }
    }, [currentQuestionIndex, questions, mode, answers]);

    const handlePreviousQuestion = useCallback(() => {
      if (mode === 'test' && currentQuestionIndex > 0) {
        setCurrentQuestionIndex(prev => prev - 1);
        setSelectedOption(answers[questions[currentQuestionIndex - 1]?.id] ?? null);
        setShowCorrectAnswer(false);
      }
    }, [currentQuestionIndex, mode, answers, questions]);

    const handleSkipQuestion = useCallback(() => {
      const currentQuestion = questions[currentQuestionIndex];
      if (currentQuestion) {
        setAnswers(prev => {
          const updatedAnswers = { ...prev };
          delete updatedAnswers[currentQuestion.id];
          return updatedAnswers;
        });
      }
      
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedOption(null);
        setShowCorrectAnswer(false);
      }
    }, [currentQuestionIndex, questions]);

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
              correctOption={mode === 'practice' && showCorrectAnswer ? currentQuestion.correctOption : undefined}
              
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
            onSkip={handleSkipQuestion}  // Remove duplicate onSkip and fix the empty one
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