// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { auth } from '../config/firebase';
// import { FirebaseService } from '../services/FirebaseService';

// interface FirebaseContextType {
//   user: any;
//   loading: boolean;
//   error: string | null;
//   syncData: () => Promise<void>;
// }

// const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

// export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       setUser(user);
//       setLoading(false);
//     });

//     return unsubscribe;
//   }, []);

//   const syncData = async () => {
//     try {
//       const lastSync = await AsyncStorage.getItem('lastSyncTimestamp');
//       const lastSyncTimestamp = lastSync ? parseInt(lastSync) : 0;
      
//       const updates = await FirebaseService.syncData(lastSyncTimestamp);
//       // Process updates and store in local database
      
//       await AsyncStorage.setItem('lastSyncTimestamp', Date.now().toString());
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <FirebaseContext.Provider value={{ user, loading, error, syncData }}>
//       {children}
//     </FirebaseContext.Provider>
//   );
// };

// export const useFirebase = () => {
//   const context = useContext(FirebaseContext);
//   if (context === undefined) {
//     throw new Error('useFirebase must be used within a FirebaseProvider');
//   }
//   return context;
// };