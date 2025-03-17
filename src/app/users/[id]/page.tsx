'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import UserProfilePage from '@/components/userProfile/page';

// Export a proper React component as the default export
export default function UserProfileWrapper() {
  const params = useParams();
  const userId = params.id as string;

  return <UserProfilePage userId={userId} />;
} 