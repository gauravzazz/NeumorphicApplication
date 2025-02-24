import React, { useState } from 'react';
import { StyleSheet, View, Animated, PanResponder, ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';
import { CustomTheme } from '../../theme/theme';

interface NeumorphicSliderProps {
  value: number;
  onValueChange: (value: number) => void;
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
  style?: ViewStyle;
  trackColor?: string;
  thumbColor?: string;
}

export const NeumorphicSlider: React.FC<NeumorphicSliderProps> = ({
  value,
  onValueChange,
  minimumValue = 0,
  maximumValue = 100,
  step = 1,
  style,
  trackColor,
  thumbColor,
}) => {
  const theme = useTheme() as CustomTheme;
  const [sliderWidth, setSliderWidth] = useState(0);
  const [isPressed, setIsPressed] = useState(false);
  const translateX = new Animated.Value(0);

  const getValueFromPosition = (position: number) => {
    const ratio = position / sliderWidth;
    const rawValue = minimumValue + (maximumValue - minimumValue) * ratio;
    const steppedValue = Math.round(rawValue / step) * step;
    return Math.max(minimumValue, Math.min(maximumValue, steppedValue));
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      setIsPressed(true);
    },
    onPanResponderMove: (_, gestureState) => {
      const newValue = getValueFromPosition(gestureState.moveX);
      const position = ((newValue - minimumValue) / (maximumValue - minimumValue)) * sliderWidth;
      translateX.setValue(position);
      onValueChange(newValue);
    },
    onPanResponderRelease: () => {
      setIsPressed(false);
    },
  });

  return (
    <View
      style={[styles.container, style]}
      onLayout={(event) => setSliderWidth(event.nativeEvent.layout.width)}
    >
      <View
        style={[
          styles.track,
          {
            backgroundColor: theme.colors.neumorphicDark,
            shadowColor: theme.colors.neumorphicLight,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.activeTrack,
            {
              backgroundColor: trackColor || theme.colors.primary,
              width: translateX,
            },
          ]}
        />
      </View>
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.thumb,
          {
            backgroundColor: thumbColor || theme.colors.primary,
            transform: [{ translateX }],
            shadowColor: isPressed ? theme.colors.neumorphicDark : theme.colors.neumorphicLight,
            shadowOffset: {
              width: isPressed ? -2 : 4,
              height: isPressed ? -2 : 4,
            },
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  track: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E0E0E0',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  activeTrack: {
    height: '100%',
    borderRadius: 3,
  },
  thumb: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    zIndex: 1,
  },
});