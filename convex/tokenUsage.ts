import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Obtener uso actual del mes
export const getCurrentMonth = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    const month = new Date().toISOString().slice(0, 7); // YYYY-MM
    return await ctx.db
      .query("tokenUsage")
      .withIndex("by_user_month", (q) =>
        q.eq("userId", userId).eq("month", month)
      )
      .first();
  },
});

// Inicializar uso del mes si no existe
export const initializeMonth = mutation({
  args: {
    userId: v.id("users"),
    tokensLimit: v.number(),
  },
  handler: async (ctx, { userId, tokensLimit }) => {
    const month = new Date().toISOString().slice(0, 7);
    
    const existing = await ctx.db
      .query("tokenUsage")
      .withIndex("by_user_month", (q) =>
        q.eq("userId", userId).eq("month", month)
      )
      .first();

    if (!existing) {
      await ctx.db.insert("tokenUsage", {
        userId,
        month,
        tokensLimit,
        tokensUsed: 0,
        generationsCount: 0,
      });
    }
  },
});

// Incrementar tokens usados
export const incrementTokens = mutation({
  args: {
    userId: v.id("users"),
    tokensUsed: v.number(),
  },
  handler: async (ctx, { userId, tokensUsed }) => {
    const month = new Date().toISOString().slice(0, 7);
    
    const existing = await ctx.db
      .query("tokenUsage")
      .withIndex("by_user_month", (q) =>
        q.eq("userId", userId).eq("month", month)
      )
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        tokensUsed: existing.tokensUsed + tokensUsed,
        generationsCount: existing.generationsCount + 1,
        lastGenerationAt: Date.now(),
      });
    } else {
      await ctx.db.insert("tokenUsage", {
        userId,
        month,
        tokensUsed,
        tokensLimit: 1000, // Default to free plan
        generationsCount: 1,
        lastGenerationAt: Date.now(),
      });
    }
  },
});

// Actualizar límite de tokens (cuando cambia de plan)
export const updateLimit = mutation({
  args: {
    userId: v.id("users"),
    tokensLimit: v.number(),
  },
  handler: async (ctx, { userId, tokensLimit }) => {
    const month = new Date().toISOString().slice(0, 7);
    
    const existing = await ctx.db
      .query("tokenUsage")
      .withIndex("by_user_month", (q) =>
        q.eq("userId", userId).eq("month", month)
      )
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, { tokensLimit });
    } else {
      await ctx.db.insert("tokenUsage", {
        userId,
        month,
        tokensLimit,
        tokensUsed: 0,
        generationsCount: 0,
      });
    }
  },
});
