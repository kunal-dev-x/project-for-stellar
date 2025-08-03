export interface Campaign {
  id: number;
  title: string;
  description: string;
  category: string;
  raised: number;
  goal: number;
  beneficiary: string;
  verified: boolean;
  image: string;
  milestones: {
    id: number;
    title: string;
    status: 'Complete' | 'Under Review' | 'Pending';
    date: string;
  }[];
}

export interface User {
  name: string;
  email: string;
  verified: boolean;
  totalDonated: number;
  campaignsSupported: number;
  impactScore: number;
}

export interface Donation {
  id: number;
  campaignId: number;
  amount: number;
  date: string;
}
