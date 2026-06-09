import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createExportRecord = mutation({
  args: {
    widgetId: v.id("widgets"),
    exportType: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const widget = await ctx.db.get(args.widgetId);
    if (!widget) throw new Error("Widget not found");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkUserId", identity.subject))
      .unique();

    if (!user || widget.userId !== user._id) throw new Error("Unauthorized");

    return await ctx.db.insert("exports", {
      widgetId: args.widgetId,
      userId: user._id,
      exportType: args.exportType,
      createdAt: Date.now(),
    });
  },
});
