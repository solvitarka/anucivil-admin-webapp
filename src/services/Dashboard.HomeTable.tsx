// src/services/Dashboard.HomeTable.tsx
import { useState, useEffect } from "react";
import { doc, getDoc, DocumentReference } from "firebase/firestore";
import { db } from "../lib/firebase/firebaseConfig";
import { ColumnDef, SortingState, ColumnFiltersState, VisibilityState } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

export interface Update {
  date: string;
  id: number;
  title: string;
}

export interface TableData {
  id: string;
  name: string;
  location: string;
  updates: Update[];
  paymentReceived: number;
  userID: DocumentReference;
  status: string;
}

export const fetchUserName = async (userRef: DocumentReference): Promise<string> => {
  try {
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return userSnap.data()?.name || "Unknown User";
    } else {
      return "Unknown User";
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return "Unknown User";
  }
};

export const useHomeTableData = (initialData: TableData[]) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [userNames, setUserNames] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadUserNames = async () => {
      const names: Record<string, string> = {};
      for (const project of initialData) {
        const name = await fetchUserName(project.userID);
        names[project.userID.id] = name;
      }
      setUserNames(names);
    };

    loadUserNames();
  }, [initialData]);

  return {
    sorting,
    setSorting,
    columnFilters,
    setColumnFilters,
    columnVisibility,
    setColumnVisibility,
    userNames,
  };
};

export const createColumns = (userNames: Record<string, string>, handleNavigation: (projectId: string) => void): ColumnDef<TableData>[] => {
  return [
    {
      accessorKey: "name",
      header: "Project Name",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }) => row.getValue("location"),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge
          className="text-xs"
          variant={row.getValue("status") === "Fulfilled" ? "secondary" : "outline"}
        >
          {row.getValue("status")}
        </Badge>
      ),
    },
    {
      accessorKey: "userID",
      header: "User",
      cell: ({ row }) => {
        const userID = row.getValue("userID") as DocumentReference;
        return userNames[userID.id] ?? "Loading...";
      },
    },
    {
      accessorKey: "updates",
      header: "Latest Update",
      cell: ({ row }) => {
        const updates = row.getValue("updates") as Update[];
        return updates.length > 0 ? updates[updates.length-1].date : "No updates";
      },
    },
    {
      accessorKey: "paymentReceived",
      header: "Payment Received",
      cell: ({ row }) => row.getValue("paymentReceived"),
    },
    {
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) => {
        const item = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleNavigation(item.id)}>
                View work order
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};