import React, { useState } from 'react';
import { 
  StyleSheet, 
  TouchableOpacity, 
  View, 
  Text, 
  Animated, 
  Dimensions,
  ScrollView,
  TextInput,
  Platform 
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { CustomTheme } from '../theme/theme';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

interface NotificationIconProps {
  size?: number;
  unreadCount?: number;
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
  notifications = [],
  onNotificationPress,
  onClearAll,
}) => {
  const theme = useTheme() as CustomTheme;
  const [showPanel, setShowPanel] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const slideAnim = React.useRef(new Animated.Value(-SCREEN_HEIGHT)).current;
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const getTypeColor = (type?: string) => {
    switch (type) {
      case 'success': return theme.colors.success;
      case 'warning': return theme.colors.warning;
      case 'error': return theme.colors.error;
      default: return theme.colors.info;
    }
  };

  const renderNeumorphicView = (style: any, children: React.ReactNode) => (
    <View style={[
      {
        backgroundColor: theme.colors.background,
        shadowColor: theme.dark ? theme.colors.shadowDark : theme.colors.shadowLight,
        shadowOffset: {
          width: theme.dark ? 2 : 4,
          height: theme.dark ? 2 : 4,
        },
        shadowOpacity: theme.dark ? 0.3 : 0.5,
        shadowRadius: theme.dark ? 3 : 4,
        elevation: theme.dark ? 4 : 8,
      },
      style
    ]}>
      {children}
    </View>
  );

  const getTypeIcon = (type?: string) => {
    switch (type) {
      case 'success': return 'checkmark-circle';
      case 'warning': return 'warning';
      case 'error': return 'alert-circle';
      default: return 'information-circle';
    }
  };

  const filteredNotifications = notifications.filter(notification =>
    notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    notification.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePress = () => {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();
  
    if (showPanel) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -SCREEN_HEIGHT,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShowPanel(false);
        setSearchQuery('');
      });
    } else {
      setShowPanel(true);
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 65,
          friction: 11,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  return (
    <>
      <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          {renderNeumorphicView(styles.iconContainer, (
            <>
              <Ionicons 
                name="notifications" 
                size={size - 16} 
                color={theme.colors.primary} 
              />
              {unreadCount > 0 && (
                <View style={[styles.badge, { backgroundColor: theme.colors.error }]}>
                  <Text style={styles.badgeText}>
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </Text>
                </View>
              )}
            </>
          ))}
        </Animated.View>
      </TouchableOpacity>

      {showPanel && (
        <View style={[styles.overlay, { backgroundColor: theme.colors.backdrop }]}>
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
                  transform: [{ translateY: slideAnim }],
                  opacity: fadeAnim,
                }
              ]}
            >
              {renderNeumorphicView(styles.panelContent, (
                <>
                  <View style={styles.header}>
                    <Text style={[styles.title, { color: theme.colors.primary }]}>
                      Notifications
                    </Text>
                    <TouchableOpacity onPress={handlePress}>
                      {renderNeumorphicView(styles.closeButton, (
                        <Ionicons 
                          name="close" 
                          size={24} 
                          color={theme.colors.primary} 
                        />
                      ))}
                    </TouchableOpacity>
                  </View>

                  {renderNeumorphicView(styles.searchContainer, (
                    <>
                      <Ionicons 
                        name="search" 
                        size={20} 
                        color={theme.colors.onSurfaceVariant} 
                      />
                      <TextInput
                        style={[styles.searchInput, { color: theme.colors.onSurface }]}
                        placeholder="Search notifications..."
                        placeholderTextColor={theme.colors.onSurfaceVariant}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                      />
                    </>
                  ))}

                  <ScrollView 
                    style={styles.notificationList}
                    showsVerticalScrollIndicator={false}
                  >
                    {filteredNotifications.length > 0 ? (
                      filteredNotifications.map((notification) => (
                        <TouchableOpacity
                          key={notification.id}
                          onPress={() => onNotificationPress?.(notification)}
                        >
                          {renderNeumorphicView(styles.notificationItem, (
                            <>
                              {renderNeumorphicView(styles.iconWrapper, (
                                <Ionicons
                                  name={getTypeIcon(notification.type)}
                                  size={24}
                                  color={getTypeColor(notification.type)}
                                />
                              ))}
                              <View style={styles.notificationContent}>
                                <Text style={[
                                  styles.notificationTitle,
                                  { color: theme.colors.primary }
                                ]}>
                                  {notification.title}
                                </Text>
                                <Text style={[
                                  styles.notificationMessage,
                                  { color: theme.colors.onSurface }
                                ]}>
                                  {notification.message}
                                </Text>
                                <Text style={[
                                  styles.timestamp,
                                  { color: theme.colors.onSurfaceVariant }
                                ]}>
                                  {notification.timestamp}
                                </Text>
                              </View>
                            </>
                          ))}
                        </TouchableOpacity>
                      ))
                    ) : (
                      <Text style={[
                        styles.emptyText,
                        { color: theme.colors.onSurfaceVariant }
                      ]}>
                        No notifications found
                      </Text>
                    )}
                  </ScrollView>
                </>
              ))}
            </Animated.View>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: '#1A1B1E',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
  },
  panel: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    zIndex: 1000,
  },
  panelContent: {
    flex: 1,
    padding: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
    backgroundColor: '#2A2B2E',
    marginVertical: 15,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    borderRadius: 15,
    marginBottom: 12,
    backgroundColor: '#2A2B2E',
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A1B1E',
    marginRight: 12,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#9D4EDD',
    marginBottom: 6,
  },
  notificationMessage: {
    fontSize: 14,
    lineHeight: 20,
    color: '#00FFC6',
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#6C757D',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#9D4EDD',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#FFFFFF',
    padding: Platform.OS === 'ios' ? 8 : 4,
  },
  emptyText: {
    textAlign: 'center',
    color: '#6C757D',
    fontSize: 16,
    marginTop: 20,
  },
  notificationList: {
    flex: 1,
    marginTop: 10,
  },
  notificationContent: {
    flex: 1,
    paddingRight: 8,
  },
});
