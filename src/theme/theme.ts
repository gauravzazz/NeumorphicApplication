import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { MD3Theme } from 'react-native-paper/lib/typescript/types';

export interface CustomTheme extends MD3Theme {
  colors: MD3Theme['colors'] & {
    shadowLight: string;
    shadowDark: string;
    highlightLight: string;
    highlightDark: string;
  };
}

export const lightTheme: CustomTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#6200ee',
    secondary: '#03dac4',
    background: '#E0E5EC',
    surface: '#E0E5EC',
    onSurface: '#000000',
    onSurfaceDisabled: '#999999',
    onSurfaceVariant: '#666666',
    backdrop: 'rgba(0, 0, 0, 0.5)',
    error: '#f50057',
    shadowLight: '#FFFFFF',
    shadowDark: '#A3B1C6',
    highlightLight: 'rgba(255, 255, 255, 0.3)',
    highlightDark: 'rgba(0, 0, 0, 0.05)'
  }
};

export const darkTheme: CustomTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#BB86FC',
    secondary: '#03dac4',
    background: '#2D3440',
    surface: '#2D3440',
    onSurface: '#F0F0F0',
    onSurfaceDisabled: '#666666',
    onSurfaceVariant: '#999999',
    backdrop: 'rgba(0, 0, 0, 0.5)',
    error: '#cf6679',
    shadowLight: '#353B46',
    shadowDark: '#23282F',
    highlightLight: 'rgba(255, 255, 255, 0.05)',
    highlightDark: 'rgba(0, 0, 0, 0.2)'
  }
};