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

export type SupportedLanguage = 
  | 'typescript'
  | 'javascript'
  | 'python'
  | 'css'
  | 'html'
  | 'json'
  | 'markdown';

export interface JoxCoderRequest {
  role: TechnicalRole;
  prompt: string;
  language?: SupportedLanguage;
  context?: {
    projectName?: string;
    projectDescription?: string;
    existingFiles?: string[];
  };
}

export interface JoxCoderResponse {
  success: boolean;
  generatedCode?: string;
  explanation?: string;
  tokensUsed?: number;
  language?: SupportedLanguage;
  fileName?: string;
  error?: string;
}

export interface GenerationStep {
  id: string;
  role: TechnicalRole;
  name: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  output?: string;
  error?: string;
  tokensUsed?: number;
  startedAt?: number;
  completedAt?: number;
}
