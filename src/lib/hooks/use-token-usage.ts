'use client';

import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useConvexUser } from './use-convex-user';
import { useAuth } from '@clerk/nextjs';
import { useEffect } from 'react';
import { Id } from '@/convex/_generated/dataModel';

export function useTokenUsage() {
  const { convexUser } = useConvexUser();
  const { has } = useAuth();

  // Determinar límite de tokens basado en Clerk features
  const hasUnlimitedTokens = has?.({ feature: 'unlimited_tokens' });
  const hasTokens30000 = has?.({ feature: 'tokens_30000' });
  const hasTokens10000 = has?.({ feature: 'tokens_10000' });
  
  let tokensLimit = 1000; // Free plan default
  if (hasUnlimitedTokens) {
    tokensLimit = -1; // Unlimited
  } else if (hasTokens30000) {
    tokensLimit = 30000;
  } else if (hasTokens10000) {
    tokensLimit = 10000;
  }

  // Query para obtener uso del mes actual
  const tokenUsage = useQuery(
    api.tokenUsage.getCurrentMonth,
    convexUser?._id ? { userId: convexUser._id } : 'skip'
  );

  // Mutations
  const initializeMonth = useMutation(api.tokenUsage.initializeMonth);
  const incrementTokens = useMutation(api.tokenUsage.incrementTokens);
  const updateLimit = useMutation(api.tokenUsage.updateLimit);

  // Auto-inicializar mes si no existe
  useEffect(() => {
    if (convexUser?._id && tokenUsage === null) {
      initializeMonth({
        userId: convexUser._id as Id<"users">,
        tokensLimit,
      });
    }
  }, [convexUser, tokenUsage, tokensLimit, initializeMonth]);

  // Auto-actualizar límite si cambió el plan
  useEffect(() => {
    if (convexUser?._id && tokenUsage && tokenUsage.tokensLimit !== tokensLimit) {
      updateLimit({
        userId: convexUser._id as Id<"users">,
        tokensLimit,
      });
    }
  }, [convexUser, tokenUsage, tokensLimit, updateLimit]);

  const tokensUsed = tokenUsage?.tokensUsed ?? 0;
  const tokensRemaining = tokensLimit === -1 
    ? Infinity 
    : Math.max(0, tokensLimit - tokensUsed);
  
  const usagePercentage = tokensLimit === -1 
    ? 0 
    : Math.min(100, (tokensUsed / tokensLimit) * 100);

  const canGenerate = tokensLimit === -1 || tokensUsed < tokensLimit;

  return {
    tokensUsed,
    tokensLimit,
    tokensRemaining,
    usagePercentage,
    canGenerate,
    generationsCount: tokenUsage?.generationsCount ?? 0,
    isLoading: convexUser === undefined || tokenUsage === undefined,
    incrementTokens,
  };
}
