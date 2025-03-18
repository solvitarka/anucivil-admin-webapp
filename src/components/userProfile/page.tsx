'use client';

import { UserProfileProvider } from './state/userProfile.state';
import UserProfileView from './ui/UserProfileView';

interface UserProfilePageProps {
  userId?: string;
}

export default function UserProfilePage({ userId }: UserProfilePageProps) {
  return (
    <UserProfileProvider userId={userId}>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">User Profile</h1>
        </div>
        <UserProfileView />
      </div>
    </UserProfileProvider>
  );
} 