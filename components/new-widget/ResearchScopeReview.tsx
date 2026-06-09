import { Button } from "@/components/ui/button";
import { SuggestedThemeList } from "@/components/new-widget/SuggestedThemeList";
import { SuggestedSourceList } from "@/components/new-widget/SuggestedSourceList";
import type { SuggestedTheme, SuggestedChannel, SuggestedVideo } from "@/types";

interface ResearchScopeReviewProps {
  themes: SuggestedTheme[];
  channels: SuggestedChannel[];
  videos: SuggestedVideo[];
  onApprove: () => void;
  isLoading?: boolean;
}

export function ResearchScopeReview({
  themes,
  channels,
  videos,
  onApprove,
  isLoading = false,
}: ResearchScopeReviewProps) {
  return (
    <div className="space-y-8">
      <div className="bg-ledger border border-ink px-4 py-3">
        <p className="text-sm text-ink font-medium">Research scope generated.</p>
        <p className="text-xs text-hanse-muted mt-0.5">
          Review the suggested themes and sources below, then approve to begin analysis.
        </p>
      </div>

      <section>
        <h3 className="font-caslon text-lg font-bold text-ink mb-4">
          Research Themes ({themes.length})
        </h3>
        <SuggestedThemeList themes={themes} />
      </section>

      <section>
        <h3 className="font-caslon text-lg font-bold text-ink mb-4">YouTube Sources</h3>
        <SuggestedSourceList channels={channels} videos={videos} />
      </section>

      <div className="pt-2 border-t border-ledger">
        <Button
          variant="primary"
          size="lg"
          onClick={onApprove}
          disabled={isLoading}
          className="w-full sm:w-auto"
        >
          {isLoading ? "Starting analysis..." : "Approve & Start Analysis"}
        </Button>
      </div>
    </div>
  );
}
