import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, TouchableOpacity, Dimensions, Animated, Modal } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NeumorphicView } from '../components/NeumorphicComponents';
import { RoundButton } from '../components/ui/RoundButton';
import { Ionicons } from '@expo/vector-icons';
import { QuizHistoryItem, getQuizHistory, clearQuizHistory } from '../utils/quizHistoryStorage';
import { CustomAlert } from '../components/ui/CustomAlert';

export const QuizHistoryScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [history, setHistory] = useState<QuizHistoryItem[]>([]);
  const [filteredHistory, setFilteredHistory] = useState<QuizHistoryItem[]>([]);
  const [showClearAlert, setShowClearAlert] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [selectedMode, setSelectedMode] = useState<'all' | 'test' | 'practice'>('all');
  const [selectedScore, setSelectedScore] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [showFilterModal, setShowFilterModal] = useState(false);

  useEffect(() => {
    const loadAndAnimate = async () => {
      await loadHistory();
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    };
  
    loadAndAnimate();
  
    // Add focus listener to refresh history when screen comes into focus
    const unsubscribe = navigation.addListener('focus', () => {
      loadAndAnimate();
    });
  
    // Cleanup subscription on unmount
    return unsubscribe;
  }, [navigation]);
  
  const loadHistory = async () => {
    try {
      const quizHistory = await getQuizHistory();
      if (quizHistory) {
        setHistory(quizHistory);
        setFilteredHistory(quizHistory);
      }
    } catch (error) {
      console.error('Error loading quiz history:', error);
      // You might want to show an error message to the user here
    }
  };

  const handleClearHistory = async () => {
    await clearQuizHistory();
    setHistory([]);
    setShowClearAlert(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const applyFilters = (mode: 'all' | 'test' | 'practice', score: 'all' | 'high' | 'medium' | 'low') => {
    let filtered = [...history];

    // Apply mode filter
    if (mode !== 'all') {
      filtered = filtered.filter(item => item.mode === mode);
    }

    // Apply score filter
    if (score !== 'all') {
      filtered = filtered.filter(item => {
        const percentage = item.score.percentage;
        switch (score) {
          case 'high':
            return percentage >= 80;
          case 'medium':
            return percentage >= 60 && percentage < 80;
          case 'low':
            return percentage < 60;
          default:
            return true;
        }
      });
    }

    setFilteredHistory(filtered);
    setShowFilterModal(false);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <RoundButton
          icon="chevron-back"
          onPress={() => navigation.goBack()}
          size={40}
          style={styles.backButton}
        />
        <Text style={[styles.headerTitle, { color: theme.colors.onSurface }]}>Quiz History</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity
            onPress={() => setShowFilterModal(true)}
            style={styles.filterButton}
          >
            <Ionicons name="filter-outline" size={24} color={theme.colors.primary} />
          </TouchableOpacity>
          {history.length > 0 && (
            <TouchableOpacity
              onPress={() => setShowClearAlert(true)}
              style={styles.clearButton}
            >
              <Ionicons name="trash-outline" size={24} color={theme.colors.error} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView style={styles.content}>
        {filteredHistory.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="document-text-outline" size={64} color={theme.colors.primary} />
            <Text style={[styles.emptyText, { color: theme.colors.onSurfaceVariant }]}>
              No quiz history yet
            </Text>
          </View>
        ) : (
          <Animated.View style={{ opacity: fadeAnim }}>
            {filteredHistory.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => navigation.navigate('Result', {
                    answers: item.answers,
                    questions: item.questions,
                    timeSpent: item.timeSpent,
                    mode: item.mode
                  })}
                >
                  <NeumorphicView style={styles.historyCard}>
                    <View style={styles.cardHeader}>
                      <View style={styles.topicContainer}>
                        <Text style={[styles.topicName, { color: theme.colors.primary }]}>
                          {item.topicName}
                        </Text>
                        <View style={[styles.modeBadge, { 
                          backgroundColor: item.mode === 'test' 
                            ? 'rgba(98, 0, 238, 0.1)' 
                            : 'rgba(75, 181, 67, 0.1)' 
                        }]}>
                          <Text style={[styles.modeText, { 
                            color: item.mode === 'test' 
                              ? theme.colors.primary 
                              : '#4BB543'
                          }]}>
                            {item.mode === 'test' ? 'Test' : 'Practice'}
                          </Text>
                        </View>
                      </View>
                      <Text style={[styles.date, { color: theme.colors.onSurfaceVariant }]}>
                        {formatDate(item.date)}
                      </Text>
                    </View>
        
                    <View style={styles.scoreContainer}>
                      <View style={styles.scoreCircle}>
                        <Text style={[styles.scorePercentage, { color: theme.colors.primary }]}>
                          {item.score.percentage}%
                        </Text>
                      </View>
        
                      <View style={styles.statsContainer}>
                        <View style={styles.statItem}>
                          <Text style={[styles.statValue, { color: theme.colors.onSurface }]}>
                            {item.score.correct}
                          </Text>
                          <Text style={[styles.statLabel, { color: theme.colors.onSurfaceVariant }]}>
                            Correct
                          </Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                          <Text style={[styles.statValue, { color: theme.colors.onSurface }]}>
                            {item.score.total - item.score.correct}
                          </Text>
                          <Text style={[styles.statLabel, { color: theme.colors.onSurfaceVariant }]}>
                            Incorrect
                          </Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                          <Text style={[styles.statValue, { color: theme.colors.onSurface }]}>
                            {formatTime(item.timeSpent)}
                          </Text>
                          <Text style={[styles.statLabel, { color: theme.colors.onSurfaceVariant }]}>
                            Time
                          </Text>
                        </View>
                      </View>
                    </View>
                  </NeumorphicView>
                </TouchableOpacity>
              ))}
            </Animated.View>
          )}
      </ScrollView>

      <Modal
        visible={showFilterModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowFilterModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowFilterModal(false)}
        >
          <TouchableOpacity 
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            <NeumorphicView style={[styles.modalContent, { backgroundColor: theme.colors.background }]}>
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: theme.colors.onSurface }]}>Filter Quiz History</Text>
                <TouchableOpacity onPress={() => setShowFilterModal(false)}>
                  <Ionicons name="close" size={24} color={theme.colors.onSurface} />
                </TouchableOpacity>
              </View>

              <View style={styles.filterSection}>
                <Text style={[styles.filterTitle, { color: theme.colors.onSurface }]}>Mode</Text>
                <View style={styles.filterOptions}>
                  {['all', 'test', 'practice'].map((mode) => (
                    <TouchableOpacity
                      key={mode}
                      style={[
                        styles.filterButton,
                        selectedMode === mode && styles.filterButtonActive,
                        { backgroundColor: selectedMode === mode ? theme.colors.primary : 'transparent' }
                      ]}
                      onPress={() => setSelectedMode(mode as 'all' | 'test' | 'practice')}
                    >
                      <Text style={[
                        styles.filterButtonText,
                        { color: selectedMode === mode ? theme.colors.surface : theme.colors.onSurface }
                      ]}>
                        {mode.charAt(0).toUpperCase() + mode.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.filterSection}>
                <Text style={[styles.filterTitle, { color: theme.colors.onSurface }]}>Score Range</Text>
                <View style={styles.filterOptions}>
                  {[
                    { label: 'All', value: 'all' },
                    { label: '≥80%', value: 'high' },
                    { label: '60-79%', value: 'medium' },
                    { label: '<60%', value: 'low' }
                  ].map((score) => (
                    <TouchableOpacity
                      key={score.value}
                      style={[
                        styles.filterButton,
                        selectedScore === score.value && styles.filterButtonActive,
                        { backgroundColor: selectedScore === score.value ? theme.colors.primary : 'transparent' }
                      ]}
                      onPress={() => setSelectedScore(score.value as 'all' | 'high' | 'medium' | 'low')}
                    >
                      <Text style={[
                        styles.filterButtonText,
                        { color: selectedScore === score.value ? theme.colors.surface : theme.colors.onSurface }
                      ]}>
                        {score.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <TouchableOpacity
                style={[styles.applyButton, { backgroundColor: theme.colors.primary }]}
                onPress={() => applyFilters(selectedMode, selectedScore)}
              >
                <Text style={[styles.applyButtonText, { color: theme.colors.surface }]}>Apply Filters</Text>
              </TouchableOpacity>
            </NeumorphicView>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      <CustomAlert
        visible={showClearAlert}
        title="Clear History"
        message="Are you sure you want to clear all quiz history? This action cannot be undone."
        onConfirm={handleClearHistory}
        onCancel={() => setShowClearAlert(false)}
        confirmText="Clear"
        cancelText="Cancel"
      />
    </SafeAreaView>
  );
};

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SCREEN_WIDTH * 0.03,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SCREEN_WIDTH * 0.03,
    paddingHorizontal: SCREEN_WIDTH * 0.01,
  },
  headerTitle: {
    fontSize: SCREEN_WIDTH * 0.05,
    fontWeight: '700',
    flex: 1,
    marginLeft: SCREEN_WIDTH * 0.03,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SCREEN_WIDTH * 0.02,
  },
  backButton: {
    width: SCREEN_WIDTH * 0.09,
    height: SCREEN_WIDTH * 0.09,
    borderRadius: SCREEN_WIDTH * 0.045,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButton: {
    padding: SCREEN_WIDTH * 0.01,
  },
  clearButton: {
    padding: SCREEN_WIDTH * 0.01,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  modalContent: {
    width: SCREEN_WIDTH * 0.9,
    maxWidth: 400,
    padding: SCREEN_WIDTH * 0.04,
    borderRadius: SCREEN_WIDTH * 0.03,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SCREEN_WIDTH * 0.04,
  },
  modalTitle: {
    fontSize: SCREEN_WIDTH * 0.045,
    fontWeight: '600',
  },
  filterSection: {
    marginBottom: SCREEN_WIDTH * 0.04,
  },
  filterTitle: {
    fontSize: SCREEN_WIDTH * 0.035,
    fontWeight: '600',
    marginBottom: SCREEN_WIDTH * 0.02,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SCREEN_WIDTH * 0.02,
  },

  filterButtonActive: {
    borderColor: 'transparent',
  },
  filterButtonText: {
    fontSize: SCREEN_WIDTH * 0.032,
    fontWeight: '500',
  },
  applyButton: {
    width: '100%',
    paddingVertical: SCREEN_WIDTH * 0.03,
    borderRadius: SCREEN_WIDTH * 0.02,
    alignItems: 'center',
    marginTop: SCREEN_WIDTH * 0.02,
  },
  applyButtonText: {
    fontSize: SCREEN_WIDTH * 0.035,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SCREEN_WIDTH * 0.2,
  },
  emptyText: {
    fontSize: SCREEN_WIDTH * 0.04,
    marginTop: SCREEN_WIDTH * 0.03,
    textAlign: 'center',
  },
  historyCard: {
    marginBottom: SCREEN_WIDTH * 0.03,
    padding: SCREEN_WIDTH * 0.04,
    borderRadius: SCREEN_WIDTH * 0.03,
  },
  cardHeader: {
    marginBottom: SCREEN_WIDTH * 0.03,
  },
  topicContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SCREEN_WIDTH * 0.01,
  },
  topicName: {
    fontSize: SCREEN_WIDTH * 0.04,
    fontWeight: '600',
  },
  modeBadge: {
    paddingHorizontal: SCREEN_WIDTH * 0.02,
    paddingVertical: SCREEN_WIDTH * 0.005,
    borderRadius: SCREEN_WIDTH * 0.015,
  },
  modeText: {
    fontSize: SCREEN_WIDTH * 0.03,
    fontWeight: '600',
  },
  date: {
    fontSize: SCREEN_WIDTH * 0.032,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreCircle: {
    width: SCREEN_WIDTH * 0.15,
    height: SCREEN_WIDTH * 0.15,
    borderRadius: SCREEN_WIDTH * 0.075,
    backgroundColor: 'rgba(98, 0, 238, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SCREEN_WIDTH * 0.04,
  },
  scorePercentage: {
    fontSize: SCREEN_WIDTH * 0.05,
    fontWeight: '700',
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: SCREEN_WIDTH * 0.035,
    fontWeight: '600',
    marginBottom: SCREEN_WIDTH * 0.01,
  },
  statLabel: {
    fontSize: SCREEN_WIDTH * 0.028,
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    height: SCREEN_WIDTH * 0.06,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginHorizontal: SCREEN_WIDTH * 0.02,
  }
});