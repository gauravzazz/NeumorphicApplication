import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { NeumorphicButton, NeumorphicView } from './NeumorphicComponents';
import { formatTime } from '../utils/timeUtils';
import { getTextStyle } from '../theme/typography';
import { CustomTheme } from '../theme/theme';

interface QuizHeaderProps {
  timeRemaining: number;
  mode: 'test' | 'practice';
  currentQuestionIndex: number;
  totalQuestions: number;
  onSubmit: () => void;
}

export const QuizHeader: React.FC<QuizHeaderProps> = ({
  timeRemaining,
  mode,
  currentQuestionIndex,
  totalQuestions,
  onSubmit,
}) => {
  const theme = useTheme() as CustomTheme;
  const labelStyle = getTextStyle('label');
  const h2Style = getTextStyle('h2');
  const buttonStyle = getTextStyle('button');

  return (
    <View>
      <NeumorphicView style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <View style={styles.headerSection}>
            <Text style={[styles.label, labelStyle, { color: theme.colors.onSurfaceVariant }]}>Time Remaining</Text>
            <Text style={[styles.value, h2Style, { color: theme.colors.onSurface }]}>
              {formatTime(timeRemaining)}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.headerSection}>
            <Text style={[styles.label, labelStyle, { color: theme.colors.onSurfaceVariant }]}>Question</Text>
            <Text style={[styles.value, h2Style, { color: theme.colors.onSurface }]}>
              {currentQuestionIndex + 1}/{totalQuestions}
            </Text>
          </View>
        </View>
      </NeumorphicView>
      <View style={styles.submitButtonContainer}>
        <NeumorphicButton
          style={[styles.submitButton, { backgroundColor: theme.colors.success }]}
          onPress={onSubmit}
        >
          <Text style={[styles.submitButtonText, buttonStyle, { color: theme.colors.surface }]}>Submit</Text>
        </NeumorphicButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 16,
    borderRadius: 16,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  headerSection: {
    flex: 1,
    alignItems: 'center',
  },
  label: {
    marginBottom: 4,
  },
  value: {
    textAlign: 'center',
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginHorizontal: 16,
  },
  submitButtonContainer: {
    alignItems: 'flex-end',
    marginTop: 8,
    marginBottom: 16
  },
  submitButton: {
    width: '33%',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12
  },
  submitButtonText: {
    textAlign: 'center',
  },
});