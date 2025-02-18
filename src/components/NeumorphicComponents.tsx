import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from 'react-native-paper';
import { CustomTheme } from '../theme/theme';

interface NeumorphicViewProps {
  style?: ViewStyle;
  children?: React.ReactNode;
}

interface NeumorphicButtonProps extends NeumorphicViewProps {
  onPress: () => void;
  textStyle?: TextStyle;
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

  const renderContent = () => {
    if (!text && !icon) return null;

    if (!text) return icon;
    if (!icon) return (
      <Text
        style={[
          styles.buttonText,
          { color: theme.colors.onSurface },
          textStyle,
        ]}
      >
        {text}
      </Text>
    );

    const textComponent = (
      <Text
        style={[
          styles.buttonText,
          { color: theme.colors.onSurface },
          textStyle,
        ]}
      >
        {text}
      </Text>
    );

    return (
      <View style={[styles.buttonContent, { flexDirection: iconPosition === 'left' ? 'row' : 'row-reverse' }]}>
        {icon}
        {textComponent}
      </View>
    );
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.neumorphicButton,
        {
          backgroundColor: theme.colors.background,
          shadowColor: theme.colors.shadowDark,
        },
        style,
      ]}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  neumorphicView: {
    borderRadius: 12,
    padding: 16,
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  neumorphicButton: {
    borderRadius: 12,
    padding: 16,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});