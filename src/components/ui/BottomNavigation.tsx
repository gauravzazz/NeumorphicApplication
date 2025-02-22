import React from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { NeumorphicView } from '../NeumorphicComponents';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface BottomNavigationProps {
  activeTab: string;
  onTabPress: (tabName: string) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onTabPress,
}) => {
  const theme = useTheme();

  const renderIcon = (name: string, focused: boolean) => {
    const color = focused ? theme.colors.primary : theme.colors.onSurfaceVariant;
    const size = focused ? 28 : 24;

    return <Ionicons icon={name} size={size} color={color} />;
  };

  return (
    <View style={styles.container}>
      <NeumorphicView style={styles.navigationBar}>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => onTabPress('home')}
        >
          {renderIcon('home-outline', activeTab === 'home')}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => onTabPress('progress')}
        >
          {renderIcon('stats-chart-outline', activeTab === 'progress')}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.centerButton}
          onPress={() => onTabPress('versus')}
        >
          <NeumorphicView style={styles.centerButtonInner}>
            {renderIcon('sword-cross', activeTab === 'versus')}
          </NeumorphicView>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => onTabPress('bookmarks')}
        >
          {renderIcon('bookmark-outline', activeTab === 'bookmarks')}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => onTabPress('profile')}
        >
          {renderIcon('person-outline', activeTab === 'profile')}
        </TouchableOpacity>
      </NeumorphicView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 70,
    borderRadius: 35,
    paddingHorizontal: 16,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerButton: {
    width: 60,
    height: 60,
    marginTop: -30,
    borderRadius: 30,
    backgroundColor: 'transparent',
  },
  centerButtonInner: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: theme.colors.primary,
    //shadowColor: theme.colors.primary,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
});