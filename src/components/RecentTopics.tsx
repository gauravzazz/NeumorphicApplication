import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';
import { RecentSubjectCard } from './RecentSubjectCard';
import { QuizConfigModal } from './modals/QuizConfigModal';

interface Topic {
  id: string;
  title: string;
  category: string;
  icon: string;
  totalQuestions: number;
}

interface RecentTopicsProps {
  topics: Topic[];
  onTopicPress: (topicId: string, questionCount?: number, mode?: 'test' | 'practice') => void;
}

export const RecentTopics: React.FC<RecentTopicsProps> = ({ topics, onTopicPress }) => {
  const theme = useTheme();
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleTopicPress = (topic: Topic) => {
    setSelectedTopic(topic);
    setModalVisible(true);
  };

  const handleStartQuiz = (questionCount: number, mode: 'test' | 'practice') => {
    if (selectedTopic) {
      onTopicPress(selectedTopic.id, questionCount, mode);
    }
    setModalVisible(false);
  };

  return (
    <View style={styles.recentTopicsContainer}>
      <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
        Recent Topics
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.topicsScrollContent}
      >
        {topics.map((topic) => (
          <RecentSubjectCard
            key={topic.id}
            title={topic.title}
            description={topic.category}
            icon={topic.icon}
            progress={75}
            onPress={() => handleTopicPress(topic)}
          />
        ))}
      </ScrollView>

      {selectedTopic && (
        <QuizConfigModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onStart={handleStartQuiz}
          topicTitle={selectedTopic.title}
          maxQuestions={selectedTopic.totalQuestions}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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