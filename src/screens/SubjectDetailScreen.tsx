import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { SubjectHeader } from '../components/SubjectHeader';
import { SubjectDetailsCard } from '../components/SubjectDetailsCard';
import { RecentTopics } from '../components/RecentTopics';
import { SubjectTopicsGrid } from '../components/SubjectTopicsGrid';
import { Subject } from '../types';
import { mockHotTopics } from '../data/mockData';
import { addRecentSubject } from '../utils/recentSubjectsStorage';

type SubjectDetailRouteProp = RouteProp<{ SubjectDetail: { subject: Subject } }, 'SubjectDetail'>;

export const SubjectDetailScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute<SubjectDetailRouteProp>();
  const { subject } = route.params;
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTopics = mockHotTopics
    .filter(topic =>
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .map(topic => ({
      ...topic,
      totalQuestions: topic.questions?.length || 0
    }));

  useEffect(() => {
    // Add the subject to recent subjects when the screen is opened
    addRecentSubject(subject);
  }, [subject]);

  const handleTopicPress = (topicId: string, questionCount?: number, mode?: 'test' | 'practice') => {
    if (!topicId) {
      console.error('Topic ID is required');
      return;
    }
  
    const topic = mockHotTopics.find(topic => topic.id === topicId);
    if (!topic) {
      console.error(`Topic with ID ${topicId} not found`);
      return;
    }
  
    const questions = topic.questions || [];
    if (questions.length === 0) {
      console.error(`No questions available for topic ${topic.title}`);
      return;
    }
  
    if (questionCount && mode) {
      navigation.navigate('Quiz', {
        topicId: topic.id,
        topicTitle: topic.title,
        subjectName: subject.name,
        questionCount: Math.min(questionCount, questions.length),
        mode,
        timeLimit: mode === 'test' ? 30 : 0,
        questions: questions.map(q => ({
          id: q.id,
          question: q.question,
          options: q.options,
          correctOption: q.correctOption,
          explanation: q.explanation
        }))
      });
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <SubjectHeader
        title={subject.name}
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView style={styles.content}>
        <SubjectDetailsCard subject={subject} onSearchChange={setSearchQuery} />
        <RecentTopics topics={filteredTopics} onTopicPress={handleTopicPress} />
        <SubjectTopicsGrid topics={filteredTopics} onTopicPress={handleTopicPress} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  recentTopicsContainer: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  topicsScrollContent: {
    paddingHorizontal: 8,
  },
});