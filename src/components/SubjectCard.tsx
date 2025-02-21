import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { NeumorphicView } from './NeumorphicComponents';
import { typography } from '../theme/typography';
import { scale, spacing } from '../theme/scaling';

interface SubjectCardProps {
  title: string;
  description: string;
  icon: string;
  progress: number;
  onPress: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const SubjectCard: React.FC<SubjectCardProps> = ({
  title,
  description,
  icon,
  progress,
  onPress,
}) => {
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <NeumorphicView style={styles.card}>
        <View style={[styles.iconContainer, { backgroundColor: 'rgba(103, 80, 164, 0.12)' }]}>
          <Ionicons name={icon as keyof typeof Ionicons.glyphMap} size={scale.icon.lg} color={theme.colors.primary} />
        </View>
        <View style={styles.contentContainer}>
          <Text style={[styles.title, { color: theme.colors.onSurface }, typography.titleLarge]} numberOfLines={1}>{title}</Text>
          <Text 
            style={[styles.description, { color: theme.colors.onSurfaceVariant }, typography.bodyMedium]}
            numberOfLines={2}
          >
            {description}
          </Text>
          <View style={styles.progressContainer}>
            <View 
              style={[
                styles.progressBar,
                { 
                  backgroundColor: theme.colors.primary,
                  width: `${progress}%`
                }
              ]}
            />
            <Text style={[styles.progressText, { color: theme.colors.onSurfaceVariant }, typography.labelSmall]}>
              {progress}% Complete
            </Text>
          </View>
        </View>
      </NeumorphicView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  card: {
    padding: spacing.md,
    borderRadius: scale.radius.lg,
    minHeight: scale.size(180),
    height: '100%',
    width: '100%',
  },
  iconContainer: {
    marginBottom: spacing.sm,
    width: scale.size(48),
    height: scale.size(48),
    borderRadius: scale.radius.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: scale.text.lg,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
    letterSpacing: 0.25,
  },
  description: {
    fontSize: scale.text.md,
    marginBottom: spacing.xs,
    lineHeight: scale.text.lg,
  },
  progressContainer: {
    marginTop: 'auto',
    paddingTop: spacing.xs,
  },
  progressBar: {
    height: scale.size(6),
    borderRadius: scale.radius.xs,
    marginBottom: spacing.xs,
    backgroundColor: 'rgba(103, 80, 164, 0.15)',
  },
  progressText: {
    fontSize: scale.text.sm,
  },
});