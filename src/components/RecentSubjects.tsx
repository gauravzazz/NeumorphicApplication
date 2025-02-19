import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RecentSubjectCard } from './RecentSubjectCard';
import { getRecentSubjects } from '../utils/recentSubjectsStorage';
import { Subject } from '../types';

export const RecentSubjects: React.FC<{ searchQuery?: string }> = ({ searchQuery }) => {
  const theme = useTheme();
  const navigation = useNavigation<DrawerNavigationProp<any>>();
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
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.colors.onSurface }]}>
        📚 Recent Subjects
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginLeft: 16,
  },
  scrollContent: {
    paddingHorizontal: 8,
  },
});