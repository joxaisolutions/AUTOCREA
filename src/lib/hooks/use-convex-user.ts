'use client';

import { useUser } from '@clerk/nextjs';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useEffect } from 'react';

export function useConvexUser() {
  const { user: clerkUser, isLoaded } = useUser();
  
  // Query para obtener usuario de Convex
  const convexUser = useQuery(
    api.users.getByClerkId,
    clerkUser?.id ? { clerkId: clerkUser.id } : 'skip'
  );

  // Mutation para crear/actualizar usuario
  const upsertUser = useMutation(api.users.upsert);

  // Auto-sync: cuando el usuario de Clerk carga, sincronizar con Convex
  useEffect(() => {
    if (isLoaded && clerkUser && !convexUser) {
      upsertUser({
        clerkId: clerkUser.id,
        email: clerkUser.emailAddresses[0]?.emailAddress || '',
        name: clerkUser.fullName || undefined,
        imageUrl: clerkUser.imageUrl || undefined,
      });
    }
  }, [isLoaded, clerkUser, convexUser, upsertUser]);

  return {
    convexUser,
    clerkUser,
    isLoaded: isLoaded && (convexUser !== undefined || !clerkUser),
  };
}
