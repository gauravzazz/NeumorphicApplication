import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
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

type QuizScreenRouteProp = RouteProp<{
  Quiz: {
    topicId: string;
    topicTitle: string;
    subjectName: string;
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
  const { mode, timeLimit, questions, topicId, topicTitle, subjectName } = route.params;

  const [timeRemaining, setTimeRemaining] = useState(mode === 'test' ? timeLimit * 60 : 0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [isQuestionTrayVisible, setIsQuestionTrayVisible] = useState(false);
  const [showSubmitAlert, setShowSubmitAlert] = useState(false);
  const [showToast, setShowToast] = useState(true);
  
  useEffect(() => {
    const initializeQuiz = () => {
      setCurrentQuestionIndex(0);
      setSelectedOption(null);
      setAnswers({});
      setTimeRemaining(mode === 'test' ? timeLimit * 60 : 0);
      setIsQuestionTrayVisible(false);
      setShowSubmitAlert(false);
      setShowToast(true);
    };

    initializeQuiz();

    return () => {
      setCurrentQuestionIndex(0);
      setSelectedOption(null);
      setAnswers({});
      setTimeRemaining(0);
      setIsQuestionTrayVisible(false);
      setShowSubmitAlert(false);
      setShowToast(false);
    };
  }, [mode, timeLimit, questions, topicId]);

  useEffect(() => {
    if (mode === 'test') {
      setTimeRemaining(timeLimit * 60);
    }
  }, [mode, timeLimit]);

  const handleTimeEnd = () => {
    if (mode === 'test') {
      handleSubmit();
    }
  };

  useEffect(() => {
    const currentAnswer = answers[questions[currentQuestionIndex].id];
    setSelectedOption(currentAnswer !== undefined ? currentAnswer : null);
  }, [currentQuestionIndex, answers]);

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
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSkipQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setAnswers(prev => {
        const updatedAnswers = { ...prev };
        delete updatedAnswers[questions[currentQuestionIndex].id];
        return updatedAnswers;
      });
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setAnswers(prev => {
        const updatedAnswers = { ...prev };
        delete updatedAnswers[questions[currentQuestionIndex].id];
        return updatedAnswers;
      });
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    setShowSubmitAlert(true);
  };

  const navigateToResult = () => {
    navigation.navigate('Result', {
      answers,
      questions,
      timeSpent: Math.max(0, timeLimit * 60 - timeRemaining),
      mode,
      topicId,
      topicTitle,
      subjectName
    });
  };

  const handleSummary = () => {
    setIsQuestionTrayVisible(true);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>      
      <Toast visible={showToast} message={`Starting ${mode} mode quiz for ${topicTitle}`} onHide={() => setShowToast(false)} style={styles.toast} />
      <QuizHeader 
        currentQuestion={currentQuestionIndex + 1} 
        totalQuestions={questions.length} 
        timeRemaining={timeRemaining} 
        mode={mode} 
        onSubmit={handleSubmit} 
        onSummary={handleSummary}
        topicTitle={topicTitle}
        subjectName={subjectName}
      />
      <QuestionCard questionNumber={currentQuestionIndex + 1} question={questions[currentQuestionIndex].question} style={styles.questionCard} />
      <View style={styles.optionsContainer}>
        <QuizOptions options={questions[currentQuestionIndex].options} selectedOption={selectedOption} onOptionSelect={handleOptionSelect} />
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
        onQuestionSelect={setCurrentQuestionIndex} 
      />
      <CustomAlert 
        visible={showSubmitAlert} 
        title="Submit Quiz" 
        message={`You have answered ${Object.keys(answers).length} out of ${questions.length} questions. Are you sure you want to submit?`} 
        onConfirm={() => { setShowSubmitAlert(false); navigateToResult(); }} 
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
    marginBottom: 16,
  },
  questionCard: {
    flex: 1,
    marginBottom: 16,
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigationContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  toast: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    zIndex: 9999,
  },
});
