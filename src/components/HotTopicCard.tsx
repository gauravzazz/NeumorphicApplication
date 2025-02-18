import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { NeumorphicView } from './NeumorphicComponents';

interface HotTopicCardProps {
  title: string;
  category: string;
  icon: string;
  participants: number;
  onPress: () => void;
}

const CARD_WIDTH = Dimensions.get('window').width * 0.6;

export const HotTopicCard: React.FC<HotTopicCardProps> = ({
  title,
  category,
  icon,
  participants,
  onPress,
}) => {
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <NeumorphicView style={styles.card}>
        <View style={styles.header}>
          <View style={[styles.categoryBadge, { backgroundColor: theme.colors.primary }]}>
            <Text style={[styles.categoryText, { color: theme.colors.surface }]}>
              {category}
            </Text>
          </View>
          <View style={styles.participantsContainer}>
            <Ionicons name="people" size={16} color={theme.colors.primary} />
            <Text style={[styles.participantsText, { color: theme.colors.onSurfaceVariant }]}>
              {participants}
            </Text>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.iconContainer}>
            <Ionicons 
              name={icon as keyof typeof Ionicons.glyphMap} 
              size={36} 
              color={theme.colors.primary} 
            />
          </View>
          <Text 
            style={[styles.title, { color: theme.colors.onSurface }]}
            numberOfLines={2}
          >
            {title}
          </Text>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity 
            style={[styles.joinButton, { backgroundColor: theme.colors.primaryContainer }]}
            onPress={onPress}
          >
            <Text style={[styles.joinButtonText, { color: theme.colors.onPrimaryContainer }]}>
              Join Discussion
            </Text>
          </TouchableOpacity>
        </View>
      </NeumorphicView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    marginHorizontal: 8,
  },
  card: {
    padding: 16,
    borderRadius: 20,
    height: 200,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
  },
  participantsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  participantsText: {
    fontSize: 12,
    marginLeft: 4,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  iconContainer: {
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    marginTop: 'auto',
  },
  joinButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 16,
    alignItems: 'center',
    width: '100%',
  },
  joinButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});