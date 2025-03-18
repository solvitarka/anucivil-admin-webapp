import React from 'react';
import { Users, DollarSign, CreditCard, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type IconType = 'DollarSign' | 'Users' | 'CreditCard' | 'Activity';

type InfoItem = {
  title: string;
  icon: IconType;
  value: string;
  change: string;
};

interface InfoBannerProps {
  data: InfoItem[];
}

const iconColors = {
  DollarSign: "text-green-500",
  Users: "text-blue-500",
  CreditCard: "text-purple-500",
  Activity: "text-orange-500",
};

const bgColors = {
  DollarSign: "bg-green-50 dark:bg-green-900/20",
  Users: "bg-blue-50 dark:bg-blue-900/20",
  CreditCard: "bg-purple-50 dark:bg-purple-900/20",
  Activity: "bg-orange-50 dark:bg-orange-900/20",
};

const icons = {
  DollarSign: (className: string) => <DollarSign className={className} />,
  Users: (className: string) => <Users className={className} />,
  CreditCard: (className: string) => <CreditCard className={className} />,
  Activity: (className: string) => <Activity className={className} />,
};

const InfoBanner: React.FC<InfoBannerProps> = ({ data }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 w-full">
      {data.map((item, index) => (
        <Card key={index} className="border shadow-sm overflow-hidden">
          <div className="flex h-full">
            <div className={`w-2 ${bgColors[item.icon]} ${iconColors[item.icon]}`}></div>
            <div className="flex-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                <div className={`p-2 rounded-full ${bgColors[item.icon]}`}>
                  {icons[item.icon](`h-5 w-5 ${iconColors[item.icon]}`)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold tracking-tight">{item.value}</div>
                {item.change && (
                  <p className="text-xs text-muted-foreground mt-1">{item.change}</p>
                )}
              </CardContent>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default InfoBanner; 