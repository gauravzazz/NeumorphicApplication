import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, Dimensions, Animated } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { CustomTheme } from '../../theme/theme';
import { Button } from '../ui/Button';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
import { getQuizSettings } from '../../utils/quizSettingsStorage';
import { NeumorphicSlider } from '../ui/NeumorphicSlider';

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
  const theme = useTheme() as CustomTheme;
  const navigation = useNavigation();
  const [selectedQuestionCount, setSelectedQuestionCount] = useState<number>(5);
  const [mode, setMode] = useState<'test' | 'practice'>('practice');
  const [fadeAnim] = useState(new Animated.Value(0));

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

  React.useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={visible}
      onRequestClose={handleModalClose}
      statusBarTranslucent={true}
    >
      <Animated.View 
        style={[
          styles.modalOverlay,
          { 
            backgroundColor: theme.colors.backdrop,
            opacity: fadeAnim 
          }
        ]}
      >
        <TouchableOpacity
          style={styles.modalWrapper}
          activeOpacity={1}
          onPress={handleModalClose}
        >
          <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalContainer}>
              <View
                style={[
                  styles.modalContent,
                  {
                    backgroundColor: theme.colors.background,
                    borderColor: theme.colors.neumorphicHighlight,
                    shadowColor: theme.colors.neumorphicShadow,
                  }
                ]}
              >
                <View style={styles.modalHeader}>
                  <Text style={[styles.modalTitle, { color: theme.colors.primary }]}>
                    Configure Quiz
                  </Text>
                  <TouchableOpacity
                    onPress={handleModalClose}
                    style={styles.closeButton}
                  >
                    <View style={[styles.iconWrapper, { backgroundColor: theme.colors.background }]}>
                      <Ionicons name="close" size={24} color={theme.colors.primary} />
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={styles.modalBody}>
                  <View style={styles.sliderSection}>
                    <Text style={[styles.sectionLabel, { color: theme.colors.onSurface }]}>
                      Number of Questions: {selectedQuestionCount}
                    </Text>
                    <View style={styles.sliderWrapper}>
                      <NeumorphicSlider
                        value={selectedQuestionCount}
                        onValueChange={handleQuestionCountChange}
                        minimumValue={5}
                        maximumValue={maxQuestions}
                        step={1}
                        style={styles.slider}
                        trackColor={theme.colors.primary}
                        thumbColor={theme.colors.primary}
                      />
                    </View>
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
                      size="large"
                    />
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalWrapper: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SCREEN_WIDTH * 0.04,
  },
  modalContainer: {
    width: SCREEN_WIDTH * 0.9,
    maxWidth: 400,
  },
  modalContent: {
    borderRadius: 28,
    padding: SCREEN_WIDTH * 0.06,
    borderWidth: 1,
    shadowOffset: {
      width: 8,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SCREEN_WIDTH * 0.06,
  },
  modalTitle: {
    fontSize: SCREEN_WIDTH * 0.06,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  closeButton: {
    padding: 4,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  modalBody: {
    gap: SCREEN_WIDTH * 0.06,
  },
  sliderSection: {
    marginBottom: SCREEN_WIDTH * 0.04,
  },
  sliderWrapper: {
    padding: SCREEN_WIDTH * 0.02,
    borderRadius: 16,
    backgroundColor: 'transparent',
  },
  sectionLabel: {
    fontSize: SCREEN_WIDTH * 0.045,
    fontWeight: '600',
    marginBottom: SCREEN_WIDTH * 0.03,
    letterSpacing: 0.5,
  },
  slider: {
    width: '100%',
    height: SCREEN_WIDTH * 0.12,
  },
  modeSection: {
    marginBottom: SCREEN_WIDTH * 0.04,
  },
  modeButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SCREEN_WIDTH * 0.04,
  },
  modeButton: {
    flex: 1,
  },
  startButtonContainer: {
    marginTop: SCREEN_WIDTH * 0.02,
  },
  startButton: {
    width: '100%',
  },
});