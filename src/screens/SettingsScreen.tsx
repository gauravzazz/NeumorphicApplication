import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useThemeContext } from '../theme/ThemeContext';
import { NeumorphicView } from '../components/NeumorphicComponents';
import { TouchableOpacity, Modal } from 'react-native';
import Slider from '@react-native-community/slider';

interface SettingsProps {}

export const SettingsScreen: React.FC<SettingsProps> = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { isDarkMode, toggleTheme } = useThemeContext();
  const [settings, setSettings] = useState({
    darkMode: isDarkMode,
    language: 'English',
    timePerQuestion: 150,
    backgroundSound: true,
    dictationEnabled: false,
    selectedExams: ['Engineering'],
  });

  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);

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
    if (key === 'darkMode') {
      toggleTheme();
      setSettings(prev => ({
        ...prev,
        darkMode: !prev.darkMode
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        [key]: !prev[key]
      }));
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleLanguageSelect = (language: string) => {
    setSettings(prev => ({
      ...prev,
      language
    }));
    setShowLanguageModal(false);
  };

  const handleTimeChange = (time: number) => {
    setSettings(prev => ({
      ...prev,
      timePerQuestion: time
    }));
  };

  const toggleExam = (exam: string) => {
    setSettings(prev => ({
      ...prev,
      selectedExams: prev.selectedExams.includes(exam)
        ? prev.selectedExams.filter(e => e !== exam)
        : [...prev.selectedExams, exam]
    }));
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <NeumorphicView style={styles.backButton}>
            <Ionicons
              name="chevron-back"
              size={24}
              color={theme.colors.primary}
            />
          </NeumorphicView>
        </TouchableOpacity>
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
            <TouchableOpacity 
              style={styles.settingContent} 
              onPress={() => setShowLanguageModal(true)}
            >
              <Ionicons name="language-outline" size={24} color={theme.colors.primary} />
              <View style={styles.settingTextContainer}>
                <Text style={[styles.settingTitle, { color: theme.colors.onSurface }]}>
                  Language
                </Text>
                <Text style={[styles.settingDescription, { color: theme.colors.onSurfaceVariant }]}>
                  {settings.language}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color={theme.colors.primary} />
            </TouchableOpacity>
          </NeumorphicView>

          {/* Language Modal */}
          <Modal
            visible={showLanguageModal}
            transparent
            animationType="slide"
            onRequestClose={() => setShowLanguageModal(false)}
          >
            <View style={styles.modalOverlay}>
              <NeumorphicView style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={[styles.modalTitle, { color: theme.colors.onSurface }]}>Select Language</Text>
                  <TouchableOpacity onPress={() => setShowLanguageModal(false)}>
                    <Ionicons name="close" size={24} color={theme.colors.onSurface} />
                  </TouchableOpacity>
                </View>
                <ScrollView>
                  {languages.map((language) => (
                    <TouchableOpacity
                      key={language}
                      style={[styles.languageItem, 
                        settings.language === language && styles.selectedLanguageItem
                      ]}
                      onPress={() => handleLanguageSelect(language)}
                    >
                      <Text style={[styles.languageText, { 
                        color: settings.language === language 
                          ? theme.colors.primary 
                          : theme.colors.onSurface 
                      }]}>
                        {language}
                      </Text>
                      {settings.language === language && (
                        <Ionicons name="checkmark" size={24} color={theme.colors.primary} />
                      )}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </NeumorphicView>
            </View>
          </Modal>

          {/* Time per Question Setting */}
          <NeumorphicView style={styles.settingItem}>
            <TouchableOpacity 
              style={styles.settingContent}
              onPress={() => setShowTimeModal(true)}
            >
              <Ionicons name="timer-outline" size={24} color={theme.colors.primary} />
              <View style={styles.settingTextContainer}>
                <Text style={[styles.settingTitle, { color: theme.colors.onSurface }]}>
                  Time per Question
                </Text>
                <Text style={[styles.settingDescription, { color: theme.colors.onSurfaceVariant }]}>
                  {formatTime(settings.timePerQuestion)} per question
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color={theme.colors.primary} />
            </TouchableOpacity>
          </NeumorphicView>

          {/* Time Modal */}
          <Modal
            visible={showTimeModal}
            transparent
            animationType="slide"
            onRequestClose={() => setShowTimeModal(false)}
          >
            <View style={styles.modalOverlay}>
              <NeumorphicView style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={[styles.modalTitle, { color: theme.colors.onSurface }]}>Set Time per Question</Text>
                  <TouchableOpacity onPress={() => setShowTimeModal(false)}>
                    <Ionicons name="close" size={24} color={theme.colors.onSurface} />
                  </TouchableOpacity>
                </View>
                <View style={styles.timeSliderContainer}>
                  <Text style={[styles.timeValue, { color: theme.colors.onSurface }]}>
                    {formatTime(settings.timePerQuestion)}
                  </Text>
                  <Slider
                    style={styles.timeSlider}
                    minimumValue={30}
                    maximumValue={300}
                    step={30}
                    value={settings.timePerQuestion}
                    onValueChange={handleTimeChange}
                    minimumTrackTintColor={theme.colors.primary}
                    maximumTrackTintColor={theme.colors.onSurfaceVariant}
                    thumbTintColor={theme.colors.primary}
                  />
                </View>
              </NeumorphicView>
            </View>
          </Modal>

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
                    <TouchableOpacity
                      key={exam}
                      onPress={() => toggleExam(exam)}
                    >
                      <NeumorphicView
                        style={[styles.examChip, settings.selectedExams.includes(exam) && styles.selectedExam]}
                      >
                        <Text
                          style={[styles.examText, { color: settings.selectedExams.includes(exam) ? theme.colors.primary : theme.colors.onSurface }]}
                        >
                          {exam}
                        </Text>
                      </NeumorphicView>
                    </TouchableOpacity>
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
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  selectedLanguageItem: {
    backgroundColor: 'rgba(98, 0, 238, 0.1)',
  },
  languageText: {
    fontSize: 16,
    fontWeight: '500',
  },
});