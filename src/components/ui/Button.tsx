import React from 'react';
import { StyleSheet, TouchableOpacity, Text, ViewStyle, TextStyle, Platform } from 'react-native';
import { useTheme } from 'react-native-paper';

interface ButtonProps {
  onPress: () => void;
  title?: string;
  mode?: 'outlined' | 'contained';
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  mode,
  variant = mode === 'outlined' ? 'outline' : 'primary',
  size = 'medium',
  disabled = false,
  style,
  textStyle,
  children,
}) => {
  const theme = useTheme();

  const getBackgroundColor = () => {
    if (disabled) return theme.colors.surfaceDisabled;
    switch (variant) {
      case 'primary':
        return theme.colors.primary;
      case 'secondary':
        return theme.colors.secondary;
      case 'outline':
        return theme.colors.surface;
      default:
        return theme.colors.primary;
    }
  };

  const getTextColor = () => {
    if (disabled) return theme.colors.onSurfaceDisabled;
    switch (variant) {
      case 'outline':
        return theme.colors.primary;
      default:
        return theme.colors.onPrimary;
    }
  };

  const getPadding = () => {
    switch (size) {
      case 'small':
        return 8;
      case 'large':
        return 16;
      default:
        return 12;
    }
  };

  const getNeumorphicStyle = () => {
    const isPressed = false;
    const baseColor = getBackgroundColor();
    
    if (Platform.OS === 'ios') {
      return {
        shadowColor: variant === 'outline' ? theme.colors.primary : baseColor,
        shadowOffset: {
          width: isPressed ? -2 : 4,
          height: isPressed ? -2 : 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
      };
    } else {
      return {
        elevation: isPressed ? 2 : 8,
      };
    }
  };

  const buttonStyles = [
    styles.button,
    {
      backgroundColor: getBackgroundColor(),
      padding: getPadding(),
      borderColor: variant === 'outline' ? theme.colors.primary : 'transparent',
      borderWidth: variant === 'outline' ? 1 : 0,
      ...getNeumorphicStyle(),
    },
    style,
  ];

  const textStyles = [
    styles.text,
    {
      color: getTextColor(),
      fontSize: size === 'small' ? 14 : size === 'large' ? 18 : 16,
    },
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={textStyles}>{children || title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
  },
});