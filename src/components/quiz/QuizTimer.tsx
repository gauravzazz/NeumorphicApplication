import React from 'react';
import { StyleSheet } from 'react-native';
import { ProgressBar, useTheme } from 'react-native-paper';

interface QuizTimerProps {
  timeLeft: number;
  totalTime: number;
  onTimeUp: () => void;
}

export const QuizTimer = ({ timeLeft, totalTime, onTimeUp }: QuizTimerProps) => {
  const theme = useTheme();
  
  return (
    <ProgressBar
      progress={timeLeft / totalTime}
      color={theme.colors.primary}
      style={styles.timer}
    />
  );
};

const styles = StyleSheet.create({
  timer: {
    height: 8,
    borderRadius: 4,
  },
});