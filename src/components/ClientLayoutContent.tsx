// src/components/ClientLayoutContent.tsx
'use client';

import { useAuth } from '@/components/auth/state/auth.state';
import dynamic from 'next/dynamic';

const SideNav = dynamic(() => import("@/components/common/sidenav"), { ssr: false });

export default function ClientLayoutContent({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {user && (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-16 flex-col border-r bg-background sm:flex">
          <SideNav />
        </aside>
      )}
      <main className={`w-full ${user ? 'sm:pl-16' : ''}`}>
        {children}
      </main>
    </div>
  );
}