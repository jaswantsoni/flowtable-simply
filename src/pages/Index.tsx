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
import useWebSocket from "@/hooks/websocket";

type campaignDataType = {
  msisdn: string;
  transaction_id: string;
  status: string;
};

interface IndexProps {
  message: Message | null;
  setMessage:React.Dispatch<React.SetStateAction<Message>>;
}

interface Message {
  results: campaignDataType[];
  message: string;
}

const Index: React.FC<IndexProps> = ({ message,setMessage }) => {
  const [advertisers, setAdvertisers] = useState<Advertiser[]>([]);
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [isAdvertisersLoading, setIsAdvertisersLoading] = useState(false);
  const [isPublishersLoading, setIsPublishersLoading] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  // const [message, setMessage] = useState<Message | null>(null);
  const [campaignData, setCampaignData] = useState<campaignDataType[] | undefined>();

  useEffect(() => {
    loadData();
  }, []);


  useEffect(() => {
    if (message) {
      console.log("Message:", message);
      toast.dismiss();
      setCampaignData(message.results);
      toast.message(`Campaign report: ${message.message}`, {
        closeButton: true,
        position: "top-right",
        onAutoClose: () => {
          setMessage(null);
          setHistoryOpen(true);
        },
        onDismiss: () => {
          setMessage(null);
          setHistoryOpen(true);
        },
      });
    }
  }, [message]);

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

  const flushData = async () => {
    setIsAdvertisersLoading(true);
    setIsPublishersLoading(true);
    await flushRedis();
    setTimeout(() => {
      setAdvertisers([]);
      setPublishers([]);
      setIsAdvertisersLoading(false);
      setIsPublishersLoading(false);
      toast.success("Advertisers data flushed successfully");
      toast.success("Publishers data flushed successfully");
    }, 500);
  };

  const handleFormSubmit = async (data: FormData) => {
    console.log("Form data submitted:", data);
    await formSubmit(data).then((res) => {
      if (res.status === 200) {
        toast.success(res.data.message, { duration: 5000 });
        loadData();
      } else {
        console.error("Failed to submit form data:", res.data.detail);
        toast.error(res.data.detail, { duration: 5000 });
      }
    });
  };

  const renderHistoryTable = () => {
    if (!campaignData || !Array.isArray(campaignData)) {
      return null;
    }

    return (
      <div className="max-h-[60vh] overflow-y-auto">
        <table className="min-w-full bg-background">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">MSISDN</th>
              <th className="py-2 px-4 border-b">Sent</th>
              <th className="py-2 px-4 border-b">Validate</th>
            </tr>
          </thead>
          <tbody>
            {campaignData?.map((item: campaignDataType, index: number) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{item.msisdn}</td>
                <td className="py-2 px-4 border-b text-center">
                  {item.status === "Sent" || item.status === "Validated"
                    ? "✔️"
                    : ""}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {item.status === "Validated" ? "✔️" : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {historyOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-background rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Campaign History</h2>
            {renderHistoryTable()}
            <button
              className="mt-4 px-4 py-2 bg-primary text-white rounded-lg"
              onClick={() => {setHistoryOpen(false); setCampaignData([])}}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div className="max-w-[100vw] h-screen mx-auto px-4 py-6 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <div className="space-y-2 text-left animate-fade-in">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
              In-App Testing Platform
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              View and manage advertising and publishing data with interactive
              tables
            </p>
          </div>
          <ThemeToggle />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 max-h-[100%] overflow-y-hidden mb-4">
          <div className="flex-col w-full max-h-[100%] overflow-y-scroll">
            <DataTable
              title="Advertisers"
              data={advertisers}
              isLoading={isAdvertisersLoading}
              dataCat="advertisers"
              onFlush={flushData}
              onRefresh={loadData}
            />
          </div>

          <div className="flex-col w-full max-h-[100%] overflow-y-scroll">
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

        <div className="animate-slide-up">
          <DataForm
            onSubmit={handleFormSubmit}
            onHistory={() => setHistoryOpen(true)}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
