/**
 * OpenAI service module.
 * Returns mock data when OPENAI_API_KEY is absent.
 * Structure supports real OpenAI calls with zero UI changes.
 */

import {
  MOCK_ANALYSIS,
  MOCK_SCOPE,
  getMockScopeForTopic,
  getMockAnalysisForTopic,
} from "@/lib/mock-data";
import {
  researchScopeOutputSchema,
  analysisResultOutputSchema,
  type ResearchScopeOutput,
  type AnalysisResultOutput,
} from "@/types";

function hasOpenAIKey(): boolean {
  return Boolean(process.env.OPENAI_API_KEY);
}

export async function generateResearchScopeFromAI(
  topic: string,
  prompt: string
): Promise<ResearchScopeOutput> {
  if (!hasOpenAIKey()) {
    return getMockScopeForTopic(topic) ?? MOCK_SCOPE;
  }

  try {
    // Real OpenAI call structure — wire up when key is available
    const { default: OpenAI } = await import("openai");
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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

Return JSON with:
- suggestedThemes: array of {name, description, relevanceScore (0-100)}
- suggestedChannels: array of {name, channelId?, url?, description?}
- suggestedVideos: array of {title, videoId?, url?, channelName?, viewCount?}`,
        },
      ],
      response_format: { type: "json_object" },
    });

    const raw: unknown = JSON.parse(completion.choices[0]?.message?.content ?? "{}");
    return researchScopeOutputSchema.parse(raw);
  } catch {
    return MOCK_SCOPE;
  }
}

export async function analyzeContentFromAI(
  topic: string,
  _scope: ResearchScopeOutput
): Promise<AnalysisResultOutput> {
  if (!hasOpenAIKey()) {
    return getMockAnalysisForTopic(topic) ?? MOCK_ANALYSIS;
  }

  try {
    const { default: OpenAI } = await import("openai");
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are a consumer intelligence analyst. Return structured market intelligence JSON.",
        },
        {
          role: "user",
          content: `Analyze YouTube consumer sentiment for: ${topic}
Return JSON matching the analysis schema with all 10 market metrics.`,
        },
      ],
      response_format: { type: "json_object" },
    });

    const raw: unknown = JSON.parse(completion.choices[0]?.message?.content ?? "{}");
    return analysisResultOutputSchema.parse(raw);
  } catch {
    return getMockAnalysisForTopic(topic) ?? MOCK_ANALYSIS;
  }
}
