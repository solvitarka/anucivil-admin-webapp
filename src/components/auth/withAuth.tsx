'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './state/auth.state';

export default function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function WithAuthComponent(props: P) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.push('/login');
      }
    }, [user, loading, router]);

    if (loading) {
      return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (!user) {
      return null; // Don't render anything while redirecting
    }

    return <Component {...props} />;
  };
} 