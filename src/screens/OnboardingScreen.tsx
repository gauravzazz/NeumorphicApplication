import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NeumorphicView } from '../components/NeumorphicComponents';
import { Button } from '../components/ui/Button';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface OnboardingScreenProps {
  onComplete: () => void;
}

type QuizPurpose = 'enthusiast' | 'exam';

const examsList = [
  { id: 'gre', name: 'GRE' },
  { id: 'gmat', name: 'GMAT' },
  { id: 'sat', name: 'SAT' },
  { id: 'cat', name: 'CAT' },
  { id: 'gate', name: 'GATE' },
];

const subjectsList = [
  { id: 'math', name: 'Mathematics' },
  { id: 'physics', name: 'Physics' },
  { id: 'chemistry', name: 'Chemistry' },
  { id: 'biology', name: 'Biology' },
  { id: 'history', name: 'History' },
  { id: 'geography', name: 'Geography' },
  { id: 'literature', name: 'Literature' },
];

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const theme = useTheme();
  const [purpose, setPurpose] = useState<QuizPurpose | null>(null);
  const [selectedExams, setSelectedExams] = useState<string[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  const handleExamToggle = (examId: string) => {
    setSelectedExams(prev =>
      prev.includes(examId)
        ? prev.filter(id => id !== examId)
        : [...prev, examId]
    );
  };

  const handleSubjectToggle = (subjectId: string) => {
    setSelectedSubjects(prev =>
      prev.includes(subjectId)
        ? prev.filter(id => id !== subjectId)
        : [...prev, subjectId]
    );
  };

  const handleComplete = () => {
    // Save preferences to storage here
    onComplete();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.primary }]}>Welcome to Quizine!</Text>
          <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
            Let's personalize your experience
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
            What brings you here?
          </Text>
          <View style={styles.purposeContainer}>
            <TouchableOpacity
              onPress={() => setPurpose('enthusiast')}
              style={styles.purposeButton}
            >
              <NeumorphicView
                style={[
                  styles.purposeCard,
                  purpose === 'enthusiast' && styles.selectedCard,
                ]}
              >
                <Ionicons
                  name="game-controller"
                  size={32}
                  color={purpose === 'enthusiast' ? theme.colors.primary : theme.colors.onSurfaceVariant}
                />
                <Text
                  style={[
                    styles.purposeText,
                    { color: purpose === 'enthusiast' ? theme.colors.primary : theme.colors.onSurface },
                  ]}
                >
                  Quiz Enthusiast
                </Text>
              </NeumorphicView>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setPurpose('exam')}
              style={styles.purposeButton}
            >
              <NeumorphicView
                style={[
                  styles.purposeCard,
                  purpose === 'exam' && styles.selectedCard,
                ]}
              >
                <Ionicons
                  name="school"
                  size={32}
                  color={purpose === 'exam' ? theme.colors.primary : theme.colors.onSurfaceVariant}
                />
                <Text
                  style={[
                    styles.purposeText,
                    { color: purpose === 'exam' ? theme.colors.primary : theme.colors.onSurface },
                  ]}
                >
                  Exam Preparation
                </Text>
              </NeumorphicView>
            </TouchableOpacity>
          </View>
        </View>

        {purpose === 'exam' && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
              Select exams you're preparing for
            </Text>
            <View style={styles.optionsGrid}>
              {examsList.map(exam => (
                <TouchableOpacity
                  key={exam.id}
                  onPress={() => handleExamToggle(exam.id)}
                  style={styles.optionButton}
                >
                  <NeumorphicView
                    style={[
                      styles.optionCard,
                      selectedExams.includes(exam.id) && styles.selectedCard,
                    ]}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        {
                          color: selectedExams.includes(exam.id)
                            ? theme.colors.primary
                            : theme.colors.onSurface,
                        },
                      ]}
                    >
                      {exam.name}
                    </Text>
                  </NeumorphicView>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
            Select subjects you're interested in
          </Text>
          <View style={styles.optionsGrid}>
            {subjectsList.map(subject => (
              <TouchableOpacity
                key={subject.id}
                onPress={() => handleSubjectToggle(subject.id)}
                style={styles.optionButton}
              >
                <NeumorphicView
                  style={[
                    styles.optionCard,
                    selectedSubjects.includes(subject.id) && styles.selectedCard,
                  ]}
                >
                  <Text
                    style={[
                      styles.optionText,
                      {
                        color: selectedSubjects.includes(subject.id)
                          ? theme.colors.primary
                          : theme.colors.onSurface,
                      },
                    ]}
                  >
                    {subject.name}
                  </Text>
                </NeumorphicView>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Text style={[styles.note, { color: theme.colors.onSurfaceVariant }]}>
          Note: You can always modify these preferences later in the settings.
        </Text>

        <Button
          title="Get Started"
          onPress={handleComplete}
          style={styles.button}
          disabled={!purpose || (purpose === 'exam' && selectedExams.length === 0) || selectedSubjects.length === 0}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: SCREEN_WIDTH * 0.04,
  },
  header: {
    alignItems: 'center',
    marginBottom: SCREEN_WIDTH * 0.08,
  },
  title: {
    fontSize: SCREEN_WIDTH * 0.08,
    fontWeight: 'bold',
    marginBottom: SCREEN_WIDTH * 0.02,
  },
  subtitle: {
    fontSize: SCREEN_WIDTH * 0.04,
    textAlign: 'center',
  },
  section: {
    marginBottom: SCREEN_WIDTH * 0.06,
  },
  sectionTitle: {
    fontSize: SCREEN_WIDTH * 0.045,
    fontWeight: '600',
    marginBottom: SCREEN_WIDTH * 0.04,
  },
  purposeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SCREEN_WIDTH * 0.04,
  },
  purposeButton: {
    flex: 1,
  },
  purposeCard: {
    padding: SCREEN_WIDTH * 0.04,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SCREEN_WIDTH * 0.04,
    minHeight: SCREEN_WIDTH * 0.3,
  },
  purposeText: {
    fontSize: SCREEN_WIDTH * 0.04,
    fontWeight: '600',
    marginTop: SCREEN_WIDTH * 0.02,
    textAlign: 'center',
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SCREEN_WIDTH * 0.03,
  },
  optionButton: {
    width: (SCREEN_WIDTH * 0.92 - SCREEN_WIDTH * 0.06) / 2,
  },
  optionCard: {
    padding: SCREEN_WIDTH * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SCREEN_WIDTH * 0.03,
    minHeight: SCREEN_WIDTH * 0.15,
  },
  optionText: {
    fontSize: SCREEN_WIDTH * 0.035,
    fontWeight: '600',
    textAlign: 'center',
  },
  selectedCard: {
    backgroundColor: 'rgba(98, 0, 238, 0.1)',
  },
  note: {
    fontSize: SCREEN_WIDTH * 0.035,
    textAlign: 'center',
    marginBottom: SCREEN_WIDTH * 0.06,
    fontStyle: 'italic',
  },
  button: {
    marginBottom: SCREEN_WIDTH * 0.08,
  },
});