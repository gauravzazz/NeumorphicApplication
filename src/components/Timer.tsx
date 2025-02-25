import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, Platform } from 'react-native';
import { useTheme } from 'react-native-paper';

interface TimerProps {
  initialTime: number;
  onTimeEnd?: () => void;
  isRunning?: boolean;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const MIN_FONT_SIZE = 18;
const MAX_FONT_SIZE = 32;
const FONT_SCALE = Math.min(SCREEN_WIDTH / 375, SCREEN_HEIGHT / 812);

export const Timer: React.FC<TimerProps> = ({
  initialTime,
  onTimeEnd,
  isRunning = true,
}) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const intervalRef = useRef<NodeJS.Timeout>();
  const theme = useTheme();

  useEffect(() => {
    setTimeRemaining(initialTime);
  }, [initialTime]);

  useEffect(() => {
    if (isRunning && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining((prevTime) => {
          const newTime = prevTime - 1;
          if (newTime <= 0) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }
            onTimeEnd?.();
            return 0;
          }
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, onTimeEnd, initialTime]);

  const formatTime = (seconds: number) => {
    if (typeof seconds !== 'number' || isNaN(seconds)) {
      return '0:00';
    }
    const minutes = Math.floor(Math.max(0, seconds) / 60);
    const remainingSeconds = Math.max(0, seconds) % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const isLowTime = timeRemaining < 60;
  const dynamicFontSize = Math.min(MAX_FONT_SIZE, Math.max(MIN_FONT_SIZE, Math.round(24 * FONT_SCALE)));

  return (
    <View style={styles.timerContainer}>
      <Text
        style={[
          styles.timerValue,
          {
            color: isLowTime ? theme.colors.error : theme.colors.primary,
            //backgroundColor: `${isLowTime ? theme.colors.error : theme.colors.primary}10`,
            fontSize: dynamicFontSize,
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
    minWidth: 80,
  },
  timerValue: {
    fontWeight: '700',
    paddingHorizontal: Math.round(16 * FONT_SCALE),
    paddingVertical: Math.round(6 * FONT_SCALE),
    borderRadius: 12,
    textAlign: 'center',
    fontFamily: Platform.select({ ios: 'Courier', android: 'monospace' }),
    letterSpacing: 2,
  },
});