import { useEffect } from "react";

const useWebSocket = (onMessageReceived: (message: any) => void) => {
  useEffect(() => {
    const WS_URL = import.meta.env.VITE_SOCKET_URL;
    const ws = new WebSocket(WS_URL);
    // console.log("WebSocket connecting to:", WS_URL);

    // ws.onopen = () => console.log("WebSocket connected");

    ws.onmessage = (event) => {
      console.log("WebSocket message received:", event.data);
      const message = JSON.parse(event.data);
      console.log("Parsed WebSocket message:", message);
      onMessageReceived(message);
    };

    ws.onerror = (error) => console.error("WebSocket error:", error);
    ws.onclose = () => console.log("WebSocket closed");

    return () => {
      ws.close(); // Clean up on unmount
    };
  }, [onMessageReceived]);
};

export default useWebSocket;
