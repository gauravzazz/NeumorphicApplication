import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { NeumorphicView } from './NeumorphicComponents';

interface RecentSubjectCardProps {
  title: string;
  description: string;
  icon: string;
  progress: number;
  onPress: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH * 0.85;
const CARD_HEIGHT = SCREEN_WIDTH < 375 ? 140 : 180;

export const RecentSubjectCard: React.FC<RecentSubjectCardProps> = ({
  title,
  description,
  icon,
  progress,
  onPress,
}) => {
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <NeumorphicView style={styles.card} depth={10} intensity={0.2}>
        <View style={styles.contentRow}>
          <View 
            style={[styles.iconContainer, { backgroundColor: `${theme.colors.primary}30` }]}
          >
            <Ionicons 
              name={icon as keyof typeof Ionicons.glyphMap} 
              size={SCREEN_WIDTH < 375 ? 28 : 32} 
              color={theme.colors.primary} 
            />
          </View>
          <View style={styles.textContainer}>
            <Text 
              style={[styles.title, { color: theme.colors.onSurface }]} 
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text 
              style={[styles.description, { color: theme.colors.onSurfaceVariant }]} 
              numberOfLines={2}
            >
              {description}
            </Text>
          </View>
        </View>
        <View style={styles.progressSection}>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { backgroundColor: `${theme.colors.primary}40` }]}>
              <View 
                style={[styles.progressFill, { backgroundColor: theme.colors.primary, width: `${progress}%` }]}
              />
            </View>
            <Text style={[styles.progressText, { color: theme.colors.onSurfaceVariant }]}>
              {progress}% Complete
            </Text>
          </View>
          <TouchableOpacity 
            style={[styles.continueButton, { backgroundColor: theme.colors.primaryContainer }]}
            onPress={onPress}
          >
            <Text style={[styles.continueText, { color: theme.colors.onPrimaryContainer }]}>Continue</Text>
          </TouchableOpacity>
        </View>
      </NeumorphicView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    marginVertical: 10,
    alignSelf: 'center',
  },
  card: {
    padding: 18,
    borderRadius: 24,
    height: CARD_HEIGHT,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    lineHeight: 18,
  },
  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressContainer: {
    flex: 1,
    marginRight: 12,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '400',
  },
  continueButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  continueText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
