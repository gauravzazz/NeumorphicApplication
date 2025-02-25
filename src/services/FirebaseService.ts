// import { db } from '../config/firebase';
// import { Subject, Topic, Question } from '../types/models';

// export class FirebaseService {
//   static async getSubjects(): Promise<Subject[]> {
//     const snapshot = await db.collection('subjects').orderBy('order').get();
//     return snapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data()
//     } as Subject));
//   }

//   static async getTopics(subjectId: string): Promise<Topic[]> {
//     const snapshot = await db.collection('topics')
//       .where('subjectId', '==', subjectId)
//       .orderBy('order')
//       .get();
    
//     return snapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data()
//     } as Topic));
//   }

//   static async getQuestions(topicId: string): Promise<Question[]> {
//     const snapshot = await db.collection('questions')
//       .where('topicId', '==', topicId)
//       .get();
    
//     return snapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data()
//     } as Question));
//   }

//   static async syncData(lastSyncTimestamp: number = 0) {
//     const batch = db.batch();
//     const updates = await db.collection('updates')
//       .where('timestamp', '>', lastSyncTimestamp)
//       .get();

//     const changes: any[] = [];
//     updates.forEach(doc => {
//       changes.push(doc.data());
//     });

//     return changes;
//   }

//   static async testConnection(): Promise<void> {
//       try {
//         const snapshot = await db.collection('questions').limit(2).get();
        
//         console.log('Connection test results:');
//         console.log('Number of documents found:', snapshot.size);
        
//         snapshot.forEach(doc => {
//           const data = doc.data();
//           console.log('\nQuestion:', {
//             id: doc.id,
//             question: data.question,
//             options: data.options,
//             topicId: data.topicId
//           });
//         });
//       } catch (error) {
//         console.error('Firebase connection error:', error);
//       }
//     }
// }