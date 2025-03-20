import React from "react";
import { Publisher, Advertiser } from "@/types";
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
  dataCat: string;
  onFlush: () => void;
  onRefresh: () => void;
}

const DataTable = <T extends Advertiser | Publisher>({
  data,
  title,
  isLoading,
  dataCat,
  onFlush,
  onRefresh
}: DataTableProps<T>) => {


  // Fixed type predicates to use proper type guards
  const isAdvertiserData = dataCat == "advertisers";
  const isPublisherData = dataCat == "publishers";
  console.log("DataCat:", dataCat); // Log the data category to debug
  console.log("Data:", data); // Log the data to debug
  console.log(isAdvertiserData); // Log the loading
  console.log(isPublisherData); // Log the loading
  // Determine whether to render advertiser or publisher table
  const renderTable = () => {
    if (!Array.isArray(data) || data.length === 0) {
      return (
        <div className="p-8 text-center text-muted-foreground">
          <p>No data available</p>
        </div>
      );
    }

    console.log("Data:", data); // Log the data to debug

    if (isAdvertiserData) {
      return renderAdvertiserTable(data as Advertiser[]);
    } else if (isPublisherData) {
      return renderPublisherTable(data as Publisher[]);
    }

    return null;
  };

  const renderAdvertiserTable = (advertisers: Advertiser[]) => (
    <Table>
      <ShadcnTableHeader>
        <TableRow>
          <TableHead className="w-1/7">ID</TableHead>
          <TableHead className="w-1/7">Name</TableHead>
          <TableHead className="w-1/7">Capping</TableHead>
          <TableHead className="w-1/7">Used Cap</TableHead>
          <TableHead className="w-1/7">Country</TableHead>
          <TableHead className="w-1/7">Operator</TableHead>
          <TableHead className="w-1/7">Fallback Advertiser</TableHead>
        </TableRow>
      </ShadcnTableHeader>
      <TableBody>
        {advertisers.map((advertiser) => (
          <TableRow key={advertiser.id} className="group">
            <TableCell>{advertiser.id}</TableCell>
            <TableCell className="font-medium">{advertiser.name}</TableCell>
            <TableCell>{advertiser.capping}</TableCell>
            <TableCell>{advertiser.Used_Cap}</TableCell>
            <TableCell>{advertiser.Country.name}</TableCell>
            <TableCell>{advertiser.Operator.name}</TableCell>
            <TableCell>{advertiser.fallback_advertiser ? advertiser.fallback_advertiser.name : "None"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const renderPublisherTable = (publishers: Publisher[]) => (
    <Table>
      <ShadcnTableHeader>
        <TableRow>
          <TableHead className="w-1/7">ID</TableHead>
          <TableHead className="w-1/7">Name</TableHead>
          <TableHead className="w-1/7">Cap</TableHead>
          <TableHead className="w-1/7">Block Rule</TableHead>
          <TableHead className="w-1/7">Used Cap</TableHead>
          <TableHead className="w-1/7">Total Success Hits</TableHead>
          <TableHead className="w-1/7">Blocked</TableHead>
        </TableRow>
      </ShadcnTableHeader>
      <TableBody>
        {publishers.map((publisher) => (
          <TableRow key={publisher.id} className="group">
            <TableCell>{publisher.id}</TableCell>
            <TableCell className="font-medium">{publisher.name}</TableCell>
            <TableCell>{publisher.cap}</TableCell>
            <TableCell>{publisher.block_rule}</TableCell>
            <TableCell>{publisher.Used_Cap}</TableCell>
            <TableCell>{publisher.Total_success_hits}</TableCell>
            <TableCell>{publisher.Blocked}</TableCell>
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
      
      <div className="flex-1 overflow-y-scroll rounded-md border bg-background">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="flex flex-col items-center">
              <div className="h-5 w-5 rounded-full border-2 border-primary/30 border-t-primary animate-spin"></div>
              <p className="mt-2 text-sm text-muted-foreground">Loading data...</p>
            </div>
          </div>
        ) : (
          <ScrollArea className="h-[350px] overflow-y-scroll">
            {renderTable()}
          </ScrollArea>
        )}
      </div>
    </div>
  );
};

export default DataTable;
