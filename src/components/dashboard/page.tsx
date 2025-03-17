'use client';

import { DashboardProvider } from './state/dashboard.state';
import InfoTable from './ui/InfoTable';
import InfoBanner from './ui/InfoBanner';
import { useDashboard } from './state/dashboard.state';

// Import the InfoItem type from the InfoBanner component
type IconType = 'DollarSign' | 'Users' | 'CreditCard' | 'Activity';

type InfoItem = {
  title: string;
  icon: IconType;
  value: string;
  change: string;
};

// This component will be wrapped by the DashboardProvider
const DashboardContent = () => {
  const { overviewData, loading, error } = useDashboard();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse text-lg">Loading dashboard data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-50 text-red-500 p-4 rounded-md border border-red-200">
          {error}
        </div>
      </div>
    );
  }

  const infoData: InfoItem[] = [
    {
      title: 'Total Work Orders',
      icon: 'DollarSign',
      value: `₹ ${overviewData.amountDue + overviewData.amountReceived}`,
      change: 'Total value of all work orders',
    },
    {
      title: 'In Progress',
      icon: 'Users',
      value: overviewData.inProgress.toString(),
      change: 'Active work orders',
    },
    {
      title: 'At Laboratory',
      icon: 'CreditCard',
      value: overviewData.inLab.toString(),
      change: 'Orders in lab testing',
    },
    {
      title: 'Pending Payments',
      icon: 'Activity',
      value: `₹ ${overviewData.amountDue}`,
      change: 'Outstanding amount',
    },
  ];

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 py-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>
      
      <div className="space-y-8">
        <InfoBanner data={infoData} />
        
        <div className="w-full">
          <InfoTable />
        </div>
      </div>
    </div>
  );
};

export default function DashboardPage() {
  return (
    <DashboardProvider>
      <div className="min-h-screen bg-background">
        <DashboardContent />
      </div>
    </DashboardProvider>
  );
} 