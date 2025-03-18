'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter, MoreHorizontal, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useDashboard } from "../state/dashboard.state";
import { Project } from "../services/dashboard.service";
import { Input } from "@/components/ui/input";

export default function InfoTable() {
  const router = useRouter();
  const { projects } = useDashboard();
  const [statuses, setStatuses] = useState<string[]>([]);
  const [filter, setFilter] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("week");

  // Extract unique statuses from projects data
  useEffect(() => {
    if (projects && projects.length > 0) {
      const uniqueStatuses = Array.from(new Set(projects.map(project => project.status)))
        .filter(status => status) // Filter out any undefined or empty statuses
        .sort();
      setStatuses(uniqueStatuses);
      setFilter(uniqueStatuses); // Initially select all statuses
    }
  }, [projects]);

  const handleFilterChange = (status: string) => {
    setFilter(prev =>
      prev.includes(status)
        ? prev.filter(item => item !== status)
        : [...prev, status]
    );
  };

  const handleNavigation = (projectId: string) => {
    router.push(`/work/${projectId}`);
  };

  // Filter data based on status and search query
  const filteredData = projects
    .filter(item => filter.includes(item.status))
    .filter(item => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        (item.name && item.name.toLowerCase().includes(query)) ||
        (item.location && item.location.toLowerCase().includes(query))
      );
    });

  return (
    <div className="w-full">
      <Tabs defaultValue="week" className="w-full" onValueChange={(value) => setTimeRange(value as "week" | "month" | "year")}>
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search work orders..."
                className="pl-8 w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 gap-1">
                  <Filter className="h-4 w-4" />
                  <span className="sr-only sm:not-sr-only">Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
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
        </div>
        <TabsContent value={timeRange} className="mt-0">
          <Card className="border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle>Work Orders</CardTitle>
              <CardDescription>Recent work orders from your app.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {filteredData.length > 0 ? (
                  filteredData.map((item: Project) => (
                    <div 
                      key={item.id} 
                      className="flex items-center p-3 rounded-md hover:bg-muted transition-colors cursor-pointer"
                      onClick={() => handleNavigation(item.id)}
                    >
                      <div className="flex-1 space-y-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.location}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">{item.status}</span>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No work orders found with the selected filters</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 