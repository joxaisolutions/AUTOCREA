import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    tokenBalance: v.number(),
    subscriptionTier: v.union(v.literal("free"), v.literal("basic"), v.literal("pro")),
    subscriptionStatus: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_email", ["email"]),

  projects: defineTable({
    userId: v.string(),
    name: v.string(),
    description: v.string(),
    status: v.union(
      v.literal("pending"),
      v.literal("generating"),
      v.literal("completed"),
      v.literal("failed")
    ),
    framework: v.optional(v.string()),
    techStack: v.optional(v.array(v.string())),
    generatedCode: v.optional(v.string()),
    repositoryUrl: v.optional(v.string()),
    deploymentUrl: v.optional(v.string()),
    tokensUsed: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_status", ["status"])
    .index("by_created_at", ["createdAt"]),

  generations: defineTable({
    projectId: v.string(),
    userId: v.string(),
    modelUsed: v.string(),
    prompt: v.string(),
    status: v.union(
      v.literal("queued"),
      v.literal("in_progress"),
      v.literal("completed"),
      v.literal("failed")
    ),
    currentStep: v.optional(v.string()),
    totalSteps: v.optional(v.number()),
    completedSteps: v.optional(v.number()),
    tokensUsed: v.number(),
    estimatedTokens: v.optional(v.number()),
    error: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_project", ["projectId"])
    .index("by_user", ["userId"])
    .index("by_status", ["status"]),

  generationSteps: defineTable({
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
    status: v.union(
      v.literal("pending"),
      v.literal("in_progress"),
      v.literal("completed"),
      v.literal("failed")
    ),
    output: v.optional(v.string()),
    error: v.optional(v.string()),
    tokensUsed: v.optional(v.number()),
    startedAt: v.optional(v.number()),
    completedAt: v.optional(v.number()),
    createdAt: v.number(),
  })
    .index("by_generation", ["generationId"])
    .index("by_step_number", ["stepNumber"]),

  apiKeys: defineTable({
    userId: v.string(),
    provider: v.union(
      v.literal("openai"),
      v.literal("anthropic"),
      v.literal("google"),
      v.literal("huggingface")
    ),
    keyPreview: v.string(),
    encryptedKey: v.string(),
    isActive: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_provider", ["provider"]),

  tokenTransactions: defineTable({
    userId: v.string(),
    type: v.union(
      v.literal("purchase"),
      v.literal("signup_bonus"),
      v.literal("usage"),
      v.literal("refund")
    ),
    amount: v.number(),
    description: v.string(),
    projectId: v.optional(v.string()),
    stripePaymentId: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_type", ["type"]),
});
