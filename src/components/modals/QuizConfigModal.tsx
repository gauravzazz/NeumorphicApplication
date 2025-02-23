import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { NeumorphicView } from '../NeumorphicComponents';
import { Button } from '../ui//Button';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
import { getQuizSettings } from '../../utils/quizSettingsStorage';

interface QuizConfigModalProps {
  visible: boolean;
  onClose: () => void;
  topicId: string;
  topicTitle: string;
  subjectName: string;
  maxQuestions?: number;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const QuizConfigModal: React.FC<QuizConfigModalProps> = ({
  visible,
  onClose,
  topicId,
  topicTitle,
  subjectName,
  maxQuestions = 10
}) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [selectedQuestionCount, setSelectedQuestionCount] = useState<number>(5);
  const [mode, setMode] = useState<'test' | 'practice'>('practice');

  const handleQuestionCountChange = (value: number) => {
    setSelectedQuestionCount(Math.min(Math.max(Math.round(value), 5), maxQuestions));
  };

  const handleModeChange = (newMode: 'test' | 'practice') => {
    setMode(newMode);
  };

  const handleStartQuiz = async () => {
    let timeLimit = 0;
    if (mode === 'test') {
      const settings = await getQuizSettings();
      timeLimit = selectedQuestionCount * settings.timePerQuestion;
    }
    
    navigation.navigate('Quiz', {
      mode,
      questionCount: selectedQuestionCount,
      topicId,
      topicTitle,
      subjectName,
      timeLimit
    });
    handleModalClose();
  };

  const handleModalClose = () => {
    setSelectedQuestionCount(5);
    setMode('practice');
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleModalClose}
      statusBarTranslucent={true}
    >
      <TouchableOpacity
        style={[styles.modalOverlay, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}
        activeOpacity={1}
        onPress={handleModalClose}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
        >
          <View style={styles.modalContainer}>
            <NeumorphicView
              style={[styles.modalContent, { backgroundColor: theme.colors.surface }]}
            >
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: theme.colors.onSurface }]}>
                  Configure Quiz
                </Text>
                <TouchableOpacity
                  onPress={handleModalClose}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Ionicons name="close" size={24} color={theme.colors.onSurface} />
                </TouchableOpacity>
              </View>

              <View style={styles.modalBody}>
                <View style={styles.sliderSection}>
                  <Text style={[styles.sectionLabel, { color: theme.colors.onSurface }]}>
                    Number of Questions: {selectedQuestionCount}
                  </Text>
                  <Slider
                    style={styles.slider}
                    minimumValue={5}
                    maximumValue={maxQuestions}
                    step={1}
                    value={selectedQuestionCount}
                    onValueChange={handleQuestionCountChange}
                    minimumTrackTintColor={theme.colors.primary}
                    maximumTrackTintColor={theme.colors.onSurfaceVariant}
                    thumbTintColor={theme.colors.primary}
                  />
                </View>

                <View style={styles.modeSection}>
                  <Text style={[styles.sectionLabel, { color: theme.colors.onSurface }]}>
                    Select Mode:
                  </Text>
                  <View style={styles.modeButtonsContainer}>
                    <Button
                      variant={mode === 'practice' ? 'primary' : 'outline'}
                      onPress={() => handleModeChange('practice')}
                      title="Practice"
                      style={styles.modeButton}
                    />

                    <Button
                      variant={mode === 'test' ? 'primary' : 'outline'}
                      onPress={() => handleModeChange('test')}
                      title="Test"
                      style={styles.modeButton}
                    />
                  </View>
                </View>

                <View style={styles.startButtonContainer}>
                  <Button
                    variant="primary"
                    onPress={handleStartQuiz}
                    title="Start Quiz"
                    style={styles.startButton}
                  />
                </View>
              </View>
            </NeumorphicView>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SCREEN_WIDTH * 0.04,
  },
  modalContainer: {
    width: SCREEN_WIDTH * 0.9,
    maxWidth: 400,
    padding: SCREEN_WIDTH * 0.04,
  },
  modalContent: {
    borderRadius: 28,
    padding: SCREEN_WIDTH * 0.06,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SCREEN_WIDTH * 0.06,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.08)',
    paddingBottom: SCREEN_WIDTH * 0.05,
  },
  modalTitle: {
    fontSize: SCREEN_WIDTH * 0.055,
    fontWeight: '700',
    letterSpacing: 0.2,
    flex: 1,
    marginRight: SCREEN_WIDTH * 0.04,
  },
  modalBody: {
    gap: SCREEN_WIDTH * 0.06,
  },
  sliderSection: {
    marginBottom: SCREEN_WIDTH * 0.02,
  },
  modeSection: {
    marginBottom: SCREEN_WIDTH * 0.04,
  },
  sectionLabel: {
    fontSize: SCREEN_WIDTH * 0.042,
    fontWeight: '600',
    marginBottom: SCREEN_WIDTH * 0.03,
    letterSpacing: 0.2,
  },
  slider: {
    width: '100%',
    height: SCREEN_WIDTH * 0.1,
    transform: [{ scale: 0.95 }],
  },
  modeButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SCREEN_WIDTH * 0.04,
  },
  modeButton: {
    flex: 1,
    paddingVertical: SCREEN_WIDTH * 0.03,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  modeButtonText: {
    fontSize: SCREEN_WIDTH * 0.042,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  startButtonContainer: {
    alignItems: 'center',
    width: '100%',
    marginTop: SCREEN_WIDTH * 0.02,
  },
  startButton: {
    width: '100%',
    paddingVertical: SCREEN_WIDTH * 0.035,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  startButtonText: {
    fontSize: SCREEN_WIDTH * 0.042,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
});