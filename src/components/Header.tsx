import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { useTheme, IconButton } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { NeumorphicView } from './NeumorphicComponents';
import { Avatar } from './Avatar';
import { NotificationIcon } from './NotificationIcon';

interface HeaderProps {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ searchQuery, onSearchQueryChange }) => {
  const theme = useTheme();
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  return (
    <View style={[styles.header, { backgroundColor: theme.colors.background }]}>
      <View style={styles.headerContent}>
        <Avatar size={48} onPress={() => navigation.openDrawer()} />
        <NotificationIcon size={48} unreadCount={3} onPress={() => {}} />
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
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
    gap: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
});