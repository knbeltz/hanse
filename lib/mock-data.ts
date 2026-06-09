import type {
  AnalysisResult,
  ResearchScopeOutput,
  SuggestedChannel,
  SuggestedTheme,
  SuggestedVideo,
} from "@/types";

export const MOCK_TOPIC = "AI Coding Assistants";

export const MOCK_THEMES: SuggestedTheme[] = [
  {
    name: "Trust in AI-generated code",
    description:
      "Discussions around reliability, accuracy, and developer confidence in code produced by AI assistants",
    relevanceScore: 92,
  },
  {
    name: "Debugging frustrations",
    description:
      "Pain points when AI-produced code introduces subtle bugs or requires extensive debugging",
    relevanceScore: 87,
  },
  {
    name: "Productivity improvements",
    description:
      "Positive experiences with speed gains, boilerplate reduction, and workflow acceleration",
    relevanceScore: 84,
  },
  {
    name: "Cost concerns",
    description:
      "Debates around subscription pricing, ROI justification, and enterprise licensing models",
    relevanceScore: 71,
  },
  {
    name: "Learning and skill erosion",
    description:
      "Concerns that AI tools may reduce developers' ability to build foundational skills",
    relevanceScore: 68,
  },
];

export const MOCK_CHANNELS: SuggestedChannel[] = [
  {
    name: "Theo",
    channelId: "UCbRP3rVRCCCtN8ZAc5E8rlA",
    url: "https://youtube.com/@t3dotgg",
    description: "Web dev commentary with strong opinions on tooling",
  },
  {
    name: "Fireship",
    channelId: "UCsBjURrPoezykLs9EqgamOA",
    url: "https://youtube.com/@Fireship",
    description: "Fast-paced tech explainers",
  },
  {
    name: "ThePrimeagen",
    channelId: "UC8ENHE5xdFSwx71u3fDH5Xw",
    url: "https://youtube.com/@ThePrimeTimeagen",
    description: "Performance-focused developer with hot takes",
  },
  {
    name: "Coding with Lewis",
    channelId: "UCVTlvUkGslCV_h-nSAId8Sw",
    url: "https://youtube.com/@CodingWithLewis",
    description: "Practical tutorials and AI tool reviews",
  },
];

export const MOCK_VIDEOS: SuggestedVideo[] = [
  {
    title: "Is GitHub Copilot Worth It in 2024?",
    channelName: "Fireship",
    viewCount: 1240000,
  },
  {
    title: "AI Coding is RUINING junior developers",
    channelName: "ThePrimeagen",
    viewCount: 890000,
  },
  {
    title: "I tried every AI coding tool so you don't have to",
    channelName: "Theo",
    viewCount: 720000,
  },
  {
    title: "Cursor vs Copilot vs Codeium — which is best?",
    channelName: "Coding with Lewis",
    viewCount: 560000,
  },
  {
    title: "The dark side of AI code generation",
    channelName: "ThePrimeagen",
    viewCount: 430000,
  },
  {
    title: "How AI coding assistants ACTUALLY work",
    channelName: "Fireship",
    viewCount: 380000,
  },
];

export const MOCK_SCOPE: ResearchScopeOutput = {
  suggestedThemes: MOCK_THEMES,
  suggestedChannels: MOCK_CHANNELS,
  suggestedVideos: MOCK_VIDEOS,
};

export const MOCK_ANALYSIS: Omit<AnalysisResult, "_id" | "widgetId" | "createdAt" | "updatedAt"> =
  {
    problemPrevalence: 74,
    emotionalIntensity: 3.8,
    sentimentBreakdown: {
      positive: 28,
      neutral: 19,
      negative: 17,
      anxiety: 12,
      confusion: 8,
      frustration: 11,
      excitement: 5,
    },
    momentum: [
      { month: "Jan", score: 48 },
      { month: "Feb", score: 53 },
      { month: "Mar", score: 61 },
      { month: "Apr", score: 67 },
      { month: "May", score: 74 },
      { month: "Jun", score: 81 },
    ],
    consensus: 58,
    controversy: 71,
    purchaseIntent: 63,
    switchingIntent: 44,
    barriers: [
      { name: "Trust deficit", score: 82 },
      { name: "High subscription cost", score: 68 },
      { name: "Security / IP concerns", score: 61 },
      { name: "Context window limits", score: 54 },
      { name: "Onboarding complexity", score: 38 },
    ],
    opportunityScore: 77,
    themes: [
      {
        name: "Trust in AI-generated code",
        prevalence: 74,
        emotionalIntensity: 4.2,
        sentiment: "Anxiety",
        purchaseIntent: 41,
        switchingIntent: 38,
        opportunityScore: 68,
      },
      {
        name: "Debugging frustrations",
        prevalence: 68,
        emotionalIntensity: 4.5,
        sentiment: "Frustration",
        purchaseIntent: 29,
        switchingIntent: 52,
        opportunityScore: 81,
      },
      {
        name: "Productivity improvements",
        prevalence: 61,
        emotionalIntensity: 2.8,
        sentiment: "Excitement",
        purchaseIntent: 79,
        switchingIntent: 18,
        opportunityScore: 72,
      },
      {
        name: "Cost concerns",
        prevalence: 54,
        emotionalIntensity: 3.4,
        sentiment: "Negative",
        purchaseIntent: 44,
        switchingIntent: 61,
        opportunityScore: 59,
      },
      {
        name: "Learning and skill erosion",
        prevalence: 47,
        emotionalIntensity: 3.9,
        sentiment: "Anxiety",
        purchaseIntent: 31,
        switchingIntent: 29,
        opportunityScore: 64,
      },
    ],
    painPoints: [
      "AI confidently produces incorrect code without warning",
      "Subscriptions are expensive for individual developers",
      "Context windows truncate large codebases",
      "Code suggestions lack project-specific conventions",
      "Difficult to audit AI-generated code in code reviews",
    ],
    competitiveMentions: [
      "GitHub Copilot — market leader, mixed reviews on accuracy",
      "Cursor — high praise for deep codebase context",
      "Codeium — growing free tier, positioned as Copilot alternative",
      "Amazon CodeWhisperer — enterprise security focus",
      "Tabnine — privacy-first, local model option",
    ],
    trendIndicators: [
      "Sharp increase in 'Cursor vs Copilot' search queries",
      "Growing enterprise security audit requirements mentioned in threads",
      "Shift from 'does it work' to 'how do I review it' maturity signal",
      "Increasing demand for offline / local AI coding tools",
    ],
  };

