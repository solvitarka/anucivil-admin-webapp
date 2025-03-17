'use client';

import { ReactNode } from 'react';
import { useAuth } from '@/components/auth/state/auth.state';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface AppLayoutProps {
  children: ReactNode;
  requireAuth?: boolean;
  className?: string;
}

export default function AppLayout({ 
  children, 
  requireAuth = true,
  className = "min-h-screen w-full p-4 sm:p-6"
}: AppLayoutProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && requireAuth && !user) {
      router.replace('/login');
    }
  }, [user, loading, router, requireAuth]);

  if (loading && requireAuth) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse text-lg">Loading...</div>
      </div>
    );
  }

  if (!user && requireAuth) {
    return null;
  }

  return (
    <div className={className}>
      {children}
    </div>
  );
} 