import { create } from "zustand";

export interface GenerationStep {
  id: string;
  role: "architect" | "backend" | "frontend" | "devops" | "security";
  name: string;
  status: "pending" | "in_progress" | "completed" | "failed";
  output?: string;
  error?: string;
  tokensUsed?: number;
  startedAt?: number;
  completedAt?: number;
}

export interface ChatState {
  projectName: string;
  projectDescription: string;
  isGenerating: boolean;
  currentStep: number;
  totalSteps: number;
  steps: GenerationStep[];
  generatedCode: string;
  tokensUsed: number;
  estimatedTokens: number;
  error: string | null;

  setProjectName: (name: string) => void;
  setProjectDescription: (description: string) => void;
  setGenerating: (isGenerating: boolean) => void;
  addStep: (step: GenerationStep) => void;
  updateStep: (id: string, updates: Partial<GenerationStep>) => void;
  setGeneratedCode: (code: string) => void;
  setTokensUsed: (tokens: number) => void;
  setEstimatedTokens: (tokens: number) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState = {
  projectName: "",
  projectDescription: "",
  isGenerating: false,
  currentStep: 0,
  totalSteps: 5,
  steps: [],
  generatedCode: "",
  tokensUsed: 0,
  estimatedTokens: 0,
  error: null,
};

export const useChatStore = create<ChatState>((set) => ({
  ...initialState,

  setProjectName: (name) => set({ projectName: name }),

  setProjectDescription: (description) =>
    set({ projectDescription: description }),

  setGenerating: (isGenerating) => set({ isGenerating }),

  addStep: (step) =>
    set((state) => ({
      steps: [...state.steps, step],
      currentStep: state.steps.length + 1,
    })),

  updateStep: (id, updates) =>
    set((state) => ({
      steps: state.steps.map((step) =>
        step.id === id ? { ...step, ...updates } : step
      ),
    })),

  setGeneratedCode: (code) => set({ generatedCode: code }),

  setTokensUsed: (tokens) => set({ tokensUsed: tokens }),

  setEstimatedTokens: (tokens) => set({ estimatedTokens: tokens }),

  setError: (error) => set({ error }),

  reset: () => set(initialState),
}));
