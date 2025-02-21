import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, ScrollView, Dimensions } from 'react-native';
import { useTheme } from 'react-native-paper';

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
  answers: { [key: string]: number };
  onQuestionSelect: (index: number) => void;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const QuestionSummaryModal: React.FC<QuestionSummaryModalProps> = ({
  visible,
  onClose,
  questions,
  currentQuestionIndex,
  answers,
  onQuestionSelect,
}) => {
  const theme = useTheme();
  const [filterSkipped, setFilterSkipped] = React.useState(false);

  const filteredQuestions = filterSkipped
    ? questions.filter((_, index) => !answers[questions[index].id])
    : questions;

  const handleQuestionSelect = (index: number) => {
    onQuestionSelect(index);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={[styles.questionTray, { backgroundColor: theme.colors.background }]}>
          <View style={styles.trayHeader}>
            <Text style={[styles.trayTitle, { color: theme.colors.onSurface }]}> Summary</Text>
            <TouchableOpacity
              style={[styles.filterButton, filterSkipped && styles.filterButtonActive]}
              onPress={() => setFilterSkipped(!filterSkipped)}
            >
              <Text style={[styles.filterButtonText, { color: filterSkipped ? theme.colors.primary : theme.colors.onSurface }]}>
                {filterSkipped ? 'Show All' : 'Show Skipped'}
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.questionGrid}>
            <View style={styles.gridContainer}>
              {filteredQuestions.map((_, index) => {
                const isAnswered = answers[questions[index].id] !== undefined;
                const isCurrent = index === currentQuestionIndex;
                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.questionItem,
                      isAnswered && styles.answeredQuestion,
                      isCurrent && styles.currentQuestion,
                      isCurrent && { borderColor: theme.colors.primary }
                    ]}
                    onPress={() => handleQuestionSelect(index)}
                  >
                    <Text style={[styles.questionNumber, { 
                      color: isCurrent ? theme.colors.primary : isAnswered ? theme.colors.onSurface : theme.colors.onSurfaceVariant 
                    }]}>
                      {index + 1}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  questionTray: {
    borderTopLeftRadius: Math.min(SCREEN_WIDTH * 0.06, 24),
    borderTopRightRadius: Math.min(SCREEN_WIDTH * 0.06, 24),
    padding: SCREEN_WIDTH * 0.05,
    maxHeight: SCREEN_HEIGHT * 0.8,
  },
  trayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SCREEN_WIDTH * 0.05,
    paddingBottom: SCREEN_WIDTH * 0.03,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  trayTitle: {
    fontSize: Math.min(SCREEN_WIDTH * 0.045, 20),
    fontWeight: '600',
    letterSpacing: 0.3,
    flex: 1,
  },
  questionGrid: {
    maxHeight: '75%',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: Math.min(SCREEN_WIDTH * 0.03, 12),
    paddingBottom: SCREEN_WIDTH * 0.05,
  },
  questionItem: {
    width: Math.min(SCREEN_WIDTH * 0.13, 48),
    height: Math.min(SCREEN_WIDTH * 0.13, 48),
    borderRadius: Math.min(SCREEN_WIDTH * 0.065, 24),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  questionNumber: {
    fontSize: Math.min(SCREEN_WIDTH * 0.04, 16),
    fontWeight: '500',
  },
  answeredQuestion: {
    backgroundColor: 'rgba(98, 0, 238, 0.08)',
    borderColor: 'rgba(98, 0, 238, 0.2)',
  },
  currentQuestion: {
    backgroundColor: 'rgba(98, 0, 238, 0.12)',
    borderWidth: 2,
  },
  filterButton: {
    paddingHorizontal: Math.min(SCREEN_WIDTH * 0.03, 12),
    paddingVertical: Math.min(SCREEN_WIDTH * 0.015, 6),
    borderRadius: Math.min(SCREEN_WIDTH * 0.03, 12),
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    minWidth: Math.min(SCREEN_WIDTH * 0.2, 80),
  },
  filterButtonActive: {
    backgroundColor: 'rgba(98, 0, 238, 0.12)',
  },
  filterButtonText: {
    fontSize: Math.min(SCREEN_WIDTH * 0.032, 13),
    fontWeight: '500',
    textAlign: 'center',
  },
});
