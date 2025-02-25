import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Dimensions } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { Subject } from '../types';
import { mockSubjects, mockHotTopics, mockQuestions } from '../data/mockData';
import { Header} from '../components/Header';
import { RecentSubjects } from '../components/RecentSubjects';
import { HotTopics } from '../components/HotTopics';
import { SubjectGrid } from '../components/SubjectGrid';
import { TopicGrid } from '../components/TopicGrid';
import { QuizConfigModal } from '../components/modals/QuizConfigModal';
import { dummyNotifications } from '../data/notificationData';
import { BottomNavigation } from '../components/ui/BottomNavigation';
import { DatabaseService } from '../services/database/DatabaseService';


const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const HomeScreen: React.FC = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const [selectedTopic, setSelectedTopic] = useState<any>(null);
  const [isQuizConfigVisible, setQuizConfigVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    const verifyDatabase = async () => {
      const db = DatabaseService.getInstance();
      await db.verifyTables();
    };
    
    verifyDatabase();
  }, []);

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
        style={styles.scrollContent}
        contentContainerStyle={[styles.contentContainer, { paddingBottom: SCREEN_WIDTH * 0.25 }]}
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
        onClose={() => setQuizConfigVisible(false)}
        topicId={selectedTopic?.id}
        topicTitle={selectedTopic?.title}
        subjectName={selectedTopic?.category}
  
      />
      <View style={styles.bottomNavContainer}>
        <BottomNavigation
          activeTab={activeTab}
          onTabPress={(tabName) => {
            setActiveTab(tabName);
            switch (tabName) {
              case 'home':
                navigation.navigate('Home');
                break;
              case 'progress':
                navigation.navigate('Progress');
                break;
              case 'versus':
               
                break;
              case 'bookmarks':
                navigation.navigate('Bookmarks');
                break;
              case 'profile':
                navigation.navigate('Profile');
                break;
            }
          }}
        />
      </View>
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
  scrollContent: {
    flex: 1,
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
  bottomNavContainer: {
    position: 'absolute',
    bottom: SCREEN_WIDTH * 0.05,
    left: SCREEN_WIDTH * 0.05,
    right: SCREEN_WIDTH * 0.05,
    alignItems: 'center',
  },

});