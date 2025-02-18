import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { useTheme } from 'react-native-paper';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NeumorphicButton } from '../components/NeumorphicComponents';
import { QuizHeader } from '../components/QuizHeader';
import { QuizQuestion } from '../components/QuizQuestion';
import { QuizOption } from '../components/QuizOption';
import { Ionicons } from '@expo/vector-icons';

type QuizScreenRouteProp = RouteProp<{
  Quiz: {
    topicId: string;
    mode: 'test' | 'practice';
  };
}, 'Quiz'>;

export const QuizScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute<QuizScreenRouteProp>();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({}); 
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes in seconds

  // Mock question for testing
  const mockQuestion = {
    id: '1',
    question: 'What is the time complexity of binary search?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
    correctAnswer: '1'
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [mockQuestion.id]: optionIndex.toString()
    }));
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <QuizHeader
        timeRemaining={timeRemaining}
        mode={route.params?.mode || 'practice'}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={1}
        onSubmit={() => {
          // Handle quiz submission
          navigation.goBack();
        }}
      />
      <View style={styles.content}>
        <QuizQuestion
          question={mockQuestion.question}
          questionNumber={currentQuestionIndex + 1}
          mode={route.params?.mode || 'practice'}
        />
        <View style={styles.optionsContainer}>
          {mockQuestion.options.map((option, index) => (
            <QuizOption
              key={index}
              option={option}
              index={index}
              isSelected={selectedAnswers[mockQuestion.id] === index.toString()}
              onSelect={() => handleOptionSelect(index)}
            />
          ))}
        </View>
        <View style={styles.navigationContainer}>
          <NeumorphicButton
            style={[styles.navButton, { opacity: currentQuestionIndex === 0 ? 0.5 : 1 }]}
            onPress={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
            icon={<Ionicons name="chevron-back" size={24} color={theme.colors.primary} />}
          />
          <NeumorphicButton
            style={[styles.navButton, { opacity: currentQuestionIndex === 1 ? 0.5 : 1 }]}
            onPress={() => setCurrentQuestionIndex(prev => Math.min(1, prev + 1))}
            icon={<Ionicons name="chevron-forward" size={24} color={theme.colors.primary} />}
          />
        </View>
      </View>
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
    gap: 16,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
    paddingVertical: 24,
    gap: 16,
  },
  navButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});