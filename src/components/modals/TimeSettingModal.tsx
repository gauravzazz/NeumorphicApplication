import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Modal } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

interface TimeSettingModalProps {
  visible: boolean;
  onClose: () => void;
  currentTime: number;
  onTimeChange: (time: number) => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const TimeSettingModal: React.FC<TimeSettingModalProps> = ({
  visible,
  onClose,
  currentTime,
  onTimeChange,
}) => {
  const theme = useTheme();

  if (!visible) return null;

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

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
              <Text style={[styles.modalTitle, { color: theme.colors.onSurface }]}>Set Time per Question</Text>
              <TouchableOpacity 
                onPress={onClose} 
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color={theme.colors.onSurface} />
              </TouchableOpacity>
            </View>
            <View style={styles.timeContainer}>
              <View style={styles.timeValueContainer}>
                <Text style={[styles.timeValue, { color: theme.colors.onSurface }]}>
                  {formatTime(currentTime)}
                </Text>
                <Text style={[styles.timeLabel, { color: theme.colors.onSurfaceVariant }]}>
                  per question
                </Text>
              </View>
              <Slider
                style={styles.timeSlider}
                minimumValue={30}
                maximumValue={300}
                step={30}
                value={currentTime}
                onValueChange={onTimeChange}
                minimumTrackTintColor={theme.colors.primary}
                maximumTrackTintColor={theme.colors.onSurfaceVariant}
                thumbTintColor={theme.colors.primary}
              />
              <View style={styles.sliderLabels}>
                <Text style={[styles.sliderLabel, { color: theme.colors.onSurfaceVariant }]}>30s</Text>
                <Text style={[styles.sliderLabel, { color: theme.colors.onSurfaceVariant }]}>5m</Text>
              </View>
            </View>
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
  timeContainer: {
    alignItems: 'center',
    paddingVertical: SCREEN_WIDTH * 0.05,
  },
  timeValueContainer: {
    alignItems: 'center',
    marginBottom: SCREEN_WIDTH * 0.07,
  },
  timeValue: {
    fontSize: SCREEN_WIDTH * 0.14,
    fontWeight: '700',
    marginBottom: SCREEN_WIDTH * 0.03,
    letterSpacing: 1,
  },
  timeLabel: {
    fontSize: SCREEN_WIDTH * 0.04,
    opacity: 0.75,
    letterSpacing: 0.5,
  },
  timeSlider: {
    width: '100%',
    height: 48,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: SCREEN_WIDTH * 0.02,
    marginTop: SCREEN_WIDTH * 0.03,
  },
  sliderLabel: {
    fontSize: SCREEN_WIDTH * 0.038,
    opacity: 0.8,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
});