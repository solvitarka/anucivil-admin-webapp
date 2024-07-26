// src/app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { loginUser } from '@/services/Auth.service';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await loginUser(email, password);
    if (result.success && result.isAdmin) {
      router.replace('/dashboard');
    } else {
      setError(result.error || 'An unexpected error occurred.');
    }
  };

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center p-5 relative overflow-hidden">
      {/* Dystopian background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 to-black"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CiAgPHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIgLz4KICA8cGF0aCBkPSJNMCAwdjYwaDYwVjBIMHptNTggNTh2LTFIMlYyaDU2djU2eiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgLz4KPC9zdmc+')] opacity-20"></div>
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-800">
          <div className="px-8 pt-12 pb-8">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-center mb-2 text-white">Welcome Back</h2>
              <p className="text-center text-gray-400 mb-8">Sign in to your account</p>
            </motion.div>
            <form onSubmit={handleLogin} className="space-y-6">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Label htmlFor="email" className="text-gray-300 text-sm font-medium">Email</Label>
                <div className="mt-1 relative">
                  <FiMail className="absolute top-3 left-3 text-gray-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 w-full py-2 bg-gray-800 border-gray-700 text-white rounded-md focus:ring-2 focus:ring-white focus:border-transparent"
                  />
                </div>
              </motion.div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Label htmlFor="password" className="text-gray-300 text-sm font-medium">Password</Label>
                <div className="mt-1 relative">
                  <FiLock className="absolute top-3 left-3 text-gray-500" />
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 w-full py-2 bg-gray-800 border-gray-700 text-white rounded-md focus:ring-2 focus:ring-white focus:border-transparent"
                  />
                </div>
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <Button 
                  type="submit" 
                  className="w-full bg-white text-black font-semibold py-3 rounded-md transition-all duration-300 hover:bg-gray-200 hover:shadow-lg flex items-center justify-center"
                >
                  Sign In
                  <FiArrowRight className="ml-2" />
                </Button>
              </motion.div>
            </form>
            {error && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-center mt-4"
              >
                {error}
              </motion.p>
            )}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-6 text-center"
            >
              {/* <Link href="/forgot-password" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">
                Forgot your password?
              </Link> */}
            </motion.div>
          </div>
          <div className="px-8 py-4 bg-gray-800 border-t border-gray-700">
            {/* <p className="text-center text-gray-400">
              Don't have an account?{' '}
              <Link href="/signup" className="font-medium text-white hover:text-gray-200 transition-colors duration-300">
                Sign up
              </Link>
            </p> */}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;