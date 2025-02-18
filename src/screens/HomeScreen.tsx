import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TextInput, FlatList, Text } from 'react-native';
import { useTheme, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { Subject } from '../types';
import { mockSubjects, mockHotTopics } from '../data/mockData';
import { Header} from '../components/Header';
import { RecentSubjects } from '../components/RecentSubjects';
import { HotTopics } from '../components/HotTopics';
import { SubjectGrid } from '../components/SubjectGrid';
import { TopicGrid } from '../components/TopicGrid';
import { QuizConfigModal } from '../components/QuizConfigModal';

export const HomeScreen: React.FC = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const [selectedTopic, setSelectedTopic] = useState<any>(null);
  const [isQuizConfigVisible, setQuizConfigVisible] = useState(false);

  const handleTopicPress = (topicId: string) => {
    const topic = mockHotTopics.find(topic => topic.id === topicId);
    if (!topic) {
      console.warn(`Topic with ID ${topicId} not found`);
      return;
    }
    navigation.navigate('Quiz', {
      topicId,
      mode: 'practice',
      questions: topic.questions || []
    });
  };

  const handleSubjectPress = (subject: Subject) => {
    navigation.navigate('SubjectDetail', { subject });
  };

  const handleSeeMorePress = () => {
    // Handle see more press
    console.log('See more pressed');
  };

  const handleTopicGridPress = (topicId: string) => {
    const topic = mockHotTopics.find(topic => topic.id === topicId);
    if (!topic) {
      console.warn(`Topic with ID ${topicId} not found`);
      return;
    }
    
    if (topic.questions && topic.questions.length > 0) {
      setSelectedTopic(topic);
      setQuizConfigVisible(true);
    } else {
      console.warn(`No questions available for topic ${topic.title}`);
    }
  };

  const handleQuizStart = (config: { mode: 'test' | 'practice', questionCount: number }) => {
    if (selectedTopic && selectedTopic.questions) {
      navigation.navigate('Quiz', {
        topicId: selectedTopic.id,
        mode: config.mode,
        questionCount: Math.min(config.questionCount, selectedTopic.questions.length),
        timeLimit: config.mode === 'test' ? 30 : 0,
        questions: selectedTopic.questions.map(q => ({
          id: q.id,
          topicId: q.topicId,
          question: q.question,
          options: q.options,
          correctOption: q.correctOption,
          explanation: q.explanation
        }))
      });
    }
    setQuizConfigVisible(false);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.headerContainer}>
        <Header searchQuery={searchQuery} onSearchQueryChange={setSearchQuery} />
      </View>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          <RecentSubjects />
          <HotTopics topics={mockHotTopics} onTopicPress={handleTopicPress} />
          <SubjectGrid
            subjects={mockSubjects}
            onSubjectPress={handleSubjectPress}
            onSeeMorePress={handleSeeMorePress}
          />
          <TopicGrid
            topics={mockHotTopics.map(topic => ({
              id: topic.id,
              name: topic.title,
              description: topic.category,
              questionsCount: topic.participants,
              icon: topic.icon
            }))}
            onTopicPress={handleTopicGridPress}
            onSeeMorePress={handleSeeMorePress}
          />
        </View>
      </ScrollView>
      <QuizConfigModal
        visible={isQuizConfigVisible}
        onDismiss={() => setQuizConfigVisible(false)}
        onStart={handleQuizStart}
        questionCount={selectedTopic?.questions?.length || 0}
      />
    </SafeAreaView>
  );
}; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: 'transparent',
    paddingTop: 40,
    paddingHorizontal: 0,
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 150,
  },
  listContainer: {
    padding: 16,
  },
  subjectCard: {
    marginBottom: 16,
    borderRadius: 16,
    padding: 16,
  },
  subjectContent: {
    gap: 8,
  },
  subjectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subjectName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subjectDescription: {
    fontSize: 14,
  },
  subjectStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsText: {
    fontSize: 12,
  },
});