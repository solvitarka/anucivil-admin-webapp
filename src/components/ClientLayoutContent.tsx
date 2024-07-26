// src/components/ClientLayoutContent.tsx
'use client';

import { useAuth } from '@/lib/authContext';
import dynamic from 'next/dynamic';

const SideNav = dynamic(() => import("@/components/common/sidenav"), { ssr: false });

export default function ClientLayoutContent({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {user && (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
          <SideNav />
        </aside>
      )}
      <div className={`flex flex-col sm:gap-4 ${user ? 'sm:pl-14' : ''}`}>
        {children}
      </div>
    </div>
  );
}