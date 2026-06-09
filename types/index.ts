import { z } from "zod";

// ─── Widget Status ──────────────────────────────────────────────────────────

export const WIDGET_STATUSES = [
  "draft",
  "scope_generated",
  "processing",
  "complete",
  "failed",
] as const;

export type WidgetStatus = (typeof WIDGET_STATUSES)[number];

// ─── Core Domain Types ──────────────────────────────────────────────────────

export interface Widget {
  _id: string;
  userId: string;
  name: string;
  researchTopic: string;
  researchPrompt: string;
  status: WidgetStatus;
  createdAt: number;
  updatedAt: number;
  errorMessage?: string;
}

export interface SuggestedTheme {
  name: string;
  description: string;
  relevanceScore: number;
}

export interface SuggestedChannel {
  name: string;
  channelId?: string;
  url?: string;
  description?: string;
}

export interface SuggestedVideo {
  title: string;
  videoId?: string;
  url?: string;
  channelName?: string;
  viewCount?: number;
}

export interface ResearchScope {
  _id: string;
  widgetId: string;
  suggestedThemes: SuggestedTheme[];
  suggestedChannels: SuggestedChannel[];
  suggestedVideos: SuggestedVideo[];
  validationStatus: "valid" | "invalid";
  createdAt: number;
  updatedAt: number;
}

export interface SentimentBreakdown {
  positive: number;
  neutral: number;
  negative: number;
  anxiety: number;
  confusion: number;
  frustration: number;
  excitement: number;
}

export interface MomentumPoint {
  month: string;
  score: number;
}

export interface BarrierMetric {
  name: string;
  score: number;
}

export interface ThemeMetric {
  name: string;
  prevalence: number;
  emotionalIntensity: number;
  sentiment: string;
  purchaseIntent: number;
  switchingIntent: number;
  opportunityScore: number;
}

export interface AnalysisResult {
  _id: string;
  widgetId: string;
  problemPrevalence: number;
  emotionalIntensity: number;
  sentimentBreakdown: SentimentBreakdown;
  momentum: MomentumPoint[];
  consensus: number;
  controversy: number;
  purchaseIntent: number;
  switchingIntent: number;
  barriers: BarrierMetric[];
  opportunityScore: number;
  themes: ThemeMetric[];
  painPoints: string[];
  competitiveMentions: string[];
  trendIndicators: string[];
  createdAt: number;
  updatedAt: number;
}

export interface ExportRow {
  theme: string;
  prevalence: number;
  emotionalIntensity: number;
  sentiment: string;
  purchaseIntent: number;
  switchingIntent: number;
  barrier: string;
  opportunityScore: number;
}

// ─── Zod Schemas ────────────────────────────────────────────────────────────

export const newWidgetFormSchema = z.object({
  name: z
    .string()
    .min(2, "Widget name must be at least 2 characters")
    .max(80, "Widget name must be under 80 characters"),
  researchTopic: z
    .string()
    .min(3, "Research topic must be at least 3 characters")
    .max(120, "Research topic must be under 120 characters"),
  researchPrompt: z
    .string()
    .min(10, "Research prompt must be at least 10 characters")
    .max(2000, "Research prompt must be under 2000 characters"),
});

export type NewWidgetFormValues = z.infer<typeof newWidgetFormSchema>;

export const suggestedThemeSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  relevanceScore: z.number().min(0).max(100),
});

export const suggestedChannelSchema = z.object({
  name: z.string().min(1),
  channelId: z.string().optional(),
  url: z.string().optional(),
  description: z.string().optional(),
});

export const suggestedVideoSchema = z.object({
  title: z.string().min(1),
  videoId: z.string().optional(),
  url: z.string().optional(),
  channelName: z.string().optional(),
  viewCount: z.number().optional(),
});

export const researchScopeOutputSchema = z.object({
  suggestedThemes: z.array(suggestedThemeSchema).min(1).max(10),
  suggestedChannels: z.array(suggestedChannelSchema).min(1).max(8),
  suggestedVideos: z.array(suggestedVideoSchema).min(1).max(12),
});

export type ResearchScopeOutput = z.infer<typeof researchScopeOutputSchema>;

export const sentimentBreakdownSchema = z.object({
  positive: z.number().min(0).max(100),
  neutral: z.number().min(0).max(100),
  negative: z.number().min(0).max(100),
  anxiety: z.number().min(0).max(100),
  confusion: z.number().min(0).max(100),
  frustration: z.number().min(0).max(100),
  excitement: z.number().min(0).max(100),
});

export const momentumPointSchema = z.object({
  month: z.string(),
  score: z.number().min(0).max(100),
});

export const barrierMetricSchema = z.object({
  name: z.string(),
  score: z.number().min(0).max(100),
});

export const themeMetricSchema = z.object({
  name: z.string(),
  prevalence: z.number().min(0).max(100),
  emotionalIntensity: z.number().min(1).max(5),
  sentiment: z.string(),
  purchaseIntent: z.number().min(0).max(100),
  switchingIntent: z.number().min(0).max(100),
  opportunityScore: z.number().min(0).max(100),
});

export const analysisResultOutputSchema = z.object({
  problemPrevalence: z.number().min(0).max(100),
  emotionalIntensity: z.number().min(1).max(5),
  sentimentBreakdown: sentimentBreakdownSchema,
  momentum: z.array(momentumPointSchema),
  consensus: z.number().min(0).max(100),
  controversy: z.number().min(0).max(100),
  purchaseIntent: z.number().min(0).max(100),
  switchingIntent: z.number().min(0).max(100),
  barriers: z.array(barrierMetricSchema),
  opportunityScore: z.number().min(0).max(100),
  themes: z.array(themeMetricSchema),
  painPoints: z.array(z.string()),
  competitiveMentions: z.array(z.string()),
  trendIndicators: z.array(z.string()),
});

export type AnalysisResultOutput = z.infer<typeof analysisResultOutputSchema>;

export const exportRowSchema = z.object({
  theme: z.string(),
  prevalence: z.number(),
  emotionalIntensity: z.number(),
  sentiment: z.string(),
  purchaseIntent: z.number(),
  switchingIntent: z.number(),
  barrier: z.string(),
  opportunityScore: z.number(),
});
