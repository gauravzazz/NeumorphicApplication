import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Dimensions, Modal } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

interface LanguageSelectionModalProps {
  visible: boolean;
  onClose: () => void;
  selectedLanguage: string;
  onLanguageSelect: (language: string) => void;
  languages: string[];
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const LanguageSelectionModal: React.FC<LanguageSelectionModalProps> = ({
  visible,
  onClose,
  selectedLanguage,
  onLanguageSelect,
  languages,
}) => {
  const theme = useTheme();

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
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
          <View style={[styles.modalContent, { backgroundColor: theme.colors.surface }]}>
            <View style={[styles.modalHeader, styles.modalHeaderShadow]}>
              <Text style={[styles.modalTitle, { color: theme.colors.onSurface }]}>Select Language</Text>
              <TouchableOpacity 
                onPress={onClose} 
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color={theme.colors.onSurface} />
              </TouchableOpacity>
            </View>
            <ScrollView 
              style={styles.scrollView} 
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              {languages.map((language) => (
                <TouchableOpacity
                  key={language}
                  style={[styles.languageItem, selectedLanguage === language && styles.selectedLanguageItem]}
                  onPress={() => onLanguageSelect(language)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[styles.languageText, { color: selectedLanguage === language ? theme.colors.primary : theme.colors.onSurface }]}
                  >
                    {language}
                  </Text>
                  {selectedLanguage === language && (
                    <Ionicons name="checkmark" size={24} color={theme.colors.primary} />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SCREEN_WIDTH * 0.04,
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 28,
    padding: SCREEN_WIDTH * 0.06,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 12,
    transform: [{ scale: 1 }],
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SCREEN_WIDTH * 0.06,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.08)',
    paddingBottom: SCREEN_WIDTH * 0.05,
  },
  modalHeaderShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  modalTitle: {
    fontSize: SCREEN_WIDTH * 0.055,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  closeButton: {
    padding: 10,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
  },
  scrollView: {
    maxHeight: SCREEN_WIDTH * 1.2,
  },
  scrollContent: {
    paddingVertical: SCREEN_WIDTH * 0.02,
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SCREEN_WIDTH * 0.04,
    paddingHorizontal: SCREEN_WIDTH * 0.05,
    borderRadius: 16,
    marginVertical: SCREEN_WIDTH * 0.015,
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedLanguageItem: {
    backgroundColor: 'rgba(98, 0, 238, 0.1)',
    shadowColor: '#6200EE',
    shadowOpacity: 0.25,
    elevation: 5,
  },
  languageText: {
    fontSize: SCREEN_WIDTH * 0.042,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});