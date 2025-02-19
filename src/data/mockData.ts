import { Subject, Question, Topic } from '../types';

export const mockQuestions: Question[] = [
  {
    id: '1',
    topicId: '1',
    question: 'What is the derivative of x²?',
    options: ['x', '2x', '2', 'x²'],
    correctOption: 1,
    explanation: 'The power rule states that the derivative of x^n is nx^(n-1)'
  },
  {
    id: '2',
    topicId: '1',
    question: 'What is the value of π (pi) to two decimal places?',
    options: ['3.14', '3.16', '3.12', '3.18'],
    correctOption: 0,
    explanation: 'π is approximately equal to 3.14159...'
  },
  {
    id: '3',
    topicId: '2',
    question: 'What is Newtons First Law of Motion?',
    options: [
      'Force equals mass times acceleration',
      'An object at rest stays at rest unless acted upon by a force',
      'For every action there is an equal and opposite reaction',
      'Energy cannot be created or destroyed'
    ],
    correctOption: 1,
    explanation: 'Newtons First Law describes inertia'
  },
  {
    id: '4',
    topicId: '3',
    question: 'What is the atomic number of Carbon?',
    options: ['4', '6', '8', '12'],
    correctOption: 1,
    explanation: 'Carbon has 6 protons in its nucleus'
  },
  {
    id: '5',
    topicId: '5',
    question: 'Which data structure uses LIFO?',
    options: ['Queue', 'Stack', 'Tree', 'Graph'],
    correctOption: 1,
    explanation: 'Stack follows Last In First Out principle'
  }
];

export const mockTopics: Topic[] = [
  {
    id: '1',
    subjectId: '1',
    name: 'Calculus',
    description: 'Derivatives, integrals, and limits',
    questionsCount: 30,
    difficulty: 'medium',
    isImportant: true,
    lastAttempted: '2024-01-15'
  },
  {
    id: '2',
    subjectId: '2',
    name: 'Classical Mechanics',
    description: 'Newtons laws and motion',
    questionsCount: 25,
    difficulty: 'hard',
    isImportant: true,
    lastAttempted: '2024-01-14'
  },
  {
    id: '3',
    subjectId: '3',
    name: 'Atomic Structure',
    description: 'Atoms, elements, and periodic table',
    questionsCount: 20,
    difficulty: 'medium',
    isImportant: true
  }
];

export const mockSubjects: Subject[] = [
  {
    id: '1',
    name: 'Mathematics',
    description: 'Advanced mathematics including calculus, algebra, and geometry',
    icon: 'calculator',
    progress: 75,
    topicsCount: 12,
    questionsCount: 150,
    lastUpdated: '2024-01-15',
  },
  {
    id: '2',
    name: 'Physics',
    description: 'Core physics concepts and quantum mechanics',
    icon: 'flask-outline',
    progress: 60,
    topicsCount: 10,
    questionsCount: 120,
    lastUpdated: '2024-01-15',
  },
  {
    id: '3',
    name: 'Chemistry',
    description: 'Organic and inorganic chemistry fundamentals',
    icon: 'flask-outline',
    progress: 45,
    topicsCount: 8,
    questionsCount: 100,
    lastUpdated: '2024-01-15',
  },
  {
    id: '4',
    name: 'Biology',
    description: 'Study of life sciences and organisms',
    icon: 'leaf',
    progress: 30,
    topicsCount: 9,
    questionsCount: 110,
    lastUpdated: '2024-01-15',
  },
  {
    id: '5',
    name: 'Computer Science',
    description: 'Programming and software development',
    icon: 'code',
    progress: 90,
    topicsCount: 15,
    questionsCount: 180,
    lastUpdated: '2024-01-15',
  },
  {
    id: '6',
    name: 'Literature',
    description: 'Classic and modern literary works',
    icon: 'book',
    progress: 55,
    topicsCount: 7,
    questionsCount: 90,
    lastUpdated: '2024-01-15',
  },
  {
    id: '7',
    name: 'History',
    description: 'World history and civilizations',
    icon: 'time',
    progress: 40,
    topicsCount: 6,
    questionsCount: 80,
    lastUpdated: '2024-01-15',
  },
  {
    id: '8',
    name: 'Geography',
    description: 'Physical and human geography',
    icon: 'globe',
    progress: 25,
    topicsCount: 5,
    questionsCount: 75,
    lastUpdated: '2024-01-15',
  },
  {
    id: '9',
    name: 'Art',
    description: 'Visual arts and art history',
    icon: 'brush',
    progress: 70,
    topicsCount: 8,
    questionsCount: 95,
    lastUpdated: '2024-01-15',
  },
  {
    id: '10',
    name: 'Music',
    description: 'Music theory and appreciation',
    icon: 'musical-notes',
    progress: 85,
    topicsCount: 7,
    questionsCount: 85,
    lastUpdated: '2024-01-15',
  },
];

