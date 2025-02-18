import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { NeumorphicView } from './NeumorphicComponents';
import { DrawerContentScrollView } from '@react-navigation/drawer';

interface DrawerItemProps {
  label: string;
  icon: string;
  onPress: () => void;
  isActive?: boolean;
}

const DrawerItem: React.FC<DrawerItemProps> = ({ label, icon, onPress, isActive }) => {
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <NeumorphicView
        style={[
          styles.drawerItem,
          isActive && { backgroundColor: `${theme.colors.primary}10` },
        ]}
      >
        <Ionicons
          name={icon as keyof typeof Ionicons.glyphMap}
          size={24}
          color={isActive ? theme.colors.primary : theme.colors.onSurface}
        />
        <Text
          style={[
            styles.drawerItemText,
            { color: isActive ? theme.colors.primary : theme.colors.onSurface },
          ]}
        >
          {label}
        </Text>
      </NeumorphicView>
    </TouchableOpacity>
  );
};

export const DrawerContent = ({ navigation, state }: any) => {
  const theme = useTheme();

  const menuItems = [
    { label: 'Profile', icon: 'person-outline' },
    { label: 'Bookmarks', icon: 'bookmark-outline' },
    { label: 'History', icon: 'time-outline' },
    { label: 'Progress', icon: 'trending-up-outline' },
    { label: 'Settings', icon: 'settings-outline' },
  ];

  return (
    <DrawerContentScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <NeumorphicView style={styles.avatarContainer}>
            <Ionicons name="person" size={40} color={theme.colors.primary} />
          </NeumorphicView>
          <Text style={[styles.userName, { color: theme.colors.onSurface }]}>
            User Name
          </Text>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <DrawerItem
              key={item.label}
              label={item.label}
              icon={item.icon}
              isActive={state.index === index}
              onPress={() => navigation.navigate(item.label)}
            />
          ))}
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => {
              // Handle logout
              console.log('Logout pressed');
            }}
          >
            <NeumorphicView style={styles.logoutContent}>
              <Ionicons name="log-out-outline" size={24} color={theme.colors.error} />
              <Text style={[styles.logoutText, { color: theme.colors.error }]}>
                Logout
              </Text>
            </NeumorphicView>
          </TouchableOpacity>
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginVertical: 24,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuContainer: {
    marginTop: 24,
    gap: 12,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 16,
  },
  drawerItemText: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    marginTop: 'auto',
    paddingVertical: 24,
  },
  logoutButton: {
    width: '100%',
  },
  logoutContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 16,
  },
  logoutText: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '500',
  },
});