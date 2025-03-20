import React, { useState, useEffect } from "react";
import DataTable from "@/components/DataTable";
import DataForm from "@/components/DataForm";
import { Advertiser, Publisher, FormData } from "@/types";
import { toast } from "sonner";
import ThemeToggle from "@/components/ThemeToggle";
import { fetchAdvertisers } from "@/types/api/advertiserAPI";
import { fetchPublishers } from "@/types/api/publisherAPI";
import { formSubmit } from "@/types/api/submitForm";
import { flushRedis } from "@/types/api/flushAPI";

const Index = () => {
  const [advertisers, setAdvertisers] = useState<Advertiser[]>([]);
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [isAdvertisersLoading, setIsAdvertisersLoading] = useState(false);
  const [isPublishersLoading, setIsPublishersLoading] = useState(false);
  // const baseUrl = import.meta.env.VITE_BASE_URL as string;
  // console.log(baseUrl);
  // Load initial data
  useEffect(() => {
    loadData();
    // loadPublishers();
  }, []);

  // Fetch advertisers data from API
  const loadData = async () => {
    setIsAdvertisersLoading(true);
    setIsPublishersLoading(true);
    try {
      const dataAd = await fetchAdvertisers();
      setAdvertisers(dataAd.advertisers);
      const dataPb = await fetchPublishers();
      setPublishers(dataPb.publishers);
    } catch (error) {
      console.error("Failed to load advertisers", error);
    } finally {
      setIsAdvertisersLoading(false);
      setIsPublishersLoading(false);
    }
  };

  // Fetch publishers data from API
  


  
  // Flush publishers data
  const flushData = async() => {
    setIsAdvertisersLoading(true);
    setIsPublishersLoading(true);
    await flushRedis()
    setTimeout(() => {
      setAdvertisers([]);
      setPublishers([]);
      setIsAdvertisersLoading(false);
      setIsPublishersLoading(false);
      toast.success("Advertisers data flushed successfully");
      toast.success("Publishers data flushed successfully");
    }, 500);
  };

  // Handle form submission
  const handleFormSubmit = async (data: FormData) => {
    console.log("Form data submitted:", data);
    await formSubmit(data);
    loadData();
    // loadPublishers();    
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <div className="max-w-[100vw] h-screen mx-auto px-4 py-6 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <div className="space-y-2 text-left animate-fade-in">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">In-App Testing Platform</h1>
            <p className="text-muted-foreground text-sm md:text-base">
              View and manage advertising and publishing data with interactive tables
            </p>
          </div>
          <ThemeToggle />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 max-h-[100%] overflow-y-hidden mb-4">
          <div className="flex-col w-full max-h-[100%] overflow-y-scroll " style={{ animationDelay: "100ms" }}>
            <DataTable
              title="Advertisers"
              data={advertisers}
              isLoading={isAdvertisersLoading}
              dataCat="advertisers"
              onFlush={flushData}
              onRefresh={loadData}

            />
          </div>

          <div className="flex-col w-full max-h-[100%] overflow-y-scroll" style={{ animationDelay: "200ms" }}>
            <DataTable
              title="Publishers"
              data={publishers}
              isLoading={isPublishersLoading}
              dataCat="publishers"
              onFlush={flushData}
              onRefresh={loadData}
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
