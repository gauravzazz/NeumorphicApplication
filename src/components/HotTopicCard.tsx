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

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const SCALE_FACTOR = Math.min(SCREEN_WIDTH / 375, SCREEN_HEIGHT / 812);
const CARD_WIDTH = SCREEN_WIDTH < 375 ? SCREEN_WIDTH * 0.92 : SCREEN_WIDTH * 0.7;
const CARD_HEIGHT = SCREEN_WIDTH < 375 ? Math.round(120 * SCALE_FACTOR) : 200;
const getFontSize = (size: number) => Math.round(size * (SCREEN_WIDTH < 375 ? SCALE_FACTOR : 1));

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
      <NeumorphicView style={[styles.card, { height: CARD_HEIGHT }]}>
        <View style={styles.header}>
          <View style={[styles.categoryBadge, { backgroundColor: theme.colors.primary }]}>
            <Text style={[styles.categoryText, { color: theme.colors.surface }]}>
              {category}
            </Text>
          </View>
          <View style={styles.participantsContainer}>
            <Ionicons name="people" size={getFontSize(16)} color={theme.colors.primary} />
            <Text style={[styles.participantsText, { color: theme.colors.onSurfaceVariant }]}>
              {participants}
            </Text>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.iconContainer}>
            <Ionicons 
              name={icon as keyof typeof Ionicons.glyphMap} 
              size={getFontSize(36)} 
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
              Start Now
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
    padding: Math.max(8, Math.round(16 * SCALE_FACTOR)),
    borderRadius: Math.max(12, Math.round(20 * SCALE_FACTOR)),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SCREEN_WIDTH < 375 ? 8 : 16,
  },
  categoryBadge: {
    paddingHorizontal: Math.max(6, Math.round(12 * SCALE_FACTOR)),
    paddingVertical: Math.max(2, Math.round(4 * SCALE_FACTOR)),
    borderRadius: Math.max(6, Math.round(12 * SCALE_FACTOR)),
  },
  categoryText: {
    fontSize: getFontSize(11),
    fontWeight: '600',
  },
  participantsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  participantsText: {
    fontSize: getFontSize(11),
    marginLeft: 4,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Math.max(8, Math.round(16 * SCALE_FACTOR)),
  },
  iconContainer: {
    marginBottom: SCREEN_WIDTH < 375 ? 6 : 12,
  },
  title: {
    fontSize: getFontSize(16),
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: SCREEN_WIDTH < 375 ? 6 : 16,
  },
  footer: {
    marginTop: 'auto',
  },
  joinButton: {
    paddingHorizontal: Math.max(10, Math.round(20 * SCALE_FACTOR)),
    paddingVertical: Math.max(6, Math.round(10 * SCALE_FACTOR)),
    borderRadius: Math.max(8, Math.round(16 * SCALE_FACTOR)),
    alignItems: 'center',
    width: '100%',
  },
  joinButtonText: {
    fontSize: getFontSize(12),
    fontWeight: '600',
  },
});