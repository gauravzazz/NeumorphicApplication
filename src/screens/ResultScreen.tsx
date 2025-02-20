import React from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView } from 'react-native';
import { useTheme } from 'react-native-paper';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NeumorphicView, NeumorphicButton } from '../components/NeumorphicComponents';

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
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <NeumorphicView style={styles.scoreContainer}>
          <Text style={[styles.scoreTitle, { color: theme.colors.onSurfaceVariant }]}>
            Quiz Complete!
          </Text>
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