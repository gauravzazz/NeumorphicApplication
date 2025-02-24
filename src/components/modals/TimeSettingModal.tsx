import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Modal } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { CustomTheme } from '../../theme/theme';
import { NeumorphicView } from '../NeumorphicComponents';

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
  const theme = useTheme() as CustomTheme;

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

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
              Set Time Limit
            </Text>
            <TouchableOpacity onPress={onClose}>
              <NeumorphicView style={styles.closeButton}>
                <Ionicons name="close" size={24} color={theme.colors.primary} />
              </NeumorphicView>
            </TouchableOpacity>
          </View>

          <View style={styles.timeDisplay}>
            <NeumorphicView style={styles.timeBox}>
              <Text style={[styles.timeText, { color: theme.colors.primary }]}>
                {formatTime(currentTime)}
              </Text>
            </NeumorphicView>
          </View>

          <NeumorphicView style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              minimumValue={30}
              maximumValue={3600}
              step={30}
              value={currentTime}
              onValueChange={onTimeChange}
              minimumTrackTintColor={theme.colors.primary}
              maximumTrackTintColor={theme.colors.buttonDisabled}
              thumbTintColor={theme.colors.primary}
            />
          </NeumorphicView>

          <View style={styles.presetContainer}>
            {[1, 2, 5, 10, 15, 30].map((minutes) => (
              <TouchableOpacity
                key={minutes}
                onPress={() => onTimeChange(minutes * 60)}
              >
                <NeumorphicView 
                  style={[
                    styles.presetButton,
                    currentTime === minutes * 60 && {
                      backgroundColor: `${theme.colors.primary}15`,
                    }
                  ]}
                >
                  <Text
                    style={[
                      styles.presetText,
                      { 
                        color: currentTime === minutes * 60
                          ? theme.colors.primary
                          : theme.colors.onSurface
                      }
                    ]}
                  >
                    {minutes}m
                  </Text>
                </NeumorphicView>
              </TouchableOpacity>
            ))}
          </View>
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
  timeDisplay: {
    alignItems: 'center',
    marginVertical: SCREEN_WIDTH * 0.06,
  },
  timeBox: {
    paddingHorizontal: SCREEN_WIDTH * 0.08,
    paddingVertical: SCREEN_WIDTH * 0.04,
    borderRadius: 16,
  },
  timeText: {
    fontSize: SCREEN_WIDTH * 0.08,
    fontWeight: '700',
  },
  sliderContainer: {
    padding: SCREEN_WIDTH * 0.04,
    borderRadius: 16,
    marginBottom: SCREEN_WIDTH * 0.06,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  presetContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: SCREEN_WIDTH * 0.02,
  },
  presetButton: {
    width: SCREEN_WIDTH * 0.25,
    paddingVertical: SCREEN_WIDTH * 0.03,
    borderRadius: 12,
    alignItems: 'center',
  },
  presetText: {
    fontSize: SCREEN_WIDTH * 0.04,
    fontWeight: '600',
  },
});