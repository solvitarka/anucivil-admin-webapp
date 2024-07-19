// src/components/withAuth.tsx
'use client'; // Ensure this is treated as a client component

import { useEffect, useState, ComponentType } from 'react';
import { useRouter } from 'next/navigation'; // Use from next/navigation for app directory
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/lib/firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

interface WithAuthProps {
  user: any;
}

const withAuth = (WrappedComponent: ComponentType<WithAuthProps>) => {
  const WithAuth = (props: any) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists() && userDoc.data()?.isAdmin) {
            setUser(user);
          } else {
            router.push('/login');
          }
        } else {
          router.push('/login');
        }
        setLoading(false);
      });

      return () => unsubscribe();
    }, [router]);

    if (loading) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} user={user} />;
  };

  return WithAuth;
};

export default withAuth;
