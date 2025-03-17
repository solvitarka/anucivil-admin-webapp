import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as firebaseSignOut, onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/config/firebase/firebaseConfig';

export interface LoginResult {
  success: boolean;
  error?: string;
  isAdmin?: boolean;
  user?: User;
}

export interface AuthUser extends User {
  isAdmin: boolean;
}

export const loginUser = async (email: string, password: string): Promise<LoginResult> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const userDoc = await getDoc(doc(db, 'users', user.uid));

    if (userDoc.exists() && userDoc.data()?.isAdmin) {
      return { success: true, isAdmin: true, user };
    } else {
      return { success: false, error: 'You are not authorized to access this page.' };
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      return { success: false, error: err.message };
    } else {
      return { success: false, error: 'An unexpected error occurred.' };
    }
  }
};

export const signOut = async (): Promise<void> => {
  return firebaseSignOut(auth);
};

export const getCurrentUser = (): Promise<AuthUser | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        unsubscribe();
        if (user) {
          try {
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (userDoc.exists() && userDoc.data()?.isAdmin) {
              resolve({ ...user, isAdmin: true } as AuthUser);
            } else {
              resolve(null);
            }
          } catch (error) {
            reject(error);
          }
        } else {
          resolve(null);
        }
      },
      reject
    );
  });
}; 