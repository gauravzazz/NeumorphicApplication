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

  const getNeumorphicStyle = () => ({
    backgroundColor: theme.colors.background,
    shadowColor: theme.colors.shadowDark,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: disabled ? 0.2 : 0.5,
    shadowRadius: 6,
    elevation: disabled ? 2 : 8,
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
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Ionicons
        name={icon}
        size={size * 0.5}
        color={disabled ? theme.colors.onSurfaceVariant : theme.colors.primary}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.6,
  },
});