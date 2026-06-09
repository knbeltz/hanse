"use node";

import { v } from "convex/values";
import { internalAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { getMockScope, getMockAnalysis } from "./mockHelpers";

// ─── Scope Generation ────────────────────────────────────────────────────────

export const generateScopeAction = internalAction({
  args: {
    widgetId: v.id("widgets"),
    topic: v.string(),
    prompt: v.string(),
  },
  handler: async (ctx, args) => {
    const scope = await buildScope(args.topic, args.prompt);
    await ctx.runMutation(internal.widgets.storeScopeResult, {
      widgetId: args.widgetId,
      suggestedThemes: scope.suggestedThemes,
      suggestedChannels: scope.suggestedChannels,
      suggestedVideos: scope.suggestedVideos,
    });
  },
});

async function buildScope(topic: string, prompt: string) {
  const openaiKey = process.env.OPENAI_API_KEY;
  const youtubeKey = process.env.YOUTUBE_API_KEY;

  if (!openaiKey) {
    return getMockScope(topic);
  }

  try {
    const { default: OpenAI } = await import("openai");
    const client = new OpenAI({ apiKey: openaiKey });

    const completion = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are a consumer intelligence analyst. Return only valid JSON matching the requested schema.",
        },
        {
          role: "user",
          content: `Generate a YouTube research scope for this topic and prompt.
Topic: ${topic}
Prompt: ${prompt}

Return JSON with exactly these keys:
- suggestedThemes: array of {name: string, description: string, relevanceScore: number (0-100)} — 3 to 5 items
- suggestedChannels: array of {name: string, channelId?: string, url?: string, description?: string} — 3 to 5 items
- suggestedVideos: array of {title: string, videoId?: string, url?: string, channelName?: string, viewCount?: number} — 4 to 8 items`,
        },
      ],
      response_format: { type: "json_object" },
    });

    const raw: unknown = JSON.parse(
      completion.choices[0]?.message?.content ?? "{}"
    );

    const parsed = parseScopeResponse(raw);
    if (!parsed) return getMockScope(topic);

    // Augment with real YouTube videos if key is available
    if (youtubeKey && parsed.suggestedChannels.length > 0) {
      try {
        const videos = await fetchYouTubeVideos(topic, youtubeKey);
        if (videos.length > 0) {
          parsed.suggestedVideos = videos;
        }
      } catch {
        // keep AI-suggested videos on YouTube failure
      }
    }

    return parsed;
  } catch {
    return getMockScope(topic);
  }
}

async function fetchYouTubeVideos(topic: string, apiKey: string) {
  const query = encodeURIComponent(topic);
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=8&relevanceLanguage=en&key=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) return [];

  const data = (await res.json()) as {
    items?: Array<{
      id: { videoId: string };
      snippet: { title: string; channelTitle: string };
    }>;
  };

  if (!data.items?.length) return [];

  return data.items.map((item) => ({
    title: item.snippet.title,
    videoId: item.id.videoId,
    url: `https://youtube.com/watch?v=${item.id.videoId}`,
    channelName: item.snippet.channelTitle,
  }));
}

function parseScopeResponse(raw: unknown): ReturnType<typeof getMockScope> | null {
  if (typeof raw !== "object" || raw === null) return null;
  const r = raw as Record<string, unknown>;

  const themes = parseThemes(r.suggestedThemes);
  const channels = parseChannels(r.suggestedChannels);
  const videos = parseVideos(r.suggestedVideos);

  if (!themes.length || !channels.length || !videos.length) return null;

  return { suggestedThemes: themes, suggestedChannels: channels, suggestedVideos: videos };
}

function parseThemes(raw: unknown) {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter(
      (t): t is { name: string; description: string; relevanceScore: number } =>
        typeof t === "object" &&
        t !== null &&
        typeof (t as Record<string, unknown>).name === "string" &&
        typeof (t as Record<string, unknown>).description === "string" &&
        typeof (t as Record<string, unknown>).relevanceScore === "number"
    )
    .slice(0, 10);
}

function parseChannels(raw: unknown) {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter(
      (c): c is { name: string; channelId?: string; url?: string; description?: string } =>
        typeof c === "object" &&
        c !== null &&
        typeof (c as Record<string, unknown>).name === "string"
    )
    .slice(0, 8);
}

function parseVideos(raw: unknown) {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter(
      (v): v is { title: string; videoId?: string; url?: string; channelName?: string; viewCount?: number } =>
        typeof v === "object" &&
        v !== null &&
        typeof (v as Record<string, unknown>).title === "string"
    )
    .slice(0, 12);
}

// ─── Analysis Generation ─────────────────────────────────────────────────────

export const analyzeContentAction = internalAction({
  args: {
    widgetId: v.id("widgets"),
    topic: v.string(),
  },
  handler: async (ctx, args) => {
    const analysis = await buildAnalysis(args.topic);
    await ctx.runMutation(internal.widgets.storeAnalysisResult, {
      widgetId: args.widgetId,
      ...analysis,
    });
  },
});

