export interface Country {
  id: number;
  name: string;
}

export interface Operator {
  id: number;
  name: string;
}

export interface FallbackAdvertiser {
  id: number;
  name: string;
}

export interface Advertiser {
  id: string;
  name: string;
  capping: string;
  fallback_advertiser: FallbackAdvertiser | null;
  Country: Country;
  Operator: Operator;
  Used_Cap: number;
}

export interface Publisher {
  id: number;
  name: string;
  cap: number;
  block_rule: string;
  Used_Cap: number;
  Total_success_hits: number;
  Blocked: number;
}

export interface FormData {
  campaign_id: number;
  no_of_hits: number;
}
