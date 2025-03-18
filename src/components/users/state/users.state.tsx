'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, fetchUsers } from '../services/users.service';

interface UsersContextType {
  users: User[];
  loading: boolean;
  error: string | null;
  refreshUsers: () => Promise<void>;
}

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export function UsersProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const usersList = await fetchUsers();
      setUsers(usersList);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const refreshUsers = async () => {
    await loadUsers();
  };

  return (
    <UsersContext.Provider value={{ users, loading, error, refreshUsers }}>
      {children}
    </UsersContext.Provider>
  );
}

export function useUsers() {
  const context = useContext(UsersContext);
  if (context === undefined) {
    throw new Error('useUsers must be used within a UsersProvider');
  }
  return context;
} 