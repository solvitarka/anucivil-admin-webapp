"use client";
import Link from "next/link";
import withAuth from '@/components/withAuth';
import { useEffect, useState } from 'react';
import { Users, CircleUser, Home, LineChart, Menu, Package, DollarSign, CreditCard, Package2, Activity, Search, ShoppingCart, Pickaxe } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import InfoBanner from "@/components/dashboard/InfoBanner";
import InfoTable from "@/components/dashboard/InfoTable";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fetchProjects, OverviewData } from '@/services/Dashboard.service';

const Dashboard: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [overviewData, setOverviewData] = useState<OverviewData>({
    amountReceived: 0,
    amountDue: 0,
    inProgress: 0,
    inLab: 0,
  });

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const [projectsData, overview] = await fetchProjects();
        setProjects(projectsData);
        setOverviewData(overview);
      } catch (error) {
        console.error("Error loading projects:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const infoData: { title: string; icon: 'DollarSign' | 'Users' | 'CreditCard' | 'Activity'; value: string; change: string; }[] = [
    {
      title: 'Total Work Orders',
      icon: 'DollarSign',
      value: `₹ ${overviewData.amountDue + overviewData.amountReceived}`,
      change: '',
    },
    {
      title: 'In Progress',
      icon: 'Users',
      value: overviewData.inProgress.toString(),
      change: '',
    },
    {
      title: 'At Laboratory',
      icon: 'CreditCard',
      value: overviewData.inLab.toString(),
      change: '',
    },
    {
      title: 'Pending Payments',
      icon: 'Activity',
      value: `₹ ${overviewData.amountDue}`,
      change: '',
    },
  ];

  return (
    <div>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <InfoBanner data={infoData} />
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <InfoTable data={projects} />


         
        </div>
      </main>
    </div>
  );
}

export default withAuth(Dashboard);


{/* <Card x-chunk="dashboard-01-chunk-5">
<CardHeader>
  <CardTitle>Bills Recieved</CardTitle>
  <CardDescription>
      Recent bills recieved from your app.
    </CardDescription>
</CardHeader>
<CardContent className="grid gap-8">
  <div className="flex items-center gap-4">
    <Avatar className="hidden h-9 w-9 sm:flex">
      <AvatarImage src="/avatars/01.png" alt="Avatar" />
      <AvatarFallback>OM</AvatarFallback>
    </Avatar>
    <div className="grid gap-1">
      <p className="text-sm font-medium leading-none">
        Olivia Martin
      </p>
      <p className="text-sm text-muted-foreground">
        olivia.martin@email.com
      </p>
    </div>
    <div className="ml-auto font-medium">+₹1,999.00</div>
  </div>
  <div className="flex items-center gap-4">
    <Avatar className="hidden h-9 w-9 sm:flex">
      <AvatarImage src="/avatars/02.png" alt="Avatar" />
      <AvatarFallback>JL</AvatarFallback>
    </Avatar>
    <div className="grid gap-1">
      <p className="text-sm font-medium leading-none">
        Jackson Lee
      </p>
      <p className="text-sm text-muted-foreground">
        jackson.lee@email.com
      </p>
    </div>
    <div className="ml-auto font-medium">+₹39.00</div>
  </div>
  <div className="flex items-center gap-4">
    <Avatar className="hidden h-9 w-9 sm:flex">
      <AvatarImage src="/avatars/03.png" alt="Avatar" />
      <AvatarFallback>IN</AvatarFallback>
    </Avatar>
    <div className="grid gap-1">
      <p className="text-sm font-medium leading-none">
        Isabella Nguyen
      </p>
      <p className="text-sm text-muted-foreground">
        isabella.nguyen@email.com
      </p>
    </div>
    <div className="ml-auto font-medium">+₹299.00</div>
  </div>
  <div className="flex items-center gap-4">
    <Avatar className="hidden h-9 w-9 sm:flex">
      <AvatarImage src="/avatars/04.png" alt="Avatar" />
      <AvatarFallback>WK</AvatarFallback>
    </Avatar>
    <div className="grid gap-1">
      <p className="text-sm font-medium leading-none">
        William Kim
      </p>
      <p className="text-sm text-muted-foreground">
        will@email.com
      </p>
    </div>
    <div className="ml-auto font-medium">+₹99.00</div>
  </div>
  <div className="flex items-center gap-4">
    <Avatar className="hidden h-9 w-9 sm:flex">
      <AvatarImage src="/avatars/05.png" alt="Avatar" />
      <AvatarFallback>SD</AvatarFallback>
    </Avatar>
    <div className="grid gap-1">
      <p className="text-sm font-medium leading-none">
        Sofia Davis
      </p>
      <p className="text-sm text-muted-foreground">
        sofia.davis@email.com
      </p>
    </div>
    <div className="ml-auto font-medium">+₹39.00</div>
  </div>
</CardContent>
</Card> */}

