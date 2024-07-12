"use client"; // Add this directive at the top

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, ListFilter, File } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import HomeTable from "./HomeTable"; // Import the new TableComponent

const data = [
  {
    customer: "Liam Johnson",
    email: "liam@example.com",
    type: "Sale",
    status: "Fulfilled",
    date: "2023-06-23",
    amount: "$250.00",
  },
  {
    customer: "Olivia Smith",
    email: "olivia@example.com",
    type: "Refund",
    status: "In Progress",
    date: "2023-06-24",
    amount: "$150.00",
  },
  {
    customer: "Noah Williams",
    email: "noah@example.com",
    type: "Subscription",
    status: "Fulfilled",
    date: "2023-06-25",
    amount: "$350.00",
  },
  {
    customer: "Liam Johnson",
    email: "liam@example.com",
    type: "Sale",
    status: "Fulfilled",
    date: "2023-06-23",
    amount: "$250.00",
  },

  {
    customer: "Noah Williams",
    email: "noah@example.com",
    type: "Subscription",
    status: "Payment Pending",
    date: "2023-06-25",
    amount: "$350.00",
  },
  {
    customer: "Noah Williams",
    email: "noah@example.com",
    type: "Subscription",
    status: "In Progress",
    date: "2023-06-25",
    amount: "$350.00",
  },
   {
    customer: "Noah Williams",
    email: "noah@example.com",
    type: "Subscription",
    status: "Fulfilled",
    date: "2023-06-25",
    amount: "$350.00",
  },
  {
    customer: "Liam Johnson",
    email: "liam@example.com",
    type: "Sale",
    status: "Fulfilled",
    date: "2023-06-23",
    amount: "$250.00",
  },

  {
    customer: "Noah Williams",
    email: "noah@example.com",
    type: "Subscription",
    status: "Payment Pending",
    date: "2023-06-25",
    amount: "$350.00",
  },
  {
    customer: "Noah Williams",
    email: "noah@example.com",
    type: "Subscription",
    status: "In Progress",
    date: "2023-06-25",
    amount: "$350.00",
  },
  {
    customer: "Emma Brown",
    email: "emma@example.com",
    type: "Sale",
    status: "At Laboratory",
    date: "2023-06-26",
    amount: "$450.00",
  },
];

export default function InfoTable() {
  const [filter, setFilter] = useState<string[]>(["Fulfilled", "Declined","In Progress","At Laboratory","Payment Pending"]);

  const filteredData = data.filter(item => filter.includes(item.status));

  const handleFilterChange = (status: string) => {
    setFilter(prev =>
      prev.includes(status)
        ? prev.filter(item => item !== status)
        : [...prev, status]
    );
  };

  return (
    <div className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
      <Tabs defaultValue="week" className="xl:col-span-1">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList> 
        </div>
        <TabsContent value="week">
          <Card>
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Work Orders</CardTitle>
                <CardDescription>
                  Recent work orders from your app.
                </CardDescription>
              </div>
              <div className="ml-auto gap-1">
                <DropdownMenu >
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 gap-1 text-sm"
                >
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only">Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {["Fulfilled", "Declined","In Progress","At Laboratory","Payment Pending"].map(status => (
                  <DropdownMenuCheckboxItem
                    key={status}
                    checked={filter.includes(status)}
                    onCheckedChange={() => handleFilterChange(status)}
                  >
                    {status}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu></div>
             
            </CardHeader>
            <CardContent>
              <HomeTable data={filteredData} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="month">
          <Card>
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Work Orders</CardTitle>
                <CardDescription>
                  Recent work orders from your app.
                </CardDescription>
              </div>
             <div className="ml-auto gap-1">
                <DropdownMenu >
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 gap-1 text-sm"
                >
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only">Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {["Fulfilled", "Declined","In Progress","At Laboratory","Payment Pending"].map(status => (
                  <DropdownMenuCheckboxItem
                    key={status}
                    checked={filter.includes(status)}
                    onCheckedChange={() => handleFilterChange(status)}
                  >
                    {status}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu></div>
            </CardHeader>
            <CardContent>
              <HomeTable data={filteredData} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
