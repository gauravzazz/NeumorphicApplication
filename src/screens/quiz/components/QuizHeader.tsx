import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Card } from '../../../components/ui/Card';
import { Timer } from '../../../components/Timer';
import { Button } from '../../../components/ui/Button';
import { RoundButton } from '../../../components/ui/RoundButton';
import { scale, shadows, spacing } from '../../../theme/scaling';

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
        <RoundButton
          icon="list-outline"
          onPress={onSummary}
          style={styles.summaryButton}
          size={36}
        />
        <Timer 
          initialTime={timeRemaining}
          onTimeEnd={onSubmit}
          isRunning={true}
        />
        <Button
          variant="primary"
          onPress={onSubmit}
          title="Submit"
          style={styles.submitButton}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  headerCard: {
    borderRadius: scale.radius.lg,
    elevation: shadows.md,
    padding: spacing.sm,
    height: scale.custom(60),
    marginTop: 0,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
  summaryButton: {
    height: scale.button(36),
    width: scale.button(36),
  },
  submitButton: {
    height: scale.button(36),
    minHeight: scale.button(36),
    paddingVertical: 0,
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    minWidth: scale.button(80),
  },
});