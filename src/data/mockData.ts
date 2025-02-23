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
      },
      {
        id: '26',
        topicId: '5',
        question: 'What is a recursive algorithm?',
        options: ['An algorithm that never ends', 'An algorithm that calls itself', 'An algorithm that uses loops', 'An algorithm that uses variables'],
        correctOption: 1,
        explanation: 'A recursive algorithm is one that solves a problem by calling itself with smaller instances of the same problem'
      },
      {
        id: '27',
        topicId: '5',
        question: 'What is the worst-case time complexity of bubble sort?',
        options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(1)'],
        correctOption: 2,
        explanation: 'Bubble sort has a worst-case time complexity of O(n²) due to its nested loops'
      },
      {
        id: '28',
        topicId: '5',
        question: 'Which algorithm is used for finding the shortest path in a weighted graph?',
        options: ['DFS', 'BFS', 'Dijkstra\'s', 'Binary Search'],
        correctOption: 2,
        explanation: 'Dijkstra\'s algorithm is used to find the shortest path between nodes in a graph'
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
    participants: 520,
    questions: [
      {
        id: '29',
        topicId: '6',
        question: 'What is supervised learning?',
        options: ['Learning without labels', 'Learning with labels', 'Learning by reinforcement', 'Learning by clustering'],
        correctOption: 1,
        explanation: 'Supervised learning is a type of machine learning where the model learns from labeled training data'
      },
      {
        id: '30',
        topicId: '6',
        question: 'Which algorithm is used for classification problems?',
        options: ['Linear Regression', 'K-means', 'Random Forest', 'PCA'],
        correctOption: 2,
        explanation: 'Random Forest is a popular algorithm for classification tasks'
      },
      {
        id: '31',
        topicId: '6',
        question: 'What is overfitting?',
        options: ['Model performs well on training data but poorly on new data', 'Model performs poorly on all data', 'Model performs well on all data', 'Model fails to converge'],
        correctOption: 0,
        explanation: 'Overfitting occurs when a model learns the training data too well, including noise and outliers'
      },
      {
        id: '32',
        topicId: '6',
        question: 'What is the purpose of cross-validation?',
        options: ['To speed up training', 'To evaluate model performance', 'To reduce model size', 'To increase accuracy'],
        correctOption: 1,
        explanation: 'Cross-validation is used to assess how well a model will generalize to new, unseen data'
      },
      {
        id: '33',
        topicId: '6',
        question: 'Which loss function is commonly used for binary classification?',
        options: ['Mean Squared Error', 'Cross Entropy', 'Hinge Loss', 'Huber Loss'],
        correctOption: 1,
        explanation: 'Cross Entropy loss is widely used for binary classification problems'
      }
    ]
  },
  {
    id: 'topic7',
    title: 'Web Development',
    category: 'Programming',
    icon: 'globe',
    participants: 600,
    questions: [
      {
        id: '34',
        topicId: '7',
        question: 'What is the purpose of the DOCTYPE declaration in HTML?',
        options: ['To link CSS files', 'To specify the document type and version', 'To import JavaScript', 'To define metadata'],
        correctOption: 1,
        explanation: 'The DOCTYPE declaration tells the browser what version of HTML the page is written in'
      },
      {
        id: '35',
        topicId: '7',
        question: 'Which CSS property is used to control the spacing between elements?',
        options: ['spacing', 'margin', 'padding', 'gap'],
        correctOption: 1,
        explanation: 'The margin property controls the space between elements'
      },
      {
        id: '36',
        topicId: '7',
        question: 'What is the purpose of the async keyword in JavaScript?',
        options: ['To make code run faster', 'To handle asynchronous operations', 'To create loops', 'To define classes'],
        correctOption: 1,
        explanation: 'The async keyword is used to define asynchronous functions that can use await'
      },
      {
        id: '37',
        topicId: '7',
        question: 'What is the role of a web server?',
        options: ['To style web pages', 'To serve content to clients', 'To write JavaScript', 'To create databases'],
        correctOption: 1,
        explanation: 'A web server responds to client requests and serves web content'
      },
      {
        id: '38',
        topicId: '7',
        question: 'What is the purpose of media queries in CSS?',
        options: ['To play videos', 'To create responsive designs', 'To handle forms', 'To validate input'],
        correctOption: 1,
        explanation: 'Media queries allow you to apply different styles based on device characteristics'
      }
    ]
  },
  {
    id: 'topic8',
    title: 'Mobile Apps',
    category: 'Development',
    icon: 'phone-portrait',
    participants: 430,
    questions: [
      {
        id: '39',
        topicId: '8',
        question: 'What is the purpose of a mobile app manifest?',
        options: ['To style the app', 'To define app metadata and configuration', 'To write code', 'To test the app'],
        correctOption: 1,
        explanation: 'The app manifest contains essential metadata and configuration for the mobile application'
      },
      {
        id: '40',
        topicId: '8',
        question: 'Which programming language is primarily used for iOS development?',
        options: ['Java', 'Swift', 'Python', 'C++'],
        correctOption: 1,
        explanation: 'Swift is Apple\'s primary programming language for iOS development'
      },
      {
        id: '41',
        topicId: '8',
        question: 'What is the purpose of app permissions?',
        options: ['To make the app faster', 'To control access to device features', 'To style the UI', 'To debug code'],
        correctOption: 1,
        explanation: 'App permissions control what device features and data an app can access'
      },
      {
        id: '42',
        topicId: '8',
        question: 'What is a mobile app lifecycle?',
        options: ['App\'s color scheme', 'States an app goes through', 'App\'s size', 'App\'s price'],
        correctOption: 1,
        explanation: 'The app lifecycle describes different states like foreground, background, and terminated'
      },
      {
        id: '43',
        topicId: '8',
        question: 'What is the purpose of mobile app testing?',
        options: ['To make the app look better', 'To ensure app quality and reliability', 'To increase app size', 'To write documentation'],
        correctOption: 1,
        explanation: 'Mobile app testing ensures the app works correctly and provides a good user experience'
      }
    ]
  },
  {
    id: 'topic9',
    title: 'Cloud Computing',
    category: 'Infrastructure',
    icon: 'cloud',
    participants: 350,
    questions: [
      {
        id: '44',
        topicId: '9',
        question: 'What is cloud computing?',
        options: ['Weather forecasting', 'Internet-based computing services', 'Computer hardware', 'Local storage'],
        correctOption: 1,
        explanation: 'Cloud computing provides computing services over the internet'
      },
      {
        id: '45',
        topicId: '9',
        question: 'What is IaaS in cloud computing?',
        options: ['Software service', 'Infrastructure as a Service', 'Internet service', 'Integration service'],
        correctOption: 1,
        explanation: 'IaaS provides virtualized computing resources over the internet'
      },
      {
        id: '46',
        topicId: '9',
        question: 'What is the main advantage of cloud scalability?',
        options: ['Lower costs', 'Flexible resource adjustment', 'Better security', 'Faster internet'],
        correctOption: 1,
        explanation: 'Cloud scalability allows resources to be adjusted based on demand'
      },
      {
        id: '47',
        topicId: '9',
        question: 'What is cloud storage?',
        options: ['Local hard drive', 'Remote data storage service', 'Memory card', 'CPU cache'],
        correctOption: 1,
        explanation: 'Cloud storage allows data to be stored and accessed over the internet'
      },
      {
        id: '48',
        topicId: '9',
        question: 'What is a cloud deployment model?',
        options: ['Weather pattern', 'Way to implement cloud services', 'Computer model', 'Network cable'],
        correctOption: 1,
        explanation: 'Cloud deployment models define how cloud services are implemented and accessed'
      }
    ]
  },
  {
    id: 'topic10',
    title: 'Cybersecurity',
    category: 'Security',
    icon: 'shield',
    participants: 480,
    questions: [
      {
        id: '49',
        topicId: '10',
        question: 'What is encryption?',
        options: ['Data compression', 'Data conversion to secret code', 'Data deletion', 'Data backup'],
        correctOption: 1,
        explanation: 'Encryption is the process of converting data into a secret code for secure transmission'
      },
      {
        id: '50',
        topicId: '10',
        question: 'What is a firewall?',
        options: ['Antivirus software', 'Network security system', 'Password manager', 'File system'],
        correctOption: 1,
        explanation: 'A firewall is a network security system that monitors and controls incoming and outgoing traffic'
      },
      {
        id: '51',
        topicId: '10',
        question: 'What is two-factor authentication?',
        options: ['Double password', 'Two-step verification process', 'Dual encryption', 'Two firewalls'],
        correctOption: 1,
        explanation: 'Two-factor authentication adds a second layer of security beyond just a password'
      },
      {
        id: '52',
        topicId: '10',
        question: 'What is a DDoS attack?',
        options: ['Data theft', 'System overload attack', 'Password cracking', 'Virus infection'],
        correctOption: 1,
        explanation: 'A DDoS attack attempts to disrupt normal traffic by overwhelming the target with traffic'
      },
      {
        id: '53',
        topicId: '10',
        question: 'What is phishing?',
        options: ['Password recovery', 'Fraudulent attempt to obtain sensitive information', 'Network scanning', 'Data backup'],
        correctOption: 1,
        explanation: 'Phishing is a cybercrime where targets are contacted by email, phone or text by someone posing as a legitimate institution'
      }
    ]
  },
  {
    id: 'topic11',
    title: 'Database Design',
    category: 'Data',
    icon: 'server',
    participants: 320,
    questions: [
      {
        id: '54',
        topicId: '11',
        question: 'What is a primary key?',
        options: ['Foreign key', 'Unique identifier for a record', 'Table name', 'Column name'],
        correctOption: 1,
        explanation: 'A primary key uniquely identifies each record in a database table'
      },
      {
        id: '55',
        topicId: '11',
        question: 'What is normalization in database design?',
        options: ['Data backup', 'Process of organizing data efficiently', 'Data deletion', 'Table creation'],
        correctOption: 1,
        explanation: 'Normalization is the process of organizing data to reduce redundancy and improve data integrity'
      },
      {
        id: '56',
        topicId: '11',
        question: 'What is a foreign key?',
        options: ['Primary key', 'Reference to primary key in another table', 'Index', 'View'],
        correctOption: 1,
        explanation: 'A foreign key is a field that links to the primary key of another table'
      },
      {
        id: '57',
        topicId: '11',
        question: 'What is an index in a database?',
        options: ['Table name', 'Data structure to improve query speed', 'Primary key', 'Foreign key'],
        correctOption: 1,
        explanation: 'An index is a data structure that improves the speed of data retrieval operations'
      },
      {
        id: '58',
        topicId: '11',
        question: 'What is ACID in database transactions?',
        options: ['Chemical property', 'Database transaction properties', 'Data type', 'Query language'],
        correctOption: 1,
        explanation: 'ACID stands for Atomicity, Consistency, Isolation, and Durability - properties that guarantee reliable database transactions'
      }
    ]
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