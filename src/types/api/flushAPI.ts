import { Advertiser } from "..";
import apiClient from "./apiClient";

export const flushRedis = async (): Promise<void> => {
  await apiClient.delete("/flush_redis/", {
    headers: {
      accept: "application/json",
    },
  });
};