import React, { useEffect, useState } from 'react';
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
import {ProgressScreen} from './src/screens/ProgressScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { QuizScreen } from './src/screens/quiz/QuizScreen';
import { ResultScreen } from './src/screens/ResultScreen';
import { QuizHistoryScreen } from './src/screens/QuizHistoryScreen';
import { SplashScreen } from './src/screens/SplashScreen';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DatabaseService } from './src/services/database/DatabaseService';

const Drawer = createDrawerNavigator();

const AppContent = () => {
  const { theme: contextTheme, isDarkMode } = useThemeContext();
  const [showOnboarding, setShowOnboarding] = useState(true);

  React.useEffect(() => {
    checkOnboardingStatus();
  }, []);

  useEffect(() => {
    const initDB = async () => {
      try {
        const db = DatabaseService.getInstance();
        await db.verifyTables();
        await db.insertMockData();
        console.log('Database initialized with mock data');
      } catch (error) {
        console.error('Database initialization error:', error);
      }
    };
  
    initDB();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const hasCompletedOnboarding = await AsyncStorage.getItem('hasCompletedOnboarding');
      setShowOnboarding(!hasCompletedOnboarding);
    } catch (error) {
      console.error('Error checking onboarding status:', error);
    }
  };

  const handleOnboardingComplete = async () => {
    try {
      await AsyncStorage.setItem('hasCompletedOnboarding', 'true');
      setShowOnboarding(false);
    } catch (error) {
      console.error('Error saving onboarding status:', error);
    }
  };

  if (showOnboarding) {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  return (
    <PaperProvider theme={contextTheme}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
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
          <Drawer.Screen name="Profile" component={ProfileScreen} />
          <Drawer.Screen name="Settings" component={SettingsScreen} />
          <Drawer.Screen name="Quiz" component={QuizScreen} />
          <Drawer.Screen name="Result" component={ResultScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        {isLoading ? (
          <SplashScreen onFinish={() => setIsLoading(false)} />
        ) : (
          <AppContent />
        )}
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
