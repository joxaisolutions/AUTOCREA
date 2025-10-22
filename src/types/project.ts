import { TechnicalRole } from './joxcoder';

export interface Project {
  id: string;
  userId: string;
  name: string;
  description: string;
  status: 'draft' | 'generating' | 'completed' | 'failed' | 'deployed';
  files: ProjectFile[];
  generatedBy?: TechnicalRole[];
  tokensUsed: number;
  createdAt: number;
  updatedAt: number;
  deployedUrl?: string;
  githubUrl?: string;
}

export interface ProjectFile {
  id: string;
  projectId: string;
  name: string;
  path: string;
  content: string;
  language: string;
  size: number;
  generatedBy?: TechnicalRole;
  createdAt: number;
  updatedAt: number;
}

export interface Generation {
  id: string;
  userId: string;
  projectId?: string;
  role: TechnicalRole;
  prompt: string;
  generatedCode: string;
  explanation?: string;
  tokensUsed: number;
  status: 'pending' | 'completed' | 'failed';
  error?: string;
  createdAt: number;
  completedAt?: number;
}
