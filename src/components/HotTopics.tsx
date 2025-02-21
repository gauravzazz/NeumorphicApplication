import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, useWindowDimensions } from 'react-native';
import { useTheme } from 'react-native-paper';
import { scale, spacing } from '../theme/scaling';
import { getTextStyle } from '../theme/typography';
import { HotTopicCard } from './HotTopicCard';
import { QuizConfigModal } from './modals/QuizConfigModal';
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
  const { width } = useWindowDimensions();
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
      <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>🔥 Hot Topics</Text>
      <FlatList
        data={topics}
        horizontal
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { minWidth: width }]}
        renderItem={({ item }) => (
          <HotTopicCard
            title={item.title}
            category={item.category}
            icon={item.icon}
            participants={item.participants}
            onPress={() => handleTopicPress(item)}
          />
        )}
      />
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
    marginVertical: spacing.md,
  },
  sectionTitle: {
    ...getTextStyle('headlineSmall'),
    marginBottom: spacing.md,
    marginLeft: spacing.md,
  },
  scrollContent: {
    paddingHorizontal: spacing.xs,
  },
});
