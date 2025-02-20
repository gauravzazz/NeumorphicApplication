import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from '../../../components/ui/Button';
import { RoundButton } from '../../../components/ui/RoundButton';

interface QuizNavigationProps {
  onPrevious: () => void;
  onNext: () => void;
  onSkip: () => void;
  onSubmit: () => void;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  style?: any;
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
        <RoundButton
          icon="chevron-back"
          onPress={onPrevious}
          disabled={isFirstQuestion}
          size={44}
        />
        <Button
          mode="outlined"
          onPress={onSkip}
          style={styles.skipButton}
          title='Skip'
        >
          Skip
        </Button>
        <RoundButton
          icon="chevron-forward"
          onPress={onNext}
          disabled={isLastQuestion}
          size={44}
        />
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
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  skipButton: {
    minWidth: 120,
  },
  footer: {
    marginTop: 16,
  },
  submitButton: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 12,
  },
});