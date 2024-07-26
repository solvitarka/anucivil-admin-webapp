"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
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
import HomeTable from "./HomeTable";

const statuses = ["reportRecieved", "Sampling In Process", "Action Required", "Quotation Accepted", "Sent To Lab", "reportShipped", "Quotation Sent", "Quotation Requested", "quotationReviewRequired", "reportReviewRequired"];

export default function InfoTable({data}: { data: any[] }) {
  const [filter, setFilter] = useState<string[]>(statuses);
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("week");

  const handleFilterChange = (status: string) => {
    setFilter(prev =>
      prev.includes(status)
        ? prev.filter(item => item !== status)
        : [...prev, status]
    );
  };

  const filteredData = data.filter(item => filter.includes(item.status));

  console.log("InfoTable data:", data); // Debug statement

  return (
    <div className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
      <Tabs defaultValue="week" className="xl:col-span-1" onValueChange={(value) => setTimeRange(value as "week" | "month" | "year")}>
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList> 
        </div>
        {["week", "month", "year"].map((range) => (
          <TabsContent key={range} value={range}>
            <Card>
              <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                  <CardTitle>Work Orders</CardTitle>
                  <CardDescription>
                    Recent work orders from your app.
                  </CardDescription>
                </div>
                <div className="ml-auto gap-1">
                  <DropdownMenu>
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
                      {statuses.map(status => (
                        <DropdownMenuCheckboxItem
                          key={status}
                          checked={filter.includes(status)}
                          onCheckedChange={() => handleFilterChange(status)}
                        >
                          {status}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <HomeTable data={filteredData} timeRange={timeRange} />
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}