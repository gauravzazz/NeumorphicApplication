import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { NeumorphicView } from './NeumorphicComponents';
import { FilterData, getFilterData } from '../utils/filterStorage';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  selectedSubject: string | null;
  selectedTopic: string | null;
  onSubjectSelect: (subject: string | null) => void;
  onTopicSelect: (topic: string | null) => void;
  onReset: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  selectedSubject,
  selectedTopic,
  onSubjectSelect,
  onTopicSelect,
  onReset,
}) => {
  const theme = useTheme();
  const [filterData, setFilterData] = useState<FilterData | null>(null);

  useEffect(() => {
    loadFilterData();
  }, []);

  const loadFilterData = async () => {
    const data = await getFilterData();
    if (data) {
      setFilterData(data);
    }
  };

  if (!filterData) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
        >
          <NeumorphicView style={[styles.modalContent, { backgroundColor: theme.colors.background }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.colors.onSurface }]}>Filter Questions</Text>
              <TouchableOpacity onPress={onClose}>
                <Ionicons name="close" size={24} color={theme.colors.onSurface} />
              </TouchableOpacity>
            </View>

            <View style={styles.filterSection}>
              <Text style={[styles.filterTitle, { color: theme.colors.onSurface }]}>Subject</Text>
              <View style={styles.filterOptions}>
                {filterData.subjects.map((subject) => (
                  <TouchableOpacity
                    key={subject}
                    style={[
                      styles.filterChip,
                      selectedSubject === subject && styles.filterChipActive,
                      { backgroundColor: selectedSubject === subject ? theme.colors.primary : 'transparent' }
                    ]}
                    onPress={() => {
                      onSubjectSelect(selectedSubject === subject ? null : subject);
                      onTopicSelect(null);
                    }}
                  >
                    <Text style={[
                      styles.filterChipText,
                      { color: selectedSubject === subject ? theme.colors.surface : theme.colors.onSurface }
                    ]}>
                      {subject}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {selectedSubject && filterData.topics[selectedSubject] && (
              <View style={styles.filterSection}>
                <Text style={[styles.filterTitle, { color: theme.colors.onSurface }]}>Topic</Text>
                <View style={styles.filterOptions}>
                  {filterData.topics[selectedSubject].map((topic) => (
                    <TouchableOpacity
                      key={topic}
                      style={[
                        styles.filterChip,
                        selectedTopic === topic && styles.filterChipActive,
                        { backgroundColor: selectedTopic === topic ? theme.colors.primary : 'transparent' }
                      ]}
                      onPress={() => onTopicSelect(selectedTopic === topic ? null : topic)}
                    >
                      <Text style={[
                        styles.filterChipText,
                        { color: selectedTopic === topic ? theme.colors.surface : theme.colors.onSurface }
                      ]}>
                        {topic}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            <TouchableOpacity
              style={[styles.resetButton, { backgroundColor: theme.colors.error }]}
              onPress={onReset}
            >
              <Text style={[styles.resetButtonText, { color: theme.colors.surface }]}>Reset Filters</Text>
            </TouchableOpacity>
          </NeumorphicView>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: SCREEN_WIDTH * 0.9,
    maxWidth: 400,
    padding: SCREEN_WIDTH * 0.04,
    borderRadius: SCREEN_WIDTH * 0.03,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SCREEN_WIDTH * 0.04,
  },
  modalTitle: {
    fontSize: SCREEN_WIDTH * 0.045,
    fontWeight: '600',
  },
  filterSection: {
    marginBottom: SCREEN_WIDTH * 0.04,
  },
  filterTitle: {
    fontSize: SCREEN_WIDTH * 0.035,
    fontWeight: '600',
    marginBottom: SCREEN_WIDTH * 0.02,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SCREEN_WIDTH * 0.02,
  },
  filterChip: {
    paddingHorizontal: SCREEN_WIDTH * 0.03,
    paddingVertical: SCREEN_WIDTH * 0.02,
    borderRadius: SCREEN_WIDTH * 0.02,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  filterChipActive: {
    borderColor: 'transparent',
  },
  filterChipText: {
    fontSize: SCREEN_WIDTH * 0.032,
    fontWeight: '500',
  },
  resetButton: {
    width: '100%',
    paddingVertical: SCREEN_WIDTH * 0.03,
    borderRadius: SCREEN_WIDTH * 0.02,
    alignItems: 'center',
    marginTop: SCREEN_WIDTH * 0.02,
  },
  resetButtonText: {
    fontSize: SCREEN_WIDTH * 0.035,
    fontWeight: '600',
  },
});