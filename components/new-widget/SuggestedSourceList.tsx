import { Video, Users } from "lucide-react";
import type { SuggestedChannel, SuggestedVideo } from "@/types";

interface SuggestedSourceListProps {
  channels: SuggestedChannel[];
  videos: SuggestedVideo[];
}

function formatViewCount(count?: number): string {
  if (!count) return "";
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M views`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(0)}K views`;
  return `${count} views`;
}

export function SuggestedSourceList({ channels, videos }: SuggestedSourceListProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <section>
        <h4 className="flex items-center gap-2 text-xs font-medium text-hanse-muted uppercase tracking-widest mb-3">
          <Users className="size-3.5" />
          Suggested Channels ({channels.length})
        </h4>
        <ul className="space-y-2">
          {channels.map((channel, index) => (
            <li key={index} className="bg-parchment border border-ink p-3">
              <p className="font-medium text-sm text-ink">{channel.name}</p>
              {channel.description && (
                <p className="text-xs text-hanse-muted mt-0.5 leading-relaxed">
                  {channel.description}
                </p>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h4 className="flex items-center gap-2 text-xs font-medium text-hanse-muted uppercase tracking-widest mb-3">
          <Video className="size-3.5" />
          Suggested Videos ({videos.length})
        </h4>
        <ul className="space-y-2">
          {videos.map((video, index) => (
            <li key={index} className="bg-parchment border border-ink p-3">
              <p className="font-medium text-sm text-ink leading-snug">{video.title}</p>
              <div className="flex items-center gap-2 mt-1 text-xs text-hanse-muted">
                {video.channelName && <span>{video.channelName}</span>}
                {video.viewCount && (
                  <>
                    <span>·</span>
                    <span>{formatViewCount(video.viewCount)}</span>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
