import React from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { NeumorphicView } from '../../../components/NeumorphicComponents';

interface ScoreSummaryProps {
  score: {
    correct: number;
    total: number;
    percentage: number;
  };
  timeSpent: number;
  scoreAnimation: Animated.Value;
  fadeAnimation: Animated.Value;
}

export const ScoreSummary: React.FC<ScoreSummaryProps> = ({
  score,
  timeSpent,
  scoreAnimation,
  fadeAnimation,
}) => {
  const theme = useTheme();

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
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
  );
};

const styles = StyleSheet.create({
  scoreContainer: {
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
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
});