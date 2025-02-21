import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base dimensions (iPhone 11 Pro)
const BASE_DEVICE_WIDTH = 375;
const BASE_DEVICE_HEIGHT = 812;

// Scale factors with more conservative limits for better responsiveness
const MIN_SCALE = 0.75;
const MAX_SCALE = 1.1;

// Calculate dynamic scale factors with weighted averaging
export const horizontalScale = Math.min(
  Math.max(SCREEN_WIDTH / BASE_DEVICE_WIDTH * 0.8 + 0.2, MIN_SCALE),
  MAX_SCALE
);

export const verticalScale = Math.min(
  Math.max(SCREEN_HEIGHT / BASE_DEVICE_HEIGHT * 0.8 + 0.2, MIN_SCALE),
  MAX_SCALE
);

// Use weighted scale factors for different component types
export const moderateScale = Math.min(horizontalScale, verticalScale);
const SCALE_FACTOR = moderateScale;
const SPACING_FACTOR = moderateScale * 0.9; // Slightly reduced spacing
const FONT_FACTOR = moderateScale * 0.85; // More conservative font scaling
const IMAGE_FACTOR = moderateScale;
const BUTTON_FACTOR = moderateScale * 0.95; // Slightly reduced button sizing
const INPUT_FACTOR = moderateScale * 0.9; // More conservative input scaling

// Border width scaling interface
interface BorderScale {
  thin: number;
  medium: number;
  thick: number;
  (size: number): number;
}

// Shadow interface
export interface ShadowScale {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  (size: number): number;
}

// Radius interface
export interface IconScale {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  (size: number): number;
}

export interface TextScale {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  (size: number): number;
}

export interface RadiusScale {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  round: number;
  (size: number): number;
}

// Scale function implementations
const textScale: TextScale = Object.assign(
  (size: number) => Math.round(size * FONT_FACTOR),
  {
    xs: 12 * FONT_FACTOR,
    sm: 14 * FONT_FACTOR,
    md: 16 * FONT_FACTOR,
    lg: 20 * FONT_FACTOR,
    xl: 24 * FONT_FACTOR
  }
);

const radiusScale: RadiusScale = Object.assign(
  (size: number) => Math.round(size * SCALE_FACTOR),
  {
    xs: 4 * SCALE_FACTOR,
    sm: 8 * SCALE_FACTOR,
    md: 12 * SCALE_FACTOR,
    lg: 16 * SCALE_FACTOR,
    xl: 24 * SCALE_FACTOR,
    round: 999 * SCALE_FACTOR
  }
);

const borderScale: BorderScale = Object.assign(
  (size: number) => Math.round(size * SCALE_FACTOR),
  {
    thin: 1 * SCALE_FACTOR,
    medium: 2 * SCALE_FACTOR,
    thick: 3 * SCALE_FACTOR
  }
);

const shadowScale: ShadowScale = Object.assign(
  (size: number) => Math.round(size * SCALE_FACTOR),
  {
    sm: 4 * SCALE_FACTOR,
    md: 8 * SCALE_FACTOR,
    lg: 12 * SCALE_FACTOR,
    xl: 16 * SCALE_FACTOR
  }
);

const iconScale: IconScale = Object.assign(
  (size: number) => Math.round(size * SCALE_FACTOR),
  {
    sm: 16 * SCALE_FACTOR,
    md: 24 * SCALE_FACTOR,
    lg: 32 * SCALE_FACTOR,
    xl: 48 * SCALE_FACTOR
  }
);

// Utility functions for different types of scaling
export const scale = {
  spacing: (size: number) => size * SPACING_FACTOR,
  text: textScale,
  font: (size: number) => size * FONT_FACTOR,
  radius: radiusScale,
  border: borderScale,
  shadow: shadowScale,
  icon: iconScale,
  image: (size: number) => size * IMAGE_FACTOR,
  button: (size: number) => size * BUTTON_FACTOR,
  input: (size: number) => size * INPUT_FACTOR,
  custom: (size: number, factor = 1) => size * factor,
  size: (size: number) => size * SCALE_FACTOR,
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
export const shadows = {
  sm: scale.shadow.sm,
  md: scale.shadow.md,
  lg: scale.shadow.lg,
  xl: scale.shadow.xl
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