
import { Advertiser, Publisher } from "@/types";

// Sample data for advertisers
export const advertisers: Advertiser[] = [
  {
    id: "adv-001",
    name: "TechVision Inc.",
    budget: 50000,
    spent: 12350,
    campaigns: 3,
    status: "Active",
    lastUpdated: "2023-06-15T10:30:00"
  },
  {
    id: "adv-002",
    name: "Global Media Group",
    budget: 125000,
    spent: 98760,
    campaigns: 8,
    status: "Active",
    lastUpdated: "2023-06-14T09:45:00"
  },
  {
    id: "adv-003",
    name: "Nexus Brands",
    budget: 75000,
    spent: 75000,
    campaigns: 5,
    status: "Completed",
    lastUpdated: "2023-06-10T14:20:00"
  },
  {
    id: "adv-004",
    name: "Stellar Marketing",
    budget: 30000,
    spent: 4500,
    campaigns: 2,
    status: "Paused",
    lastUpdated: "2023-06-13T16:15:00"
  },
  {
    id: "adv-005",
    name: "Fusion Advertising",
    budget: 85000,
    spent: 32400,
    campaigns: 4,
    status: "Active",
    lastUpdated: "2023-06-15T11:20:00"
  },
  {
    id: "adv-006",
    name: "Pinnacle Promotions",
    budget: 60000,
    spent: 28900,
    campaigns: 3,
    status: "Active",
    lastUpdated: "2023-06-14T13:40:00"
  },
  {
    id: "adv-007",
    name: "Horizon Digital",
    budget: 110000,
    spent: 45600,
    campaigns: 6,
    status: "Active",
    lastUpdated: "2023-06-15T09:10:00"
  },
  {
    id: "adv-008",
    name: "Azure Campaigns",
    budget: 40000,
    spent: 40000,
    campaigns: 2,
    status: "Completed",
    lastUpdated: "2023-06-11T10:30:00"
  },
  {
    id: "adv-009",
    name: "Vertex Media",
    budget: 95000,
    spent: 0,
    campaigns: 5,
    status: "Paused",
    lastUpdated: "2023-06-12T15:45:00"
  },
  {
    id: "adv-010",
    name: "Pulse Advertising",
    budget: 70000,
    spent: 27800,
    campaigns: 4,
    status: "Active",
    lastUpdated: "2023-06-15T08:30:00"
  }
];

// Sample data for publishers
export const publishers: Publisher[] = [
  {
    id: "pub-001",
    name: "Tech News Daily",
    category: "Technology",
    impressions: 1250000,
    clicks: 42500,
    revenue: 21250,
    status: "Active",
    lastUpdated: "2023-06-15T10:30:00"
  },
  {
    id: "pub-002",
    name: "Lifestyle Magazine",
    category: "Lifestyle",
    impressions: 980000,
    clicks: 31200,
    revenue: 15600,
    status: "Active",
    lastUpdated: "2023-06-14T09:45:00"
  },
  {
    id: "pub-003",
    name: "Sports Central",
    category: "Sports",
    impressions: 1450000,
    clicks: 58000,
    revenue: 29000,
    status: "Active",
    lastUpdated: "2023-06-15T14:20:00"
  },
  {
    id: "pub-004",
    name: "Financial Times",
    category: "Finance",
    impressions: 750000,
    clicks: 22500,
    revenue: 11250,
    status: "Suspended",
    lastUpdated: "2023-06-13T16:15:00"
  },
  {
    id: "pub-005",
    name: "Travel Explorer",
    category: "Travel",
    impressions: 620000,
    clicks: 18600,
    revenue: 9300,
    status: "Active",
    lastUpdated: "2023-06-15T11:20:00"
  },
  {
    id: "pub-006",
    name: "Health & Wellness",
    category: "Health",
    impressions: 890000,
    clicks: 26700,
    revenue: 13350,
    status: "Active",
    lastUpdated: "2023-06-14T13:40:00"
  },
  {
    id: "pub-007",
    name: "Movie Reviews",
    category: "Entertainment",
    impressions: 1100000,
    clicks: 33000,
    revenue: 16500,
    status: "Active",
    lastUpdated: "2023-06-15T09:10:00"
  },
  {
    id: "pub-008",
    name: "Gaming Portal",
    category: "Gaming",
    impressions: 1300000,
    clicks: 52000,
    revenue: 26000,
    status: "Pending",
    lastUpdated: "2023-06-14T10:30:00"
  },
  {
    id: "pub-009",
    name: "Food & Recipes",
    category: "Food",
    impressions: 720000,
    clicks: 21600,
    revenue: 10800,
    status: "Active",
    lastUpdated: "2023-06-15T15:45:00"
  },
  {
    id: "pub-010",
    name: "Science Today",
    category: "Science",
    impressions: 580000,
    clicks: 17400,
    revenue: 8700,
    status: "Active",
    lastUpdated: "2023-06-15T08:30:00"
  }
];

// Get formatted date
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

// Format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Format number with commas
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};
