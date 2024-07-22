// src/app/userProfile/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import withAuth from '@/components/withAuth';
import HomeTable from "@/components/dashboard/HomeTable";
import { UserHeader } from "@/components/userProfile/UserHeader";
import { PaymentInfo } from "@/components/userProfile/PaymentInfo";
import { ContactInfo } from "@/components/userProfile/ContactInfo";
import { fetchUser, fetchProjects } from "@/services/UserProfile.service";

const UserProfilePage: React.FC = () => {
  const searchParams = useSearchParams();
  const userId = searchParams!.get('userId');
  const [user, setUser] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [amountReceived, setAmountReceived] = useState<number>(0);
  const [amountDue, setAmountDue] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadUserData = async () => {
      if (!userId) return;

      try {
        const { user, userRef } = await fetchUser(userId);
        setUser(user);

        const { projects, amountReceived, amountDue } = await fetchProjects(userRef);
        setProjects(projects);
        setAmountReceived(amountReceived);
        setAmountDue(amountDue);
      } catch (error) {
        console.error("Error loading user data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [userId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>No User found</p>;
  }

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      <UserHeader name={user.name} district={user.address.district} />
      <main className="flex-1 max-w-5xl mx-auto p-4 md:p-6 grid gap-8">
        <PaymentInfo amountReceived={amountReceived} amountDue={amountDue} />
        <ContactInfo email={user.email} phone={user.phone} address={user.address} />
        <div className="grid gap-2">
          <h2 className="text-lg font-semibold">Current Projects</h2>
          <div className="overflow-auto border rounded-lg">
            <HomeTable data={projects} timeRange={'week'} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default withAuth(UserProfilePage);