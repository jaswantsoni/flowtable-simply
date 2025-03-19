
export interface Advertiser {
  id: string;
  name: string;
  budget: number;
  spent: number;
  campaigns: number;
  status: 'Active' | 'Paused' | 'Completed';
  lastUpdated: string;
}

export interface Publisher {
  id: string;
  name: string;
  category: string;
  impressions: number;
  clicks: number;
  revenue: number;
  status: 'Active' | 'Pending' | 'Suspended';
  lastUpdated: string;
}

export interface FormData {
  campaignId: string;
  hits: number;
}
