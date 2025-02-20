import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ThemeProvider, useThemeContext } from './src/theme/ThemeContext';
import { HomeScreen } from './src/screens/HomeScreen';
import { SubjectDetailScreen } from './src/screens/SubjectDetailScreen';
import { DrawerContent } from './src/components/DrawerContent';
import { BookmarksScreen } from './src/screens/BookmarksScreen';
import {HistoryScreen} from './src/screens/HistoryScreen';
import {ProgressScreen} from './src/screens/ProgressScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { QuizScreen } from './src/screens/quiz/QuizScreen';
import { ResultScreen } from './src/screens/ResultScreen';
import { QuizHistoryScreen } from './src/screens/QuizHistoryScreen';
const Drawer = createDrawerNavigator();

const AppContent = () => {
  const { theme: contextTheme, isDarkMode } = useThemeContext();

  return (
    <PaperProvider theme={contextTheme}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => <DrawerContent {...props} />}
          screenOptions={{
            drawerType: 'front',
            drawerStyle: {
              width: '80%',
              backgroundColor: contextTheme.colors.background,
            },
            overlayColor: 'rgba(0,0,0,0.5)',
            headerShown: false,
          }}
        >
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="SubjectDetail" component={SubjectDetailScreen} />
          <Drawer.Screen name="Bookmarks" component={BookmarksScreen} />
          <Drawer.Screen name="History" component={QuizHistoryScreen} />
          <Drawer.Screen name="Progress" component={ProgressScreen} />
          <Drawer.Screen name="Settings" component={SettingsScreen} />
          <Drawer.Screen name="Quiz" component={QuizScreen} />
          <Drawer.Screen name="Result" component={ResultScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
