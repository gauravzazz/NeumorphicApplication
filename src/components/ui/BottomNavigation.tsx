import React from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { CustomTheme } from '../../theme/theme';
import * as Animatable from 'react-native-animatable';
import { NeumorphicView } from '../NeumorphicComponents';

const { width } = Dimensions.get('window');

interface BottomNavigationProps {
  activeTab: string;
  onTabPress: (tabName: string) => void;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 2,
    paddingHorizontal: 8,
    height: 60,
    borderRadius: 24,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
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
  },
  activeIconWrapper: {
    backgroundColor: 'rgba(98, 0, 238, 0.1)',
    shadowColor: '#6200EE',
    shadowOffset: { width: -2, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  centerButton: {
    marginHorizontal: 16,
    transform: [{ translateY: -24 }],
  },
  centerButtonWrapper: {
    width: 64,
    height: 64,
    padding: 0,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
});

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onTabPress,
}) => {
  const theme = useTheme<CustomTheme>();

  const containerStyle = [
    styles.container,
    {
      backgroundColor: theme.colors.background,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.1)',
    },
  ];

  const centerButtonStyle = [
    styles.centerButtonWrapper,
    {
      backgroundColor: theme.colors.primary,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 6,
      elevation: 8,
    },
  ];

  const renderIcon = (name: keyof typeof Ionicons.glyphMap, tabName: string) => (
    <TouchableOpacity 
      onPress={() => onTabPress(tabName)}
      style={styles.iconContainer}
    >
      <NeumorphicView 
        style={[
          styles.iconWrapper,
          activeTab === tabName && styles.activeIconWrapper
        ]}
      >
        <Ionicons 
          name={name} 
          size={20} 
          color={activeTab === tabName ? theme.colors.primary : theme.colors.onSurfaceVariant} 
        />
      </NeumorphicView>
    </TouchableOpacity>
  );

  return (
    <View style={containerStyle}>
      {renderIcon('home-outline', 'home')}
      {renderIcon('trending-up-outline', 'progress')}

      <Animatable.View 
        animation="pulse" 
        iterationCount="infinite" 
        style={styles.centerButton}
      >
        <TouchableOpacity onPress={() => onTabPress('versus')}>
          <NeumorphicView style={centerButtonStyle}>
            <Ionicons 
              name="flash-outline" 
              size={28} 
              color="#FFF" 
            />
          </NeumorphicView>
        </TouchableOpacity>
      </Animatable.View>

      {renderIcon('bookmark-outline', 'bookmarks')}
      {renderIcon('person-outline', 'profile')}
    </View>
  );
};

export default BottomNavigation;