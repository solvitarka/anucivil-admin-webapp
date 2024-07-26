// src/services/Auth.service.tsx
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase/firebaseConfig';

export interface LoginResult {
  success: boolean;
  error?: string;
  isAdmin?: boolean;
}

export const loginUser = async (email: string, password: string): Promise<LoginResult> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const userDoc = await getDoc(doc(db, 'users', user.uid));

    if (userDoc.exists() && userDoc.data()?.isAdmin) {
      return { success: true, isAdmin: true };
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