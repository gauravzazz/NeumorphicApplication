import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Text, useTheme } from 'react-native-paper';

interface QuizProfileCardProps {
  name: string;
  score: number;
  isLeft: boolean;
}

export const QuizProfileCard = ({ name, score, isLeft }: QuizProfileCardProps) => {
  const theme = useTheme();

  return (
    <View style={[
      styles.container,
      { flexDirection: isLeft ? 'row' : 'row-reverse' }
    ]}>
      <Avatar.Text size={40} label={name[0]} />
      <View style={[
        styles.textContainer,
        { alignItems: isLeft ? 'flex-start' : 'flex-end' }
      ]}>
        <Text variant="titleMedium">{name}</Text>
        <Text variant="bodyMedium">Score: {score}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 8,
  },
  textContainer: {
    gap: 4,
  },
});