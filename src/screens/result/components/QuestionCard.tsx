import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { NeumorphicView } from '../../../components/NeumorphicComponents';
import Markdown from 'react-native-markdown-display';

interface QuestionCardProps {
  question: {
    id: string;
    question: string;
    options: string[];
    correctOption: number;
    explanation: string;
  };
  userAnswer?: number;
  index: number;
  isExpanded: boolean;
  onToggleExpand: (questionId: string) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  userAnswer,
  index,
  isExpanded,
  onToggleExpand,
}) => {
  const theme = useTheme();
  const isCorrect = userAnswer === question.correctOption;
  const isSkipped = userAnswer === undefined;

  return (
    <NeumorphicView style={styles.questionCard}>
      <View style={styles.questionHeader}>
        <Text style={[styles.questionNumber, { color: theme.colors.onSurface }]}>
          Question {index + 1}
        </Text>
        <View style={[styles.resultBadge, { backgroundColor: isCorrect ? 'rgba(75, 181, 67, 0.1)' : 'rgba(255, 76, 76, 0.1)' }]}>
          <Ionicons
            name={isCorrect ? 'checkmark-circle' : 'close-circle'}
            size={20}
            color={isCorrect ? '#4BB543' : '#FF4C4C'}
          />
          <Text style={[styles.resultBadgeText, { color: isCorrect ? '#4BB543' : '#FF4C4C' }]}>
            {isCorrect ? 'Correct' : 'Incorrect'}
          </Text>
        </View>
      </View>

      <View style={styles.questionContent}>
        <Markdown style={{
          body: { color: theme.colors.onSurface, fontSize: 16, lineHeight: 24 },
          paragraph: { marginVertical: 0 }
        }}>
          {question.question}
        </Markdown>
      </View>

      <View style={styles.optionsContainer}>
        {question.options.map((option, optionIndex) => (
          <TouchableOpacity
            key={optionIndex}
            style={[
              styles.optionItem,
              optionIndex === userAnswer && styles.selectedOption,
              optionIndex === question.correctOption && styles.correctOption,
              optionIndex === userAnswer && optionIndex !== question.correctOption && styles.incorrectOption,
              !isSkipped && optionIndex === question.correctOption && styles.correctOptionHighlight
            ]}
            disabled
          >
            <Text style={[
              styles.optionText,
              { color: theme.colors.onSurface },
              optionIndex === question.correctOption && styles.correctOptionText,
              optionIndex === userAnswer && optionIndex !== question.correctOption && styles.incorrectOptionText
            ]}>
              {String.fromCharCode(65 + optionIndex)}. {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {(!isCorrect || isSkipped) && (
        <View style={styles.explanationContainer}>
          <Text style={[styles.explanationTitle, { color: theme.colors.primary }]}>Explanation:</Text>
          <Text 
            numberOfLines={isExpanded ? undefined : 2}
            style={[styles.explanationText, { color: theme.colors.onSurface }]}
          >
            {question.explanation}
          </Text>
          <TouchableOpacity
            onPress={() => onToggleExpand(question.id)}
            style={styles.showMoreButton}
          >
            <Text style={[styles.showMoreText, { color: theme.colors.primary }]}>
              {isExpanded ? 'Show Less' : 'Show More'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </NeumorphicView>
  );
};

const styles = StyleSheet.create({
  questionCard: {
    marginBottom: 24,
    padding: 20,
    borderRadius: 16,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  questionNumber: {
    fontSize: 18,
    fontWeight: '600',
  },
  resultBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  resultBadgeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  questionContent: {
    marginBottom: 16,
  },
  optionsContainer: {
    gap: 12,
  },
  optionItem: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  selectedOption: {
    backgroundColor: 'rgba(98, 0, 238, 0.1)',
    borderColor: 'rgba(98, 0, 238, 0.3)',
  },
  correctOption: {
    backgroundColor: 'rgba(75, 181, 67, 0.1)',
    borderColor: 'rgba(75, 181, 67, 0.3)',
  },
  incorrectOption: {
    backgroundColor: 'rgba(255, 76, 76, 0.1)',
    borderColor: 'rgba(255, 76, 76, 0.3)',
  },
  correctOptionHighlight: {
    backgroundColor: 'rgba(75, 181, 67, 0.1)',
    borderColor: 'rgba(75, 181, 67, 0.3)',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
  },
  correctOptionText: {
    color: '#4BB543',
    fontWeight: '600',
  },
  incorrectOptionText: {
    color: '#FF4C4C',
    fontWeight: '600',
  },
  explanationContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: 'rgba(98, 0, 238, 0.05)',
    borderRadius: 12,
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  explanationText: {
    fontSize: 14,
    lineHeight: 20,
  },
  showMoreButton: {
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  showMoreText: {
    fontSize: 14,
    fontWeight: '600',
  },
});