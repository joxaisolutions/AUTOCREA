import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // ========== USUARIOS ==========
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    plan: v.string(), // 'free', 'creator', 'pro', 'enterprise'
    clerkSubscriptionId: v.optional(v.string()),
    onboardingCompleted: v.boolean(),
    githubConnected: v.boolean(),
    gitlabConnected: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_email", ["email"]),

  // ========== TOKENS Y USO ==========
  tokenUsage: defineTable({
    userId: v.id("users"),
    month: v.string(), // YYYY-MM
    tokensUsed: v.number(),
    tokensLimit: v.number(),
    generationsCount: v.number(),
    lastGenerationAt: v.optional(v.number()),
  }).index("by_user_month", ["userId", "month"]),

  // ========== PROYECTOS ==========
  projects: defineTable({
    userId: v.id("users"),
    name: v.string(),
    description: v.optional(v.string()),
    role: v.string(), // 'architect', 'fullstack', 'frontend', etc.
    framework: v.optional(v.string()),
    language: v.optional(v.string()),
    githubRepoUrl: v.optional(v.string()),
    gitlabRepoUrl: v.optional(v.string()),
    status: v.union(
      v.literal("active"),
      v.literal("archived"),
      v.literal("deleted")
    ),
    filesCount: v.number(),
    lastGeneratedAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_status", ["userId", "status"]),

  // ========== GENERACIONES ==========
  generations: defineTable({
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
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_project", ["projectId"])
    .index("by_user_created", ["userId", "createdAt"]),

  // ========== ARCHIVOS DEL PROYECTO ==========
  projectFiles: defineTable({
    projectId: v.id("projects"),
    fileName: v.string(),
    filePath: v.string(),
    language: v.string(),
    content: v.string(),
    size: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_project", ["projectId"])
    .index("by_project_path", ["projectId", "filePath"]),

  // ========== COMMITS ==========
  commits: defineTable({
    projectId: v.id("projects"),
    userId: v.id("users"),
    message: v.string(),
    filesChanged: v.array(v.string()),
    repository: v.union(v.literal("github"), v.literal("gitlab")),
    commitUrl: v.optional(v.string()),
    sha: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_project", ["projectId"])
    .index("by_user", ["userId"]),
});
