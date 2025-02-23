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
  isFirstQuestion,
  isLastQuestion,
}) => {
  return (
    <View style={styles.navigationWrapper}>
      <View style={styles.navigationContainer}>
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
        />
        {onNext && (
          <RoundButton
            icon="chevron-forward"
            onPress={onNext}
            disabled={isLastQuestion}
            size={scale.button(44)}
          />
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
  skipButton: {
    minWidth: scale.button(120),
    paddingVertical: spacing.sm,
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