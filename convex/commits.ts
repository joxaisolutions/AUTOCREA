import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Crear nuevo commit
export const create = mutation({
  args: {
    projectId: v.id("projects"),
    userId: v.id("users"),
    message: v.string(),
    filesChanged: v.array(v.string()),
    repository: v.union(v.literal("github"), v.literal("gitlab")),
    commitUrl: v.optional(v.string()),
    sha: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("commits", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

// Obtener commits del proyecto
export const getByProject = query({
  args: { 
    projectId: v.id("projects"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, { projectId, limit }) => {
    const query = ctx.db
      .query("commits")
      .withIndex("by_project", (q) => q.eq("projectId", projectId))
      .order("desc");

    if (limit) {
      return query.take(limit);
    }

    return await query.collect();
  },
});
