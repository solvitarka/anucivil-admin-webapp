'use client';

import { Inter } from "next/font/google";
import { useAuth } from '@/components/auth/state/auth.state';
import dynamic from 'next/dynamic';
import { Toaster } from "@/components/ui/sonner";

const SideNav = dynamic(() => import("@/components/common/sidenav"), { ssr: false });
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className={inter.className}>
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
      <Toaster />
    </div>
  );
} 