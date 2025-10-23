import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Crear nueva generación
export const create = mutation({
  args: {
    userId: v.id("users"),
    projectId: v.id("projects"),
    role: v.string(),
    prompt: v.string(),
    code: v.string(),
    language: v.string(),
    fileName: v.optional(v.string()),
    tokensUsed: v.number(),
    success: v.boolean(),
    errorMessage: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("generations", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

// Obtener historial de generaciones del proyecto
export const getByProject = query({
  args: { 
    projectId: v.id("projects"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, { projectId, limit }) => {
    const query = ctx.db
      .query("generations")
      .withIndex("by_project", (q) => q.eq("projectId", projectId))
      .order("desc");

    if (limit) {
      return query.take(limit);
    }

    return await query.collect();
  },
});

// Obtener historial del usuario
export const getByUser = query({
  args: { 
    userId: v.id("users"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, { userId, limit }) => {
    const query = ctx.db
      .query("generations")
      .withIndex("by_user_created", (q) => q.eq("userId", userId))
      .order("desc");

    if (limit) {
      return query.take(limit);
    }

    return await query.collect();
  },
});
