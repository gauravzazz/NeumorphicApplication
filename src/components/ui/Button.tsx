import React from 'react';
import { StyleSheet, TouchableOpacity, Text, ViewStyle, TextStyle, Platform, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

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
  icon?: string;
  iconOnly?: boolean;
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
  icon,
  iconOnly = false,
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
    if (iconOnly) return 8;
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
    iconOnly && styles.iconButton,
    style,
  ];

  const textStyles = [
    styles.text,
    {
      color: getTextColor(),
      fontSize: size === 'small' ? 14 : 16,
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
      {icon && (
        <View style={iconOnly ? styles.iconOnly : styles.iconWithText}>
          <Ionicons icon={icon} size={24} color={getTextColor()} />
        </View>
      )}
      {!iconOnly && (title || children) && (
        <Text style={textStyles}>{title || children}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    padding: 0,
  },
  iconOnly: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWithText: {
    marginRight: 8,
  },
});