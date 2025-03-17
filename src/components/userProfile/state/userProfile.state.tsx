'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, UserProfileData, fetchUserProfile } from '../services/userProfile.service';
import { useAuth } from '@/components/auth/state/auth.state';

interface UserProfileContextType {
  profileData: UserProfileData | null;
  loading: boolean;
  error: string | null;
  refreshProfile: () => Promise<void>;
}

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

interface UserProfileProviderProps {
  children: ReactNode;
  userId?: string;
}

export function UserProfileProvider({ children, userId }: UserProfileProviderProps) {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProfile = async () => {
    // If userId is provided, use it; otherwise, use the authenticated user's ID
    const targetUserId = userId || (user ? user.uid : null);
    
    if (!targetUserId) {
      setLoading(false);
      setError("No user ID available");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await fetchUserProfile(targetUserId);
      setProfileData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, [user, userId]);

  const refreshProfile = async () => {
    await loadProfile();
  };

  return (
    <UserProfileContext.Provider value={{ profileData, loading, error, refreshProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
}

export function useUserProfile() {
  const context = useContext(UserProfileContext);
  if (context === undefined) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }
  return context;
} 