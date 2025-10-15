import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createProject = mutation({
  args: {
    userId: v.string(),
    name: v.string(),
    description: v.string(),
    framework: v.optional(v.string()),
    techStack: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const projectId = await ctx.db.insert("projects", {
      userId: args.userId,
      name: args.name,
      description: args.description,
      status: "pending",
      framework: args.framework,
      techStack: args.techStack,
      tokensUsed: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return projectId;
  },
});

export const getProjectsByUser = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("projects")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
  },
});

export const getProjectById = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.projectId);
  },
});

export const updateProjectStatus = mutation({
  args: {
    projectId: v.id("projects"),
    status: v.union(
      v.literal("pending"),
      v.literal("generating"),
      v.literal("completed"),
      v.literal("failed")
    ),
    generatedCode: v.optional(v.string()),
    tokensUsed: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const updates: any = {
      status: args.status,
      updatedAt: Date.now(),
    };

    if (args.generatedCode !== undefined) {
      updates.generatedCode = args.generatedCode;
    }

    if (args.tokensUsed !== undefined) {
      updates.tokensUsed = args.tokensUsed;
    }

    await ctx.db.patch(args.projectId, updates);
  },
});
