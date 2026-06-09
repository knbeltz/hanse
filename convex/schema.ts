import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkUserId: v.string(),
    email: v.string(),
    name: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_clerk_id", ["clerkUserId"]),

  widgets: defineTable({
    userId: v.id("users"),
    name: v.string(),
    researchTopic: v.string(),
    researchPrompt: v.string(),
    status: v.union(
      v.literal("draft"),
      v.literal("scope_generated"),
      v.literal("processing"),
      v.literal("complete"),
      v.literal("failed")
    ),
    createdAt: v.number(),
    updatedAt: v.number(),
    errorMessage: v.optional(v.string()),
  }).index("by_user", ["userId"]),

  researchScopes: defineTable({
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
    validationStatus: v.union(v.literal("valid"), v.literal("invalid")),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_widget", ["widgetId"]),

  analysisResults: defineTable({
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
    momentum: v.array(
      v.object({
        month: v.string(),
        score: v.number(),
      })
    ),
    consensus: v.number(),
    controversy: v.number(),
    purchaseIntent: v.number(),
    switchingIntent: v.number(),
    barriers: v.array(
      v.object({
        name: v.string(),
        score: v.number(),
      })
    ),
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
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_widget", ["widgetId"]),

  exports: defineTable({
    widgetId: v.id("widgets"),
    userId: v.id("users"),
    exportType: v.string(),
    createdAt: v.number(),
  }).index("by_widget", ["widgetId"]),
});
