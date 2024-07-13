// src/components/dashboard/InfoTable.tsx

"use client"; // Add this directive at the top

import { useState } from "react";
import { ListFilter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const statuses = ["reportRecieved"
, "Sampling In Process", "Action Required", "Quotation Accepted", "Sent To Lab","reportShipped","Quotation Sent" ,"Quotation Requested","quotationReviewRequired","reportReviewRequired" ];

export default function InfoTable({ data }: { data: any[] }) {
  const [filter, setFilter] = useState<string[]>(statuses);

  const filteredData = data.filter(item => filter.includes(item.status));

  const handleFilterChange = (status: string) => {
    setFilter(prev =>
      prev.includes(status)
        ? prev.filter(item => item !== status)
        : [...prev, status]
    );
  };

  console.log("InfoTable data:", data); // Debug statement

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
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Projects Overview
              </CardTitle>
              <div className="flex items-center gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button className="ml-auto p-2" variant="outline" size="icon">
                      <ListFilter className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[150px]">
                    <DropdownMenuLabel>Filter Status</DropdownMenuLabel>
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
              <div className="space-y-4">
                {filteredData.map((project) => (
                  <div key={project.id} className="flex items-center">
                    <div className="w-1/2">
                      <p className="text-sm font-medium leading-none">{project.name}</p>
                      <p className="text-sm text-muted-foreground">{project.location}</p>
                    </div>
                    <div className="ml-auto text-right">
                      <p className="text-sm font-medium leading-none">{project.status}</p>
                    </div>
                  </div>
                ))}
                {filteredData.length === 0 && <p>No projects match the selected filter.</p>} {/* Message for no data */}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="month">...</TabsContent>
        <TabsContent value="year">...</TabsContent>
      </Tabs>
    </div>
  );
}
