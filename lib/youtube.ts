/**
 * YouTube service module.
 * Returns mock data when YOUTUBE_API_KEY is absent.
 */

import { MOCK_VIDEOS, MOCK_CHANNELS, getMockScopeForTopic } from "@/lib/mock-data";
import type { SuggestedVideo, SuggestedChannel } from "@/types";

function hasYouTubeKey(): boolean {
  return Boolean(process.env.YOUTUBE_API_KEY);
}

export const NO_RESULTS_MESSAGE =
  "No relevant YouTube content was found. Please refine your research topic.";

export async function searchVideos(
  topic: string,
  _channelNames: string[]
): Promise<SuggestedVideo[]> {
  if (!hasYouTubeKey()) {
    const scope = getMockScopeForTopic(topic);
    return scope.suggestedVideos;
  }

  try {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const query = encodeURIComponent(topic);
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=12&key=${apiKey}`;

    const res = await fetch(url);
    if (!res.ok) return MOCK_VIDEOS;

    const data = (await res.json()) as {
      items?: Array<{
        id: { videoId: string };
        snippet: { title: string; channelTitle: string };
      }>;
    };

    if (!data.items?.length) {
      throw new Error(NO_RESULTS_MESSAGE);
    }

    return data.items.map((item) => ({
      title: item.snippet.title,
      videoId: item.id.videoId,
      url: `https://youtube.com/watch?v=${item.id.videoId}`,
      channelName: item.snippet.channelTitle,
    }));
  } catch (err) {
    if (err instanceof Error && err.message === NO_RESULTS_MESSAGE) throw err;
    return MOCK_VIDEOS;
  }
}

export async function fetchSuggestedChannels(topic: string): Promise<SuggestedChannel[]> {
  if (!hasYouTubeKey()) {
    const scope = getMockScopeForTopic(topic);
    return scope.suggestedChannels;
  }

  return MOCK_CHANNELS;
}
