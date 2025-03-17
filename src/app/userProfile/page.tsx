// src/app/userProfile/page.tsx
'use client';

import UserProfilePage from '@/components/userProfile/page';
import withAuth from '@/components/auth/withAuth';

const UserProfilePageWrapper = () => {
  // No userId passed, so it will use the current authenticated user
  return <UserProfilePage />;
}

export default withAuth(UserProfilePageWrapper);