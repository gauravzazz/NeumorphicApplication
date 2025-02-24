import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Dimensions, Modal } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { CustomTheme } from '../../theme/theme';
import { NeumorphicView } from '../NeumorphicComponents';

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
  const theme = useTheme() as CustomTheme;

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <TouchableOpacity
        style={[styles.modalOverlay, { backgroundColor: theme.colors.backdrop }]}
        activeOpacity={1}
        onPress={onClose}
      >
        <NeumorphicView style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: theme.colors.primary }]}>
              Select Language
            </Text>
            <TouchableOpacity 
              onPress={onClose} 
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <NeumorphicView style={styles.closeButton}>
                <Ionicons name="close" size={24} color={theme.colors.primary} />
              </NeumorphicView>
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
                onPress={() => onLanguageSelect(language)}
                activeOpacity={0.8}
              >
                <NeumorphicView 
                  style={[
                    styles.languageItem,
                    selectedLanguage === language && {
                      backgroundColor: `${theme.colors.primary}15`,
                    }
                  ]}
                >
                  <Text
                    style={[
                      styles.languageText,
                      { 
                        color: selectedLanguage === language 
                          ? theme.colors.primary 
                          : theme.colors.onSurface 
                      }
                    ]}
                  >
                    {language}
                  </Text>
                  {selectedLanguage === language && (
                    <Ionicons 
                      name="checkmark-circle" 
                      size={24} 
                      color={theme.colors.primary} 
                    />
                  )}
                </NeumorphicView>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </NeumorphicView>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SCREEN_WIDTH * 0.04,
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 28,
    padding: SCREEN_WIDTH * 0.06,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SCREEN_WIDTH * 0.06,
  },
  modalTitle: {
    fontSize: SCREEN_WIDTH * 0.055,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
    padding: SCREEN_WIDTH * 0.04,
    borderRadius: 16,
    marginVertical: SCREEN_WIDTH * 0.015,
  },
  languageText: {
    fontSize: SCREEN_WIDTH * 0.042,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});