
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NeumorphicView } from '../components/NeumorphicComponents';
import { RoundButton } from '../components/ui/RoundButton';
import { Ionicons } from '@expo/vector-icons';
import { BookmarkedQuestion, getBookmarkedQuestions, removeBookmarkedQuestion } from '../utils/bookmarkStorage';
import Markdown from 'react-native-markdown-display';
import { FilterModal } from '../components/FilterModal';
import { initializeFilterData } from '../utils/filterStorage';

export const BookmarksScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [bookmarks, setBookmarks] = useState<BookmarkedQuestion[]>([]);
  const [questionDifficulties, setQuestionDifficulties] = useState<{ [key: string]: 'easy' | 'hard' | null }>({});
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [expandedExplanations, setExpandedExplanations] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    // Initialize filter data in AsyncStorage
    initializeFilterData();
  }, []);

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    const bookmarkedQuestions = await getBookmarkedQuestions();
    setBookmarks(bookmarkedQuestions);
  };

  const handleRemoveBookmark = async (questionId: string) => {
    const { success, bookmarks } = await removeBookmarkedQuestion(questionId);
    if (success) {
      // Update the bookmarks state with the returned bookmarks array
      setBookmarks(bookmarks);
    }
  };

  const handleDifficultyChange = (questionId: string, difficulty: 'easy' | 'hard') => {
    setQuestionDifficulties(prev => ({
      ...prev,
      [questionId]: prev[questionId] === difficulty ? null : difficulty
    }));
  };

  const filteredBookmarks = bookmarks.filter(bookmark => {
    if (!selectedSubject && !selectedTopic) return true;
    if (selectedSubject && bookmark.topicId.startsWith(selectedSubject)) {
      if (!selectedTopic) return true;
      return bookmark.topicId.includes(selectedTopic);
    }
    return false;
  });

  const resetFilters = () => {
    setSelectedSubject(null);
    setSelectedTopic(null);
    setShowFilterModal(false);
  };

  if (bookmarks.length === 0) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.header}>
          <RoundButton
            icon="chevron-back"
            onPress={() => navigation.goBack()}
            size={40}
            style={styles.backButton}
          />
          <Text style={[styles.headerTitle, { color: theme.colors.onSurface }]}>Bookmarks</Text>
        </View>
        <View style={styles.emptyContainer}>
          <Ionicons name="bookmark-outline" size={64} color={theme.colors.primary} />
          <Text style={[styles.emptyText, { color: theme.colors.onSurfaceVariant }]}>
            No bookmarked questions yet
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <RoundButton
          icon="chevron-back"
          onPress={() => navigation.goBack()}
          size={40}
          style={styles.backButton}
        />
        <Text style={[styles.headerTitle, { color: theme.colors.onSurface }]}>Bookmarks</Text>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilterModal(true)}
        >
          <Ionicons name="filter" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      <FilterModal
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        selectedSubject={selectedSubject}
        selectedTopic={selectedTopic}
        onSubjectSelect={setSelectedSubject}
        onTopicSelect={setSelectedTopic}
        onReset={resetFilters}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredBookmarks.map((bookmark) => (
          <NeumorphicView key={bookmark.id} style={styles.questionCard}>
            <View style={styles.questionContent}>
              <Markdown style={{
                body: { color: theme.colors.onSurface, fontSize: 16, lineHeight: 24 },
                paragraph: { marginVertical: 0 }
              }}>
                {`Q. ${bookmark.question}`}
              </Markdown>
            </View>

            <View style={styles.optionsContainer}>
              {bookmark.options.map((option, optionIndex) => (
                <TouchableOpacity
                  key={optionIndex}
                  style={[
                    styles.optionItem,
                    optionIndex === bookmark.correctOption && styles.correctOption,
                  ]}
                  disabled
                >
                  <Text style={[
                    styles.optionText,
                    { color: theme.colors.onSurface },
                    optionIndex === bookmark.correctOption && styles.correctOptionText
                  ]}>
                    {String.fromCharCode(65 + optionIndex)}. {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.explanationContainer}>
              <Text style={[styles.explanationTitle, { color: theme.colors.primary }]}>Explanation: </Text>
              <View style={styles.explanationTextContainer}>
                  <Text 
                    numberOfLines={expandedExplanations[bookmark.id] ? undefined : 2}
                    style={[styles.explanationText, { color: theme.colors.onSurface }]}
                  >
                    {bookmark.explanation}
                  </Text>
                  {!expandedExplanations[bookmark.id] && (
                    <TouchableOpacity
                      onPress={() => setExpandedExplanations(prev => ({ ...prev, [bookmark.id]: true }))}
                      style={styles.showMoreButton}
                    >
                      <Text style={[styles.showMoreText, { color: theme.colors.primary }]}>
                        Show More
                      </Text>
                    </TouchableOpacity>
                  )}
                  {expandedExplanations[bookmark.id] && (
                    <TouchableOpacity
                      onPress={() => setExpandedExplanations(prev => ({ ...prev, [bookmark.id]: false }))}
                      style={styles.showLessButton}
                    >
                      <Text style={[styles.showMoreText, { color: theme.colors.primary }]}>
                        Show Less
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>

            <View style={styles.cardFooter}>
              <Text style={[styles.dateText, { color: theme.colors.onSurfaceVariant }]}>
                Bookmarked on: {new Date(bookmark.dateBookmarked).toLocaleDateString()}
              </Text>
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={[styles.actionButton, questionDifficulties[bookmark.id] === 'easy' && styles.actionButtonActive]}
                  onPress={() => handleDifficultyChange(bookmark.id, 'easy')}
                >
                  <Ionicons
                    name="thumbs-up"
                    size={24}
                    color={questionDifficulties[bookmark.id] === 'easy' ? theme.colors.primary : theme.colors.onSurfaceVariant}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, questionDifficulties[bookmark.id] === 'hard' && styles.actionButtonActive]}
                  onPress={() => handleDifficultyChange(bookmark.id, 'hard')}
                >
                  <Ionicons
                    name="thumbs-down"
                    size={24}
                    color={questionDifficulties[bookmark.id] === 'hard' ? theme.colors.primary : theme.colors.onSurfaceVariant}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleRemoveBookmark(bookmark.id)}
                >
                  <Ionicons name="bookmark" size={24} color={theme.colors.primary} />
                </TouchableOpacity>
              </View>
            </View>
          </NeumorphicView>
        ))}
      </ScrollView>
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
    marginBottom: SCREEN_WIDTH * 0.03,
    paddingHorizontal: SCREEN_WIDTH * 0.01,
  },
  headerTitle: {
    fontSize: SCREEN_WIDTH * 0.05,
    fontWeight: '700',
    marginLeft: SCREEN_WIDTH * 0.03,
    flex: 1,
  },
  backButton: {
    width: SCREEN_WIDTH * 0.09,
    height: SCREEN_WIDTH * 0.09,
    borderRadius: SCREEN_WIDTH * 0.045,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButton: {
    padding: SCREEN_WIDTH * 0.02,
  },
  content: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 16,
    textAlign: 'center',
  },
  questionCard: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
  },
  questionContent: {
    marginBottom: 16,
  },
  optionsContainer: {
    marginBottom: 16,
  },
  optionItem: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  correctOption: {
    backgroundColor: 'rgba(75, 181, 67, 0.1)',
    borderColor: '#4BB543',
  },
  optionText: {
    fontSize: 14,
    lineHeight: 20,
  },
  correctOptionText: {
    color: '#4BB543',
  },
  explanationContainer: {
    marginBottom: 16,
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  explanationText: {
    fontSize: 14,
    lineHeight: 20,
  },
  explanationTextContainer: {
    flex: 1,
  },
  showMoreButton: {
    alignSelf: 'flex-start',
    marginTop: 8,
    paddingVertical: 2,
  },
  showLessButton: {
    alignSelf: 'flex-start',
    marginTop: 8,
    paddingVertical: 2,
  },
  showMoreText: {
    fontSize: 14,
    fontWeight: '600',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  dateText: {
    fontSize: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionButton: {
    padding: 4,
  },
  actionButtonActive: {
    backgroundColor: 'rgba(98, 0, 238, 0.1)',
    borderRadius: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
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
  filterChip: {
    paddingHorizontal: SCREEN_WIDTH * 0.03,
    paddingVertical: SCREEN_WIDTH * 0.02,
    borderRadius: SCREEN_WIDTH * 0.02,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  filterChipActive: {
    borderColor: 'transparent',
  },
  filterChipText: {
    fontSize: SCREEN_WIDTH * 0.032,
    fontWeight: '500',
  },
  resetButton: {
    width: '100%',
    paddingVertical: SCREEN_WIDTH * 0.03,
    borderRadius: SCREEN_WIDTH * 0.02,
    alignItems: 'center',
    marginTop: SCREEN_WIDTH * 0.02,
  },
  resetButtonText: {
    fontSize: SCREEN_WIDTH * 0.035,
    fontWeight: '600',
  },
});