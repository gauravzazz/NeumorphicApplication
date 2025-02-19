import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base dimensions (iPhone 11 Pro)
const BASE_DEVICE_WIDTH = 375;
const BASE_DEVICE_HEIGHT = 812;

// Scale factors
const MIN_SCALE = 0.85;
const MAX_SCALE = 1.25;

// Calculate dynamic scale factors
export const horizontalScale = Math.min(
  Math.max(SCREEN_WIDTH / BASE_DEVICE_WIDTH, MIN_SCALE),
  MAX_SCALE
);

export const verticalScale = Math.min(
  Math.max(SCREEN_HEIGHT / BASE_DEVICE_HEIGHT, MIN_SCALE),
  MAX_SCALE
);

// Use the smaller scale for moderate scaling
export const moderateScale = Math.min(horizontalScale, verticalScale);

// Utility functions for different types of scaling
export const scale = {
  // Spacing (margin, padding)
  spacing: (size: number) => Math.round(size * moderateScale),

  // Font sizes
  font: (size: number) => Math.round(size * moderateScale * 10) / 10,

  // Border radius
  radius: (size: number) => Math.round(size * moderateScale),

  // Border width
  border: (size: number) => Math.max(1, Math.round(size * moderateScale)),

  // Shadow properties
  shadow: (size: number) => Math.round(size * moderateScale),

  // Icon sizes
  icon: (size: number) => Math.round(size * moderateScale),

  // Image dimensions
  image: (size: number) => Math.round(size * horizontalScale),

  // Button sizes
  button: (size: number) => Math.round(size * moderateScale),

  // Input field heights
  input: (size: number) => Math.round(size * verticalScale),

  // Custom scaling with a factor
  custom: (size: number, factor: number = 0.5) =>
    Math.round(size * (1 + factor * (moderateScale - 1)))
};

// Predefined spacing units
export const spacing = {
  xxs: scale.spacing(4),
  xs: scale.spacing(8),
  sm: scale.spacing(12),
  md: scale.spacing(16),
  lg: scale.spacing(24),
  xl: scale.spacing(32),
  xxl: scale.spacing(48)
};

// Predefined border radiuses
export const radius = {
  xs: scale.radius(4),
  sm: scale.radius(8),
  md: scale.radius(12),
  lg: scale.radius(16),
  xl: scale.radius(24),
  round: scale.radius(999)
};

// Predefined border widths
export const border = {
  thin: scale.border(1),
  normal: scale.border(2),
  thick: scale.border(3)
};

// Predefined shadow sizes
export const shadow = {
  sm: scale.shadow(2),
  md: scale.shadow(4),
  lg: scale.shadow(8),
  xl: scale.shadow(16)
};

// Helper function to create dynamic styles
export const createDynamicStyles = (baseStyles: any) => {
  const processValue = (value: any) => {
    if (typeof value === 'number') {
      // Apply moderate scaling to numeric values
      return Math.round(value * moderateScale);
    }
    return value;
  };

  const processStyles = (styles: any): any => {
    if (typeof styles !== 'object') return styles;

    const processed: any = {};
    for (const key in styles) {
      const value = styles[key];

      // Process numeric properties that should be scaled
      if (['width', 'height', 'margin', 'padding', 'fontSize'].some(prop => key.includes(prop))) {
        processed[key] = processValue(value);
      }
      // Process nested style objects
      else if (typeof value === 'object') {
        processed[key] = processStyles(value);
      }
      // Keep other values as is
      else {
        processed[key] = value;
      }
    }
    return processed;
  };

  return processStyles(baseStyles);
};