import { Publisher } from "..";
import apiClient from "./apiClient";


export const fetchPublishers = async (): Promise<{publishers:Publisher[]}> => {
  const response = await apiClient.get("/publishers", {
    headers: {
      accept: "application/json",
    },
  });
  return response.data;
};