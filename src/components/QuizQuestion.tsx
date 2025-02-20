import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { NeumorphicView } from './NeumorphicComponents';
import Markdown from 'react-native-markdown-display';

interface QuizQuestionProps {
  question: string;
  questionNumber: number;
  mode: 'test' | 'practice';
}

export const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  questionNumber,
  mode,
}) => {
  const theme = useTheme();

  return (
    <NeumorphicView style={styles.questionContainer}>
      <View style={styles.questionContent}>
        <View style={styles.questionHeader}>
          <View style={styles.questionTitleContainer}>
            <Text style={[styles.questionNumber, { color: theme.colors.primary }]}>
              Q{questionNumber}.
            </Text>
            <View style={styles.markdownContainer}>
              <Markdown
                style={{
                  body: {
                    ...styles.questionText,
                    color: theme.colors.onSurface
                  },
                  heading1: { color: theme.colors.onSurface },
                  heading2: { color: theme.colors.onSurface },
                  link: { color: theme.colors.primary },
                  paragraph: { marginVertical: 8 },
                  list: { marginVertical: 8 },
                  listItem: { marginVertical: 4 },
                  code_inline: {
                    color: theme.colors.primary,
                    backgroundColor: `${theme.colors.primary}20`,
                    paddingHorizontal: 6,
                    paddingVertical: 2,
                    borderRadius: 4,
                  },
                }}
              >
                {question}
              </Markdown>
            </View>
          </View>
          {mode === 'test' && (
            <Text style={[styles.modeIndicator, { color: theme.colors.primary }]}>
              Test Mode
            </Text>
          )}
        </View>
      </View>
    </NeumorphicView>
  );
};

const styles = StyleSheet.create({
  questionContainer: {
    padding: 20,
    marginBottom: 16,
    borderRadius: 16,
  },
  questionContent: {
    flex: 1,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  questionTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    minHeight: 80,
  },
  questionNumber: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 28,
    flexShrink: 0,
    marginTop: 8,
  },
  markdownContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 8,
    paddingRight: 8,
  },
  modeIndicator: {
    fontSize: 14,
    fontWeight: '600',
    backgroundColor: 'rgba(98, 0, 238, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  questionText: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '500',
  },
});