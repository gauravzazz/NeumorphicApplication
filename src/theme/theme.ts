import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { MD3Theme } from 'react-native-paper/lib/typescript/types';

export interface CustomTheme extends MD3Theme {
  colors: MD3Theme['colors'] & {
    shadowLight: string;
    shadowDark: string;
    highlightLight: string;
    highlightDark: string;
    success: string;
    warning: string;
    info: string;
    buttonText: string;
    buttonDisabled: string;
    buttonShadowLight: string;
    buttonShadowDark: string;
    buttonPressed: string;
    buttonOutline: string;

  };
}

export const lightTheme: CustomTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#0066FF',
    secondary: '#6B7280',
    background: '#F0F2F5',
    surface: '#F0F2F5',
    onSurface: '#6B7280',
    onSurfaceDisabled: '#A7B1C2',
    onSurfaceVariant: '#8895A7',
    backdrop: 'rgba(167, 177, 194, 0.3)',
    error: '#f50057',
    success: '#4caf50',
    warning: '#ff9800',
    info: '#2196f3',
    shadowLight: '#FFFFFF',
    shadowDark: '#A7B1C2',
    highlightLight: '#FFFFFF',
    highlightDark: 'rgba(167, 177, 194, 0.5)',
    buttonText: '#6B7280',
    buttonDisabled: '#A7B1C2',
    buttonShadowLight: '#FFFFFF',
    buttonShadowDark: '#A7B1C2',
    buttonPressed: '#E8EBF0',
    buttonOutline: '#E8EBF0'
  }
};

export const darkTheme: CustomTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#BB86FC',
    secondary: '#03DAC6',
    background: '#1A1B1E',
    surface: '#2A2B2E',
    onSurface: '#E1E1E1',
    onSurfaceDisabled: '#666666',
    onSurfaceVariant: '#999999',
    backdrop: 'rgba(0, 0, 0, 0.7)',
    error: '#CF6679',
    success: '#03DAC6',
    warning: '#FFB74D',
    info: '#64B5F6',
    shadowLight: '#2A2B2E',
    shadowDark: '#121212',
    highlightLight: 'rgba(255, 255, 255, 0.05)',
    highlightDark: 'rgba(0, 0, 0, 0.2)',
    buttonText: '#E1E1E1',
    buttonDisabled: '#666666',
    buttonShadowLight: '#2A2B2E',
    buttonShadowDark: '#121212',
    buttonPressed: '#353535',
    buttonOutline: '#2A2B2E'
  }
};