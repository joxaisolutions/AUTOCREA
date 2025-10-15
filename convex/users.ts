import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createUser = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (existingUser) {
      return existingUser._id;
    }

    const userId = await ctx.db.insert("users", {
      clerkId: args.clerkId,
      email: args.email,
      name: args.name,
      tokenBalance: 100,
      subscriptionTier: "free",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    await ctx.db.insert("tokenTransactions", {
      userId: args.clerkId,
      type: "signup_bonus",
      amount: 100,
      description: "Welcome bonus - 100 free tokens",
      createdAt: Date.now(),
    });

    return userId;
  },
});

export const getUserByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();
  },
});

export const updateTokenBalance = mutation({
  args: {
    clerkId: v.string(),
    amount: v.number(),
    type: v.union(
      v.literal("purchase"),
      v.literal("usage"),
      v.literal("refund")
    ),
    description: v.string(),
    projectId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    const newBalance = user.tokenBalance + args.amount;

    if (newBalance < 0) {
      throw new Error("Insufficient token balance");
    }

    await ctx.db.patch(user._id, {
      tokenBalance: newBalance,
      updatedAt: Date.now(),
    });

    await ctx.db.insert("tokenTransactions", {
      userId: args.clerkId,
      type: args.type,
      amount: args.amount,
      description: args.description,
      projectId: args.projectId,
      createdAt: Date.now(),
    });

    return newBalance;
  },
});
