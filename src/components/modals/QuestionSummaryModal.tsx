import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, ScrollView, Dimensions } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { CustomTheme } from '../../theme/theme';
import { NeumorphicView } from '../NeumorphicComponents';

interface QuestionSummaryModalProps {
  visible: boolean;
  onClose: () => void;
  questions: Array<{
    id: string;
    question: string;
    options: string[];
    correctOption: number;
    explanation: string;
  }>;
  currentQuestionIndex: number;
  answers: (number | null)[];
  onQuestionSelect?: (index: number) => void; // Make optional for practice mode
  mode?: 'test' | 'practice';
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const QuestionSummaryModal: React.FC<QuestionSummaryModalProps> = ({
  visible,
  onClose,
  questions,
  currentQuestionIndex,
  answers,
  onQuestionSelect,
  mode = 'test'
}) => {
  const theme = useTheme() as CustomTheme;
  const [filterSkipped, setFilterSkipped] = React.useState(false);

  const filteredQuestions = filterSkipped
    ? questions.filter((_, index) => answers[index] === null)
    : questions;

  const getQuestionStatus = (index: number) => {
    if (mode === 'practice') {
      if (answers[index] === null) return 'skipped';
      return answers[index] === questions[index].correctOption ? 'correct' : 'incorrect';
    } else {
      return answers[index] === null ? 'skipped' : 'answered';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'correct': return theme.colors.success;
      case 'incorrect': return theme.colors.error;
      case 'answered': return theme.colors.primary;
      default: return theme.colors.warning;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'correct': return 'checkmark-circle';
      case 'incorrect': return 'close-circle';
      case 'answered': return 'radio-button-on';
      default: return 'help-circle';
    }
  };

  const handleQuestionSelect = (index: number) => {
    if (mode === 'test' && onQuestionSelect) {
      onQuestionSelect(index);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <TouchableOpacity
        style={[styles.modalOverlay, { backgroundColor: theme.colors.backdrop }]}
        activeOpacity={1}
        onPress={onClose}
      >
        <NeumorphicView style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: theme.colors.primary }]}>
              Question Summary
            </Text>
            <TouchableOpacity onPress={onClose}>
              <NeumorphicView style={styles.closeButton}>
                <Ionicons name="close" size={24} color={theme.colors.primary} />
              </NeumorphicView>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => setFilterSkipped(!filterSkipped)}
            style={styles.filterButton}
          >
            <NeumorphicView style={styles.filterButtonContent}>
              <Ionicons 
                name={filterSkipped ? 'eye' : 'eye-off'} 
                size={20} 
                color={theme.colors.primary} 
              />
              <Text style={[styles.filterText, { color: theme.colors.primary }]}>
                {filterSkipped ? 'Show All' : 'Show Skipped'}
              </Text>
            </NeumorphicView>
          </TouchableOpacity>

          <ScrollView style={styles.questionList}>
            {filteredQuestions.map((question, index) => {
              const status = getQuestionStatus(index);
              return (
                <TouchableOpacity
                  key={question.id}
                  onPress={() => handleQuestionSelect(index)}
                  disabled={mode === 'practice'}
                  style={[
                    styles.questionItem,
                    mode === 'practice' && styles.practiceQuestionItem
                  ]}
                >
                  <NeumorphicView 
                    style={[
                      styles.questionContent,
                      index === currentQuestionIndex && {
                        backgroundColor: `${theme.colors.primary}15`,
                      }
                    ]}
                  >
                    <View style={styles.questionHeader}>
                      <Text style={[styles.questionNumber, { color: theme.colors.onSurface }]}>
                        Q{index + 1}
                      </Text>
                      <Ionicons 
                        name={getStatusIcon(status)} 
                        size={24} 
                        color={getStatusColor(status)} 
                      />
                    </View>
                    <Text 
                      style={[styles.questionText, { color: theme.colors.onSurface }]}
                      numberOfLines={2}
                    >
                      {question.question}
                    </Text>
                  </NeumorphicView>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </NeumorphicView>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SCREEN_WIDTH * 0.04,
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 28,
    padding: SCREEN_WIDTH * 0.06,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SCREEN_WIDTH * 0.06,
  },
  modalTitle: {
    fontSize: SCREEN_WIDTH * 0.055,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButton: {
    marginBottom: SCREEN_WIDTH * 0.04,
  },
  filterButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SCREEN_WIDTH * 0.03,
    borderRadius: 12,
    gap: 8,
  },
  filterText: {
    fontSize: SCREEN_WIDTH * 0.04,
    fontWeight: '600',
  },
  questionList: {
    maxHeight: SCREEN_WIDTH * 1.2,
  },
  questionItem: {
    marginBottom: SCREEN_WIDTH * 0.03,
  },
  questionContent: {
    padding: SCREEN_WIDTH * 0.04,
    borderRadius: 16,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  questionNumber: {
    fontSize: SCREEN_WIDTH * 0.04,
    fontWeight: '700',
  },
  questionText: {
    fontSize: SCREEN_WIDTH * 0.038,
    lineHeight: SCREEN_WIDTH * 0.05,
  },
  practiceQuestionItem: {
    opacity: 0.8,
  },
});
