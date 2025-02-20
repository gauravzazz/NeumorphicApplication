import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Card } from '../../../components/ui/Card';
import { Timer } from '../../../components/Timer';
import { Button } from '../../../components/ui/Button';
import { RoundButton } from '../../../components/ui/RoundButton';

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
    borderRadius: 16,
    elevation: 4,
    padding: 12,
    height: 60,
    marginTop: 0,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
  summaryButton: {
    height: 36,
    width: 36,
  },
  submitButton: {
    height: 36,
    minHeight: 36,
    paddingVertical: 0,
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    minWidth: 80,
  },
});