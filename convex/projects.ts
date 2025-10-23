import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Obtener proyectos del usuario
export const getUserProjects = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    return await ctx.db
      .query("projects")
      .withIndex("by_user_status", (q) => 
        q.eq("userId", userId).eq("status", "active")
      )
      .order("desc")
      .collect();
  },
});

// Obtener un proyecto por ID
export const getById = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, { projectId }) => {
    return await ctx.db.get(projectId);
  },
});

// Crear nuevo proyecto
export const create = mutation({
  args: {
    userId: v.id("users"),
    name: v.string(),
    description: v.optional(v.string()),
    role: v.string(),
    framework: v.optional(v.string()),
    language: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("projects", {
      ...args,
      status: "active",
      filesCount: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

// Actualizar proyecto
export const update = mutation({
  args: {
    projectId: v.id("projects"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    githubRepoUrl: v.optional(v.string()),
    gitlabRepoUrl: v.optional(v.string()),
  },
  handler: async (ctx, { projectId, ...updates }) => {
    await ctx.db.patch(projectId, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

// Incrementar contador de archivos
export const incrementFiles = mutation({
  args: { projectId: v.id("projects") },
  handler: async (ctx, { projectId }) => {
    const project = await ctx.db.get(projectId);
    if (!project) throw new Error("Project not found");

    await ctx.db.patch(projectId, {
      filesCount: project.filesCount + 1,
      lastGeneratedAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

// Archivar proyecto
export const archive = mutation({
  args: { projectId: v.id("projects") },
  handler: async (ctx, { projectId }) => {
    await ctx.db.patch(projectId, {
      status: "archived",
      updatedAt: Date.now(),
    });
  },
});

// Eliminar proyecto
export const remove = mutation({
  args: { projectId: v.id("projects") },
  handler: async (ctx, { projectId }) => {
    await ctx.db.patch(projectId, {
      status: "deleted",
      updatedAt: Date.now(),
    });
  },
});
