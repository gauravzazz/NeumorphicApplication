import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { NeumorphicView } from './NeumorphicComponents';
import Markdown from 'react-native-markdown-display';
import { scale, spacing, shadows } from '../theme/scaling';
import { typography } from '../theme/typography';

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
                  heading1: { ...typography.headlineLarge, color: theme.colors.onSurface },
                  heading2: { ...typography.headlineMedium, color: theme.colors.onSurface },
                  link: { color: theme.colors.primary },
                  paragraph: { marginVertical: spacing.sm },
                  list: { marginVertical: spacing.sm },
                  listItem: { marginVertical: spacing.xs },
                  code_inline: {
                    color: theme.colors.primary,
                    backgroundColor: `${theme.colors.primary}20`,
                    paddingHorizontal: spacing.xs,
                    paddingVertical: spacing.xxs,
                    borderRadius: scale.radius.xs,
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
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderRadius: scale.radius.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionContent: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
    width: '100%',
  },
  questionTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    minHeight: scale.custom(80),
  },
  questionNumber: {
    ...typography.headlineSmall,
    flexShrink: 0,
    marginTop: spacing.sm,
  },
  markdownContainer: {
    flex: 1,
    paddingHorizontal: spacing.sm,
  },
  questionText: {
    ...typography.bodyLarge,
  },
  modeIndicator: {
    ...typography.labelMedium,
    marginLeft: spacing.sm,
  },
});