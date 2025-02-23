import React from 'react';
import { StyleSheet, View, TextInput, Dimensions } from 'react-native';
import { useTheme, IconButton } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { NeumorphicView } from './NeumorphicComponents';
import { Avatar } from './Avatar';
import { NotificationIcon } from './NotificationIcon';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface HeaderProps {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  notifications?: Array<{
    id: string;
    title: string;
    message: string;
    timestamp: string;
    read: boolean;
    type?: 'info' | 'success' | 'warning' | 'error';
  }>;
  onNotificationPress?: (notification: any) => void;
  onClearAllNotifications?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchQueryChange,
  notifications = [],
  onNotificationPress = () => {},
  onClearAllNotifications = () => {},
}) => {
  const theme = useTheme();
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  return (
    <NeumorphicView style={[styles.header, { backgroundColor: theme.colors.background }]}>
      <View style={styles.headerContent}>
        <NeumorphicView style={styles.iconWrapper}>
          <Avatar size={40} onPress={() => navigation.openDrawer()} />
        </NeumorphicView>
        <NeumorphicView style={styles.iconWrapper}>
          <NotificationIcon
            size={40}
            unreadCount={notifications.filter(n => !n.read).length}
            notifications={notifications}
            onNotificationPress={onNotificationPress}
            onClearAll={onClearAllNotifications}
          />
        </NeumorphicView>
      </View>
      <NeumorphicView style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={theme.colors.onSurfaceVariant} />
        <TextInput
          style={[styles.searchInput, { color: theme.colors.onSurface }]}
          placeholder="Search subjects..."
          placeholderTextColor={theme.colors.onSurfaceVariant}
          value={searchQuery}
          onChangeText={onSearchQueryChange}
        />
      </NeumorphicView>
    </NeumorphicView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: SCREEN_WIDTH * 0.04,
    gap: SCREEN_WIDTH * 0.04,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SCREEN_WIDTH * 0.03,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: SCREEN_WIDTH * 0.04,
  },
});