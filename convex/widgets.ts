import { v } from "convex/values";
import { mutation, query, internalMutation } from "./_generated/server";
import { internal } from "./_generated/api";

export const listWidgetsForCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkUserId", identity.subject))
      .unique();

    if (!user) return [];

    return await ctx.db
      .query("widgets")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .order("desc")
      .collect();
  },
});

export const getWidgetById = query({
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

    return widget;
  },
});

export const createWidgetDraft = mutation({
  args: {
    name: v.string(),
    researchTopic: v.string(),
    researchPrompt: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkUserId", identity.subject))
      .unique();

    if (!user) throw new Error("User not found");

    return await ctx.db.insert("widgets", {
      userId: user._id,
      name: args.name,
      researchTopic: args.researchTopic,
      researchPrompt: args.researchPrompt,
      status: "draft",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

export const generateResearchScope = mutation({
  args: { widgetId: v.id("widgets") },
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

    await ctx.db.patch(args.widgetId, {
      status: "scope_generated",
      updatedAt: Date.now(),
    });

    await ctx.scheduler.runAfter(0, internal.apiActions.generateScopeAction, {
      widgetId: args.widgetId,
      topic: widget.researchTopic,
      prompt: widget.researchPrompt,
    });
  },
});

export const storeScopeResult = internalMutation({
  args: {
    widgetId: v.id("widgets"),
    suggestedThemes: v.array(
      v.object({
        name: v.string(),
        description: v.string(),
        relevanceScore: v.number(),
      })
    ),
    suggestedChannels: v.array(
      v.object({
        name: v.string(),
        channelId: v.optional(v.string()),
        url: v.optional(v.string()),
        description: v.optional(v.string()),
      })
    ),
    suggestedVideos: v.array(
      v.object({
        title: v.string(),
        videoId: v.optional(v.string()),
        url: v.optional(v.string()),
        channelName: v.optional(v.string()),
        viewCount: v.optional(v.number()),
      })
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("researchScopes", {
      widgetId: args.widgetId,
      suggestedThemes: args.suggestedThemes,
      suggestedChannels: args.suggestedChannels,
      suggestedVideos: args.suggestedVideos,
      validationStatus: "valid",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    await ctx.db.patch(args.widgetId, { updatedAt: Date.now() });
  },
});

export const getResearchScope = query({
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
      .query("researchScopes")
      .withIndex("by_widget", (q) => q.eq("widgetId", args.widgetId))
      .unique();
  },
});

export const approveResearchScope = mutation({
  args: { widgetId: v.id("widgets") },
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

    await ctx.db.patch(args.widgetId, {
      status: "processing",
      updatedAt: Date.now(),
    });

    await ctx.scheduler.runAfter(0, internal.apiActions.analyzeContentAction, {
      widgetId: args.widgetId,
      topic: widget.researchTopic,
    });

    return args.widgetId;
  },
});

export const storeAnalysisResult = internalMutation({
  args: {
    widgetId: v.id("widgets"),
    problemPrevalence: v.number(),
    emotionalIntensity: v.number(),
    sentimentBreakdown: v.object({
      positive: v.number(),
      neutral: v.number(),
      negative: v.number(),
      anxiety: v.number(),
      confusion: v.number(),
      frustration: v.number(),
      excitement: v.number(),
    }),
    momentum: v.array(v.object({ month: v.string(), score: v.number() })),
    consensus: v.number(),
    controversy: v.number(),
    purchaseIntent: v.number(),
    switchingIntent: v.number(),
    barriers: v.array(v.object({ name: v.string(), score: v.number() })),
    opportunityScore: v.number(),
    themes: v.array(
      v.object({
        name: v.string(),
        prevalence: v.number(),
        emotionalIntensity: v.number(),
        sentiment: v.string(),
        purchaseIntent: v.number(),
        switchingIntent: v.number(),
        opportunityScore: v.number(),
      })
    ),
    painPoints: v.array(v.string()),
    competitiveMentions: v.array(v.string()),
    trendIndicators: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const { widgetId, ...analysisFields } = args;

    await ctx.db.insert("analysisResults", {
      widgetId,
      ...analysisFields,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    await ctx.db.patch(widgetId, {
      status: "complete",
      updatedAt: Date.now(),
    });
  },
});

export const deleteWidget = mutation({
  args: { widgetId: v.id("widgets") },
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

    const scope = await ctx.db
      .query("researchScopes")
      .withIndex("by_widget", (q) => q.eq("widgetId", args.widgetId))
      .unique();
    if (scope) await ctx.db.delete(scope._id);

    const analysis = await ctx.db
      .query("analysisResults")
      .withIndex("by_widget", (q) => q.eq("widgetId", args.widgetId))
      .unique();
    if (analysis) await ctx.db.delete(analysis._id);

    const widgetExports = await ctx.db
      .query("exports")
      .withIndex("by_widget", (q) => q.eq("widgetId", args.widgetId))
      .take(50);
    for (const exp of widgetExports) await ctx.db.delete(exp._id);

    await ctx.db.delete(args.widgetId);
  },
});
