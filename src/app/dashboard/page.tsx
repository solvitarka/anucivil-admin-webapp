import Link from "next/link";
import { Users, CircleUser, Home, LineChart, Menu, Package,DollarSign,CreditCard, Package2,Activity, Search, ShoppingCart, Pickaxe } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import SideNav from "@/components/dashboard/sidenav";
import InfoBanner from "@/components/dashboard/InfoBanner";
import InfoTable from "@/components/dashboard/InfoTable";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

const Dashboard: React.FC = () => {
  const infoData: { title: string; icon: 'DollarSign' | 'Users' | 'CreditCard' | 'Activity'; value: string; change: string; }[] = [
    {
      title: 'Total Work Orders',
      icon: 'DollarSign',
      value: '₹45,231.89',
      change: '+20.1% from last month',
    },
    {
      title: 'In Progress',
      icon: 'Users',
      value: '2350',
      change: '+180.1% from last month',
    },
    {
      title: 'At Laboratory',
      icon: 'CreditCard',
      value: '12',
      change: '+19% from last month',
    },
    {
      title: 'Pending Payments',
      icon: 'Activity',
      value: '573',
      change: '+201 since last hour',
    },
  ];

  return (
    <div>
     
 
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <InfoBanner  data={infoData}/>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
      <InfoTable/>
      <Card x-chunk="dashboard-01-chunk-5">
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
                <div className="ml-auto font-medium">+$1,999.00</div>
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
                <div className="ml-auto font-medium">+$39.00</div>
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
                <div className="ml-auto font-medium">+$299.00</div>
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
                <div className="ml-auto font-medium">+$99.00</div>
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
                <div className="ml-auto font-medium">+$39.00</div>
              </div>
            </CardContent>
          </Card>
      </div>
      </main>
      </div>

  );
}
export default Dashboard;