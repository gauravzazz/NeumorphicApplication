import React, { useEffect } from 'react';
import { StyleSheet, Dimensions, Animated } from 'react-native';
import { useTheme } from 'react-native-paper';

interface ConfettiProps {
  isVisible: boolean;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const CONFETTI_COUNT = 50;

interface Particle {
  x: Animated.Value;
  y: Animated.Value;
  rotate: Animated.Value;
  scale: Animated.Value;
  color: string;
}

export const Confetti: React.FC<ConfettiProps> = ({ isVisible }) => {
  const theme = useTheme();

  const colors = [
    theme.colors.primary,
    theme.colors.secondary,
    '#FFD700', // Gold
    '#FF6B6B', // Coral
    '#4ECDC4', // Turquoise
  ];

  const createParticles = (): Particle[] => {
    return Array(CONFETTI_COUNT).fill(0).map(() => ({
      x: new Animated.Value(Math.random() * SCREEN_WIDTH),
      y: new Animated.Value(-20),
      rotate: new Animated.Value(0),
      scale: new Animated.Value(Math.random() * 0.5 + 0.5),
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
  };

  const particles = createParticles();

  useEffect(() => {
    if (isVisible) {
      const animations = particles.map((particle) => {
        const duration = Math.random() * 2000 + 2000;
        return Animated.parallel([
          Animated.timing(particle.y, {
            toValue: SCREEN_HEIGHT + 20,
            duration,
            useNativeDriver: true,
          }),
          Animated.timing(particle.x, {
            toValue: particle.x._value + (Math.random() * 200 - 100),
            duration,
            useNativeDriver: true,
          }),
          Animated.timing(particle.rotate, {
            toValue: Math.random() * 10,
            duration,
            useNativeDriver: true,
          }),
        ]);
      });

      Animated.stagger(50, animations).start();
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {particles.map((particle, index) => (
        <Animated.View
          key={index}
          style={[
            styles.particle,
            {
              backgroundColor: particle.color,
              transform: [
                { translateX: particle.x },
                { translateY: particle.y },
                { rotate: particle.rotate.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg'],
                })},
                { scale: particle.scale },
              ],
            },
          ]}
        />
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  particle: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});