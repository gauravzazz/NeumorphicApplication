import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { NeumorphicView } from '../../../components/NeumorphicComponents';

type FilterType = 'all' | 'correct' | 'incorrect' | 'skipped';

interface QuestionFiltersProps {
  selectedFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export const QuestionFilters: React.FC<QuestionFiltersProps> = ({
  selectedFilter,
  onFilterChange,
}) => {
  const theme = useTheme();

  const filters: Array<{ key: FilterType; label: string; icon: keyof typeof Ionicons.glyphMap; color: string }> = [
    { key: 'all', label: 'All', icon: 'list', color: theme.colors.primary },
    { key: 'correct', label: 'Correct', icon: 'checkmark-circle', color: '#4BB543' },
    { key: 'incorrect', label: 'Incorrect', icon: 'close-circle', color: '#FF4C4C' },
    { key: 'skipped', label: 'Skipped', icon: 'help-circle', color: '#FFA500' },
  ];

  return (
    <View style={styles.filterContainer}>
      {filters.map(({ key, label, icon, color }) => {
        const isSelected = selectedFilter === key;
        return (
          <TouchableOpacity
            key={key}
            onPress={() => onFilterChange(key)}
            style={styles.filterButtonWrapper}
          >
            <NeumorphicView
              style={[
                styles.filterButton,
                isSelected && styles.filterButtonActive,
                { borderColor: isSelected ? color : 'rgba(0, 0, 0, 0.1)' }
              ]}
            >
              <Ionicons
                name={icon}
                size={24}
                color={isSelected ? color : theme.colors.onSurfaceVariant}
              />
            </NeumorphicView>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
    flexWrap: 'nowrap',
    gap: 12,
  },
  filterButtonWrapper: {
    minWidth: 50,
    maxWidth: 60,
  },
  filterButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    aspectRatio: 1,
  },
  filterButtonActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 2,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});