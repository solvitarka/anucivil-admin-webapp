'use client';

import { ReactNode, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AppLayout from '@/components/layouts/AppLayout';

// Component imports
import DashboardPage from '@/components/dashboard/page';
import UsersPage from '@/components/users/page';
import WorkPage from '@/components/work/page';
import UserProfilePage from '@/components/userProfile/page';
import LoginPage from '@/components/auth/LoginPage';
import { useAuth } from '@/components/auth/state/auth.state';

// Route components
export function Dashboard() {
  return (
    <AppLayout className="min-h-screen w-full bg-muted/40 p-4 sm:p-6">
      <DashboardPage />
    </AppLayout>
  );
}

export function Users() {
  return (
    <AppLayout>
      <UsersPage />
    </AppLayout>
  );
}

export function Work() {
  return (
    <AppLayout>
      <WorkPage />
    </AppLayout>
  );
}

export function WorkDetail() {
  const params = useParams();
  // Extract the project ID from the path parameter
  const path = Array.isArray(params.path) ? params.path : [params.path];
  const projectId = path.length > 1 ? path[1] : '';
  
  return (
    <AppLayout>
      <WorkPage projectId={projectId} />
    </AppLayout>
  );
}

export function UserProfile() {
  return (
    <AppLayout>
      <UserProfilePage />
    </AppLayout>
  );
}

export function UserDetail() {
  const params = useParams();
  // Extract the user ID from the path parameter
  const path = Array.isArray(params.path) ? params.path : [params.path];
  const userId = path.length > 1 ? path[1] : '';
  
  return (
    <AppLayout>
      <UserProfilePage userId={userId} />
    </AppLayout>
  );
}

export function Login() {
  return (
    <AppLayout requireAuth={false} className="min-h-screen flex items-center justify-center bg-gray-50">
      <LoginPage />
    </AppLayout>
  );
}

export function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace('/dashboard');
      } else {
        router.replace('/login');
      }
    }
  }, [user, loading, router]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-pulse text-lg">Loading...</div>
    </div>
  );
} 