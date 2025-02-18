import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { NeumorphicView } from './NeumorphicComponents';
import { QuizConfigModal } from './QuizConfigModal';

interface Topic {
  id: string;
  title: string;
  category: string;
  icon: string;
  totalQuestions: number;
}

interface TopicCardProps {
  topic: Topic;
  onPress: (topicId: string, questionCount: number, mode: 'test' | 'practice') => void;
}

const TopicCard: React.FC<TopicCardProps> = ({ topic, onPress }) => {
  const theme = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const handleStartQuiz = (questionCount: number, mode: 'test' | 'practice') => {
    onPress(topic.id, questionCount, mode);
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.cardContainer}>
        <NeumorphicView style={styles.card}>
          <Ionicons
            name={topic.icon as keyof typeof Ionicons.glyphMap}
            size={32}
            color={theme.colors.primary}
          />
          <Text style={[styles.title, { color: theme.colors.onSurface }]} numberOfLines={2}>
            {topic.title}
          </Text>
          <Text style={[styles.category, { color: theme.colors.onSurfaceVariant }]} numberOfLines={1}>
            {topic.category}
          </Text>
        </NeumorphicView>
      </TouchableOpacity>

      <QuizConfigModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onStart={handleStartQuiz}
        topicTitle={topic.title}
        maxQuestions={topic.totalQuestions}
      />
    </>
  );
};

interface SubjectTopicsGridProps {
  topics: Topic[];
  onTopicPress: (topicId: string, questionCount: number, mode: 'test' | 'practice') => void;
}

export const SubjectTopicsGrid: React.FC<SubjectTopicsGridProps> = ({ topics, onTopicPress }) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
        Topics
      </Text>
      <View style={styles.grid}>
        {topics.map((topic) => (
          <TopicCard key={topic.id} topic={topic} onPress={onTopicPress} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  cardContainer: {
    width: '48%',
    marginBottom: 16,
  },
  card: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    textAlign: 'center',
  },
});