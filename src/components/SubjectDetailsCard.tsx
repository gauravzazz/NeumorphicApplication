import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { NeumorphicView } from './NeumorphicComponents';
import { Subject } from '../types';

interface SubjectDetailsCardProps {
  subject: Subject;
}

export const SubjectDetailsCard: React.FC<SubjectDetailsCardProps> = ({ subject }) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <NeumorphicView style={styles.card}>
      <View style={styles.iconContainer}>
        <Ionicons name={subject.icon as keyof typeof Ionicons.glyphMap} size={48} color={theme.colors.primary} />
      </View>
      <Text style={[styles.description, { color: theme.colors.onSurface }]}>
        {subject.description}
      </Text>
      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: theme.colors.primary }]}>
            {subject.topicsCount}
          </Text>
          <Text style={[styles.statLabel, { color: theme.colors.onSurfaceVariant }]}>
            Topics
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: theme.colors.primary }]}>
            {subject.questionsCount}
          </Text>
          <Text style={[styles.statLabel, { color: theme.colors.onSurfaceVariant }]}>
            Questions
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: theme.colors.primary }]}>
            {subject.progress}%
          </Text>
          <Text style={[styles.statLabel, { color: theme.colors.onSurfaceVariant }]}>
            Progress
          </Text>
        </View>
      </View>
      <View style={styles.searchContainer}>
        <NeumorphicView style={styles.searchBar}>
          <Ionicons name="search" size={20} color={theme.colors.onSurfaceVariant} style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { color: theme.colors.onSurface }]}
            placeholder="Search topics..."
            placeholderTextColor={theme.colors.onSurfaceVariant}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </NeumorphicView>
      </View>
    </NeumorphicView>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    padding: 24,
    borderRadius: 16,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
  },
  searchContainer: {
    marginTop: 24,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    padding: 0,
  },
});