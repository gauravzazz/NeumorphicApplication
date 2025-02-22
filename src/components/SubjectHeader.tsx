import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { RoundButton } from './ui/RoundButton';

interface SubjectHeaderProps {
  title: string;
  onBackPress: () => void;
}

export const SubjectHeader: React.FC<SubjectHeaderProps> = ({ title, onBackPress }) => {
  const theme = useTheme();

  return (
    <View style={styles.header}>
      <RoundButton
        style={styles.backButton}
        icon="arrow-back"
        onPress={onBackPress}
        size={48}
      />
      <Text style={[styles.title, { color: theme.colors.onSurface }]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 16,
  },
  backButton: {
    width: 48,
    height: 48,
    padding: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});