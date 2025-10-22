export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  tokens: number;
  projects: number | 'unlimited';
  features: string[];
  popular?: boolean;
  stripePriceId?: string;
}

export const PLANS: Record<string, Plan> = {
  free: {
    id: 'free',
    name: 'Free Trial',
    description: 'Perfecto para probar',
    price: 0,
    currency: 'USD',
    interval: 'month',
    tokens: 100,
    projects: 1,
    features: [
      '100 tokens gratis',
      '1 proyecto',
      'Modelo JoxCoder',
      'Preview en tiempo real',
      'Soporte comunitario'
    ],
  },
  
  creator: {
    id: 'creator',
    name: 'Creator',
    description: 'Para desarrolladores',
    price: 29,
    currency: 'USD',
    interval: 'month',
    tokens: 10000,
    projects: 5,
    popular: true,
    features: [
      '10,000 tokens/mes',
      '5 proyectos',
      'Modelo JoxCoder',
      'Deploy automático',
      'Templates premium',
      'Git automático',
      'Soporte prioritario'
    ],
    stripePriceId: process.env.STRIPE_CREATOR_PRICE_ID,
  },
  
  professional: {
    id: 'professional',
    name: 'Professional',
    description: 'Para equipos',
    price: 79,
    currency: 'USD',
    interval: 'month',
    tokens: 30000,
    projects: 20,
    features: [
      '30,000 tokens/mes',
      '20 proyectos',
      'Modelo JoxCoder',
      'API access',
      'Colaboración en equipo',
      'Analytics avanzados',
      'Soporte dedicado',
      'SLA garantizado'
    ],
    stripePriceId: process.env.STRIPE_PRO_PRICE_ID,
  },
  
  business: {
    id: 'business',
    name: 'Business',
    description: 'Para empresas',
    price: 199,
    currency: 'USD',
    interval: 'month',
    tokens: 100000,
    projects: 'unlimited',
    features: [
      '100,000 tokens/mes',
      'Proyectos ilimitados',
      'Modelo JoxCoder',
      'API ilimitado',
      'Equipos ilimitados',
      'Soporte prioritario 24/7',
      'SLA 99.9%',
      'Onboarding personalizado'
    ],
    stripePriceId: process.env.STRIPE_BUSINESS_PRICE_ID,
  },
  
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Soluciones personalizadas',
    price: 0,
    currency: 'USD',
    interval: 'month',
    tokens: -1,
    projects: 'unlimited',
    features: [
      'Tokens personalizados',
      'Proyectos ilimitados',
      'Modelo on-premise',
      'Contratos personalizados',
      'Soporte dedicado 24/7',
      'SLA personalizado',
      'Implementación guiada',
      'Entrenamiento del equipo'
    ],
  },
} as const;

export function getPlanById(planId: string): Plan | undefined {
  return PLANS[planId];
}

export function getDefaultPlan(): Plan {
  return PLANS.free;
}

export function isPlanValid(planId: string): boolean {
  return planId in PLANS;
}

export function canUserGenerate(tokensUsed: number, tokensLimit: number): boolean {
  if (tokensLimit === -1) return true;
  return tokensUsed < tokensLimit;
}

export function getRemainingTokens(tokensUsed: number, tokensLimit: number): number {
  if (tokensLimit === -1) return Infinity;
  return Math.max(0, tokensLimit - tokensUsed);
}

export function getTokenUsagePercentage(tokensUsed: number, tokensLimit: number): number {
  if (tokensLimit === -1) return 0;
  if (tokensLimit === 0) return 100;
  return Math.min(100, (tokensUsed / tokensLimit) * 100);
}
