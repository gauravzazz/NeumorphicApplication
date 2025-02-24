import React from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { CustomTheme } from '../../theme/theme';

interface RoundButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  style?: ViewStyle;
  size?: number;
  disabled?: boolean;
}

export const RoundButton: React.FC<RoundButtonProps> = ({
  icon,
  onPress,
  style,
  size = 50,
  disabled = false,
}) => {
  const theme = useTheme() as CustomTheme;
  const [isPressed, setIsPressed] = React.useState(false);

  const getNeumorphicStyle = () => ({
    backgroundColor: theme.colors.background,
    shadowColor: isPressed ? theme.colors.buttonShadowDark : theme.colors.buttonShadowLight,
    shadowOffset: {
      width: isPressed ? 4 : -4,
      height: isPressed ? 4 : -4,
    },
    shadowOpacity: isPressed ? 0.5 : 1,
    shadowRadius: 8,
    elevation: isPressed ? 2 : 8,
    transform: [{ scale: isPressed ? 0.98 : 1 }],
  });

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getNeumorphicStyle(),
        { width: size, height: size },
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      disabled={disabled}
      activeOpacity={1}
    >
      <Ionicons
        name={icon}
        size={size * 0.5}
        color={disabled ? theme.colors.buttonDisabled : theme.colors.primary}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  disabled: {
    opacity: 0.6,
  },
});