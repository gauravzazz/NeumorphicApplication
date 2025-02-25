import * as SQLite from 'expo-sqlite';

interface SQLError {
  message: string;
}

interface SQLiteResult {
  rows: any[];
  insertId?: number;
  rowsAffected: number;
}

interface SQLiteResponse {
  status: number;
  error?: string;
  result: SQLiteResult[];
}

export class DatabaseService {
  private db: SQLite.SQLiteDatabase;
  private static instance: DatabaseService;

  private constructor() {
    this.db = SQLite.openDatabaseSync('revise.db');
    this.initializeTables();
  }

  static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  private async initializeTables(): Promise<void> {
    const tables = [
      `CREATE TABLE IF NOT EXISTS subjects (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        icon TEXT,
        imageUrl TEXT,
        color TEXT,
        totalTopics INTEGER DEFAULT 0,
        progress REAL DEFAULT 0,
        order_index INTEGER,
        created_at INTEGER,
        updated_at INTEGER
      )`,
      
      `CREATE TABLE IF NOT EXISTS topics (
        id TEXT PRIMARY KEY,
        subject_id TEXT,
        name TEXT NOT NULL,
        description TEXT,
        icon TEXT,
        imageUrl TEXT,
        color TEXT,
        total_questions INTEGER DEFAULT 0,
        completed_questions INTEGER DEFAULT 0,
        difficulty TEXT CHECK(difficulty IN ('beginner', 'intermediate', 'advanced')),
        estimated_time INTEGER,
        order_index INTEGER,
        created_at INTEGER,
        updated_at INTEGER,
        FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE
      )`,
      
      `CREATE TABLE IF NOT EXISTS questions (
        id TEXT PRIMARY KEY,
        topic_id TEXT,
        question TEXT NOT NULL,
        options TEXT NOT NULL,
        correct_option INTEGER,
        explanation TEXT,
        difficulty TEXT DEFAULT 'medium',
        times_attempted INTEGER DEFAULT 0,
        times_correct INTEGER DEFAULT 0,
        created_at INTEGER,
        updated_at INTEGER,
        FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE CASCADE
      )`,
      
      `CREATE TABLE IF NOT EXISTS user_progress (
        id TEXT PRIMARY KEY,
        user_id TEXT,
        question_id TEXT,
        is_correct BOOLEAN,
        answer_selected INTEGER,
        time_taken INTEGER,
        created_at INTEGER,
        FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
      )`,
      
      `CREATE TABLE IF NOT EXISTS bookmarks (
        id TEXT PRIMARY KEY,
        user_id TEXT,
        question_id TEXT,
        created_at INTEGER,
        FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
      )`,
      
      `CREATE TABLE IF NOT EXISTS question_feedback (
        id TEXT PRIMARY KEY,
        question_id TEXT,
        user_id TEXT,
        difficulty TEXT CHECK(difficulty IN ('easy', 'medium', 'hard')),
        created_at INTEGER,
        FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
      )`
    ];

    for (const query of tables) {
      try {
        await this.db.execAsync(query);
        console.log('Table created successfully');
      } catch (error: unknown) {
        const sqlError = error as SQLError;
        console.error('Error creating table:', sqlError.message);
      }
    }
  }

  async getSubjects(): Promise<any[]> {
    try {
      const response = await this.db.execAsync(
        'SELECT * FROM subjects ORDER BY order_index'
      ) as unknown as SQLiteResponse;
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      return response.result[0]?.rows || [];
    } catch (error: unknown) {
      const sqlError = error as SQLError;
      console.error('Error fetching subjects:', sqlError.message);
      throw error;
    }
  }

  async insertSubject(subject: any): Promise<void> {
    try {
      const query = `INSERT INTO subjects (id, name, description, icon, imageUrl, color, totalTopics, progress, order_index, created_at, updated_at) 
                     VALUES ('${subject.id}', '${subject.name}', '${subject.description}', '${subject.icon}', '${subject.imageUrl}', 
                             '${subject.color}', ${subject.totalTopics || 0}, ${subject.progress || 0}, ${subject.order_index}, 
                             ${Date.now()}, ${Date.now()})`;
      await this.db.execAsync(query);
    } catch (error: unknown) {
      const sqlError = error as SQLError;
      console.error('Error inserting subject:', sqlError.message);
      throw error;
    }
  }

  async updateSubject(subject: any): Promise<void> {
    try {
      const query = `UPDATE subjects 
                     SET name = '${subject.name}', 
                         description = '${subject.description}', 
                         icon = '${subject.icon}', 
                         imageUrl = '${subject.imageUrl}', 
                         color = '${subject.color}', 
                         totalTopics = ${subject.totalTopics}, 
                         progress = ${subject.progress}, 
                         order_index = ${subject.order_index}, 
                         updated_at = ${Date.now()}
                     WHERE id = '${subject.id}'`;
      await this.db.execAsync(query);
    } catch (error: unknown) {
      const sqlError = error as SQLError;
      console.error('Error updating subject:', sqlError.message);
      throw error;
    }
  }

