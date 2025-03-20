import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import useWebSocket from "./hooks/websocket";
import { useState } from "react";

const queryClient = new QueryClient();
interface Message {
  results: campaignDataType[];
  message: string;
}
type campaignDataType = {
  msisdn: string;
  transaction_id: string;
  status: string;
};

const App = () => {
  const [message, setMessage] = useState<Message|null>(null
  );
  useWebSocket((message: Message) => {
    console.log("WebSocket message received:", message);
    setMessage(message);
  });

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index message={message} setMessage={setMessage} />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

// export default App;
