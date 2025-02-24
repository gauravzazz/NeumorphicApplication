import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { NeumorphicButton } from './NeumorphicComponents';
import { typography } from '../theme/typography';
import { scale, spacing, shadows } from '../theme/scaling';

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
  const theme = useTheme();

  const getBackgroundColor = () => {
    if (showCorrectness) {
      if (isCorrect) return theme.colors.success;
      if (isSelected) return theme.colors.error;
    }
    return isSelected ? theme.colors.primary : '#F0F0F3';
  };

  const getTextColor = () => {
    if (showCorrectness && (isCorrect || isSelected)) {
      return theme.colors.background;
    }
    return isSelected ? theme.colors.background : theme.colors.onSurface;
  };

  return (
    <NeumorphicButton
      style={[
        styles.optionButton,
        {
          backgroundColor: getBackgroundColor(),
          opacity: isDisabled ? 0.7 : 1,
        },
        isSelected && {
          shadowColor: getBackgroundColor(),
          shadowOpacity: 0.3,
          shadowOffset: { width: scale.shadow(3), height: scale.shadow(3) },
          shadowRadius: scale.shadow(6),
          elevation: shadows.md
        },
      ]}
      onPress={onSelect}
      disabled={isDisabled}
    >
      <View style={styles.optionContent}>
        <View
          style={[
            styles.optionLabel,
            isSelected && { 
              backgroundColor: theme.colors.background,
              shadowColor: getBackgroundColor(),
              shadowOpacity: 0.4,
            },
          ]}
        >
          <Text
            style={[
              styles.optionLabelText,
              { color: getTextColor() },
              typography.titleMedium
            ]}
          >
            {String.fromCharCode(65 + index)}
          </Text>
        </View>
        <Text
          style={[
            styles.optionText,
            { color: getTextColor() },
            typography.titleMedium
          ]}
        >
          {option}
        </Text>
      </View>
    </NeumorphicButton>
  );
};

const styles = StyleSheet.create({
  optionButton: {
    padding: 0,
    borderRadius: scale.radius.lg,
    overflow: 'hidden',
    marginVertical: spacing.xs,
    backgroundColor: '#F0F0F3',
    elevation: shadows.md,
    shadowColor: '#000',
    shadowOffset: { width: scale.shadow(2), height: scale.shadow(2) },
    shadowOpacity: 0.2,
    shadowRadius: scale.shadow(4),
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    minHeight: scale.custom(60),
  },
  optionLabel: {
    width: scale.custom(34),
    height: scale.custom(34),
    borderRadius: scale.radius.round,
    backgroundColor: '#F0F0F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: scale.shadow(1), height: scale.shadow(1) },
    shadowOpacity: 0.2,
    shadowRadius: scale.shadow(2),
    elevation: shadows.sm
  },
  optionLabelText: {
    ...typography.titleMedium,
  },
  optionText: {
    flex: 1,
    ...typography.titleMedium,
  },
});