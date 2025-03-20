import { FormData } from "..";
import apiClient from "./formClient";

export const formSubmit = async (campaign: Omit<FormData, 'id'>): Promise<any> => {
  const response = await apiClient.post(`/test_campaign/?campaign_id=${campaign.campaign_id}&no_of_hits=${campaign.no_of_hits}`, {}, {
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return response;
};