import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { NeumorphicView } from './NeumorphicComponents';

interface SubjectCardProps {
  title: string;
  description: string;
  icon: string;
  progress: number;
  onPress: () => void;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const SCALE_FACTOR = Math.min(SCREEN_WIDTH / 375, SCREEN_HEIGHT / 812);
const getFontSize = (size: number) => Math.round(size * SCALE_FACTOR);

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
        <View style={styles.iconContainer}>
          <Ionicons name={icon as keyof typeof Ionicons.glyphMap} size={getFontSize(32)} color={theme.colors.primary} />
        </View>
        <View style={styles.contentContainer}>
          <Text style={[styles.title, { color: theme.colors.onSurface }]}>{title}</Text>
          <Text 
            style={[styles.description, { color: theme.colors.onSurfaceVariant }]}
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
            <Text style={[styles.progressText, { color: theme.colors.onSurfaceVariant }]}>
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
  },
  card: {
    padding: 16,
    borderRadius: 20,
    height: undefined,
    aspectRatio: 1.2,
  },
  iconContainer: {
    marginBottom: getFontSize(12),
    backgroundColor: 'rgba(103, 80, 164, 0.12)',
    width: getFontSize(48),
    height: getFontSize(48),
    borderRadius: getFontSize(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: getFontSize(18),
    fontWeight: 'bold',
    marginBottom: getFontSize(8),
    letterSpacing: 0.5,
  },
  description: {
    fontSize: getFontSize(14),
    marginBottom: getFontSize(8),
    lineHeight: getFontSize(18),
  },
  progressContainer: {
    marginTop: 'auto',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
    backgroundColor: 'rgba(103, 80, 164, 0.15)',
  },
  progressText: {
    fontSize: 12,
  },
});