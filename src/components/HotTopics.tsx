import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';
import { HotTopicCard } from './HotTopicCard';
import { mockHotTopics } from '../data/mockData';

interface HotTopic {
  id: string;
  title: string;
  category: string;
  icon: string;
  participants: number;
}

export const HotTopics: React.FC = () => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
        Hot Topics
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {mockHotTopics.map((topic) => (
          <HotTopicCard
            key={topic.id}
            title={topic.title}
            category={topic.category}
            icon={topic.icon}
            participants={topic.participants}
            onPress={() => {}}
          />
        ))}
      </ScrollView>
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