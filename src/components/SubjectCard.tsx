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

const CARD_WIDTH = Dimensions.get('window').width * 0.85;

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
          <Ionicons name={icon as keyof typeof Ionicons.glyphMap} size={32} color={theme.colors.primary} />
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
    width: CARD_WIDTH,
    marginHorizontal: 8,
  },
  card: {
    padding: 24,
    borderRadius: 28,
    height: 240,
  },
  iconContainer: {
    marginBottom: 20,
    backgroundColor: 'rgba(103, 80, 164, 0.12)',
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    lineHeight: 22,
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