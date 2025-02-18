import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { NeumorphicView } from './NeumorphicComponents';
import { CustomTheme } from '../theme/theme';

interface NotificationIconProps {
  size?: number;
  unreadCount?: number;
  onPress?: () => void;
}

export const NotificationIcon: React.FC<NotificationIconProps> = ({
  size = 40,
  unreadCount = 0,
  onPress,
}) => {
  const theme = useTheme() as CustomTheme;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <NeumorphicView
        style={[
          styles.container,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: theme.colors.primary,
          },
        ]}
      >
        <Ionicons
          name="notifications"
          size={size - 16}
          color={theme.colors.onPrimary}
        />
        {unreadCount > 0 && (
          <View
            style={[
              styles.badge,
              {
                backgroundColor: theme.colors.error,
                borderColor: theme.colors.primary,
              },
            ]}
          >
            <Text style={[styles.badgeText, { color: theme.colors.onError }]}>
              {unreadCount > 99 ? '99+' : unreadCount}
            </Text>
          </View>
        )}
      </NeumorphicView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});