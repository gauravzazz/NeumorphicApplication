import { scale } from './scaling';

interface TextStyle {
  fontSize: number;
  lineHeight: number;
  fontWeight: '300' | '400' | '500' | '600' | '700' | '800';
  letterSpacing?: number;
}

type TypographyVariant =
  | 'displayLarge'
  | 'displayMedium'
  | 'displaySmall'
  | 'headlineLarge'
  | 'headlineMedium'
  | 'headlineSmall'
  | 'titleLarge'
  | 'titleMedium'
  | 'titleSmall'
  | 'labelLarge'
  | 'labelMedium'
  | 'labelSmall'
  | 'bodyLarge'
  | 'bodyMedium'
  | 'bodySmall';

type Typography = {
  [key in TypographyVariant]: TextStyle;
};

export const typography: Typography = {
  displayLarge: {
    fontSize: scale.font(57),
    lineHeight: scale.font(64),
    fontWeight: '400',
    letterSpacing: -0.25,
  },
  displayMedium: {
    fontSize: scale.font(45),
    lineHeight: scale.font(52),
    fontWeight: '400',
  },
  displaySmall: {
    fontSize: scale.font(36),
    lineHeight: scale.font(44),
    fontWeight: '400',
  },
  headlineLarge: {
    fontSize: scale.font(32),
    lineHeight: scale.font(40),
    fontWeight: '400',
  },
  headlineMedium: {
    fontSize: scale.font(28),
    lineHeight: scale.font(36),
    fontWeight: '400',
  },
  headlineSmall: {
    fontSize: scale.font(24),
    lineHeight: scale.font(32),
    fontWeight: '400',
  },
  titleLarge: {
    fontSize: scale.font(22),
    lineHeight: scale.font(28),
    fontWeight: '500',
  },
  titleMedium: {
    fontSize: scale.font(16),
    lineHeight: scale.font(24),
    fontWeight: '600',
    letterSpacing: 0.15,
  },
  titleSmall: {
    fontSize: scale.font(14),
    lineHeight: scale.font(20),
    fontWeight: '600',
    letterSpacing: 0.1,
  },
  labelLarge: {
    fontSize: scale.font(14),
    lineHeight: scale.font(20),
    fontWeight: '600',
    letterSpacing: 0.1,
  },
  labelMedium: {
    fontSize: scale.font(12),
    lineHeight: scale.font(16),
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  labelSmall: {
    fontSize: scale.font(11),
    lineHeight: scale.font(16),
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  bodyLarge: {
    fontSize: scale.font(16),
    lineHeight: scale.font(24),
    fontWeight: '400',
    letterSpacing: 0.15,
  },
  bodyMedium: {
    fontSize: scale.font(14),
    lineHeight: scale.font(20),
    fontWeight: '400',
    letterSpacing: 0.25,
  },
  bodySmall: {
    fontSize: scale.font(12),
    lineHeight: scale.font(16),
    fontWeight: '400',
    letterSpacing: 0.4,
  },
};

export const getTextStyle = (variant: TypographyVariant): TextStyle => {
  return typography[variant];
};