import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { NeumorphicButton } from './NeumorphicComponents';

interface QuizOptionProps {
  option: string;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}

export const QuizOption: React.FC<QuizOptionProps> = ({
  option,
  index,
  isSelected,
  onSelect,
}) => {
  const theme = useTheme();

  return (
    <NeumorphicButton
      style={[
        styles.optionButton,
        isSelected && {
          backgroundColor: theme.colors.primary,
          shadowColor: theme.colors.primary,
          shadowOpacity: 0.3,
          shadowOffset: { width: 3, height: 3 },
          shadowRadius: 6,
          elevation: 8,
        },
      ]}
      onPress={onSelect}
    >
      <View style={styles.optionContent}>
        <View
          style={[
            styles.optionLabel,
            isSelected && { 
              backgroundColor: theme.colors.background,
              shadowColor: theme.colors.primary,
              shadowOpacity: 0.4,
            },
          ]}
        >
          <Text
            style={[
              styles.optionLabelText,
              { color: isSelected ? theme.colors.primary : theme.colors.onSurface },
            ]}
          >
            {String.fromCharCode(65 + index)}
          </Text>
        </View>
        <Text
          style={[
            styles.optionText,
            { color: isSelected ? theme.colors.background : theme.colors.onSurface },
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
    borderRadius: 16,
    overflow: 'hidden',
    marginVertical: 8,
    backgroundColor: '#E0E5EC',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    minHeight: 64,
  },
  optionLabel: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E0E5EC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  optionLabelText: {
    fontSize: 16,
    fontWeight: '600',
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
});