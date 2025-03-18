'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthUser, loginUser, signOut as authSignOut, getCurrentUser } from '../services/auth.service';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      try {
        setLoading(true);
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred during authentication');
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const result = await loginUser(email, password);
      
      if (result.success && result.isAdmin && result.user) {
        setUser({ ...result.user, isAdmin: true } as AuthUser);
        return true;
      } else {
        setError(result.error || 'Authentication failed');
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      await authSignOut();
      setUser(null);
      router.push('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during logout');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 