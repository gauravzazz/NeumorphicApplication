import React, { useEffect } from 'react';
import { StyleSheet, View, Animated, Dimensions, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { NeumorphicView } from '../components/NeumorphicComponents';
import { Ionicons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const SplashScreen: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const theme = useTheme();
  const scaleValue = new Animated.Value(0.3);
  const opacityValue = new Animated.Value(0);
  const textOpacityValue = new Animated.Value(0);
  const textTranslateY = new Animated.Value(20);

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(scaleValue, {
          toValue: 1,
          tension: 20,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(textOpacityValue, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(textTranslateY, {
          toValue: 0,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(1000),
      Animated.parallel([
        Animated.timing(opacityValue, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(textOpacityValue, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      onFinish();
    });
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Animated.View
        style={[
          styles.content,
          {
            transform: [{ scale: scaleValue }],
            opacity: opacityValue,
          },
        ]}
      >
        <NeumorphicView style={styles.logoContainer}>
          <Ionicons name="school" size={SCREEN_WIDTH * 0.15} color={theme.colors.primary} />
        </NeumorphicView>
        <Animated.Text 
          style={[
            styles.appName,
            { 
              color: theme.colors.primary,
              opacity: textOpacityValue,
              transform: [{ translateY: textTranslateY }]
            }
          ]}
        >
          Quizine
        </Animated.Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logoContainer: {
    width: SCREEN_WIDTH * 0.3,
    height: SCREEN_WIDTH * 0.3,
    borderRadius: SCREEN_WIDTH * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SCREEN_WIDTH * 0.04,
  },
  logo: {
    width: '100%',
    height: '100%',
    borderRadius: SCREEN_WIDTH * 0.11,
  },
  appName: {
    fontSize: SCREEN_WIDTH * 0.08,
    fontWeight: '700',
    marginTop: SCREEN_WIDTH * 0.04,
    letterSpacing: 1,
  },
});