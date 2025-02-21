import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, Animated, TouchableOpacity, Dimensions } from 'react-native';
import { Confetti } from '../components/ui/Confetti';
import { useTheme } from 'react-native-paper';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NeumorphicView } from '../components/NeumorphicComponents';
import { RoundButton } from '../components/ui/RoundButton';
import { Ionicons } from '@expo/vector-icons';
import Markdown from 'react-native-markdown-display';
import { QuestionFilters } from './result/components/QuestionFilters';
import { saveQuizHistory } from '../utils/quizHistoryStorage';
import { saveBookmarkedQuestion, getBookmarkedQuestions } from '../utils/bookmarkStorage';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctOption: number;
  explanation: string;
  difficulty?: 'easy' | 'hard' | null;
  isBookmarked?: boolean;
}

type ResultScreenRouteProp = RouteProp<{
  Result: {
    answers: { [key: string]: number };
    questions: Array<Question>;
    timeSpent: number;
    mode: 'test' | 'practice';
    topicId: string;
    topicTitle: string;
    subjectName: string;
  };
}, 'Result'>;


export const ResultScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute<ResultScreenRouteProp>();
  const { answers, questions, timeSpent, mode, topicId, topicTitle, subjectName } = route.params;

  const [selectedFilter, setSelectedFilter] = useState<'all' | 'correct' | 'incorrect' | 'skipped'>('all');
  const [expandedExplanations, setExpandedExplanations] = useState<{ [key: string]: boolean }>({});
  const [questionDifficulties, setQuestionDifficulties] = useState<{ [key: string]: 'easy' | 'hard' | null }>({});
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<{ [key: string]: boolean }>({});

  // Add animation variables
  const [scoreAnimation] = useState(new Animated.Value(0.3));
  const [fadeAnimation] = useState(new Animated.Value(0));

  // Initialize bookmarked questions state
  useEffect(() => {
    const initializeBookmarks = async () => {
      try {
        const bookmarkedQuestions = await getBookmarkedQuestions();
        const bookmarkedMap = bookmarkedQuestions.reduce((acc, question) => {
          acc[question.id] = true;
          return acc;
        }, {} as { [key: string]: boolean });
        setBookmarkedQuestions(bookmarkedMap);
      } catch (error) {
        console.error('Error initializing bookmarks:', error);
      }
    };
    
    initializeBookmarks();

    // Add focus listener to refresh bookmarks
    const unsubscribe = navigation.addListener('focus', initializeBookmarks);
    return unsubscribe;
  }, [navigation]);

  // Initialize animations
  useEffect(() => {
    Animated.parallel([
      Animated.spring(scoreAnimation, {
        toValue: 1,
        tension: 20,
        friction: 7,
        useNativeDriver: true
      }),
      Animated.timing(fadeAnimation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      })
    ]).start();

    // Save quiz result to history
    const saveResult = async () => {
      try {
        const historyItem = {
          id: Date.now().toString(),
          date: new Date().toISOString(),
          topicId,
          topicTitle,
          subjectName,
          mode,
          score: calculateScore(),
          timeSpent,
          questions,
          answers
        };
        await saveQuizHistory(historyItem);
      } catch (error) {
        console.error('Error saving quiz history:', error);
      }
    };

    saveResult();
  }, []);

  const handleDifficultyChange = (questionId: string, difficulty: 'easy' | 'hard') => {
    setQuestionDifficulties(prev => ({
      ...prev,
      [questionId]: prev[questionId] === difficulty ? null : difficulty
    }));
  };

  const handleBookmarkToggle = async (questionId: string) => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return;

    // Optimistically update the UI
    setBookmarkedQuestions(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));

    const bookmarkedQuestion = {
      id: question.id,
      question: question.question,
      options: question.options,
      correctOption: question.correctOption,
      explanation: question.explanation,
      topicId: 'topic-1',
      topicName: 'Quiz Topic',
      dateBookmarked: new Date().toISOString()
    };

    const { success, bookmarks } = await saveBookmarkedQuestion(bookmarkedQuestion);
    if (!success) {
      // Revert the optimistic update if the operation failed
      setBookmarkedQuestions(prev => ({
        ...prev,
        [questionId]: !prev[questionId]
      }));
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question) => {
      if (answers[question.id] === question.correctOption) {
        correct++;
      }
    });
    return {
      correct,
      total: questions.length,
      percentage: Math.round((correct / questions.length) * 100),
    };
  };

  const score = calculateScore();

  const toggleExplanation = (questionId: string) => {
    setExpandedExplanations(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const filteredQuestions = questions.filter(question => {
    const userAnswer = answers[question.id];
    const isCorrect = userAnswer === question.correctOption;
    const isSkipped = userAnswer === undefined;

    switch (selectedFilter) {
      case 'correct':
        return isCorrect;
      case 'incorrect':
        return !isCorrect && !isSkipped;
      case 'skipped':
        return isSkipped;
      default:
        return true;
    }
  });

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <RoundButton
          icon="chevron-back"
          onPress={() => navigation.goBack()}
          size={40}
          style={styles.backButton}
        />
        <Text style={[styles.headerTitle, { color: theme.colors.onSurface }]}>Quiz Results</Text>
      </View>
      <Confetti isVisible={score.percentage >= 70} />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View 
          style={[{ 
            transform: [{ scale: scoreAnimation }], 
            opacity: fadeAnimation,
            marginBottom: 24
          }]}
        >
          <NeumorphicView style={styles.scoreContainer}>
            <View style={styles.resultHeader}>
              <Ionicons 
                name={score.percentage >= 70 ? "trophy" : "school"} 
                size={40} 
                color={theme.colors.primary} 
              />
              <Text style={[styles.scoreTitle, { color: theme.colors.onSurfaceVariant }]}>
                {score.percentage >= 70 ? "Excellent!" : "Quiz Complete!"}
              </Text>
            </View>
            
            <View style={styles.scoreCircle}>
              <Text style={[styles.scorePercentage, { color: theme.colors.primary }]}>
                {score.percentage}%
              </Text>
            </View>

            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: theme.colors.onSurface }]}>
                  {score.correct}
                </Text>
                <Text style={[styles.statLabel, { color: theme.colors.onSurfaceVariant }]}>
                  Correct
                </Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: theme.colors.onSurface }]}>
                  {score.total - score.correct}
                </Text>
                <Text style={[styles.statLabel, { color: theme.colors.onSurfaceVariant }]}>
                  Incorrect
                </Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: theme.colors.onSurface }]}>
                  {formatTime(timeSpent)}
                </Text>
                <Text style={[styles.statLabel, { color: theme.colors.onSurfaceVariant }]}>
                  Time Taken
                </Text>
              </View>
            </View>
          </NeumorphicView>
        </Animated.View>

        <View style={styles.questionsContainer}>
          <Text style={[styles.sectionTitle, { color: theme.colors.onSurface, paddingHorizontal: SCREEN_WIDTH * 0.02 }]}>Detailed Results</Text>
          
          <QuestionFilters
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
          />

          {filteredQuestions.map((question, index) => {
            const userAnswer = answers[question.id];
            const isCorrect = userAnswer === question.correctOption;
            const isSkipped = userAnswer === undefined;
            const isExpanded = expandedExplanations[question.id];
          
            return (
              <NeumorphicView key={question.id} style={styles.questionCard}>
                <View style={styles.questionHeader}>
                  <Text style={[styles.questionNumber, { color: theme.colors.onSurface }]}>
                    Question {index + 1}
                  </Text>
                  <View style={[styles.resultBadge, { 
                    backgroundColor: isCorrect 
                      ? 'rgba(75, 181, 67, 0.1)' 
                      : isSkipped
                      ? 'rgba(255, 165, 0, 0.1)'
                      : 'rgba(255, 76, 76, 0.1)' 
                  }]}>
                    <Ionicons
                      name={isCorrect ? 'checkmark-circle' : isSkipped ? 'help-circle' : 'close-circle'}
                      size={20}
                      color={isCorrect ? '#4BB543' : isSkipped ? '#FFA500' : '#FF4C4C'}
                    />
                    <Text style={[styles.resultBadgeText, { 
                      color: isCorrect ? '#4BB543' : isSkipped ? '#FFA500' : '#FF4C4C' 
                    }]}>
                      {isCorrect ? 'Correct' : isSkipped ? 'Skipped' : 'Incorrect'}
                    </Text>
                  </View>
                </View>

                <View style={styles.questionContent}>
                  <Markdown style={{
                    body: { color: theme.colors.onSurface, fontSize: 16, lineHeight: 24 },
                    paragraph: { marginVertical: 0 }
                  }}>
                    {question.question}
                  </Markdown>
                </View>

                <View style={styles.optionsContainer}>
                  {question.options.map((option, optionIndex) => (
                    <TouchableOpacity
                      key={optionIndex}
                      style={[
                        styles.optionItem,
                        optionIndex === userAnswer && styles.selectedOption,
                        optionIndex === question.correctOption && styles.correctOption,
                        optionIndex === userAnswer && optionIndex !== question.correctOption && styles.incorrectOption,
                        !isSkipped && optionIndex === question.correctOption && styles.correctOptionHighlight
                      ]}
                      disabled
                    >
                      <Text style={[
                        styles.optionText,
                        { color: theme.colors.onSurface },
                        optionIndex === question.correctOption && styles.correctOptionText,
                        optionIndex === userAnswer && optionIndex !== question.correctOption && styles.incorrectOptionText
                      ]}>
                        {String.fromCharCode(65 + optionIndex)}. {option}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <View style={styles.explanationContainer}>
                  <View style={styles.explanationRow}>
                    <Text style={[styles.explanationTitle, { color: theme.colors.primary }]}>Explanation: </Text>
                    <View style={styles.explanationTextContainer}>
                      <View style={styles.explanationInlineContainer}>
                        <Text 
                          numberOfLines={isExpanded ? undefined : 2}
                          style={[styles.explanationText, { color: theme.colors.onSurface, flex: 1 }]}
                        >
                          {question.explanation}
                        </Text>
                        {!isExpanded && (
                          <TouchableOpacity
                            onPress={() => toggleExplanation(question.id)}
                            style={styles.showMoreButton}
                          >
                            <Text style={[styles.showMoreText, { color: theme.colors.primary }]}>
                              Show More
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                      {isExpanded && (
                        <TouchableOpacity
                          onPress={() => toggleExplanation(question.id)}
                          style={styles.showLessButton}
                        >
                          <Text style={[styles.showMoreText, { color: theme.colors.primary }]}>
                            Show Less
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </View>

                <View style={styles.questionActions}>
                  <TouchableOpacity
                    style={[styles.actionButton, question.difficulty === 'easy' && styles.actionButtonActive]}
                    onPress={() => handleDifficultyChange(question.id, 'easy')}
                  >
                    <Ionicons
                      name="thumbs-up"
                      size={24}
                      color={question.difficulty === 'easy' ? theme.colors.primary : theme.colors.onSurfaceVariant}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, question.difficulty === 'hard' && styles.actionButtonActive]}
                    onPress={() => handleDifficultyChange(question.id, 'hard')}
                  >
                    <Ionicons
                      name="thumbs-down"
                      size={24}
                      color={question.difficulty === 'hard' ? theme.colors.primary : theme.colors.onSurfaceVariant}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, bookmarkedQuestions[question.id] && styles.actionButtonActive]}
                    onPress={() => handleBookmarkToggle(question.id)}
                  >
                    <Ionicons
                      name={bookmarkedQuestions[question.id] ? 'bookmark' : 'bookmark-outline'}
                      size={24}
                      color={bookmarkedQuestions[question.id] ? theme.colors.primary : theme.colors.onSurfaceVariant}
                    />
                  </TouchableOpacity>
                </View>
              </NeumorphicView>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SCREEN_WIDTH * 0.03,
  },
  selectedOption: {
    backgroundColor: 'rgba(98, 0, 238, 0.08)',
    borderColor: 'rgba(98, 0, 238, 0.3)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SCREEN_WIDTH * 0.03,
    paddingHorizontal: SCREEN_WIDTH * 0.01,
  },
  headerTitle: {
    fontSize: SCREEN_WIDTH * 0.05,
    fontWeight: '700',
    marginLeft: SCREEN_WIDTH * 0.03,
  },
  backButton: {
    width: SCREEN_WIDTH * 0.09,
    height: SCREEN_WIDTH * 0.09,
    borderRadius: SCREEN_WIDTH * 0.045,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  scoreContainer: {
    padding: SCREEN_WIDTH * 0.04,
    borderRadius: SCREEN_WIDTH * 0.04,
    alignItems: 'center',
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SCREEN_WIDTH * 0.02,
    marginBottom: SCREEN_WIDTH * 0.04,
  },
  scoreTitle: {
    fontSize: SCREEN_WIDTH * 0.06,
    fontWeight: '700',
  },
  scoreCircle: {
    width: SCREEN_WIDTH * 0.25,
    height: SCREEN_WIDTH * 0.25,
    borderRadius: SCREEN_WIDTH * 0.125,
    backgroundColor: 'rgba(98, 0, 238, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SCREEN_WIDTH * 0.04,
  },
  scorePercentage: {
    fontSize: SCREEN_WIDTH * 0.08,
    fontWeight: '800',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: SCREEN_WIDTH * 0.02,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: SCREEN_WIDTH * 0.05,
    fontWeight: '600',
    marginBottom: SCREEN_WIDTH * 0.01,
  },
  statLabel: {
    fontSize: SCREEN_WIDTH * 0.03,
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    height: SCREEN_WIDTH * 0.08,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginHorizontal: SCREEN_WIDTH * 0.02,
  },
  questionsContainer: {
    marginTop: SCREEN_WIDTH * 0.04,
    paddingHorizontal: SCREEN_WIDTH * 0.01,
  },
  sectionTitle: {
    fontSize: SCREEN_WIDTH * 0.045,
    fontWeight: '700',
    marginBottom: SCREEN_WIDTH * 0.03,
  },
  questionCard: {
    marginBottom: SCREEN_WIDTH * 0.02,
    padding: SCREEN_WIDTH * 0.03,
    borderRadius: SCREEN_WIDTH * 0.02,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SCREEN_WIDTH * 0.015,
  },
  questionNumber: {
    fontSize: SCREEN_WIDTH * 0.032,
    fontWeight: '600',
  },
  resultBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SCREEN_WIDTH * 0.015,
    paddingVertical: SCREEN_WIDTH * 0.008,
    borderRadius: SCREEN_WIDTH * 0.03,
    gap: SCREEN_WIDTH * 0.008,
  },
  resultBadgeText: {
    fontSize: SCREEN_WIDTH * 0.028,
    fontWeight: '600',
  },
  questionContent: {
    marginBottom: SCREEN_WIDTH * 0.015,
  },
  optionsContainer: {
    gap: SCREEN_WIDTH * 0.015,
  },
  optionItem: {
    padding: SCREEN_WIDTH * 0.025,
    borderRadius: SCREEN_WIDTH * 0.015,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  optionText: {
    fontSize: SCREEN_WIDTH * 0.032,
    fontWeight: '500',
    lineHeight: SCREEN_WIDTH * 0.042,
  },
  explanationContainer: {
    marginTop: SCREEN_WIDTH * 0.02,
    backgroundColor: 'rgba(98, 0, 238, 0.03)',
    borderRadius: SCREEN_WIDTH * 0.02,
    borderWidth: 1,
    borderColor: 'rgba(98, 0, 238, 0.15)',
    padding: SCREEN_WIDTH * 0.035,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  explanationTitle: {
    fontSize: SCREEN_WIDTH * 0.034,
    fontWeight: '700',
    letterSpacing: 0.3,
    marginBottom: SCREEN_WIDTH * 0.01,
  },
  explanationText: {
    fontSize: SCREEN_WIDTH * 0.032,
    lineHeight: SCREEN_WIDTH * 0.045,
    opacity: 0.95,
    letterSpacing: 0.2,
    fontWeight: '400',
  },
  showMoreText: {
    fontSize: SCREEN_WIDTH * 0.03,
    fontWeight: '600',
    marginLeft: SCREEN_WIDTH * 0.01,
    color: 'rgba(98, 0, 238, 0.8)',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  showMoreButton: {
    paddingLeft: SCREEN_WIDTH * 0.015,
    paddingVertical: SCREEN_WIDTH * 0.01,
    backgroundColor: 'rgba(98, 0, 238, 0.05)',
    borderRadius: SCREEN_WIDTH * 0.01,
  },
  showLessButton: {
    alignSelf: 'flex-end',
    marginTop: SCREEN_WIDTH * 0.015,
    paddingHorizontal: SCREEN_WIDTH * 0.02,
    paddingVertical: SCREEN_WIDTH * 0.01,
    backgroundColor: 'rgba(98, 0, 238, 0.05)',
    borderRadius: SCREEN_WIDTH * 0.01,
  },
  correctOption: {
    backgroundColor: 'rgba(75, 181, 67, 0.08)',
    borderColor: 'rgba(75, 181, 67, 0.3)',
  },
  incorrectOption: {
    backgroundColor: 'rgba(255, 76, 76, 0.08)',
    borderColor: 'rgba(255, 76, 76, 0.3)',
  },
  correctOptionHighlight: {
    borderWidth: 2,
  },
  correctOptionText: {
    color: '#4BB543',
    fontWeight: '600',
  },
  incorrectOptionText: {
    color: '#FF4C4C',
    fontWeight: '600',
  },
  questionActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: SCREEN_WIDTH * 0.02,
    gap: SCREEN_WIDTH * 0.02,
  },
  actionButton: {
    padding: SCREEN_WIDTH * 0.015,
    borderRadius: SCREEN_WIDTH * 0.015,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  actionButtonActive: {
    backgroundColor: 'rgba(98, 0, 238, 0.1)',
  },
  explanationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SCREEN_WIDTH * 0.01,
  },
  explanationTextContainer: {
    flex: 1,
  },
  explanationInlineContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SCREEN_WIDTH * 0.01,
  },
});