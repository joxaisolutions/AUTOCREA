'use client';

import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useConvexUser } from './use-convex-user';
import { Id } from '@/convex/_generated/dataModel';

export function useUserProjects() {
  const { convexUser } = useConvexUser();

  // Query para obtener proyectos del usuario
  const projects = useQuery(
    api.projects.getUserProjects,
    convexUser?._id ? { userId: convexUser._id } : 'skip'
  );

  // Mutations
  const createProject = useMutation(api.projects.create);
  const updateProject = useMutation(api.projects.update);
  const archiveProject = useMutation(api.projects.archive);
  const removeProject = useMutation(api.projects.remove);

  return {
    projects: projects ?? [],
    isLoading: projects === undefined,
    createProject: (args: {
      name: string;
      description?: string;
      role: string;
      framework?: string;
      language?: string;
    }) => {
      if (!convexUser?._id) throw new Error('User not found');
      return createProject({
        userId: convexUser._id as Id<"users">,
        ...args,
      });
    },
    updateProject,
    archiveProject,
    removeProject,
  };
}
