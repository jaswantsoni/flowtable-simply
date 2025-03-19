import React, { useState, useEffect } from "react";
import DataTable from "@/components/DataTable";
import DataForm from "@/components/DataForm";
import { Advertiser, Publisher, FormData } from "@/types";
import { toast } from "sonner";
import ThemeToggle from "@/components/ThemeToggle";
import { fetchAdvertisers } from "@/types/api/advertiserAPI";
import { fetchPublishers } from "@/types/api/publisherAPI";
import { formSubmit } from "@/types/api/submitForm";

const Index = () => {
  const [advertisers, setAdvertisers] = useState<Advertiser[]>([]);
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [isAdvertisersLoading, setIsAdvertisersLoading] = useState(false);
  const [isPublishersLoading, setIsPublishersLoading] = useState(false);
  // const baseUrl = import.meta.env.VITE_BASE_URL as string;
  // console.log(baseUrl);
  // Load initial data
  useEffect(() => {
    loadAdvertisers();
    loadPublishers();
  }, []);

  // Fetch advertisers data from API
  const loadAdvertisers = async () => {
    setIsAdvertisersLoading(true);
    try {
      const data = await fetchAdvertisers();
      setAdvertisers(data.advertisers);
    } catch (error) {
      console.error("Failed to load advertisers", error);
    } finally {
      setIsAdvertisersLoading(false);
    }
  };

  // Fetch publishers data from API
  const loadPublishers = async () => {
    setIsPublishersLoading(true);
    try {
      const data = await fetchPublishers();
      setPublishers(data.publishers);
    } catch (error) {
      console.error("Failed to load publishers", error);
    } finally {
      setIsPublishersLoading(false);
    }
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
  const handleFormSubmit = async (data: FormData) => {
    console.log("Form data submitted:", data);
    await formSubmit(data);
    loadAdvertisers();
    loadPublishers();    
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <div className="max-w-[100vw] h-screen mx-auto px-4 py-6 flex flex-col">
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
          <div className="animate-slide-up h-full flex flex-col w-full " style={{ animationDelay: "100ms" }}>
            <DataTable
              title="Advertisers"
              data={advertisers}
              isLoading={isAdvertisersLoading}
              dataCat="advertisers"
              onFlush={flushAdvertisers}
              onRefresh={loadAdvertisers}

            />
          </div>

          <div className="animate-slide-up h-full flex flex-col" style={{ animationDelay: "200ms" }}>
            <DataTable
              title="Publishers"
              data={publishers}
              isLoading={isPublishersLoading}
              dataCat="publishers"
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
