import React from 'react';
import { StyleSheet, View, Text, Dimensions, ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';
import Markdown from 'react-native-markdown-display';
import { CustomTheme } from '../../theme/theme';

interface QuestionCardProps {
  questionNumber: number;
  question: string;
  style?: ViewStyle;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SCALE_FACTOR = Math.min(SCREEN_WIDTH / 375, 1.2);
const MAX_QUESTION_LENGTH = 200;

export const QuestionCard: React.FC<QuestionCardProps> = ({
  questionNumber,
  question,
  style,
}) => {
  const theme = useTheme() as CustomTheme;

  const getNeumorphicStyle = () => ({
    backgroundColor: theme.colors.background,
    shadowColor: theme.colors.shadowDark,
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  });

  const calculateFontSize = () => {
    const baseSize = 18 * SCALE_FACTOR;
    if (question.length > MAX_QUESTION_LENGTH) {
      return baseSize * (1 - (question.length - MAX_QUESTION_LENGTH) / (MAX_QUESTION_LENGTH * 2));
    }
    return baseSize;
  };

  const markdownStyles = {
    body: {
      color: theme.colors.onSurface,
      fontSize: calculateFontSize(),
      lineHeight: calculateFontSize() * 1.5,
    },
  };

  return (
    <View style={[styles.container, getNeumorphicStyle(), style]}>
      <View style={styles.questionContent}>
        <Markdown style={markdownStyles}>{`Q${questionNumber}. ${question}`}</Markdown>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    paddingHorizontal: Math.round(16 * SCALE_FACTOR),
    paddingVertical: Math.round(8 * SCALE_FACTOR),
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  questionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Math.round(16 * SCALE_FACTOR),
    paddingVertical: Math.round(8 * SCALE_FACTOR),
  },
  questionText: {
    fontWeight: 'bold',
    color: '#000',
    marginRight: 6,
  },
});

