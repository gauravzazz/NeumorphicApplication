import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ViewStyle, TextStyle, StyleProp } from 'react-native';
import { useTheme } from 'react-native-paper';
import { CustomTheme } from '../theme/theme';
import { scale, spacing } from '../theme/scaling';

interface NeumorphicViewProps {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

interface NeumorphicButtonProps extends NeumorphicViewProps {
  onPress: () => void;
  textStyle?: StyleProp<TextStyle>;
  text?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const NeumorphicView: React.FC<NeumorphicViewProps> = ({ style, children }) => {
  const theme = useTheme<CustomTheme>();

  return (
    <View
      style={[
        styles.neumorphicView,
        {
          backgroundColor: theme.colors.background,
          shadowColor: theme.colors.shadowDark,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export const NeumorphicButton: React.FC<NeumorphicButtonProps> = ({
  style,
  textStyle,
  onPress,
  text,
  icon,
  iconPosition = 'left',
}) => {
  const theme = useTheme<CustomTheme>();
  const [isPressed, setIsPressed] = React.useState(false);

  const renderContent = () => {
    if (!text && !icon) return null;

    const textComponent = text ? (
      <Text
        style={[
          styles.buttonText,
          { 
            color: theme.colors.primary || '#333', // Ensuring text visibility
            textShadowColor: theme.colors.shadowDark,
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 2,
            opacity: isPressed ? 0.8 : 1
          },
          textStyle,
        ]}
      >
        {text}
      </Text>
    ) : null;

    return (
      <View 
        style={[
          styles.buttonContent, 
          { 
            flexDirection: iconPosition === 'left' ? 'row' : 'row-reverse',
            alignItems: 'center',
            justifyContent: 'center',
            gap: icon && text ? 8 : 0, // Ensuring proper spacing
            opacity: isPressed ? 0.8 : 1
          }
        ]}
      >
        {icon}
        {textComponent}
      </View>
    );
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      activeOpacity={1}
      style={[
        styles.neumorphicButton,
        {
          backgroundColor: theme.colors.background,
          borderWidth: 1,
          borderColor: isPressed ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.1)',
          shadowColor: theme.colors.shadowDark,
          transform: [{ scale: isPressed ? 0.98 : 1 }],
        },
        isPressed && styles.pressedButton,
        style,
      ]}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  neumorphicView: {
    borderRadius: scale.radius.md,
    padding: spacing.md,
    shadowOffset: { width: scale.shadow(6), height: scale.shadow(6) },
    shadowOpacity: 0.5,
    shadowRadius: scale.shadow(8),
    elevation: scale.shadow(8),
  },
  neumorphicButton: {
    borderRadius: scale.radius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    shadowOffset: { width: scale.shadow(4), height: scale.shadow(4) },
    shadowOpacity: 0.3,
    shadowRadius: scale.shadow(4),
    elevation: scale.shadow(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressedButton: {
    shadowOffset: { width: scale.shadow(2), height: scale.shadow(2) },
    shadowOpacity: 0.2,
    shadowRadius: scale.shadow(2),
    elevation: scale.shadow(2),
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: scale.text.md,
    fontWeight: '600',
    textAlign: 'center',
  },
});
