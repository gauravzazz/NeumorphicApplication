import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { CustomAlert } from '../../components/ui/CustomAlert';
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

  const [timeRemaining, setTimeRemaining] = useState(timeLimit * 60);
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
  }, [mode, timeLimit, questions]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (mode === 'test' && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
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

      <Modal
        visible={isQuestionTrayVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsQuestionTrayVisible(false)}
        statusBarTranslucent
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsQuestionTrayVisible(false)}
        >
          <View style={[styles.questionTray, { backgroundColor: theme.colors.background }]}>
            <View style={styles.trayHeader}>
              <Text style={[styles.trayTitle, { color: theme.colors.onSurface }]}>
                Question Summary
              </Text>
              <TouchableOpacity
                style={[styles.filterButton, filterSkipped && styles.filterButtonActive]}
                onPress={() => setFilterSkipped(!filterSkipped)}
              >
                <Text style={[styles.filterButtonText, { color: filterSkipped ? theme.colors.primary : theme.colors.onSurface }]}>
                  Show Skipped
                </Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.questionGrid}>
              <View style={styles.gridContainer}>
                {filteredQuestions.map((_, index) => {
                  const isAnswered = answers[questions[index].id] !== undefined;
                  const isCurrent = index === currentQuestionIndex;
                  return (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.questionItem,
                        isAnswered && styles.answeredQuestion,
                        isCurrent && styles.currentQuestion,
                        { borderColor: theme.colors.primary }
                      ]}
                      onPress={() => handleQuestionSelect(index)}
                    >
                      <Text
                        style={[
                          styles.questionNumber,
                          { color: isAnswered ? theme.colors.primary : theme.colors.onSurface }
                        ]}
                      >
                        {index + 1}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  optionsContainer: {
    marginBottom: 10,
  },
  questionCard: {
    flex: 1,
    marginBottom: 24,
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  navigationContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingBottom: 32,
    paddingTop: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  questionTray: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: '70%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  trayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  questionGrid: {
    maxHeight: '80%',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 12,
    paddingBottom: 20,
  },
  questionItem: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionNumber: {
    fontSize: 16,
    fontWeight: '600',
  },
  answeredQuestion: {
    backgroundColor: 'rgba(98, 0, 238, 0.15)',
  },
  currentQuestion: {
    borderWidth: 3,
  },
  trayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  filterButtonActive: {
    backgroundColor: 'rgba(98, 0, 238, 0.1)',
    borderColor: 'rgba(98, 0, 238, 0.5)',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
