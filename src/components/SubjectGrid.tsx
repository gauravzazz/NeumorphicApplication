import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SubjectCard } from './SubjectCard';
import { NeumorphicView } from './NeumorphicComponents';

interface Subject {
  id: string;
  name: string;
  description: string;
  icon: string;
  progress: number;
}

interface SubjectGridProps {
  subjects: Subject[];
  onSubjectPress: (subject: Subject) => void;
  onSeeMorePress: () => void;
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const GRID_PADDING = 20;
const CARD_MARGIN = 10;
const CARDS_PER_ROW = 2;
const INITIAL_VISIBLE_SUBJECTS = 6;

export const SubjectGrid: React.FC<SubjectGridProps> = ({
  subjects,
  onSubjectPress,
  onSeeMorePress,
}) => {
  const theme = useTheme();
  const [showAll, setShowAll] = useState(false);
  const visibleSubjects = showAll ? subjects : subjects.slice(0, INITIAL_VISIBLE_SUBJECTS);

  const cardWidth = (SCREEN_WIDTH - (2 * GRID_PADDING) - (CARDS_PER_ROW - 1) * CARD_MARGIN * 2) / CARDS_PER_ROW;

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>📖 Subjects</Text>
      <View style={styles.grid}>
        {visibleSubjects.map((subject) => (
          <View 
            key={subject.id} 
            style={[styles.cardContainer, { width: cardWidth }]}
          >
            <SubjectCard
              title={subject.name}
              description={subject.description}
              icon={subject.icon}
              progress={subject.progress}
              onPress={() => onSubjectPress(subject)}
            />
          </View>
        ))}
      </View>
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
    padding: GRID_PADDING,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  cardContainer: {
    width: '48%',
    marginBottom: CARD_MARGIN * 2,
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