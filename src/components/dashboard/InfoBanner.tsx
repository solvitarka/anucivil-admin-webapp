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

const icons = {
  DollarSign: <DollarSign className="h-4 w-4 text-muted-foreground" />,
  Users: <Users className="h-4 w-4 text-muted-foreground" />,
  CreditCard: <CreditCard className="h-4 w-4 text-muted-foreground" />,
  Activity: <Activity className="h-4 w-4 text-muted-foreground" />,
};

const InfoBanner: React.FC<InfoBannerProps> = ({ data }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      {data.map((item, index) => (
        <Card key={index} x-chunk={`dashboard-01-chunk-${index}`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
            {icons[item.icon]}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
            <p className="text-xs text-muted-foreground">{item.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default InfoBanner;
