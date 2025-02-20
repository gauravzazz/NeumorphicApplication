import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, useWindowDimensions, FlatList } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SubjectCard } from './SubjectCard';
import { NeumorphicView } from './NeumorphicComponents';

import { Subject } from '../types';

interface SubjectGridProps {
  subjects: Subject[];
  onSubjectPress: (subject: Subject) => void;
  onSeeMorePress: () => void;
}

const INITIAL_VISIBLE_SUBJECTS = 6;

export const SubjectGrid: React.FC<SubjectGridProps> = ({
  subjects,
  onSubjectPress,
  onSeeMorePress,
}) => {
  const theme = useTheme();
  const { width } = useWindowDimensions();
  const [showAll, setShowAll] = useState(false);
  const numColumns = width > 600 ? 3 : 2;
  const visibleSubjects = showAll ? subjects : subjects.slice(0, INITIAL_VISIBLE_SUBJECTS);

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>📖 Subjects</Text>
      <FlatList
        data={visibleSubjects}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        renderItem={({ item }) => (
          <View style={[styles.cardContainer, { flex: 1 / numColumns }]}> 
            <SubjectCard
              title={item.name}
              description={item.description}
              icon={item.icon}
              progress={item.progress}
              onPress={() => onSubjectPress(item)}
            />
          </View>
        )}
        columnWrapperStyle={numColumns > 1 ? styles.row : null}
      />
      {subjects.length > INITIAL_VISIBLE_SUBJECTS && (
        <TouchableOpacity
          onPress={() => {
            setShowAll(!showAll);
            onSeeMorePress();
          }}
          style={styles.seeMoreContainer}
        >
          <NeumorphicView style={styles.seeMoreButton}>
            <Text style={[styles.seeMoreText, { color: theme.colors.primary }]}> 
              {showAll ? 'Show Less' : `Show More (${subjects.length - INITIAL_VISIBLE_SUBJECTS} more)`}
            </Text>
          </NeumorphicView>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  row: {
    justifyContent: 'space-between',
  },
  cardContainer: {
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  seeMoreContainer: {
    width: '100%',
    marginTop: 16,
    alignItems: 'center',
  },
  seeMoreButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 16,
    minWidth: 160,
  },
  seeMoreText: {
    textAlign: 'center',
    fontWeight: '600',
  },
});
