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
  const slideAnim = React.useRef(new Animated.Value(SCREEN_WIDTH)).current;
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

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
        Animated.spring(slideAnim, {
          toValue: SCREEN_WIDTH,
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

  const getTypeColor = (type?: string) => {
    switch (type) {
      case 'success': return '#4CAF50';
      case 'warning': return '#FFC107';
      case 'error': return '#F44336';
      default: return '#2196F3';
    }
  };

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

  const renderNeumorphicView = (style: any, children: React.ReactNode) => (
    <View style={[styles.neumorphic, style]}>
      {children}
    </View>
  );

  return (
    <>
      <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          {renderNeumorphicView(styles.iconContainer, (
            <>
              <Ionicons name="notifications" size={size - 16} color="#9D4EDD" />
              {unreadCount > 0 && (
                <View style={styles.badge}>
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
        <View style={styles.overlay}>
          <TouchableOpacity 
            style={StyleSheet.absoluteFill} 
            onPress={handlePress} 
            activeOpacity={1}
          >
            <Animated.View 
              style={[
                styles.panel,
                {
                  transform: [{ translateX: slideAnim }],
                  opacity: fadeAnim,
                }
              ]}
            >
              {renderNeumorphicView(styles.panelContent, (
                <>
                  <View style={styles.header}>
                    <Text style={styles.title}>Notifications</Text>
                    <TouchableOpacity onPress={handlePress}>
                      {renderNeumorphicView(styles.closeButton, (
                        <Ionicons name="close" size={24} color="#9D4EDD" />
                      ))}
                    </TouchableOpacity>
                  </View>

                  {renderNeumorphicView(styles.searchContainer, (
                    <>
                      <Ionicons name="search" size={20} color="#6C757D" />
                      <TextInput
                        style={styles.searchInput}
                        placeholder="Search notifications..."
                        placeholderTextColor="#6C757D"
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
                                <Text style={styles.notificationTitle}>
                                  {notification.title}
                                </Text>
                                <Text style={styles.notificationMessage}>
                                  {notification.message}
                                </Text>
                                <Text style={styles.timestamp}>
                                  {notification.timestamp}
                                </Text>
                              </View>
                            </>
                          ))}
                        </TouchableOpacity>
                      ))
                    ) : (
                      <Text style={styles.emptyText}>
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
  neumorphic: {
    backgroundColor: '#1A1B1E',
    shadowColor: '#000',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
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
    backgroundColor: '#F44336',
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  panel: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 120 : 100,
    right: 0,
    width: SCREEN_WIDTH * 0.85,
    height: SCREEN_HEIGHT - (Platform.OS === 'ios' ? 120 : 100),
    backgroundColor: '#1A1B1E',
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
    backgroundColor: '#2A2B2E',
    marginBottom: 25,
    marginTop: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#FFFFFF',
    padding: Platform.OS === 'ios' ? 8 : 4,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: '#2A2B2E',
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    backgroundColor: '#1A1B1E',
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
  // Remove duplicate style definitions for:
  // - searchContainer
  // - searchInput
  // - notificationItem
  // - iconWrapper
  // - notificationTitle
  // - notificationMessage
  // - timestamp
  // Keep the latest versions of these styles
});