export const mockHotTopics = [
  {
    id: 'topic4',
    title: 'Algorithms',
    category: 'Computer Science',
    icon: 'code',
    participants: 450,
    questions: [
      {
        id: '5',
        topicId: '5',
        question: 'Which data structure uses LIFO?',
        options: ['Queue', 'Stack', 'Tree', 'Graph'],
        correctOption: 1,
        explanation: 'Stack follows Last In First Out principle'
      },
      {
        id: '6',
        topicId: '5',
        question: 'What is the time complexity of binary search?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
        correctOption: 2,
        explanation: 'Binary search has logarithmic time complexity'
      }
    ]
  },
  {
    id: 'topic5',
    title: 'Data Structures',
    category: 'Programming',
    icon: 'git-branch',
    participants: 380,
    questions: [
      {
        id: '7',
        topicId: '5',
        question: 'What is the primary advantage of a hash table?',
        options: ['Ordered data', 'O(1) average lookup', 'Memory efficiency', 'Sequential access'],
        correctOption: 1,
        explanation: 'Hash tables provide constant-time average case lookup'
      },
      {
        id: '8',
        topicId: '5',
        question: 'Which data structure is best for implementing a priority queue?',
        options: ['Array', 'Linked List', 'Heap', 'Stack'],
        correctOption: 2,
        explanation: 'Heap provides efficient priority queue operations'
      }
    ]
  },
  {
    id: 'topic6',
    title: 'Machine Learning',
    category: 'AI',
    icon: 'hardware-chip',
    participants: 520
  },
  {
    id: 'topic7',
    title: 'Web Development',
    category: 'Programming',
    icon: 'globe',
    participants: 600
  },
  {
    id: 'topic8',
    title: 'Mobile Apps',
    category: 'Development',
    icon: 'phone-portrait',
    participants: 430
  },
  {
    id: 'topic9',
    title: 'Cloud Computing',
    category: 'Infrastructure',
    icon: 'cloud',
    participants: 350
  },
  {
    id: 'topic10',
    title: 'Cybersecurity',
    category: 'Security',
    icon: 'shield',
    participants: 480
  },
  {
    id: 'topic11',
    title: 'Database Design',
    category: 'Data',
    icon: 'server',
    participants: 320
  },
  {
    id: 'topic12',
    title: 'UI/UX Design',
    category: 'Design',
    icon: 'color-palette',
    participants: 400
  },
  {
    id: '1',
    title: 'Understanding Quantum Mechanics',
    category: 'Physics',
    icon: 'flask',
    participants: 156,
  },
  {
    id: '2',
    title: 'Calculus Made Easy',
    category: 'Mathematics',
    icon: 'calculator',
    participants: 234,
  },
  {
    id: '3',
    title: 'Modern Algebra Concepts',
    category: 'Mathematics',
    icon: 'infinite',
    participants: 189,
  },
  {
    id: '4',
    title: 'Organic Chemistry Basics',
    category: 'Chemistry',
    icon: 'flask',
    participants: 178,
  },
  {
    id: '5',
    title: 'Web Development Fundamentals',
    category: 'Computer Science',
    icon: 'code-slash',
    participants: 245,
  },
  {
    id: '6',
    title: 'Cell Biology Essentials',
    category: 'Biology',
    icon: 'leaf',
    participants: 167,
  },
  {
    id: '7',
    title: 'World War II History',
    category: 'History',
    icon: 'time',
    participants: 198,
  },
  {
    id: '8',
    title: 'Climate Change Studies',
    category: 'Geography',
    icon: 'earth',
    participants: 212,
  },
  {
    id: '9',
    title: 'Renaissance Art History',
    category: 'Art',
    icon: 'brush',
    participants: 145,
  },
  {
    id: '10',
    title: 'Classical Music Theory',
    category: 'Music',
    icon: 'musical-note',
    participants: 134,
  },
  {
    id: '11',
    title: 'Data Structures & Algorithms',
    category: 'Computer Science',
    icon: 'git-network',
    participants: 267,
  },
  {
    id: '12',
    title: 'Thermodynamics Advanced',
    category: 'Physics',
    icon: 'thermometer',
    participants: 156,
  },
  {
    id: '13',
    title: 'Linear Algebra Mastery',
    category: 'Mathematics',
    icon: 'grid',
    participants: 189,
  },
  {
    id: '14',
    title: 'Biochemistry Fundamentals',
    category: 'Chemistry',
    icon: 'flask-outline',
    participants: 167,
  },
  {
    id: '15',
    title: 'Ancient Civilizations',
    category: 'History',
    icon: 'business',
    participants: 178,
  }
];