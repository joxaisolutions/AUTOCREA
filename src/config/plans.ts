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
  clerkFeatures: string[];
}

export const PLANS: Record<string, Plan> = {
  free: {
    id: 'free',
    name: 'Free Trial',
    description: 'Perfecto para probar AUTOCREA',
    price: 0,
    currency: 'USD',
    interval: 'month',
    tokens: 1000,
    projects: 1,
    features: [
      '1,000 tokens gratis',
      '1 proyecto',
      'Modelo JoxCoder AI',
      'Preview en tiempo real',
      'Consola web integrada',
      'Soporte comunitario'
    ],
    clerkFeatures: ['tokens_1000', 'projects_1'],
  },
  
  creator: {
    id: 'creator',
    name: 'Creator',
    description: 'Para desarrolladores independientes',
    price: 29,
    currency: 'USD',
    interval: 'month',
    tokens: 10000,
    projects: 5,
    popular: true,
    features: [
      '10,000 tokens/mes',
      '5 proyectos activos',
      'Modelo JoxCoder AI',
      '12 roles técnicos especializados',
      'Deploy automático',
      'Templates premium',
      'Git automático',
      'Soporte prioritario'
    ],
    clerkFeatures: ['tokens_10000', 'projects_5', 'github_integration', 'priority_support'],
  },
  
  professional: {
    id: 'professional',
    name: 'Pro',
    description: 'Para equipos y profesionales',
    price: 79,
    currency: 'USD',
    interval: 'month',
    tokens: 30000,
    projects: 20,
    features: [
      '30,000 tokens/mes',
      '20 proyectos activos',
      'Modelo JoxCoder AI',
      'API REST completa',
      'Colaboración en equipo',
      'Analytics avanzados',
      'Webhooks personalizados',
      'Soporte dedicado',
      'SLA garantizado'
    ],
    clerkFeatures: ['tokens_30000', 'projects_20', 'github_integration', 'api_access', 'team_collaboration', 'advanced_analytics', 'dedicated_support'],
  },
  
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Soluciones personalizadas para empresas',
    price: 0,
    currency: 'USD',
    interval: 'month',
    tokens: -1,
    projects: 'unlimited',
    features: [
      'Tokens personalizados',
      'Proyectos ilimitados',
      'Modelo JoxCoder on-premise',
      'Contratos personalizados',
      'SSO y seguridad avanzada',
      'Soporte dedicado 24/7',
      'SLA personalizado 99.99%',
      'Implementación guiada',
      'Entrenamiento del equipo'
    ],
    clerkFeatures: ['unlimited_tokens', 'unlimited_projects', 'enterprise_support', 'sso', 'sla_guarantee'],
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
