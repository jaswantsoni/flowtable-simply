
import React, { useState, useEffect } from "react";
import DataTable from "@/components/DataTable";
import DataForm from "@/components/DataForm";
import { Advertiser, Publisher, FormData } from "@/types";
import { advertisers as initialAdvertisers, publishers as initialPublishers } from "@/lib/data";
import { toast } from "sonner";
import ThemeToggle from "@/components/ThemeToggle";

const Index = () => {
  const [advertisers, setAdvertisers] = useState<Advertiser[]>([]);
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [isAdvertisersLoading, setIsAdvertisersLoading] = useState(false);
  const [isPublishersLoading, setIsPublishersLoading] = useState(false);

  // Load initial data
  useEffect(() => {
    loadAdvertisers();
    loadPublishers();
  }, []);

  // Simulate loading advertisers data
  const loadAdvertisers = () => {
    setIsAdvertisersLoading(true);
    setTimeout(() => {
      setAdvertisers([...initialAdvertisers]);
      setIsAdvertisersLoading(false);
    }, 800);
  };

  // Simulate loading publishers data
  const loadPublishers = () => {
    setIsPublishersLoading(true);
    setTimeout(() => {
      setPublishers([...initialPublishers]);
      setIsPublishersLoading(false);
    }, 1200);
  };

  // Flush advertisers data
  const flushAdvertisers = () => {
    setIsAdvertisersLoading(true);
    setTimeout(() => {
      setAdvertisers([]);
      setIsAdvertisersLoading(false);
      toast.success("Advertisers data flushed successfully");
    }, 500);
  };

  // Flush publishers data
  const flushPublishers = () => {
    setIsPublishersLoading(true);
    setTimeout(() => {
      setPublishers([]);
      setIsPublishersLoading(false);
      toast.success("Publishers data flushed successfully");
    }, 500);
  };

  // Handle form submission
  const handleFormSubmit = (data: FormData) => {
    console.log("Form data submitted:", data);
    
    // In a real app, you would use this data to update the tables
    // This is just a simulation for demonstration purposes
    if (data.campaignId.startsWith("adv")) {
      // Update advertiser data (simulated)
      setIsAdvertisersLoading(true);
      setTimeout(() => {
        // Just reload the data for demonstration
        loadAdvertisers();
      }, 800);
    } else if (data.campaignId.startsWith("pub")) {
      // Update publisher data (simulated)
      setIsPublishersLoading(true);
      setTimeout(() => {
        // Just reload the data for demonstration
        loadPublishers();
      }, 800);
    } else {
      // If the ID doesn't start with adv or pub, update both (simulated)
      setIsAdvertisersLoading(true);
      setIsPublishersLoading(true);
      setTimeout(() => {
        loadAdvertisers();
        loadPublishers();
      }, 800);
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <div className="max-w-[1440px] h-screen mx-auto px-4 py-6 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <div className="space-y-2 text-left animate-fade-in">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Data Flow Tables</h1>
            <p className="text-muted-foreground text-sm md:text-base">
              View and manage advertising and publishing data with interactive tables
            </p>
          </div>
          <ThemeToggle />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 overflow-hidden mb-4">
          <div className="animate-slide-up h-full flex flex-col" style={{ animationDelay: "100ms" }}>
            <DataTable
              title="Advertisers"
              data={advertisers}
              isLoading={isAdvertisersLoading}
              onFlush={flushAdvertisers}
              onRefresh={loadAdvertisers}
            />
          </div>

          <div className="animate-slide-up h-full flex flex-col" style={{ animationDelay: "200ms" }}>
            <DataTable
              title="Publishers"
              data={publishers}
              isLoading={isPublishersLoading}
              onFlush={flushPublishers}
              onRefresh={loadPublishers}
            />
          </div>
        </div>

        <div className="animate-slide-up" style={{ animationDelay: "300ms" }}>
          <DataForm onSubmit={handleFormSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Index;
