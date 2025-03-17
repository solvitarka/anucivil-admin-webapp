'use client';

import { AuthProvider } from './state/auth.state';
import LoginForm from './ui/LoginForm';

export default function LoginPage() {
  return (
    <AuthProvider>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <LoginForm />
      </div>
    </AuthProvider>
  );
} 