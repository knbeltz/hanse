import { v } from "convex/values";
import { query } from "./_generated/server";

export const getAnalysisResult = query({
  args: { widgetId: v.id("widgets") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const widget = await ctx.db.get(args.widgetId);
    if (!widget) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkUserId", identity.subject))
      .unique();

    if (!user || widget.userId !== user._id) return null;

    return await ctx.db
      .query("analysisResults")
      .withIndex("by_widget", (q) => q.eq("widgetId", args.widgetId))
      .unique();
  },
});
