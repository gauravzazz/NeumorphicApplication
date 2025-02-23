import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';
import { CustomTheme } from '../../theme/theme';

interface OptionButtonProps {
  option: string;
  text: string;
  selected?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  onPress?: () => void;
  isCorrect?: boolean;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SCALE_FACTOR = Math.min(SCREEN_WIDTH / 375, 1.2);

export const OptionButton: React.FC<OptionButtonProps> = ({
  option,
  text,
  selected = false,
  disabled = false,
  style,
  onPress,
  isCorrect,
}) => {
  const theme = useTheme() as CustomTheme;
  const [isPressed, setIsPressed] = React.useState(false);

  const getNeumorphicStyle = () => {
    if (selected || (isCorrect && isCorrect !== undefined)) {
      const backgroundColor = isCorrect !== undefined
        ? (isCorrect ? theme.colors.success : theme.colors.error)
        : theme.colors.primaryContainer;

      return {
        backgroundColor,
        shadowColor: theme.colors.shadowDark,
        shadowOffset: {
          width: -3,
          height: -3,
        },
        shadowOpacity: 0.4,
        shadowRadius: 6,
        elevation: 4,
      };
    }

    return {
      backgroundColor: theme.colors.background,
      shadowColor: theme.colors.shadowDark,
      shadowOffset: {
        width: isPressed ? -2 : 6,
        height: isPressed ? -2 : 6,
      },
      shadowOpacity: isPressed ? 0.3 : 0.5,
      shadowRadius: isPressed ? 3 : 8,
      elevation: isPressed ? 2 : 8,
    };
  };

  const buttonStyles = [
    styles.button,
    getNeumorphicStyle(),
    {
      opacity: disabled ? 0.6 : 1,
      transform: [{ scale: isPressed ? 0.98 : 1 }],
      borderWidth: 1,
      borderColor: theme.colors.background,
    },
    style,
  ];

  const indicatorStyles = [
    styles.indicator,
    {
      backgroundColor: (selected || isCorrect) ? theme.colors.background : theme.colors.background,
      borderColor: isCorrect !== undefined
        ? (isCorrect ? theme.colors.success : theme.colors.error)
        : theme.colors.primary,
    },
  ];

  const textStyles = [
    styles.text,
    {
      color: (selected || isCorrect)
        ? (isCorrect !== undefined
          ? (isCorrect ? theme.colors.success : theme.colors.error)
          : theme.colors.onSurface)
        : theme.colors.onSurface,
    },
  ];

  const optionTextStyles = [
    styles.optionText,
    {
      color: (selected || isCorrect)
        ? (isCorrect !== undefined
          ? (isCorrect ? theme.colors.success : theme.colors.error)
          : theme.colors.onSurface)
        : theme.colors.onSurface,
    },
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      disabled={disabled}
      activeOpacity={1}
    >
      <View style={indicatorStyles}>
        <Text style={optionTextStyles}>{option.toUpperCase()}</Text>
      </View>
      <Text style={textStyles} numberOfLines={2}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Math.round(12 * SCALE_FACTOR),
    borderRadius: 16,
    marginVertical: 8,
  },
  indicator: {
    width: Math.round(32 * SCALE_FACTOR),
    height: Math.round(32 * SCALE_FACTOR),
    borderRadius: Math.round(16 * SCALE_FACTOR),
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Math.round(12 * SCALE_FACTOR),
  },
  optionText: {
    fontSize: Math.round(16 * SCALE_FACTOR),
    fontWeight: '600',
  },
  text: {
    flex: 1,
    fontSize: Math.round(14 * SCALE_FACTOR),
    fontWeight: '500',
  },
});