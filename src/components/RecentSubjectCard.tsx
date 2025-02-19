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
const CARD_WIDTH = SCREEN_WIDTH < 375 ? SCREEN_WIDTH * 0.9 : SCREEN_WIDTH * 0.7;
const CARD_HEIGHT = SCREEN_WIDTH < 375 ? 130 : 160;

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
      <NeumorphicView style={styles.card}>
        <View style={styles.contentRow}>
          <View 
            style={[
              styles.iconContainer,
              { backgroundColor: `${theme.colors.primary}20` }
            ]}
          >
            <Ionicons 
              name={icon as keyof typeof Ionicons.glyphMap} 
              size={SCREEN_WIDTH < 375 ? 24 : 28} 
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
            <View 
              style={[
                styles.progressBar,
                { backgroundColor: `${theme.colors.primary}30` }
              ]}
            >
              <View 
                style={[
                  styles.progressFill,
                  { 
                    backgroundColor: theme.colors.primary,
                    width: `${progress}%`
                  }
                ]}
              />
            </View>
            <Text style={[styles.progressText, { color: theme.colors.onSurfaceVariant }]}>
              {progress}% Complete
            </Text>
          </View>
          <TouchableOpacity 
            style={[
              styles.continueButton,
              { backgroundColor: theme.colors.primaryContainer }
            ]}
            onPress={onPress}
          >
            <Text style={[styles.continueText, { color: theme.colors.onPrimaryContainer }]}>
              Continue
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
    margin: 8,
    maxWidth: 400,
  },
  card: {
    padding: SCREEN_WIDTH < 375 ? 10 : 16,
    borderRadius: SCREEN_WIDTH < 375 ? 16 : 20,
    height: CARD_HEIGHT,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: SCREEN_WIDTH < 375 ? 36 : 48,
    height: SCREEN_WIDTH < 375 ? 36 : 48,
    borderRadius: SCREEN_WIDTH < 375 ? 10 : 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SCREEN_WIDTH < 375 ? 8 : 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: SCREEN_WIDTH < 375 ? 15 : 18,
    fontWeight: '600',
    marginBottom: SCREEN_WIDTH < 375 ? 2 : 4,
  },
  description: {
    fontSize: SCREEN_WIDTH < 375 ? 11 : 14,
    lineHeight: SCREEN_WIDTH < 375 ? 15 : 18,
  },
  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  progressContainer: {
    flex: 1,
    marginRight: 12,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    marginBottom: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: SCREEN_WIDTH < 375 ? 9 : 12,
    fontWeight: '400',
  },
  continueButton: {
    paddingHorizontal: SCREEN_WIDTH < 375 ? 12 : 16,
    paddingVertical: SCREEN_WIDTH < 375 ? 6 : 8,
    borderRadius: SCREEN_WIDTH < 375 ? 10 : 12,
  },
  continueText: {
    fontSize: SCREEN_WIDTH < 375 ? 11 : 14,
    fontWeight: '500',
  },
});