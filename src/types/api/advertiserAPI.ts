import { Advertiser } from "..";
import apiClient from "./apiClient";


export const fetchAdvertisers = async (): Promise<{advertisers:Advertiser[]}> => {
  const response = await apiClient.get("/advertisers", {
    headers: {
      accept: "application/json",
    },
  });
  return response.data;
};