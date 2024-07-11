import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TableComponentProps {
  data: {
    customer: string;
    email: string;
    type: string;
    status: string;
    date: string;
    amount: string;
  }[];
}

const HomeTable: React.FC<TableComponentProps> = ({ data }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead className="hidden sm:table-cell">Type</TableHead>
          <TableHead className="hidden sm:table-cell">Status</TableHead>
          <TableHead className="hidden md:table-cell">Date</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index} className={index % 2 ? "bg-accent" : ""}>
            <TableCell>
              <div className="font-medium">{item.customer}</div>
              <div className="hidden text-sm text-muted-foreground md:inline">
                {item.email}
              </div>
            </TableCell>
            <TableCell className="hidden sm:table-cell">{item.type}</TableCell>
            <TableCell className="hidden sm:table-cell">
              <Badge className="text-xs" variant={item.status === "Fulfilled" ? "secondary" : "outline"}>
                {item.status}
              </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">{item.date}</TableCell>
            <TableCell className="text-right">{item.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default HomeTable;
