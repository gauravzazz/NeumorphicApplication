import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { NeumorphicView } from './NeumorphicComponents';

interface Topic {
  id: string;
  name: string;
  description: string;
  icon: string;
  questionsCount: number;
}

interface TopicGridProps {
  topics: Topic[];
  onTopicPress: (topicId: string) => void;
  onSeeMorePress: () => void;
}

export const TopicGrid: React.FC<TopicGridProps> = ({
  topics,
  onTopicPress,
  onSeeMorePress,
}) => {
  const theme = useTheme();
  const [showAll, setShowAll] = useState(false);
  const visibleTopics = showAll ? topics : topics.slice(0, 9);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.onSurface }]}>⭐ Popular Topics</Text>
      </View>
      <View style={styles.grid}>
        {visibleTopics.map((topic) => (
          <TouchableOpacity
            key={topic.id}
            style={styles.gridItem}
            onPress={() => onTopicPress(topic.id)}
          >
            <NeumorphicView style={styles.topicCard}>
              <View 
                style={[
                  styles.iconContainer,
                  { backgroundColor: `${theme.colors.primary}20` }
                ]}
              >
                <Ionicons 
                  name={topic.icon as keyof typeof Ionicons.glyphMap} 
                  size={24} 
                  color={theme.colors.primary} 
                />
              </View>
              <Text 
                style={[styles.topicName, { color: theme.colors.onSurface }]}
                numberOfLines={1}
              >
                {topic.name}
              </Text>
              <Text 
                style={[styles.questionsCount, { color: theme.colors.onSurfaceVariant }]}
                numberOfLines={1}
              >
                {topic.questionsCount} Questions
              </Text>
            </NeumorphicView>
          </TouchableOpacity>
        ))}
      </View>
      {topics.length > 9 && (
        <TouchableOpacity 
          onPress={() => {
            setShowAll(!showAll);
            onSeeMorePress();
          }}
          style={styles.seeMoreContainer}
        >
          <NeumorphicView style={styles.seeMoreButton}>
            <Text style={[styles.seeMoreText, { color: theme.colors.primary }]}>
              {showAll ? 'Show Less' : `Show More (${topics.length - 9} more)`}
            </Text>
          </NeumorphicView>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  gridItem: {
    width: '31%',
    aspectRatio: 0.9,
  },
  topicCard: {
    flex: 1,
    padding: 12,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  topicName: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  questionsCount: {
    fontSize: 12,
    textAlign: 'center',
  },
  seeMoreContainer: {
    width: '100%',
    alignItems: 'center',
  },
  seeMoreButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 16,
    minWidth: 160,
  },
  seeMoreText: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 14,
  },
});