export function getMockScopeForTopic(topic: string): ResearchScopeOutput {
  const isAiCoding =
    topic.toLowerCase().includes("ai") ||
    topic.toLowerCase().includes("coding") ||
    topic.toLowerCase().includes("assistant");

  if (isAiCoding) return MOCK_SCOPE;

  return {
    suggestedThemes: [
      {
        name: `Consumer pain points in ${topic}`,
        description: `Primary complaints and unmet needs discussed in ${topic} communities`,
        relevanceScore: 88,
      },
      {
        name: "Product quality perceptions",
        description: "How users evaluate and compare product quality in this category",
        relevanceScore: 82,
      },
      {
        name: "Price sensitivity",
        description: "How pricing affects purchase decisions and brand switching",
        relevanceScore: 76,
      },
      {
        name: "Brand loyalty signals",
        description: "Indicators of customer retention and brand affinity",
        relevanceScore: 71,
      },
      {
        name: "Emerging alternatives",
        description: "New entrants and alternative solutions gaining traction",
        relevanceScore: 65,
      },
    ],
    suggestedChannels: [
      { name: "Channel A", description: `Popular ${topic} content creator` },
      { name: "Channel B", description: `${topic} reviews and commentary` },
      { name: "Channel C", description: `Consumer advice in ${topic}` },
    ],
    suggestedVideos: [
      { title: `Best ${topic} products reviewed`, channelName: "Channel A", viewCount: 450000 },
      {
        title: `${topic} — what consumers aren't being told`,
        channelName: "Channel B",
        viewCount: 310000,
      },
      { title: `I tried every ${topic} option`, channelName: "Channel C", viewCount: 280000 },
    ],
  };
}

export function getMockAnalysisForTopic(
  topic: string
): Omit<AnalysisResult, "_id" | "widgetId" | "createdAt" | "updatedAt"> {
  const isAiCoding =
    topic.toLowerCase().includes("ai") ||
    topic.toLowerCase().includes("coding") ||
    topic.toLowerCase().includes("assistant");

  if (isAiCoding) return MOCK_ANALYSIS;

  return {
    problemPrevalence: 62,
    emotionalIntensity: 3.2,
    sentimentBreakdown: {
      positive: 31,
      neutral: 22,
      negative: 18,
      anxiety: 9,
      confusion: 7,
      frustration: 9,
      excitement: 4,
    },
    momentum: [
      { month: "Jan", score: 41 },
      { month: "Feb", score: 46 },
      { month: "Mar", score: 52 },
      { month: "Apr", score: 58 },
      { month: "May", score: 62 },
      { month: "Jun", score: 67 },
    ],
    consensus: 52,
    controversy: 48,
    purchaseIntent: 55,
    switchingIntent: 37,
    barriers: [
      { name: "Price sensitivity", score: 72 },
      { name: "Lack of awareness", score: 58 },
      { name: "Distribution gaps", score: 44 },
      { name: "Trust deficit", score: 39 },
    ],
    opportunityScore: 64,
    themes: [
      {
        name: `Consumer pain points in ${topic}`,
        prevalence: 62,
        emotionalIntensity: 3.8,
        sentiment: "Frustration",
        purchaseIntent: 44,
        switchingIntent: 41,
        opportunityScore: 72,
      },
      {
        name: "Product quality perceptions",
        prevalence: 54,
        emotionalIntensity: 3.1,
        sentiment: "Neutral",
        purchaseIntent: 58,
        switchingIntent: 29,
        opportunityScore: 61,
      },
      {
        name: "Price sensitivity",
        prevalence: 49,
        emotionalIntensity: 2.9,
        sentiment: "Negative",
        purchaseIntent: 38,
        switchingIntent: 52,
        opportunityScore: 55,
      },
      {
        name: "Brand loyalty signals",
        prevalence: 41,
        emotionalIntensity: 2.4,
        sentiment: "Positive",
        purchaseIntent: 71,
        switchingIntent: 14,
        opportunityScore: 48,
      },
      {
        name: "Emerging alternatives",
        prevalence: 34,
        emotionalIntensity: 3.3,
        sentiment: "Excitement",
        purchaseIntent: 61,
        switchingIntent: 44,
        opportunityScore: 68,
      },
    ],
    painPoints: [
      "Unmet expectations around product quality",
      "High price-to-value perception gap",
      "Poor customer support experiences",
      "Lack of differentiation from competitors",
    ],
    competitiveMentions: [
      "Competitor A — perceived as market leader",
      "Competitor B — growing challenger with pricing advantage",
    ],
    trendIndicators: [
      "Growing discussion volume over last 6 months",
      "Increasing brand switching signals",
      "Rising demand for premium alternatives",
    ],
  };
}
