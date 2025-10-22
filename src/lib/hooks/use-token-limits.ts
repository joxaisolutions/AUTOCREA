import { useMemo } from 'react';
import { useAppStore } from '../stores/use-app-store';
import { 
  canUserGenerate, 
  getRemainingTokens, 
  getTokenUsagePercentage 
} from '@/src/config/plans';

export function useTokenLimits() {
  const { tokenUsage } = useAppStore();
  
  const tokensUsed = tokenUsage?.tokensUsed || 0;
  const tokensLimit = tokenUsage?.tokensLimit || 100;
  
  const remaining = useMemo(
    () => getRemainingTokens(tokensUsed, tokensLimit),
    [tokensUsed, tokensLimit]
  );
  
  const percentage = useMemo(
    () => getTokenUsagePercentage(tokensUsed, tokensLimit),
    [tokensUsed, tokensLimit]
  );
  
  const canGenerate = useMemo(
    () => canUserGenerate(tokensUsed, tokensLimit),
    [tokensUsed, tokensLimit]
  );
  
  const isNearLimit = percentage >= 80;
  const isAtLimit = percentage >= 100;
  
  return {
    tokensUsed,
    tokensLimit,
    remaining,
    percentage,
    canGenerate,
    isNearLimit,
    isAtLimit,
  };
}
