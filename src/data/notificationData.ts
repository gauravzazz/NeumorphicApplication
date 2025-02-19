import { NotificationItem } from '../types';

export const dummyNotifications: NotificationItem[] = [
  {
    id: '1',
    title: 'Quiz Completed',
    message: 'Congratulations! You have completed the React Basics quiz with a score of 90%.',
    timestamp: '2 minutes ago',
    read: false,
    type: 'success'
  },
  {
    id: '2',
    title: 'New Topic Available',
    message: 'A new topic "Advanced TypeScript" has been added to your learning path.',
    timestamp: '1 hour ago',
    read: true,
    type: 'info'
  },
  {
    id: '3',
    title: 'Session Expiring Soon',
    message: 'Your current learning session will expire in 5 minutes. Please save your progress.',
    timestamp: '4 minutes ago',
    read: false,
    type: 'warning'
  },
  {
    id: '4',
    title: 'Connection Error',
    message: 'Unable to sync your latest quiz results. Please check your internet connection.',
    timestamp: '30 minutes ago',
    read: true,
    type: 'error'
  },
  {
    id: '5',
    title: 'Achievement Unlocked',
    message: 'You\'ve earned the "Quick Learner" badge for completing 5 quizzes in a day!',
    timestamp: '2 hours ago',
    read: false,
    type: 'success'
  }
];