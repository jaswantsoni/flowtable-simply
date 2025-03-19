
import React from "react";
import { Publisher, Advertiser } from "@/types";
import { formatCurrency, formatNumber } from "@/lib/data";
import TableHeader from "./TableHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
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
        <div className="p-8 text-center text-muted-foreground">
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
          <TableHead className="w-1/4">ID</TableHead>
          <TableHead className="w-1/4">Name</TableHead>
          <TableHead className="w-1/4">Capping</TableHead>
          <TableHead className="w-1/4">Used Capping</TableHead>
        </TableRow>
      </ShadcnTableHeader>
      <TableBody>
        {advertisers.length > 0 ? (
          advertisers.map((advertiser) => (
            <TableRow key={advertiser.id} className="group">
              <TableCell>{advertiser.id}</TableCell>
              <TableCell className="font-medium">{advertiser.name}</TableCell>
              <TableCell>{formatCurrency(advertiser.budget)}</TableCell>
              <TableCell>{formatCurrency(advertiser.spent)}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={4} className="h-24 text-center">
              No advertisers available
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );

  const renderPublisherTable = (publishers: Publisher[]) => (
    <Table>
      <ShadcnTableHeader>
        <TableRow>
          <TableHead className="w-[12%]">ID</TableHead>
          <TableHead className="w-[16%]">Name</TableHead>
          <TableHead className="w-[12%]">Cap</TableHead>
          <TableHead className="w-[12%]">Block Rule</TableHead>
          <TableHead className="w-[12%]">Used Cap</TableHead>
          <TableHead className="w-[16%]">Total Success Hits</TableHead>
          <TableHead className="w-[12%]">Blocked</TableHead>
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
                    ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    : publisher.status === "Pending"
                    ? "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                    : "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400"
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
    <div className="space-y-3 h-full flex flex-col">
      <TableHeader
        title={title}
        onFlush={onFlush}
        onRefresh={onRefresh}
        isLoading={isLoading}
      />
      
      <div className="flex-1 overflow-hidden rounded-md border bg-background">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="flex flex-col items-center">
              <div className="h-5 w-5 rounded-full border-2 border-primary/30 border-t-primary animate-spin"></div>
              <p className="mt-2 text-sm text-muted-foreground">Loading data...</p>
            </div>
          </div>
        ) : (
          <ScrollArea className="h-[350px]">
            {renderTable()}
          </ScrollArea>
        )}
      </div>
    </div>
  );
};

export default DataTable;
