import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from '../../../components/ui/Button';
import { RoundButton } from '../../../components/ui/RoundButton';
import { scale, spacing } from '../../../theme/scaling';

interface QuizNavigationProps {
  onPrevious?: () => void;
  onNext?: () => void;
  onSkip: () => void;
  onSubmit: () => void;
  onReset?: () => void;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  style?: any;
  mode?: 'test' | 'practice';
}

export const QuizNavigation: React.FC<QuizNavigationProps> = ({
  onPrevious,
  onNext,
  onSkip,
  onSubmit,
  onReset,
  isFirstQuestion,
  isLastQuestion,
  mode = 'test',
}) => {
  return (
    <View style={styles.navigationWrapper}>
      <View style={styles.navigationContainer}>
        {mode === 'test' ? (
          <>
            {onPrevious && (
              <RoundButton
                icon="chevron-back"
                onPress={onPrevious}
                disabled={isFirstQuestion}
                size={scale.button(44)}
              />
            )}
            <Button
              mode="outlined"
              onPress={onSkip}
              style={styles.skipButton}
              title='Skip'
              disabled={isLastQuestion}
            />
            {onNext && (
              <RoundButton
                icon="chevron-forward"
                onPress={onNext}
                disabled={isLastQuestion}
                size={scale.button(44)}
              />
            )}
          </>
        ) : (
          // Practice mode - only skip button centered
          <View style={styles.practiceContainer}>
            <Button
              mode="outlined"
              onPress={onSkip}
              style={styles.skipButton}
              title='Skip'
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navigationWrapper: {
    marginTop: 'auto',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.sm,
  },
  practiceContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipButton: {
    minWidth: scale.button(120),
    paddingVertical: spacing.sm,
    borderRadius: scale.radius.md,
  },
  resetButton: {
    width: '100%',
    paddingVertical: spacing.md,
    borderRadius: scale.radius.md,
  },
  footer: {
    marginTop: spacing.md,
  },
  submitButton: {
    width: '100%',
    paddingVertical: spacing.md,
    borderRadius: scale.radius.md,
  },
});