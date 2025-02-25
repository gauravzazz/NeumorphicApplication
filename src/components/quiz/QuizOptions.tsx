import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Button } from 'react-native-paper';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface QuizOptionsProps {
  options: string[];
  onSelect: (index: number) => void;
}

export const QuizOptions = ({ options, onSelect }: QuizOptionsProps) => {
  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <Button
          key={index}
          mode="contained"
          onPress={() => onSelect(index)}
          style={styles.option}
        >
          {option}
        </Button>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: SCREEN_WIDTH * 0.03,
  },
  option: {
    borderRadius: SCREEN_WIDTH * 0.02,
  },
});