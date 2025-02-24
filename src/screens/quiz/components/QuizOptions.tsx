import React from 'react';
import { StyleSheet, View } from 'react-native';
import { OptionButton } from '../../../components/ui/OptionButton';

interface QuizOptionsProps {
  options: string[];
  selectedOption: number | null;
  onOptionSelect: (index: number) => void;
  correctOption?: number;
  mode: 'test' | 'practice';
}

export const QuizOptions: React.FC<QuizOptionsProps> = ({
  options,
  selectedOption,
  onOptionSelect,
  correctOption,
  mode,
}) => {
  const handleOptionSelect = (index: number) => {
    if (selectedOption === null) {
      onOptionSelect(index);
    }
  };

  return (
    <View style={styles.optionsContainer}>
      {options.map((option, index) => (
        <OptionButton
          key={index}
          option={String.fromCharCode(65 + index)}
          text={option}
          selected={selectedOption === index}
          onPress={() => handleOptionSelect(index)}
          style={styles.optionButton}
          disabled={selectedOption !== null}
          isCorrect={
            mode === 'practice' && selectedOption !== null
              ? index === correctOption
              : undefined
          }
        />
      ))}    
    </View>
  );
};

const styles = StyleSheet.create({
  optionsContainer: {
    gap: 16,
    marginBottom: 32,
    paddingHorizontal: 8,
  },
  optionButton: {
    width: '100%',
    marginVertical: 0,
  },
});