import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, FlatList, Dimensions } from 'react-native';
import { useTheme } from 'react-native-paper';
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
import { dummyNotifications } from '../data/notificationData';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

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
        questions: selectedTopic.questions.map((q: { id: string; topicId: string; question: string; options: string[]; correctOption: number; explanation: string }) => ({
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

  function handleNotificationPress(notification: any): void {
    throw new Error('Function not implemented.');
  }

  function handleClearAllNotifications(): void {
    throw new Error('Function not implemented.');
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.headerContainer}>
        <Header
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          notifications={dummyNotifications}
          onNotificationPress={handleNotificationPress}
          onClearAllNotifications={handleClearAllNotifications}
        />
      </View>
      <FlatList
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
        data={[1]}
        renderItem={() => (
          <>
            <RecentSubjects searchQuery={searchQuery} />
            <HotTopics 
              topics={mockHotTopics.filter(topic => {
                if (!searchQuery) return true;
                const query = searchQuery.toLowerCase();
                return (
                  topic.title.toLowerCase().includes(query) ||
                  topic.category.toLowerCase().includes(query)
                );
              })} 
              onTopicPress={handleTopicPress} 
            />
            <SubjectGrid
              subjects={mockSubjects.filter(subject => {
                if (!searchQuery) return true;
                const query = searchQuery.toLowerCase();
                return (
                  subject.name.toLowerCase().includes(query) ||
                  subject.description.toLowerCase().includes(query)
                );
              })}
              onSubjectPress={handleSubjectPress}
              onSeeMorePress={handleSeeMorePress}
            />
            <TopicGrid
              topics={mockHotTopics
                .filter(topic => {
                  if (!searchQuery) return true;
                  const query = searchQuery.toLowerCase();
                  return (
                    topic.title.toLowerCase().includes(query) ||
                    topic.category.toLowerCase().includes(query)
                  );
                })
                .map(topic => ({
                  id: topic.id,
                  name: topic.title,
                  description: topic.category,
                  questionsCount: topic.participants,
                  icon: topic.icon
                }))}
              onTopicPress={handleTopicGridPress}
              onSeeMorePress={handleSeeMorePress}
            />
          </>
        )}
        keyExtractor={() => 'content'}
      />
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
    paddingTop: SCREEN_WIDTH * 0.1,
    paddingHorizontal: 0,
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: SCREEN_WIDTH * 0.375,
  },
  listContainer: {
    padding: SCREEN_WIDTH * 0.04,
  },
  subjectCard: {
    marginBottom: SCREEN_WIDTH * 0.04,
    borderRadius: SCREEN_WIDTH * 0.04,
    padding: SCREEN_WIDTH * 0.04,
  },
  subjectContent: {
    gap: SCREEN_WIDTH * 0.02,
  },
  subjectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subjectName: {
    fontSize: SCREEN_WIDTH * 0.045,
    fontWeight: 'bold',
    marginBottom: SCREEN_WIDTH * 0.01,
  },
  subjectDescription: {
    fontSize: SCREEN_WIDTH * 0.035,
  },
  subjectStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsText: {
    fontSize: SCREEN_WIDTH * 0.03,
  },
});