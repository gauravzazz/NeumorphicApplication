import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { useTheme } from 'react-native-paper';

interface TimerProps {
  initialTime: number;
  onTimeEnd?: () => void;
  isRunning?: boolean;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BASE_FONT_SIZE = 24;
const FONT_SCALE = SCREEN_WIDTH / 375; // 375 is the base width for iPhone X

export const Timer: React.FC<TimerProps> = ({
  initialTime,
  onTimeEnd,
  isRunning = true,
}) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const theme = useTheme();

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning && timeRemaining > 0) {
      intervalId = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalId);
            onTimeEnd?.();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning, timeRemaining, onTimeEnd]);

  const formatTime = (seconds: number) => {
    if (typeof seconds !== 'number' || isNaN(seconds)) {
      return '0:00';
    }
    const minutes = Math.floor(Math.max(0, seconds) / 60);
    const remainingSeconds = Math.max(0, seconds) % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const isLowTime = timeRemaining < 60;

  return (
    <View style={styles.timerContainer}>
      <Text
        style={[
          styles.timerValue,
          {
            color: isLowTime ? theme.colors.error : theme.colors.primary,
            backgroundColor: `${isLowTime ? theme.colors.error : theme.colors.primary}10`,
            fontSize: Math.round(BASE_FONT_SIZE * FONT_SCALE),
          },
        ]}
      >
        {formatTime(timeRemaining)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerValue: {
    fontWeight: '700',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 12,
  },
});