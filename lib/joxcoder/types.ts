// ==============================================
// JOXCODER AI - TIPOS Y DEFINICIONES
// ==============================================

export type TechnicalRole = 
  | 'arquitecto'
  | 'fullstack'
  | 'frontend'
  | 'backend'
  | 'devops'
  | 'security'
  | 'qa'
  | 'data_engineer'
  | 'ml_engineer'
  | 'pentester'
  | 'mobile_dev'
  | 'blockchain_dev';

export type ProgrammingLanguage =
  | 'javascript'
  | 'typescript'
  | 'python'
  | 'java'
  | 'go'
  | 'rust'
  | 'php'
  | 'ruby'
  | 'swift'
  | 'kotlin'
  | 'solidity'
  | 'sql';

export type UserPlan = 'starter' | 'professional' | 'enterprise' | 'custom';

export interface PlanLimits {
  generationsPerMonth: number;
  availableRoles: TechnicalRole[];
  availableLanguages: ProgrammingLanguage[];
  maxTokensPerGeneration: number;
  concurrentGenerations: number;
  repositoriesLimit: number;
  supportLevel: 'community' | 'priority' | 'dedicated';
}

export interface JoxCoderRequest {
  role: TechnicalRole;
  prompt: string;
  language?: ProgrammingLanguage;
  context?: {
    projectName?: string;
    projectDescription?: string;
    existingCode?: string;
    files?: Array<{ name: string; content: string }>;
  };
}

export interface JoxCoderResponse {
  success: boolean;
  generatedCode?: string;
  explanation?: string;
  tokensUsed?: number;
  error?: string;
}

export interface GenerationUsage {
  userId: string;
  generationsUsed: number;
  generationsLimit: number;
  currentPlan: UserPlan;
  periodStart: Date;
  periodEnd: Date;
}

export const PLAN_LIMITS: Record<UserPlan, PlanLimits> = {
  starter: {
    generationsPerMonth: 100,
    availableRoles: ['fullstack', 'frontend', 'backend', 'qa'],
    availableLanguages: ['javascript', 'python', 'typescript'],
    maxTokensPerGeneration: 2048,
    concurrentGenerations: 2,
    repositoriesLimit: 3,
    supportLevel: 'community',
  },
  professional: {
    generationsPerMonth: 500,
    availableRoles: [
      'arquitecto',
      'fullstack',
      'frontend',
      'backend',
      'devops',
      'security',
      'qa',
      'data_engineer',
    ],
    availableLanguages: [
      'javascript',
      'typescript',
      'python',
      'java',
      'go',
      'php',
      'ruby',
      'sql',
    ],
    maxTokensPerGeneration: 4096,
    concurrentGenerations: 5,
    repositoriesLimit: 15,
    supportLevel: 'priority',
  },
  enterprise: {
    generationsPerMonth: 2000,
    availableRoles: [
      'arquitecto',
      'fullstack',
      'frontend',
      'backend',
      'devops',
      'security',
      'qa',
      'data_engineer',
      'ml_engineer',
      'pentester',
      'mobile_dev',
      'blockchain_dev',
    ],
    availableLanguages: [
      'javascript',
      'typescript',
      'python',
      'java',
      'go',
      'rust',
      'php',
      'ruby',
      'swift',
      'kotlin',
      'solidity',
      'sql',
    ],
    maxTokensPerGeneration: 8192,
    concurrentGenerations: 20,
    repositoriesLimit: 9999,
    supportLevel: 'dedicated',
  },
  custom: {
    generationsPerMonth: 99999,
    availableRoles: [
      'arquitecto',
      'fullstack',
      'frontend',
      'backend',
      'devops',
      'security',
      'qa',
      'data_engineer',
      'ml_engineer',
      'pentester',
      'mobile_dev',
      'blockchain_dev',
    ],
    availableLanguages: [
      'javascript',
      'typescript',
      'python',
      'java',
      'go',
      'rust',
      'php',
      'ruby',
      'swift',
      'kotlin',
      'solidity',
      'sql',
    ],
    maxTokensPerGeneration: 16384,
    concurrentGenerations: 50,
    repositoriesLimit: 9999,
    supportLevel: 'dedicated',
  },
};
