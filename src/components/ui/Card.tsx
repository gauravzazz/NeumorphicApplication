import React from 'react';
import { StyleSheet, View, ViewStyle, Platform, Pressable } from 'react-native';
import { useTheme } from 'react-native-paper';
import { CustomTheme } from '../../theme/theme';
interface CardProps {
  children: React.ReactNode;
  variant?: 'elevated' | 'outlined' | 'filled';
  style?: ViewStyle;
  onPress?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'elevated',
  style,
  onPress,
}) => {
  const theme = useTheme() as CustomTheme;
  const [isPressed, setIsPressed] = React.useState(false);

  const getNeumorphicStyle = () => {
    const baseColor = theme.colors.background;

    if (Platform.OS === 'ios') {
      return {
        shadowColor: theme.colors.shadowDark,
        shadowOffset: {
          width: isPressed ? 2 : 6,
          height: isPressed ? 2 : 6,
        },
        shadowOpacity: isPressed ? 0.2 : 0.5,
        shadowRadius: isPressed ? 4 : 8,
      };
    } else {
      return {
        elevation: isPressed ? 2 : 8,
      };
    }
  };

  const cardStyles = [
    styles.card,
    {
      backgroundColor: theme.colors.background,
      borderColor: variant === 'outlined' ? theme.colors.primary : 'transparent',
      borderWidth: variant === 'outlined' ? 1 : 0,
      transform: [{ scale: isPressed ? 0.98 : 1 }],
      ...getNeumorphicStyle(),
    },
    style,
  ];

  const CardWrapper = onPress ? Pressable : View;
  const pressableProps = onPress ? {
    onPressIn: () => setIsPressed(true),
    onPressOut: () => setIsPressed(false),
    onPress,
  } : {};

  return (
    <CardWrapper style={cardStyles} {...pressableProps}>
      {children}
    </CardWrapper>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    backgroundColor: '#F0F0F3',
  },
});