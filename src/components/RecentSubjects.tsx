import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RecentSubjectCard } from './RecentSubjectCard';
import { mockSubjects } from '../data/mockData';

const recentSubjects = [
  {
    id: '1',
    name: mockSubjects[0].name,
    description: mockSubjects[0].description,
    icon: mockSubjects[0].icon,
    progress: mockSubjects[0].progress,
    topicsCount: mockSubjects[0].topicsCount,
    questionsCount: mockSubjects[0].questionsCount,
  },
  {
    id: '2',
    name: mockSubjects[1].name,
    description: mockSubjects[1].description,
    icon: mockSubjects[1].icon,
    progress: mockSubjects[1].progress,
    topicsCount: mockSubjects[1].topicsCount,
    questionsCount: mockSubjects[1].questionsCount,
  },
];

export const RecentSubjects: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  const handleSubjectPress = (subject: any) => {
    navigation.navigate('SubjectDetail', { subject });
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.colors.onSurface }]}>
        Recent Subjects
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {recentSubjects.map((subject) => (
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
    margin: 16,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
});