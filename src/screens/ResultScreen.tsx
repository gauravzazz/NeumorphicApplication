import React, { useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, Animated } from 'react-native';
import { useTheme } from 'react-native-paper';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NeumorphicView, NeumorphicButton } from '../components/NeumorphicComponents';
import { RoundButton } from '../components/ui/RoundButton';
import { Ionicons } from '@expo/vector-icons';

type ResultScreenRouteProp = RouteProp<{
  Result: {
    answers: { [key: string]: number };
    questions: Array<{
      id: string;
      question: string;
      options: string[];
      correctOption: number;
      explanation: string;
    }>;
    timeSpent: number;
    mode: 'test' | 'practice';
  };
}, 'Result'>;

export const ResultScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute<ResultScreenRouteProp>();
  const { answers, questions, timeSpent, mode } = route.params;

  const scoreAnimation = new Animated.Value(0);
  const fadeAnimation = new Animated.Value(0);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scoreAnimation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }),
      Animated.timing(fadeAnimation, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true
      })
    ]).start();
  }, []);

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
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View style={[{ transform: [{ scale: scoreAnimation }], opacity: fadeAnimation }]}>
          <NeumorphicView style={styles.scoreContainer}>
            <View style={styles.resultHeader}>
              <Ionicons 
                name={score.percentage >= 70 ? "trophy" : "school"} 
                size={32} 
                color={theme.colors.primary} 
              />
              <Text style={[styles.scoreTitle, { color: theme.colors.onSurfaceVariant }]}>
                {score.percentage >= 70 ? "Excellent!" : "Quiz Complete!"}
              </Text>
            </View>
            <Text style={[styles.scorePercentage, { color: theme.colors.primary }]}>
              {score.percentage}%
            </Text>
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

        <View style={styles.actionsContainer}>
          <NeumorphicButton
            style={[styles.actionButton, { backgroundColor: theme.colors.primary }]}
            onPress={() => {
              // Navigate to answer review screen
              console.log('Review answers');
            }}
          >
            <Text style={[styles.actionButtonText, { color: theme.colors.onPrimary }]}>
              Review Answers
            </Text>
          </NeumorphicButton>

          <NeumorphicButton
            style={styles.actionButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={[styles.actionButtonText, { color: theme.colors.onSurface }]}>
              Back to Topic
            </Text>
          </NeumorphicButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  content: {
    flex: 1,
  },
  scoreContainer: {
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
  },
  scoreTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  scorePercentage: {
    fontSize: 48,
    fontWeight: '800',
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E0E5EC',
    marginHorizontal: 16,
  },
  actionsContainer: {
    marginTop: 32,
    gap: 16,
  },
  actionButton: {
    paddingVertical: 16,
    borderRadius: 12,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});