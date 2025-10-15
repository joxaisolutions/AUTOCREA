import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createGeneration = mutation({
  args: {
    projectId: v.string(),
    userId: v.string(),
    modelUsed: v.string(),
    prompt: v.string(),
    estimatedTokens: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const generationId = await ctx.db.insert("generations", {
      projectId: args.projectId,
      userId: args.userId,
      modelUsed: args.modelUsed,
      prompt: args.prompt,
      status: "queued",
      tokensUsed: 0,
      estimatedTokens: args.estimatedTokens,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return generationId;
  },
});

export const updateGenerationStatus = mutation({
  args: {
    generationId: v.id("generations"),
    status: v.union(
      v.literal("queued"),
      v.literal("in_progress"),
      v.literal("completed"),
      v.literal("failed")
    ),
    currentStep: v.optional(v.string()),
    tokensUsed: v.optional(v.number()),
    error: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const updates: any = {
      status: args.status,
      updatedAt: Date.now(),
    };

    if (args.currentStep !== undefined) updates.currentStep = args.currentStep;
    if (args.tokensUsed !== undefined) updates.tokensUsed = args.tokensUsed;
    if (args.error !== undefined) updates.error = args.error;

    await ctx.db.patch(args.generationId, updates);
  },
});

export const getGenerationsByProject = query({
  args: { projectId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("generations")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
      .order("desc")
      .collect();
  },
});

export const addGenerationStep = mutation({
  args: {
    generationId: v.string(),
    stepNumber: v.number(),
    stepType: v.union(
      v.literal("architect"),
      v.literal("backend"),
      v.literal("frontend"),
      v.literal("devops"),
      v.literal("security")
    ),
    stepName: v.string(),
  },
  handler: async (ctx, args) => {
    const stepId = await ctx.db.insert("generationSteps", {
      generationId: args.generationId,
      stepNumber: args.stepNumber,
      stepType: args.stepType,
      stepName: args.stepName,
      status: "pending",
      createdAt: Date.now(),
    });

    return stepId;
  },
});

export const updateGenerationStep = mutation({
  args: {
    stepId: v.id("generationSteps"),
    status: v.union(
      v.literal("pending"),
      v.literal("in_progress"),
      v.literal("completed"),
      v.literal("failed")
    ),
    output: v.optional(v.string()),
    error: v.optional(v.string()),
    tokensUsed: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const updates: any = {
      status: args.status,
    };

    if (args.status === "in_progress" && !args.output) {
      updates.startedAt = Date.now();
    }

    if (args.status === "completed" || args.status === "failed") {
      updates.completedAt = Date.now();
    }

    if (args.output !== undefined) updates.output = args.output;
    if (args.error !== undefined) updates.error = args.error;
    if (args.tokensUsed !== undefined) updates.tokensUsed = args.tokensUsed;

    await ctx.db.patch(args.stepId, updates);
  },
});

export const getGenerationSteps = query({
  args: { generationId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("generationSteps")
      .withIndex("by_generation", (q) => q.eq("generationId", args.generationId))
      .order("asc")
      .collect();
  },
});
