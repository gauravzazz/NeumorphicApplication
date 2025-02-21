import React from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NeumorphicView } from '../components/NeumorphicComponents';
import { RoundButton } from '../components/ui/RoundButton';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const ProfileScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  // Mock user data (replace with actual data later)
  const userData = {
    name: 'John Doe',
    level: 12,
    xp: 2750,
    nextLevelXp: 3000,
    achievements: [
      { id: '1', title: 'Quick Learner', description: 'Complete 5 quizzes in a day', icon: 'flash', progress: 80 },
      { id: '2', title: 'Knowledge Seeker', description: 'Study 3 different subjects', icon: 'school', progress: 100 },
      { id: '3', title: 'Perfect Score', description: 'Get 100% in a quiz', icon: 'trophy', progress: 60 },
    ],
    stats: {
      quizzesCompleted: 45,
      totalCorrectAnswers: 380,
      averageScore: 85,
      studyStreak: 7,
    },
  };

  const renderAchievement = (achievement: typeof userData.achievements[0]) => (
    <NeumorphicView key={achievement.id} style={styles.achievementCard}>
      <View style={[styles.achievementIcon, { backgroundColor: `${theme.colors.primary}20` }]}>
        <Ionicons name={achievement.icon as any} size={24} color={theme.colors.primary} />
      </View>
      <View style={styles.achievementInfo}>
        <Text style={[styles.achievementTitle, { color: theme.colors.onSurface }]}>
          {achievement.title}
        </Text>
        <Text style={[styles.achievementDescription, { color: theme.colors.onSurfaceVariant }]}>
          {achievement.description}
        </Text>
        <View style={[styles.progressBar, { backgroundColor: `${theme.colors.primary}20` }]}>
          <View 
            style={[styles.progressFill, { 
              backgroundColor: theme.colors.primary,
              width: `${achievement.progress}%` 
            }]} 
          />
        </View>
      </View>
    </NeumorphicView>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <RoundButton
          icon="chevron-back"
          onPress={() => navigation.goBack()}
          size={40}
          style={styles.backButton}
        />
        <Text style={[styles.headerTitle, { color: theme.colors.onSurface }]}>Profile</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <NeumorphicView style={styles.profileHeader}>
          <View style={[styles.avatarContainer, { backgroundColor: theme.colors.surface }]}>
            <Text style={[styles.avatarText, { color: theme.colors.primary }]}>
              {userData.name.split(' ').map(n => n[0]).join('')}
            </Text>
          </View>
          <Text style={[styles.userName, { color: theme.colors.onSurface }]}>{userData.name}</Text>
          <View style={styles.levelContainer}>
            <Text style={[styles.levelText, { color: theme.colors.primary }]}>
              Level {userData.level}
            </Text>
            <View style={[styles.xpBar, { backgroundColor: `${theme.colors.primary}20` }]}>
              <View 
                style={[styles.xpFill, { 
                  backgroundColor: theme.colors.primary,
                  width: `${(userData.xp / userData.nextLevelXp) * 100}%` 
                }]} 
              />
            </View>
            <Text style={[styles.xpText, { color: theme.colors.onSurfaceVariant }]}>
              {userData.xp} / {userData.nextLevelXp} XP
            </Text>
          </View>
        </NeumorphicView>

        <View style={styles.statsGrid}>
          <NeumorphicView style={styles.statCard}>
            <Ionicons name="checkmark-circle" size={24} color={theme.colors.primary} />
            <Text style={[styles.statValue, { color: theme.colors.onSurface }]}>
              {userData.stats.quizzesCompleted}
            </Text>
            <Text style={[styles.statLabel, { color: theme.colors.onSurfaceVariant }]}>
              Quizzes
            </Text>
          </NeumorphicView>

          <NeumorphicView style={styles.statCard}>
            <Ionicons name="trophy" size={24} color={theme.colors.primary} />
            <Text style={[styles.statValue, { color: theme.colors.onSurface }]}>
              {userData.stats.averageScore}%
            </Text>
            <Text style={[styles.statLabel, { color: theme.colors.onSurfaceVariant }]}>
              Avg. Score
            </Text>
          </NeumorphicView>

          <NeumorphicView style={styles.statCard}>
            <Ionicons name="flame" size={24} color={theme.colors.primary} />
            <Text style={[styles.statValue, { color: theme.colors.onSurface }]}>
              {userData.stats.studyStreak}
            </Text>
            <Text style={[styles.statLabel, { color: theme.colors.onSurfaceVariant }]}>
              Day Streak
            </Text>
          </NeumorphicView>

          <NeumorphicView style={styles.statCard}>
            <Ionicons name="star" size={24} color={theme.colors.primary} />
            <Text style={[styles.statValue, { color: theme.colors.onSurface }]}>
              {userData.stats.totalCorrectAnswers}
            </Text>
            <Text style={[styles.statLabel, { color: theme.colors.onSurfaceVariant }]}>
              Correct Answers
            </Text>
          </NeumorphicView>
        </View>

        <View style={styles.achievementsSection}>
          <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
            Achievements
          </Text>
          {userData.achievements.map(renderAchievement)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginLeft: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  profileHeader: {
    margin: 16,
    padding: 20,
    alignItems: 'center',
    borderRadius: 20,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  levelContainer: {
    width: '100%',
    alignItems: 'center',
  },
  levelText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  xpBar: {
    width: '100%',
    height: 8,
    borderRadius: 4,
    marginBottom: 4,
    overflow: 'hidden',
  },
  xpFill: {
    height: '100%',
    borderRadius: 4,
  },
  xpText: {
    fontSize: 14,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
    gap: 16,
  },
  statCard: {
    width: (SCREEN_WIDTH - 48) / 2,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  statLabel: {
    fontSize: 14,
  },
  achievementsSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  achievementCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
});