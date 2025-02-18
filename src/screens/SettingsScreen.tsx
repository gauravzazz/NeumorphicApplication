import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NeumorphicView } from '../components/NeumorphicComponents';

interface SettingsProps {}

export const SettingsScreen: React.FC<SettingsProps> = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [settings, setSettings] = useState({
    darkMode: false,
    language: 'Gujarati',
    timePerQuestion: 150,
    backgroundSound: true,
    dictationEnabled: false,
    selectedExams: ['Engineering'],
  });

  const languages = [
    'Gujarati',
    'Hindi',
    'English',
    'Bengali',
    'Tamil',
    'Telugu',
    'Marathi',
    'Kannada',
    'Malayalam'
  ];

  const examCategories = [
    { title: 'Engineering', exams: ['JEE', 'GATE', 'BITSAT', 'VITEEE'] },
    { title: 'Medical', exams: ['NEET', 'AIIMS', 'JIPMER'] },
    { title: 'Civil Service', exams: ['UPSC', 'State PSC', 'SSC'] },
  ];

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <NeumorphicView style={styles.backButton}>
          <Ionicons
            name="chevron-back"
            size={24}
            color={theme.colors.primary}
            onPress={() => navigation.goBack()}
          />
        </NeumorphicView>
        <Text style={[styles.headerTitle, { color: theme.colors.onSurface }]}>Settings</Text>
      </View>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          {/* Dark Mode Setting */}
          <NeumorphicView style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Ionicons name="moon-outline" size={24} color={theme.colors.primary} />
              <View style={styles.settingTextContainer}>
                <Text style={[styles.settingTitle, { color: theme.colors.onSurface }]}>
                  Dark Mode
                </Text>
                <Text style={[styles.settingDescription, { color: theme.colors.onSurfaceVariant }]}>
                  Enable dark theme for better night viewing
                </Text>
              </View>
            </View>
            <View
              style={[styles.toggle, { backgroundColor: settings.darkMode ? theme.colors.primary : '#E0E0E0' }]}
              onTouchEnd={() => toggleSetting('darkMode')}
            >
              <View style={[styles.toggleKnob, { transform: [{ translateX: settings.darkMode ? 20 : 0 }] }]} />
            </View>
          </NeumorphicView>

          {/* Language Setting */}
          <NeumorphicView style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Ionicons name="language-outline" size={24} color={theme.colors.primary} />
              <View style={styles.settingTextContainer}>
                <Text style={[styles.settingTitle, { color: theme.colors.onSurface }]}>
                  Language
                </Text>
                <Text style={[styles.settingDescription, { color: theme.colors.onSurfaceVariant }]}>
                  {settings.language}
                </Text>
              </View>
            </View>
            <View style={styles.languageSelector}>
              <Ionicons name="chevron-forward" size={24} color={theme.colors.primary} />
            </View>
          </NeumorphicView>

          {/* Time per Question Setting */}
          <NeumorphicView style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Ionicons name="timer-outline" size={24} color={theme.colors.primary} />
              <View style={styles.settingTextContainer}>
                <Text style={[styles.settingTitle, { color: theme.colors.onSurface }]}>
                  Time per Question
                </Text>
                <Text style={[styles.settingDescription, { color: theme.colors.onSurfaceVariant }]}>
                  {formatTime(settings.timePerQuestion)} per question
                </Text>
              </View>
            </View>
            <View style={styles.timeSelector}>
              <Ionicons name="chevron-forward" size={24} color={theme.colors.primary} />
            </View>
          </NeumorphicView>

          {/* Background Sound Setting */}
          <NeumorphicView style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Ionicons name="volume-medium-outline" size={24} color={theme.colors.primary} />
              <View style={styles.settingTextContainer}>
                <Text style={[styles.settingTitle, { color: theme.colors.onSurface }]}>
                  Background Sound
                </Text>
                <Text style={[styles.settingDescription, { color: theme.colors.onSurfaceVariant }]}>
                  Enable sound effects during quiz
                </Text>
              </View>
            </View>
            <View
              style={[styles.toggle, { backgroundColor: settings.backgroundSound ? theme.colors.primary : '#E0E0E0' }]}
              onTouchEnd={() => toggleSetting('backgroundSound')}
            >
              <View style={[styles.toggleKnob, { transform: [{ translateX: settings.backgroundSound ? 20 : 0 }] }]} />
            </View>
          </NeumorphicView>

          {/* Dictation Setting */}
          <NeumorphicView style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Ionicons name="mic-outline" size={24} color={theme.colors.primary} />
              <View style={styles.settingTextContainer}>
                <Text style={[styles.settingTitle, { color: theme.colors.onSurface }]}>
                  Dictation
                </Text>
                <Text style={[styles.settingDescription, { color: theme.colors.onSurfaceVariant }]}>
                  Enable voice dictation for answers
                </Text>
              </View>
            </View>
            <View
              style={[styles.toggle, { backgroundColor: settings.dictationEnabled ? theme.colors.primary : '#E0E0E0' }]}
              onTouchEnd={() => toggleSetting('dictationEnabled')}
            >
              <View style={[styles.toggleKnob, { transform: [{ translateX: settings.dictationEnabled ? 20 : 0 }] }]} />
            </View>
          </NeumorphicView>

          {/* Separator */}
          <View style={styles.separator} />

          {/* Exam Categories */}
          <View style={styles.examCategories}>
            <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>Select Your Exams</Text>
            {examCategories.map((category) => (
              <NeumorphicView key={category.title} style={styles.categoryContainer}>
                <Text style={[styles.categoryTitle, { color: theme.colors.primary }]}>
                  {category.title}
                </Text>
                <View style={styles.examList}>
                  {category.exams.map((exam) => (
                    <NeumorphicView
                      key={exam}
                      style={[styles.examChip, settings.selectedExams.includes(exam) && styles.selectedExam]}
                    >
                      <Text
                        style={[styles.examText, { color: settings.selectedExams.includes(exam) ? theme.colors.primary : theme.colors.onSurface }]}
                      >
                        {exam}
                      </Text>
                    </NeumorphicView>
                  ))}
                </View>
              </NeumorphicView>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    padding: 16,
    gap: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 16,
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  settingDescription: {
    fontSize: 14,
    marginTop: 4,
  },
  toggle: {
    width: 40,
    height: 20,
    borderRadius: 10,
    padding: 2,
  },
  toggleKnob: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  languageSelector: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  timeSelector: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 8,
  },
  examCategories: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  categoryContainer: {
    padding: 16,
    borderRadius: 16,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  examList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  examChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  selectedExam: {
    backgroundColor: '#E3F2FD',
  },
  examText: {
    fontSize: 14,
    fontWeight: '500',
  },
});