  async deleteSubject(id: string): Promise<void> {
    try {
      await this.db.execAsync(`DELETE FROM subjects WHERE id = '${id}'`);
    } catch (error: unknown) {
      const sqlError = error as SQLError;
      console.error('Error deleting subject:', sqlError.message);
      throw error;
    }
  }

  async insertMockData(): Promise<void> {
    try {
      // Mock Subjects
      const subjects = [
        {
          id: '1',
          name: 'Mathematics',
          description: 'Basic to advanced mathematics concepts',
          icon: 'calculator',
          imageUrl: 'https://example.com/math.jpg',
          color: '#FF5733',
          totalTopics: 3,
          progress: 0,
          order_index: 1
        },
        {
          id: '2',
          name: 'Physics',
          description: 'Fundamental physics principles',
          icon: 'atom',
          imageUrl: 'https://example.com/physics.jpg',
          color: '#33FF57',
          totalTopics: 2,
          progress: 0,
          order_index: 2
        }
      ];
  
      // Mock Topics
      const topics = [
        {
          id: '1',
          subject_id: '1',
          name: 'Algebra',
          description: 'Basic algebraic concepts',
          icon: 'function',
          imageUrl: 'https://example.com/algebra.jpg',
          color: '#5733FF',
          total_questions: 5,
          completed_questions: 0,
          difficulty: 'beginner',
          estimated_time: 1800,
          order_index: 1
        },
        {
          id: '2',
          subject_id: '1',
          name: 'Geometry',
          description: 'Basic geometric principles',
          icon: 'shape',
          imageUrl: 'https://example.com/geometry.jpg',
          color: '#33FFFF',
          total_questions: 5,
          completed_questions: 0,
          difficulty: 'intermediate',
          estimated_time: 2400,
          order_index: 2
        }
      ];
  
      // Mock Questions
      const questions = [
        {
          id: '1',
          topic_id: '1',
          question: 'What is the value of x in 2x + 4 = 10?',
          options: JSON.stringify(['2', '3', '4', '5']),
          correct_option: 1,
          explanation: 'Subtract 4 from both sides: 2x = 6, then divide by 2: x = 3',
          difficulty: 'medium',
          times_attempted: 0,
          times_correct: 0
        },
        {
          id: '2',
          topic_id: '1',
          question: 'Solve for y: 3y - 6 = 15',
          options: JSON.stringify(['5', '7', '8', '9']),
          correct_option: 2,
          explanation: 'Add 6 to both sides: 3y = 21, then divide by 3: y = 7',
          difficulty: 'medium',
          times_attempted: 0,
          times_correct: 0
        }
      ];
  
      // Insert subjects
      for (const subject of subjects) {
        await this.insertSubject(subject);
      }
  
      // Insert topics
      for (const topic of topics) {
        await this.db.execAsync(`
          INSERT INTO topics (id, subject_id, name, description, icon, imageUrl, color, 
                            total_questions, completed_questions, difficulty, estimated_time, 
                            order_index, created_at, updated_at)
          VALUES ('${topic.id}', '${topic.subject_id}', '${topic.name}', '${topic.description}',
                  '${topic.icon}', '${topic.imageUrl}', '${topic.color}', ${topic.total_questions},
                  ${topic.completed_questions}, '${topic.difficulty}', ${topic.estimated_time},
                  ${topic.order_index}, ${Date.now()}, ${Date.now()})
        `);
      }
  
      // Insert questions
      for (const question of questions) {
        await this.db.execAsync(`
          INSERT INTO questions (id, topic_id, question, options, correct_option, explanation,
                             difficulty, times_attempted, times_correct, created_at, updated_at)
          VALUES ('${question.id}', '${question.topic_id}', '${question.question}', 
                  '${question.options}', ${question.correct_option}, '${question.explanation}',
                  '${question.difficulty}', ${question.times_attempted}, ${question.times_correct},
                  ${Date.now()}, ${Date.now()})
        `);
      }
  
      console.log('Mock data inserted successfully');
    } catch (error: unknown) {
      const sqlError = error as SQLError;
      console.error('Error inserting mock data:', sqlError.message);
      throw error;
    }
  }

  async verifyTables(): Promise<void> {
    const tables = ['subjects', 'topics', 'questions', 'user_progress', 'bookmarks', 'question_feedback'];
    
    for (const table of tables) {
      try {
        const response = await this.db.execAsync(
          `SELECT count(*) as count FROM sqlite_master WHERE type='table' AND name='${table}';`
        ) as unknown as SQLiteResponse;
        
        if (response?.result?.[0]?.rows) {
          const count = response.result[0].rows[0]?.count;
          
          if (count > 0) {
            console.log(`✅ Table ${table} exists`);
            
            // Get table info
            const tableInfo = await this.db.execAsync(
              `PRAGMA table_info('${table}');`
            ) as unknown as SQLiteResponse;
            
            if (tableInfo?.result?.[0]?.rows) {
              console.log(`Columns in ${table}:`, tableInfo.result[0].rows);
            }
          } else {
            console.error(`❌ Table ${table} does not exist`);
          }
        }
      } catch (error: unknown) {
        const sqlError = error as SQLError;
        console.error(`Error verifying table ${table}:`, sqlError.message);
      }
    }
  }
}