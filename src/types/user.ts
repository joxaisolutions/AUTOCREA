export interface User {
  id: string;
  email: string;
  name?: string;
  imageUrl?: string;
  plan: string;
  tokensUsed: number;
  tokensLimit: number;
  projectsCount: number;
  createdAt: number;
  updatedAt: number;
}

export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  clerkSubscriptionId?: string;
  status: 'active' | 'canceled' | 'past_due' | 'trialing';
  currentPeriodStart: number;
  currentPeriodEnd: number;
  cancelAtPeriodEnd: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface TokenUsage {
  userId: string;
  month: string;
  tokensUsed: number;
  tokensLimit: number;
  generationsCount: number;
  lastGenerationAt?: number;
}
