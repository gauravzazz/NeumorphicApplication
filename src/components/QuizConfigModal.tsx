import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { NeumorphicView } from './NeumorphicComponents';
import { Button } from './ui/Button';
import Slider from '@react-native-community/slider';

interface QuizConfigModalProps {
  visible: boolean;
  onClose: () => void;
  onStart: (questionCount: number, mode: 'test' | 'practice') => void;
  topicTitle: string;
  maxQuestions: number;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const QuizConfigModal: React.FC<QuizConfigModalProps> = ({
  visible,
  onClose,
  onStart,
  topicTitle,
  maxQuestions,
}) => {
  const theme = useTheme();
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [mode, setMode] = useState<'test' | 'practice'>('practice');

  const handleQuestionCountChange = (value: number) => {
    setQuestionCount(Math.min(Math.max(Math.round(value), 5), maxQuestions));
  };

  const handleModeChange = (newMode: 'test' | 'practice') => {
    setMode(newMode);
  };

  const handleStartQuiz = () => {
    onStart(questionCount, mode);
    onClose();
  };

  const handleModalClose = () => {
    setQuestionCount(5);
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
                  {topicTitle}
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
                    Number of Questions: {questionCount}
                  </Text>
                  <Slider
                    style={styles.slider}
                    minimumValue={5}
                    maximumValue={maxQuestions}
                    step={1}
                    value={questionCount}
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: SCREEN_WIDTH * 0.9,
    maxWidth: 400,
    padding: 16,
  },
  modalContent: {
    borderRadius: 24,
    padding: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 16,
  },
  modalBody: {
    gap: 24,
  },
  sliderSection: {
    marginBottom: 8,
  },
  modeSection: {
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  modeButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  modeButton: {
    flex: 1,
    paddingVertical: 12,
  },
  modeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  startButtonContainer: {
    alignItems: 'center',
    width: '100%',
    marginTop: 8,
  },
  startButton: {
    width: '100%',
    paddingVertical: 12,
    backgroundColor: '#F0F0F3',
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});