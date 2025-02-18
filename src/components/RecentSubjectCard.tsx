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

const CARD_WIDTH = Dimensions.get('window').width * 0.7;

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
              size={28} 
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
  },
  card: {
    padding: 16,
    borderRadius: 20,
    height: 160,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
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
    fontWeight: 'bold',
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
    fontSize: 12,
  },
  continueButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  continueText: {
    fontSize: 14,
    fontWeight: '600',
  },
});