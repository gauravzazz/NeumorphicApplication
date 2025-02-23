import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, useWindowDimensions } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RecentSubjectCard } from './RecentSubjectCard';
import { getRecentSubjects } from '../utils/recentSubjectsStorage';
import { Subject } from '../types';
import { NeumorphicView } from './NeumorphicComponents';

export const RecentSubjects: React.FC<{ searchQuery?: string }> = ({ searchQuery }) => {
  const theme = useTheme();
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const { width } = useWindowDimensions();
  const [recentSubjects, setRecentSubjects] = useState<Subject[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      loadRecentSubjects();
    }, [])
  );

  const loadRecentSubjects = async () => {
    const subjects = await getRecentSubjects();
    setRecentSubjects(subjects);
  };

  const handleSubjectPress = (subject: Subject) => {
    navigation.navigate('SubjectDetail', { subject });
  };

  const filteredSubjects = recentSubjects.filter(subject => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      subject.name.toLowerCase().includes(query) ||
      subject.description.toLowerCase().includes(query)
    );
  });

  if (filteredSubjects.length === 0) {
    return null;
  }

  return (
    <NeumorphicView style={[styles.container, { paddingHorizontal: width > 600 ? 24 : 16 }]}>
      <Text style={[styles.title, { color: theme.colors.onSurface }]}>📚 Recent Subjects</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingHorizontal: width > 600 ? 16 : 8, gap: 16 }]}
      >
        {filteredSubjects.map((subject) => (
          <RecentSubjectCard
            key={subject.id}
            title={subject.name}
            description={subject.description}
            icon={subject.icon}
            progress={subject.progress}
            onPress={() => handleSubjectPress(subject)}
          />
        ))}
      </ScrollView>
    </NeumorphicView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    padding: 16,
    borderRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  scrollContent: {
    flexDirection: 'row',
  },
});
