import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Obtener archivos del proyecto
export const getByProject = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, { projectId }) => {
    return await ctx.db
      .query("projectFiles")
      .withIndex("by_project", (q) => q.eq("projectId", projectId))
      .collect();
  },
});

// Crear o actualizar archivo
export const upsert = mutation({
  args: {
    projectId: v.id("projects"),
    fileName: v.string(),
    filePath: v.string(),
    language: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("projectFiles")
      .withIndex("by_project_path", (q) => 
        q.eq("projectId", args.projectId).eq("filePath", args.filePath)
      )
      .first();

    const size = new Blob([args.content]).size;

    if (existing) {
      await ctx.db.patch(existing._id, {
        fileName: args.fileName,
        language: args.language,
        content: args.content,
        size,
        updatedAt: Date.now(),
      });
      return existing._id;
    }

    return await ctx.db.insert("projectFiles", {
      ...args,
      size,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

// Eliminar archivo
export const remove = mutation({
  args: { fileId: v.id("projectFiles") },
  handler: async (ctx, { fileId }) => {
    await ctx.db.delete(fileId);
  },
});
