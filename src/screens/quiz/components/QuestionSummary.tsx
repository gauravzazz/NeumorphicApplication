import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';
import { CustomTheme } from '../../../theme/theme';
import { Ionicons } from '@expo/vector-icons';

interface QuestionSummaryProps {
  totalQuestions: number;
  attemptedQuestions: number[];
  skippedQuestions: number[];
  onQuestionPress: (questionNumber: number) => void;
}

export const QuestionSummary: React.FC<QuestionSummaryProps> = ({
  totalQuestions,
  attemptedQuestions,
  skippedQuestions,
  onQuestionPress,
}) => {
  const theme = useTheme() as CustomTheme;
  const [showSkippedOnly, setShowSkippedOnly] = useState(false);

  const getQuestionStyle = (questionNumber: number) => {
    const isAttempted = attemptedQuestions.includes(questionNumber);
    const isSkipped = skippedQuestions.includes(questionNumber);

    return {
      backgroundColor: isAttempted
        ? theme.colors.primary
        : isSkipped
        ? 'transparent'
        : theme.colors.surfaceVariant,
      borderColor: isSkipped ? theme.colors.error : theme.colors.primary,
      borderWidth: isSkipped ? 2 : 0,
    };
  };

  const getQuestionTextStyle = (questionNumber: number) => {
    const isAttempted = attemptedQuestions.includes(questionNumber);
    const isSkipped = skippedQuestions.includes(questionNumber);

    return {
      color: isAttempted
        ? theme.colors.onPrimary
        : isSkipped
        ? theme.colors.error
        : theme.colors.onSurfaceVariant,
    };
  };

  const renderQuestions = () => {
    const questions = Array.from({ length: totalQuestions }, (_, i) => i + 1);
    const filteredQuestions = showSkippedOnly
      ? questions.filter(q => skippedQuestions.includes(q))
      : questions;

    return filteredQuestions.map(questionNumber => (
      <TouchableOpacity
        key={questionNumber}
        style={[
          styles.questionButton,
          getQuestionStyle(questionNumber),
          {
            shadowColor: theme.colors.shadowDark,
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 4,
          },
        ]}
        onPress={() => onQuestionPress(questionNumber)}
      >
        <Text
          style={[
            styles.questionText,
            getQuestionTextStyle(questionNumber),
          ]}
        >
          {questionNumber}
        </Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.onSurface }]}>
          Question Summary
        </Text>
        <TouchableOpacity
          style={[
            styles.filterButton,
            {
              backgroundColor: showSkippedOnly
                ? theme.colors.primary
                : theme.colors.surface,
              shadowColor: theme.colors.shadowDark,
              shadowOffset: { width: 2, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 4,
            },
          ]}
          onPress={() => setShowSkippedOnly(!showSkippedOnly)}
        >
          <Ionicons
            name="filter"
            size={20}
            color={showSkippedOnly ? theme.colors.onPrimary : theme.colors.primary}
          />
          <Text
            style={[
              styles.filterText,
              {
                color: showSkippedOnly
                  ? theme.colors.onPrimary
                  : theme.colors.primary,
              },
            ]}
          >
            {showSkippedOnly ? 'All Questions' : 'Skipped Only'}
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={styles.questionsContainer}
        showsVerticalScrollIndicator={false}
      >
        {renderQuestions()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    gap: 4,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
  },
  questionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingBottom: 16,
  },
  questionButton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 16,
    fontWeight: '600',
  },
});