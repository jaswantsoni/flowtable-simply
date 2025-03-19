
import React from "react";
import { Publisher, Advertiser } from "@/types";
import { formatCurrency, formatNumber, formatDate } from "@/lib/data";
import TableHeader from "./TableHeader";
import {
  Table,
  TableHeader as ShadcnTableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from "@/components/ui/table";

interface DataTableProps<T> {
  data: T[];
  title: string;
  isLoading: boolean;
  onFlush: () => void;
  onRefresh: () => void;
}

const DataTable = <T extends Advertiser | Publisher>({
  data,
  title,
  isLoading,
  onFlush,
  onRefresh
}: DataTableProps<T>) => {
  // Fixed type predicates to use proper type guards
  const isAdvertiserData = (item: any): item is Advertiser => {
    return "budget" in item;
  };

  const isPublisherData = (item: any): item is Publisher => {
    return "impressions" in item;
  };

  // Determine whether to render advertiser or publisher table
  const renderTable = () => {
    if (data.length === 0) {
      return (
        <div className="p-12 text-center text-muted-foreground">
          <p>No data available</p>
        </div>
      );
    }

    if (isAdvertiserData(data[0])) {
      return renderAdvertiserTable(data as Advertiser[]);
    } else if (isPublisherData(data[0])) {
      return renderPublisherTable(data as Publisher[]);
    }

    return null;
  };

  const renderAdvertiserTable = (advertisers: Advertiser[]) => (
    <Table>
      <ShadcnTableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Capping</TableHead>
          <TableHead>Used Capping</TableHead>
        </TableRow>
      </ShadcnTableHeader>
      <TableBody>
        {advertisers.map((advertiser) => (
          <TableRow key={advertiser.id} className="group">
            <TableCell>{advertiser.id}</TableCell>
            <TableCell className="font-medium">{advertiser.name}</TableCell>
            <TableCell>{formatCurrency(advertiser.budget)}</TableCell>
            <TableCell>{formatCurrency(advertiser.spent)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const renderPublisherTable = (publishers: Publisher[]) => (
    <Table>
      <ShadcnTableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Cap</TableHead>
          <TableHead>Block Rule</TableHead>
          <TableHead>Used Cap</TableHead>
          <TableHead>Total Success Hits</TableHead>
          <TableHead>Blocked</TableHead>
        </TableRow>
      </ShadcnTableHeader>
      <TableBody>
        {publishers.map((publisher) => (
          <TableRow key={publisher.id} className="group">
            <TableCell>{publisher.id}</TableCell>
            <TableCell className="font-medium">{publisher.name}</TableCell>
            <TableCell>{formatNumber(publisher.impressions)}</TableCell>
            <TableCell>{publisher.category}</TableCell>
            <TableCell>{formatNumber(publisher.clicks)}</TableCell>
            <TableCell>{formatCurrency(publisher.revenue)}</TableCell>
            <TableCell>
              <span
                className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                  publisher.status === "Active"
                    ? "bg-green-50 text-green-700"
                    : publisher.status === "Pending"
                    ? "bg-amber-50 text-amber-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {publisher.status}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="space-y-3">
      <TableHeader
        title={title}
        onFlush={onFlush}
        onRefresh={onRefresh}
        isLoading={isLoading}
      />
      
      <div className="relative overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="flex flex-col items-center">
              <div className="h-5 w-5 rounded-full border-2 border-primary/30 border-t-primary animate-spin"></div>
              <p className="mt-2 text-sm text-muted-foreground">Loading data...</p>
            </div>
          </div>
        ) : (
          <div className="bg-background rounded-md border">
            {renderTable()}
          </div>
        )}
      </div>
    </div>
  );
};

export default DataTable;
