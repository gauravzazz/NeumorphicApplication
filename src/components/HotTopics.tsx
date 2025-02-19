import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';
import { HotTopicCard } from './HotTopicCard';
import { QuizConfigModal } from './QuizConfigModal';
import { mockHotTopics } from '../data/mockData';

interface HotTopic {
  id: string;
  title: string;
  category: string;
  icon: string;
  participants: number;
  questions?: any[];
}

interface HotTopicsProps {
  topics: HotTopic[];
  onTopicPress: (topicId: string, config?: { mode: 'test' | 'practice', questionCount: number }) => void;
}

export const HotTopics: React.FC<HotTopicsProps> = ({ topics, onTopicPress }) => {
  const theme = useTheme();
  const [selectedTopic, setSelectedTopic] = useState<HotTopic | null>(null);
  const [isQuizConfigVisible, setQuizConfigVisible] = useState(false);

  const handleTopicPress = (topic: HotTopic) => {
    if (topic.questions && topic.questions.length > 0) {
      setSelectedTopic(topic);
      setQuizConfigVisible(true);
    } else {
      console.warn(`No questions available for topic ${topic.title}`);
    }
  };

  const handleQuizStart = (questionCount: number, mode: 'test' | 'practice') => {
    if (selectedTopic) {
      onTopicPress(selectedTopic.id, { mode, questionCount });
    }
    setQuizConfigVisible(false);
  };

  const handleModalClose = () => {
    setQuizConfigVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
        🔥 Hot Topics
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {topics.map((topic) => (
          <HotTopicCard
            key={topic.id}
            title={topic.title}
            category={topic.category}
            icon={topic.icon}
            participants={topic.participants}
            onPress={() => handleTopicPress(topic)}
          />
        ))}
      </ScrollView>
      {selectedTopic && (
        <QuizConfigModal
          visible={isQuizConfigVisible}
          onClose={handleModalClose}
          onStart={handleQuizStart}
          topicTitle={selectedTopic.title}
          maxQuestions={selectedTopic.questions?.length || 0}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginLeft: 16,
  },
  scrollContent: {
    paddingHorizontal: 8,
  },
});