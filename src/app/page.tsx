'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Inter } from "next/font/google";
import { AuthProvider } from '@/components/auth/state/auth.state';
import ClientLayoutContent from "@/components/ClientLayoutContent";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard');
  }, [router]);

  return null; // or a loading spinner if you want to show something during redirection
}