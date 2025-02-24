import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { MD3Theme } from 'react-native-paper/lib/typescript/types';

export interface CustomTheme extends MD3Theme {
  colors: MD3Theme['colors'] & {
    // Base shadows
    shadowLight: string;
    shadowDark: string;
    highlightLight: string;
    highlightDark: string;

    // Status colors
    success: string;
    warning: string;
    info: string;

    // Button specific
    buttonText: string;
    buttonDisabled: string;
    buttonShadowLight: string;
    buttonShadowDark: string;
    buttonPressed: string;
    buttonOutline: string;

    // Neumorphic effects
    neumorphicLight: string;
    neumorphicDark: string;
    neumorphicShadow: string;
    neumorphicHighlight: string;
  };
}

export const lightTheme: CustomTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    // Base colors
    primary: '#6200EE',
    secondary: '#03DAC6',
    background: '#E0E5EC',
    surface: '#E0E5EC',
    onSurface: '#2D3748',
    onSurfaceDisabled: '#A0AEC0',
    onSurfaceVariant: '#718096',
    backdrop: 'rgba(0, 0, 0, 0.5)',

    // Status colors
    error: '#FF4B4B',
    success: '#48BB78',
    warning: '#F6AD55',
    info: '#4299E1',

    // Shadow system
    shadowLight: '#FFFFFF',
    shadowDark: '#A3B1C6',
    highlightLight: '#FFFFFF',
    highlightDark: 'rgba(163, 177, 198, 0.5)',

    // Button system
    buttonText: '#2D3748',
    buttonDisabled: '#A0AEC0',
    buttonShadowLight: '#FFFFFF',
    buttonShadowDark: '#A3B1C6',
    buttonPressed: '#D1D9E6',
    buttonOutline: '#D1D9E6',

    // Neumorphic system
    neumorphicLight: '#FFFFFF',
    neumorphicDark: '#A3B1C6',
    neumorphicShadow: 'rgba(163, 177, 198, 0.5)',
    neumorphicHighlight: 'rgba(255, 255, 255, 0.8)'
  }
};

export const darkTheme: CustomTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    // Base colors
    primary: '#BB86FC',
    secondary: '#03DAC6',
    background: '#1A1B1E',
    surface: '#2A2B2E',
    onSurface: '#E2E8F0',
    onSurfaceDisabled: '#718096',
    onSurfaceVariant: '#A0AEC0',
    backdrop: 'rgba(0, 0, 0, 0.7)',

    // Status colors
    error: '#FF4B4B',
    success: '#48BB78',
    warning: '#F6AD55',
    info: '#4299E1',

    // Shadow system
    shadowLight: '#2A2B2E',
    shadowDark: '#121212',
    highlightLight: 'rgba(255, 255, 255, 0.05)',
    highlightDark: 'rgba(0, 0, 0, 0.2)',

    // Button system
    buttonText: '#E2E8F0',
    buttonDisabled: '#718096',
    buttonShadowLight: '#2A2B2E',
    buttonShadowDark: '#121212',
    buttonPressed: '#353535',
    buttonOutline: '#2A2B2E',

    // Neumorphic system
    neumorphicLight: '#2A2B2E',
    neumorphicDark: '#121212',
    neumorphicShadow: 'rgba(0, 0, 0, 0.5)',
    neumorphicHighlight: 'rgba(255, 255, 255, 0.05)'
  }
};