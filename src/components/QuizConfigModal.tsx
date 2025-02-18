import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { NeumorphicView, NeumorphicButton } from './NeumorphicComponents';
import Slider from '@react-native-community/slider';

interface QuizConfigModalProps {
  visible: boolean;
  onClose: () => void;
  onStart: (questionCount: number, mode: 'test' | 'practice') => void;
  topicTitle: string;
  maxQuestions: number;
}

export const QuizConfigModal: React.FC<QuizConfigModalProps> = ({
  visible,
  onClose,
  onStart,
  topicTitle,
  maxQuestions,
}) => {
  const theme = useTheme();
  const [questionCount, setQuestionCount] = useState(5);
  const [mode, setMode] = useState<'test' | 'practice'>('practice');

  const handleStartQuiz = () => {
    onStart(questionCount, mode);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <NeumorphicView style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: theme.colors.onSurface }]}>{topicTitle}</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={theme.colors.onSurface} />
            </TouchableOpacity>
          </View>

          <View style={styles.modalBody}>
            <Text style={[styles.sliderLabel, { color: theme.colors.onSurface }]}>
              Number of Questions: {questionCount}
            </Text>
            <Slider
              style={styles.slider}
              minimumValue={5}
              maximumValue={maxQuestions}
              step={1}
              value={questionCount}
              onValueChange={setQuestionCount}
              minimumTrackTintColor={theme.colors.primary}
              maximumTrackTintColor={theme.colors.onSurfaceVariant}
              thumbTintColor={theme.colors.primary}
            />

            <Text style={[styles.modeLabel, { color: theme.colors.onSurface }]}>Select Mode:</Text>
            <View style={styles.modeContainer}>
              <NeumorphicButton
                style={[
                  styles.modeButton,
                  mode === 'practice' && { backgroundColor: theme.colors.primary }
                ]}
                onPress={() => setMode('practice')}
                text="Practice"
                textStyle={{
                  color: mode === 'practice' ? theme.colors.onPrimary : theme.colors.onSurface
                }}
              />
              <NeumorphicButton
                style={[
                  styles.modeButton,
                  mode === 'test' && { backgroundColor: theme.colors.primary }
                ]}
                onPress={() => setMode('test')}
                text="Test"
                textStyle={{
                  color: mode === 'test' ? theme.colors.onPrimary : theme.colors.onSurface
                }}
              />
            </View>

            <NeumorphicButton
              style={styles.startButton}
              onPress={handleStartQuiz}
              text="Start Quiz"
              textStyle={{ color: theme.colors.onPrimary }}
            />
          </View>
        </NeumorphicView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    maxWidth: 400,
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
  },
  modalBody: {
    gap: 20,
  },
  sliderLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  modeLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  modeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  modeButton: {
    flex: 1,
    marginHorizontal: 8,
    paddingVertical: 12,
  },
  startButton: {
    marginTop: 8,
    backgroundColor: '#6200ee',
    paddingVertical: 12,
  },
});