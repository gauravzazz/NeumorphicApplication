import * as SQLite from 'expo-sqlite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Question } from '../questionService';
import { mockSubjects, mockTopics, mockQuestions } from '../../data/mockData';

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
  private static DB_INITIALIZED_KEY = 'db_initialized';

  private constructor() {
    this.db = SQLite.openDatabaseSync('revise.db');
    this.initializeDatabase();
  }

  private async initializeDatabase(): Promise<void> {
    try {
      const isInitialized = await AsyncStorage.getItem(DatabaseService.DB_INITIALIZED_KEY);
      
      if (!isInitialized) {
        console.log('First time initialization...');
        await this.dropAllTables();
        await this.initializeTables();
        await this.insertMockData();
        await AsyncStorage.setItem(DatabaseService.DB_INITIALIZED_KEY, 'true');
        console.log('Database initialized successfully with mock data');
      } else {
        console.log('Database already initialized, skipping initialization');
      }
    } catch (error: unknown) {
      const sqlError = error as SQLError;
      console.error('Database initialization error:', sqlError.message);
      // If there's an error, remove the initialization flag to retry next time
      await AsyncStorage.removeItem(DatabaseService.DB_INITIALIZED_KEY);
    }
  }

  // Remove the checkAndInitializeTables method as it's no longer needed
  private async dropAllTables(): Promise<void> {
    const tables = [
      'question_feedback',
      'bookmarks',
      'user_progress',
      'questions',
      'topics',
      'subjects'
    ];
  
    for (const table of tables) {
      try {
        await this.db.execAsync(`DROP TABLE IF EXISTS ${table}`);
        console.log(`Dropped table: ${table}`);
      } catch (error: unknown) {
        const sqlError = error as SQLError;
        console.error(`Error dropping table ${table}:`, sqlError.message);
      }
    }
  }

  private async checkAndInitializeTables(): Promise<void> {
    try {
      // Force clean start by dropping all tables
      console.log('Dropping all existing tables...');
      await this.dropAllTables();
      
      console.log('Initializing database...');
      await this.initializeTables();
      console.log('Tables created, inserting mock data...');
      await this.insertMockData();
      await AsyncStorage.setItem(DatabaseService.DB_INITIALIZED_KEY, 'true');
      console.log('Database initialized successfully with mock data');
      
      // Verify data insertion
      const subjects = await this.getSubjects();
      console.log('Verification - Inserted subjects:', subjects);
    } catch (error: unknown) {
      const sqlError = error as SQLError;
      console.error('Database initialization error:', sqlError.message);
    }
  }

  static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      console.log('Creating new DatabaseService instance');
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
      const rows = await this.db.getAllAsync(
        'SELECT * FROM subjects ORDER BY order_index'
      );
      console.log('Fetched subjects:', rows);
      return rows;
    } catch (error: unknown) {
      const sqlError = error as SQLError;
      console.error('SQL Error in getSubjects:', sqlError.message);
      throw error;
    }
  }

  async insertSubject(subject: any): Promise<void> {
    try {
      // Check if subject exists using getAllAsync
      const existingSubjects = await this.db.getAllAsync(
        'SELECT id FROM subjects WHERE id = ?',
        [subject.id]
      );
  
      if (existingSubjects.length > 0) {
        await this.updateSubject(subject);
        return;
      }
  
      // Subject doesn't exist, insert new using runAsync with parameters
      const query = `INSERT INTO subjects (
        id, name, description, icon, imageUrl, color, 
        totalTopics, progress, order_index, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
      const params = [
        subject.id,
        subject.name,
        subject.description,
        subject.icon,
        subject.imageUrl,
        subject.color,
        subject.totalTopics || 0,
        subject.progress || 0,
        subject.order_index,
        Date.now(),
        Date.now()
      ];
  
      await this.db.runAsync(query, params);
      console.log(`Inserted subject with id ${subject.id}`);
    } catch (error: unknown) {
      const sqlError = error as SQLError;
      console.error('SQL Error in insertSubject:', sqlError.message);
      throw error;
    }
  }

  async updateSubject(subject: any): Promise<void> {
    try {
      const query = `UPDATE subjects 
                     SET name = ?, 
                         description = ?, 
                         icon = ?, 
                         imageUrl = ?, 
                         color = ?, 
                         totalTopics = ?, 
                         progress = ?, 
                         order_index = ?, 
                         updated_at = ?
                     WHERE id = ?`;
  
      const params = [
        subject.name,
        subject.description,
        subject.icon,
        subject.imageUrl,
        subject.color,
        subject.totalTopics,
        subject.progress,
        subject.order_index,
        Date.now(),
        subject.id
      ];
  
      await this.db.runAsync(query, params);
      console.log(`Updated subject with id ${subject.id}`);
    } catch (error: unknown) {
      const sqlError = error as SQLError;
      console.error('SQL Error in updateSubject:', sqlError.message);
      throw error;
    }
  }

  async deleteSubject(id: string): Promise<void> {
    try {
      await this.db.runAsync('DELETE FROM subjects WHERE id = ?', [id]);
      console.log(`Deleted subject with id ${id}`);
    } catch (error: unknown) {
      const sqlError = error as SQLError;
      console.error('SQL Error in deleteSubject:', sqlError.message);
      throw error;
    }
  }

  async insertMockData(): Promise<void> {
    try {
      // Insert subjects from mockData.ts
      for (const subject of mockSubjects) {
        // Map the subject properties to match the database schema
        console.log("Inserting subject :"+subject);
        const dbSubject = {
          id: subject.id,
          name: subject.name,
          description: subject.description,
          icon: subject.icon,
          imageUrl: subject.imageUrl,
          color: '#' + Math.floor(Math.random()*16777215).toString(16), // Generate random color if needed
          totalTopics: subject.topicsCount,
          progress: subject.progress,
          order_index: parseInt(subject.id) // Use ID as order index for simplicity
        };
        
        await this.insertSubject(dbSubject);
      }
  
      // Insert topics using mockTopics
      for (const topic of mockTopics) {
        const query = `INSERT INTO topics (
          id, subject_id, name, description, imageUrl,
          total_questions, difficulty, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
        const params = [
          topic.id,
          topic.subjectId,
          topic.name,
          topic.description,
          topic.imageUrl || '',
          topic.questionsCount,
          topic.difficulty === 'hard' ? 'advanced' : 
            topic.difficulty === 'medium' ? 'intermediate' : 'beginner',
          Date.now(),
          Date.now()
        ];
  
        await this.db.runAsync(query, params);
        console.log(`Inserted topic with id ${topic.id}`);
      }
  
      // Insert questions using mockQuestions
      for (const question of mockQuestions) {
        const query = `INSERT INTO questions (
          id, topic_id, question, options, correct_option, explanation,
          difficulty, times_attempted, times_correct, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
        const params = [
          question.id,
          question.topicId,
          question.question,
          JSON.stringify(question.options), // Store options as JSON string
          question.correctOption,
          question.explanation,
          'medium', // Default difficulty
          0, // times_attempted
          0, // times_correct
          Date.now(),
          Date.now()
        ];
  
        await this.db.runAsync(query, params);
        console.log(`Inserted question with id ${question.id}`);
      }
  
      console.log('Mock data inserted successfully');
    } catch (error: unknown) {
      const sqlError = error as SQLError;
      console.error('Error inserting mock data:', sqlError.message);
      throw error;
    }
  }

 

  async getTopics(): Promise<any[]> {
    try {
      const rows = await this.db.getAllAsync(
        'SELECT * FROM topics ORDER BY order_index'
      );
      console.log('Fetched topics:', rows);
      return rows;
    } catch (error: unknown) {
      const sqlError = error as SQLError;
      console.error('SQL Error in getTopics:', sqlError.message);
      throw error;
    }
  }

}