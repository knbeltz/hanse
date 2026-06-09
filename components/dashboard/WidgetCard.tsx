"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { ArrowRight, Trash2 } from "lucide-react";
import { WidgetStatusBadge } from "@/components/dashboard/WidgetStatusBadge";
import { DeleteWidgetDialog } from "@/components/dashboard/DeleteWidgetDialog";
import type { Id } from "@/convex/_generated/dataModel";
import type { Widget } from "@/types";

interface WidgetCardProps {
  widget: Widget;
  opportunityScore?: number;
  prevalenceScore?: number;
}

export function WidgetCard({ widget, opportunityScore, prevalenceScore }: WidgetCardProps) {
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <div className="bg-parchment border border-ink border-t-4 border-t-hanse-red hover:bg-surface transition-colors group">
        {/* Main navigable area */}
        <button
          onClick={() => router.push(`/dashboard/widgets/${widget._id}`)}
          className="w-full text-left p-5 pb-3"
        >
          <div className="flex items-start justify-between gap-2 mb-3">
            <h3 className="font-caslon text-base font-bold text-ink leading-snug line-clamp-2 group-hover:text-hanse-red transition-colors">
              {widget.name}
            </h3>
            <WidgetStatusBadge status={widget.status} />
          </div>

          <p className="text-sm text-hanse-muted line-clamp-2">{widget.researchTopic}</p>

          {widget.status === "complete" &&
            (opportunityScore !== undefined || prevalenceScore !== undefined) && (
              <div className="flex gap-4 mt-4 pt-3 border-t border-ledger">
                {opportunityScore !== undefined && (
                  <div>
                    <p className="text-xs text-hanse-muted uppercase tracking-wider">Opportunity</p>
                    <p className="text-lg font-bold text-ink font-caslon">
                      {opportunityScore}
                      <span className="text-xs font-grotesk font-normal text-hanse-muted">/100</span>
                    </p>
                  </div>
                )}
                {prevalenceScore !== undefined && (
                  <div>
                    <p className="text-xs text-hanse-muted uppercase tracking-wider">Prevalence</p>
                    <p className="text-lg font-bold text-ink font-caslon">
                      {prevalenceScore}
                      <span className="text-xs font-grotesk font-normal text-hanse-muted">%</span>
                    </p>
                  </div>
                )}
              </div>
            )}
        </button>

        {/* Card footer: timestamp + actions */}
        <div className="px-5 pb-4 flex items-center justify-between text-xs text-hanse-muted">
          <span>{formatDistanceToNow(new Date(widget.createdAt), { addSuffix: true })}</span>
          <div className="flex items-center gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowDeleteDialog(true);
              }}
              className="p-1 text-hanse-muted hover:text-hanse-red transition-colors"
              aria-label={`Delete ${widget.name}`}
            >
              <Trash2 className="size-3.5" />
            </button>
            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      <DeleteWidgetDialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        widgetId={widget._id as Id<"widgets">}
        widgetName={widget.name}
      />
    </>
  );
}
