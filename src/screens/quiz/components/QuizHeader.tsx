import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { formatTime } from '../../../utils/timeUtils';

interface QuizHeaderProps {
  currentQuestion: number;
  totalQuestions: number;
  timeRemaining: number;
  mode: 'test' | 'practice';
  onSubmit: () => void;
  onSummary: () => void;
}

export const QuizHeader: React.FC<QuizHeaderProps> = ({
  currentQuestion,
  totalQuestions,
  timeRemaining,
  mode,
  onSubmit,
  onSummary,
}) => {
  const theme = useTheme();

  return (
    <Card variant="elevated" style={styles.headerCard}>

      <View style={styles.headerContent}>
        <View style={styles.questionCounterContainer}>
          <Text style={[styles.questionCounterLabel, { color: theme.colors.onSurfaceVariant }]}>
            Question
          </Text>
          <Text style={[styles.questionCounter, { color: theme.colors.onSurface }]}>
            {currentQuestion}/{totalQuestions}
          </Text>
        </View>
        {mode === 'test' && (
          <View style={styles.timerContainer}>
            <Text style={[styles.timerLabel, { color: theme.colors.onSurfaceVariant }]}>
              Time Remaining
            </Text>
            <Text 
              style={[
                styles.timer, 
                { 
                  color: timeRemaining < 60 ? theme.colors.error : theme.colors.primary,
                  backgroundColor: `${timeRemaining < 60 ? theme.colors.error : theme.colors.primary}15`
                }
              ]}
            >
              {formatTime(timeRemaining)}
            </Text>
          </View>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  headerCard: {
    marginBottom: 24,
    borderRadius: 16,
    elevation: 8,
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  summaryButton: {
    minWidth: 100,
  },
  submitButton: {
    minWidth: 100,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  questionCounterContainer: {
    alignItems: 'center',
  },
  questionCounterLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  questionCounter: {
    fontSize: 24,
    fontWeight: '700',
  },
  timerContainer: {
    alignItems: 'center',
  },
  timerLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  timer: {
    fontSize: 20,
    fontWeight: '700',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
});