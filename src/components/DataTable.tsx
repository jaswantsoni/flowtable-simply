
import React from "react";
import { Publisher, Advertiser } from "@/types";
import { formatCurrency, formatNumber, formatDate } from "@/lib/data";
import TableHeader from "./TableHeader";

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
  const isAdvertiserData = (item: T): item is Advertiser => {
    return "budget" in item;
  };

  const isPublisherData = (item: T): item is Publisher => {
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
    <table>
      <thead>
        <tr>
          <th>Advertiser</th>
          <th>Budget</th>
          <th>Spent</th>
          <th>Campaigns</th>
          <th>Status</th>
          <th>Last Updated</th>
        </tr>
      </thead>
      <tbody>
        {advertisers.map((advertiser) => (
          <tr key={advertiser.id} className="group">
            <td className="font-medium">{advertiser.name}</td>
            <td>{formatCurrency(advertiser.budget)}</td>
            <td>{formatCurrency(advertiser.spent)}</td>
            <td>{advertiser.campaigns}</td>
            <td>
              <span
                className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                  advertiser.status === "Active"
                    ? "bg-green-50 text-green-700"
                    : advertiser.status === "Paused"
                    ? "bg-amber-50 text-amber-700"
                    : "bg-blue-50 text-blue-700"
                }`}
              >
                {advertiser.status}
              </span>
            </td>
            <td className="text-muted-foreground">{formatDate(advertiser.lastUpdated)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderPublisherTable = (publishers: Publisher[]) => (
    <table>
      <thead>
        <tr>
          <th>Publisher</th>
          <th>Category</th>
          <th>Impressions</th>
          <th>Clicks</th>
          <th>Revenue</th>
          <th>Status</th>
          <th>Last Updated</th>
        </tr>
      </thead>
      <tbody>
        {publishers.map((publisher) => (
          <tr key={publisher.id} className="group">
            <td className="font-medium">{publisher.name}</td>
            <td>{publisher.category}</td>
            <td>{formatNumber(publisher.impressions)}</td>
            <td>{formatNumber(publisher.clicks)}</td>
            <td>{formatCurrency(publisher.revenue)}</td>
            <td>
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
            </td>
            <td className="text-muted-foreground">{formatDate(publisher.lastUpdated)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="space-y-3">
      <TableHeader
        title={title}
        onFlush={onFlush}
        onRefresh={onRefresh}
        isLoading={isLoading}
      />
      
      <div className="table-container">
        <div className="table-wrapper">
          {renderTable()}
        </div>
        
        {isLoading && (
          <div className="table-loading animate-fade-in">
            <div className="flex flex-col items-center">
              <div className="h-5 w-5 rounded-full border-2 border-primary/30 border-t-primary animate-spin"></div>
              <p className="mt-2 text-sm text-muted-foreground">Loading data...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataTable;
