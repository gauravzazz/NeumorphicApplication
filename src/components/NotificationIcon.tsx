import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, ViewStyle, Animated, Dimensions } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { NeumorphicView } from './NeumorphicComponents';
import { CustomTheme } from '../theme/theme';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface NotificationIconProps {
  size?: number;
  unreadCount?: number;
  onPress?: () => void;
  notifications?: Array<{
    id: string;
    title: string;
    message: string;
    timestamp: string;
    read: boolean;
    type?: 'info' | 'success' | 'warning' | 'error';
  }>;
  onNotificationPress?: (notification: any) => void;
  onClearAll?: () => void;
}

export const NotificationIcon: React.FC<NotificationIconProps> = ({
  size = 40,
  unreadCount = 0,
  onPress = () => {},
}) => {
  const theme = useTheme() as CustomTheme;
  const [showPanel, setShowPanel] = React.useState(false);
  const slideAnim = React.useRef(new Animated.Value(SCREEN_WIDTH)).current;
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    if (showPanel) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: SCREEN_WIDTH,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShowPanel(false);
      });
    } else {
      setShowPanel(true);
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
    onPress();
  };

  return (
    <>
      <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
        <NeumorphicView
          style={[{
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: theme.colors.background,
              borderWidth: 1,
              borderColor: 'rgba(255, 255, 255, 0.1)',
              shadowColor: theme.colors.shadowDark,
              shadowOffset: { width: 2, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 4,
              padding: 0,
              justifyContent: 'center',
              alignItems: 'center'
            } as ViewStyle,
          ]}
        >
          <View
            style={{
              width: '100%',
              height: '100%',
              borderRadius: size / 2,
              backgroundColor: theme.colors.primary,
              justifyContent: 'center',
              alignItems: 'center',
              opacity: showPanel ? 0.8 : 1
            }}
          >
            <Ionicons
              name="notifications"
              size={size - 16}
              color={theme.colors.onPrimary}
            />
          </View>
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

      {showPanel && (
        <View style={[StyleSheet.absoluteFill, styles.overlay]}>
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            onPress={handlePress}
            activeOpacity={1}
          >
            <Animated.View
              style={[
                styles.panel,
                {
                  backgroundColor: theme.colors.background,
                  transform: [{ translateX: slideAnim }],
                  opacity: fadeAnim,
                },
              ]}
            >
              <TouchableOpacity
                activeOpacity={1}
                onPress={(e) => e.stopPropagation()}
                style={styles.panelContent}
              >
                <View style={styles.header}>
                  <Text style={[styles.title, { color: theme.colors.onSurface }]}>
                    Notifications
                  </Text>
                  <TouchableOpacity onPress={handlePress}>
                    <Ionicons name="close" size={24} color={theme.colors.onSurface} />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </Animated.View>
          </TouchableOpacity>
        </View>
      )}
    </>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  overlay: {
    backgroundColor: 'transparent',
    zIndex: 1000,
  },
  panel: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '80%',
    height: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: -2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  panelContent: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});