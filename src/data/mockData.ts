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
  },
  {
    id: '6',
    topicId: '1',
    question: 'What is the integral of 2x?',
    options: ['x²', 'x² + C', '2x²', 'x²/2'],
    correctOption: 1,
    explanation: 'The integral of 2x is x² + C, where C is the constant of integration'
  },
  {
    id: '7',
    topicId: '2',
    question: 'What is the SI unit of force?',
    options: ['Watt', 'Newton', 'Joule', 'Pascal'],
    correctOption: 1,
    explanation: 'The Newton (N) is the SI unit of force'
  },
  {
    id: '8',
    topicId: '3',
    question: 'What is the charge of an electron?',
    options: ['Positive', 'Negative', 'Neutral', 'Variable'],
    correctOption: 1,
    explanation: 'An electron carries a negative electrical charge'
  },
  {
    id: '9',
    topicId: '1',
    question: 'What is the limit of sin(x)/x as x approaches 0?',
    options: ['0', '1', 'Undefined', 'Infinity'],
    correctOption: 1,
    explanation: 'The limit of sin(x)/x as x approaches 0 is 1'
  },
  {
    id: '10',
    topicId: '2',
    question: 'What is the formula for kinetic energy?',
    options: ['mv', '½mv²', 'ma', 'mgh'],
    correctOption: 1,
    explanation: 'Kinetic energy is equal to ½mv², where m is mass and v is velocity'
  },
  {
    id: '11',
    topicId: '3',
    question: 'What is the atomic number of Oxygen?',
    options: ['6', '7', '8', '9'],
    correctOption: 2,
    explanation: 'Oxygen has 8 protons in its nucleus'
  },
  {
    id: '12',
    topicId: '1',
    question: 'What is the derivative of e^x?',
    options: ['x·e^x', 'e^x', 'ln(x)', '1/x'],
    correctOption: 1,
    explanation: 'The derivative of e^x is e^x'
  },
  {
    id: '13',
    topicId: '5',
    question: 'What is the time complexity of quicksort in the average case?',
    options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
    correctOption: 1,
    explanation: 'Quicksort has an average time complexity of O(n log n)'
  },
  {
    id: '14',
    topicId: '5',
    question: 'Which of the following is not a valid HTTP method?',
    options: ['GET', 'POST', 'FETCH', 'DELETE'],
    correctOption: 2,
    explanation: 'FETCH is not a standard HTTP method. The standard methods include GET, POST, PUT, DELETE, etc.'
  },
  {
    id: '15',
    topicId: '5',
    question: 'What is the purpose of the useState hook in React?',
    options: [
      'To handle side effects',
      'To manage component state',
      'To optimize performance',
      'To handle routing'
    ],
    correctOption: 1,
    explanation: 'useState is a React Hook that lets you add state to functional components'
  },
  {
    id: '16',
    topicId: '4',
    question: 'What is the function of DNA polymerase?',
    options: [
      'Protein synthesis',
      'DNA replication',
      'RNA transcription',
      'ATP production'
    ],
    correctOption: 1,
    explanation: 'DNA polymerase is responsible for DNA replication during cell division'
  },
  {
    id: '17',
    topicId: '4',
    question: 'Which organelle is known as the powerhouse of the cell?',
    options: [
      'Nucleus',
      'Mitochondria',
      'Golgi apparatus',
      'Endoplasmic reticulum'
    ],
    correctOption: 1,
    explanation: 'Mitochondria are called the powerhouse of the cell as they produce energy in the form of ATP'
  },
  {
    id: '18',
    topicId: '3',
    question: 'What is the atomic number of Oxygen?',
    options: ['6', '7', '8', '9'],
    correctOption: 2,
    explanation: 'Oxygen has 8 protons in its nucleus'
  },
  {
    id: '19',
    topicId: '1',
    question: 'What is the limit of sin(x)/x as x approaches 0?',
    options: ['0', '1', 'Undefined', 'Infinity'],
    correctOption: 1,
    explanation: 'The limit of sin(x)/x as x approaches 0 is 1'
  },
  {
    id: '20',
    topicId: '2',
    question: 'What is the formula for kinetic energy?',
    options: ['mv', '½mv²', 'ma', 'mgh'],
    correctOption: 1,
    explanation: 'Kinetic energy is equal to ½mv², where m is mass and v is velocity'
  },
  {
    id: '21',
    topicId: '3',
    question: 'What is the atomic number of Oxygen?',
    options: ['6', '7', '8', '9'],
    correctOption: 2,
    explanation: 'Oxygen has 8 protons in its nucleus'
  },
  {
    id: '22',
    topicId: '1',
    question: 'What is the derivative of e^x?',
    options: ['x·e^x', 'e^x', 'ln(x)', '1/x'],
    correctOption: 1,
    explanation: 'The derivative of e^x is e^x'
  },
  {
    id: '23',
    topicId: '2',
    question: 'What is the unit of power?',
    options: ['Joule', 'Newton', 'Watt', 'Pascal'],
    correctOption: 2,
    explanation: 'The Watt (W) is the SI unit of power'
  },
  {
    id: '24',
    topicId: '3',
    question: 'What is the most abundant element in the Earth\'s crust?',
    options: ['Carbon', 'Silicon', 'Oxygen', 'Iron'],
    correctOption: 2,
    explanation: 'Oxygen is the most abundant element in the Earth\'s crust'
  },
  {
    id: '25',
    topicId: '1',
    question: 'What is the value of e to 2 decimal places?',
    options: ['2.71', '2.72', '2.73', '2.74'],
    correctOption: 1,
    explanation: 'e is approximately equal to 2.71828...'
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