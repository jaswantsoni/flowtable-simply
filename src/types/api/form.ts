import apiClient from "./formClient";


export const startCampaign = async (form:Omit<FormData,'id'>): Promise<[FormData]> => {
  const response = await apiClient.post("/test_campaign/", form, {
    headers: {
      accept: "application/json",
    },
  });
  return response.data;
};