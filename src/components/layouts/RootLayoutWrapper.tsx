import { ReactNode } from 'react';
import { AuthProvider } from '@/components/auth/state/auth.state';
import RootLayout from "@/components/layouts/RootLayout";

export function RootLayoutWrapper({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <RootLayout>{children}</RootLayout>
        </AuthProvider>
      </body>
    </html>
  );
} 