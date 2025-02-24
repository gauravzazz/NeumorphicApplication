import React from 'react';
import { StyleSheet } from 'react-native';
import { OptionButton } from './ui/OptionButton';
import { scale, spacing } from '../theme/scaling';

interface QuizOptionProps {
  option: string;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  isCorrect?: boolean;
  isDisabled?: boolean;
  showCorrectness?: boolean;
}

export const QuizOption: React.FC<QuizOptionProps> = ({
  option,
  index,
  isSelected,
  onSelect,
  isCorrect,
  isDisabled,
  showCorrectness,
}) => {
  const optionLetter = String.fromCharCode(65 + index);
  
  return (
    <OptionButton
      option={optionLetter}
      text={option}
      selected={isSelected}
      disabled={isDisabled}
      onPress={onSelect}
      isCorrect={showCorrectness ? isCorrect : undefined}
      style={styles.optionButton}
    />
  );
};

const styles = StyleSheet.create({
  optionButton: {
    marginVertical: spacing.xs,
    borderRadius: scale.radius.lg,
  },
});