async function buildAnalysis(topic: string) {
  const openaiKey = process.env.OPENAI_API_KEY;
  if (!openaiKey) {
    return getMockAnalysis(topic);
  }

  try {
    const { default: OpenAI } = await import("openai");
    const client = new OpenAI({ apiKey: openaiKey });

    const completion = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are a consumer intelligence analyst. Return structured market intelligence JSON. All numeric scores are 0-100 unless otherwise specified. emotionalIntensity is 1.0-5.0.",
        },
        {
          role: "user",
          content: `Analyze YouTube consumer sentiment for: "${topic}"

Return JSON with exactly these keys:
- problemPrevalence: number (0-100) — how widespread the problem/topic is in discussions
- emotionalIntensity: number (1.0-5.0) — average emotional intensity of discussions
- sentimentBreakdown: {positive, neutral, negative, anxiety, confusion, frustration, excitement} — all numbers 0-100, should sum to ~100
- momentum: array of {month: string, score: number (0-100)} — 6 months of trend data, month names like "Jan"
- consensus: number (0-100) — how much agreement exists in discussions
- controversy: number (0-100) — level of debate and disagreement
- purchaseIntent: number (0-100) — signals of intent to buy
- switchingIntent: number (0-100) — signals of intent to switch brands/products
- barriers: array of {name: string, score: number (0-100)} — top 4-5 adoption barriers
- opportunityScore: number (0-100) — overall market opportunity score
- themes: array of {name, prevalence (0-100), emotionalIntensity (1-5), sentiment (string), purchaseIntent (0-100), switchingIntent (0-100), opportunityScore (0-100)} — 4-6 items
- painPoints: array of strings — 4-6 specific consumer pain points
- competitiveMentions: array of strings — 3-5 competitive brands/products mentioned
- trendIndicators: array of strings — 3-5 trend signals observed`,
        },
      ],
      response_format: { type: "json_object" },
    });

    const raw: unknown = JSON.parse(
      completion.choices[0]?.message?.content ?? "{}"
    );

    const parsed = parseAnalysisResponse(raw);
    return parsed ?? getMockAnalysis(topic);
  } catch {
    return getMockAnalysis(topic);
  }
}

function parseAnalysisResponse(raw: unknown): ReturnType<typeof getMockAnalysis> | null {
  if (typeof raw !== "object" || raw === null) return null;
  const r = raw as Record<string, unknown>;

  const num = (key: string, fallback: number) =>
    typeof r[key] === "number" ? (r[key] as number) : fallback;

  const sentiment = r.sentimentBreakdown as Record<string, number> | undefined;
  if (!sentiment) return null;

  const momentum = Array.isArray(r.momentum)
    ? (r.momentum as Array<{ month: string; score: number }>).filter(
        (m) => typeof m.month === "string" && typeof m.score === "number"
      )
    : [];

  const barriers = Array.isArray(r.barriers)
    ? (r.barriers as Array<{ name: string; score: number }>).filter(
        (b) => typeof b.name === "string" && typeof b.score === "number"
      )
    : [];

  const themes = Array.isArray(r.themes)
    ? (r.themes as Array<Record<string, unknown>>).filter(
        (t) =>
          typeof t.name === "string" &&
          typeof t.prevalence === "number" &&
          typeof t.emotionalIntensity === "number"
      ).map((t) => ({
        name: t.name as string,
        prevalence: t.prevalence as number,
        emotionalIntensity: t.emotionalIntensity as number,
        sentiment: (t.sentiment as string) ?? "Neutral",
        purchaseIntent: (t.purchaseIntent as number) ?? 50,
        switchingIntent: (t.switchingIntent as number) ?? 50,
        opportunityScore: (t.opportunityScore as number) ?? 50,
      }))
    : [];

  if (!momentum.length || !themes.length) return null;

  return {
    problemPrevalence: num("problemPrevalence", 60),
    emotionalIntensity: num("emotionalIntensity", 3.0),
    sentimentBreakdown: {
      positive: sentiment.positive ?? 30,
      neutral: sentiment.neutral ?? 20,
      negative: sentiment.negative ?? 15,
      anxiety: sentiment.anxiety ?? 10,
      confusion: sentiment.confusion ?? 8,
      frustration: sentiment.frustration ?? 12,
      excitement: sentiment.excitement ?? 5,
    },
    momentum,
    consensus: num("consensus", 50),
    controversy: num("controversy", 50),
    purchaseIntent: num("purchaseIntent", 50),
    switchingIntent: num("switchingIntent", 40),
    barriers,
    opportunityScore: num("opportunityScore", 60),
    themes,
    painPoints: Array.isArray(r.painPoints)
      ? (r.painPoints as string[]).filter((p) => typeof p === "string")
      : [],
    competitiveMentions: Array.isArray(r.competitiveMentions)
      ? (r.competitiveMentions as string[]).filter((c) => typeof c === "string")
      : [],
    trendIndicators: Array.isArray(r.trendIndicators)
      ? (r.trendIndicators as string[]).filter((t) => typeof t === "string")
      : [],
  };
}
