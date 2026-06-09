import type { SuggestedTheme } from "@/types";

interface SuggestedThemeListProps {
  themes: SuggestedTheme[];
}

export function SuggestedThemeList({ themes }: SuggestedThemeListProps) {
  return (
    <ul className="space-y-3">
      {themes.map((theme, index) => (
        <li key={index} className="flex gap-3 bg-parchment border border-ink p-4">
          <div className="w-6 h-6 border border-hanse-red text-hanse-red flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
            {index + 1}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <p className="font-medium text-sm text-ink">{theme.name}</p>
              <span className="text-xs text-hanse-muted shrink-0">
                {theme.relevanceScore}% relevance
              </span>
            </div>
            <p className="text-xs text-hanse-muted leading-relaxed">{theme.description}</p>
          </div>
          <div className="shrink-0 w-1.5 self-stretch">
            <div
              className="h-full bg-hanse-red opacity-80"
              style={{ opacity: theme.relevanceScore / 100 }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
