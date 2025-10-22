import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Subscription, TokenUsage } from '@/src/types';

interface AppState {
  user: User | null;
  subscription: Subscription | null;
  tokenUsage: TokenUsage | null;
  
  sidebarOpen: boolean;
  
  setUser: (user: User | null) => void;
  setSubscription: (subscription: Subscription | null) => void;
  setTokenUsage: (usage: TokenUsage | null) => void;
  updateTokensUsed: (tokensUsed: number) => void;
  
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  
  reset: () => void;
}

const initialState = {
  user: null,
  subscription: null,
  tokenUsage: null,
  sidebarOpen: true,
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      setUser: (user) => set({ user }),
      
      setSubscription: (subscription) => set({ subscription }),
      
      setTokenUsage: (usage) => set({ tokenUsage: usage }),
      
      updateTokensUsed: (tokensUsed) => {
        const currentUsage = get().tokenUsage;
        if (currentUsage) {
          set({
            tokenUsage: {
              ...currentUsage,
              tokensUsed: currentUsage.tokensUsed + tokensUsed,
              generationsCount: currentUsage.generationsCount + 1,
              lastGenerationAt: Date.now(),
            }
          });
        }
      },
      
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      
      reset: () => set(initialState),
    }),
    {
      name: 'autocrea-app-storage',
      partialize: (state) => ({
        sidebarOpen: state.sidebarOpen,
      }),
    }
  )
);
