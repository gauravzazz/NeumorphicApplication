import { Ionicons } from '@expo/vector-icons';

export type BotDifficulty = 'beginner' | 'intermediate' | 'expert';

export interface Bot {
  id: string;
  name: string;
  avatar: string;
  difficulty: BotDifficulty;
  accuracy: number; // Percentage of correct answers
  responseTimeRange: [number, number]; // Range in milliseconds
  score: number;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

const generateBotId = () => `bot-${Math.random().toString(36).substr(2, 9)}`;

const botNames = [
  'AlphaBot', 'BetaBot', 'GammaBot', 'DeltaBot', 'EpsilonBot',
  'ZetaBot', 'EtaBot', 'ThetaBot', 'IotaBot', 'KappaBot',
  'LambdaBot', 'MuBot', 'NuBot', 'XiBot', 'OmicronBot',
  'PiBot', 'RhoBot', 'SigmaBot', 'TauBot', 'UpsilonBot'
];

const botIcons: Array<keyof typeof Ionicons.glyphMap> = [
  'rocket', 'flash', 'bulb', 'star', 'diamond',
  'planet', 'infinite', 'cube', 'prism', 'aperture',
  'compass', 'flame', 'pulse', 'sparkles', 'telescope',
  'thunderstorm', 'trophy', 'nuclear', 'leaf', 'planet'
];

const botColors = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD',
  '#D4A5A5', '#9B59B6', '#3498DB', '#E74C3C', '#2ECC71',
  '#F1C40F', '#1ABC9C', '#34495E', '#7F8C8D', '#95A5A6',
  '#D35400', '#C0392B', '#8E44AD', '#2980B9', '#27AE60'
];

const difficultySettings: Record<BotDifficulty, { accuracy: number, responseTimeRange: [number, number] }> = {
  beginner: {
    accuracy: 0.6, // 60% accuracy
    responseTimeRange: [2000, 4000] // 2-4 seconds
  },
  intermediate: {
    accuracy: 0.75, // 75% accuracy
    responseTimeRange: [1500, 3000] // 1.5-3 seconds
  },
  expert: {
    accuracy: 0.9, // 90% accuracy
    responseTimeRange: [1000, 2000] // 1-2 seconds
  }
};

export const generateBotProfiles = (): Bot[] => {
  return botNames.map((name, index) => {
    const difficulty: BotDifficulty = 
      index < 7 ? 'beginner' :
      index < 14 ? 'intermediate' : 'expert';

    const settings = difficultySettings[difficulty];

    return {
      id: generateBotId(),
      name,
      avatar: '', // We'll use initials instead of actual avatars
      difficulty,
      accuracy: settings.accuracy,
      responseTimeRange: settings.responseTimeRange,
      score: 0,
      icon: botIcons[index],
      color: botColors[index]
    };
  });
};

export const getBotAnswer = (
  bot: Bot,
  correctOption: number,
  optionsCount: number
): { answer: number; responseTime: number } => {
  const willAnswerCorrectly = Math.random() < bot.accuracy;
  const answer = willAnswerCorrectly ? correctOption :
    Array.from({ length: optionsCount })
      .map((_, i) => i)
      .filter(i => i !== correctOption)[
        Math.floor(Math.random() * (optionsCount - 1))
      ];

  const [minTime, maxTime] = bot.responseTimeRange;
  const responseTime = Math.random() * (maxTime - minTime) + minTime;

  return { answer, responseTime };
};