"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { PageHeader } from "@/components/layout/PageHeader";
import { IntelligenceReport } from "@/components/report/IntelligenceReport";
import { WidgetStatusBadge } from "@/components/dashboard/WidgetStatusBadge";
import { LoadingState } from "@/components/ui/loading-state";
import { ErrorState } from "@/components/ui/error-state";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { ArrowLeft, RefreshCw } from "lucide-react";
import type { Widget, AnalysisResult } from "@/types";

interface PageProps {
  params: Promise<{ widgetId: string }>;
}

export default function WidgetReportPage({ params }: PageProps) {
  const { widgetId } = use(params);
  const router = useRouter();
  const widgetIdTyped = widgetId as Id<"widgets">;

  const widget = useQuery(api.widgets.getWidgetById, { widgetId: widgetIdTyped });
  const analysis = useQuery(api.analysisResults.getAnalysisResult, { widgetId: widgetIdTyped });

  const isLoadingWidget = widget === undefined;
  const isLoadingAnalysis = analysis === undefined;

  if (isLoadingWidget) {
    return (
      <div className="p-4 md:p-8 max-w-screen-xl mx-auto">
        <LoadingState message="Loading widget..." />
      </div>
    );
  }

  if (widget === null) {
    return (
      <div className="p-4 md:p-8 max-w-screen-xl mx-auto">
        <ErrorState
          title="Widget not found"
          message="This widget does not exist or you do not have access to it."
        />
        <div className="flex justify-center mt-4">
          <Button variant="secondary" onClick={() => router.push("/dashboard")} className="gap-2">
            <ArrowLeft className="size-4" /> Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const typedWidget = widget as Widget;

  return (
    <div className="p-4 md:p-8 max-w-screen-xl mx-auto">
      <div className="flex items-center gap-2 mb-6 text-sm text-hanse-muted">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/dashboard")}
          className="gap-1.5 -ml-2"
        >
          <ArrowLeft className="size-3.5" /> Dashboard
        </Button>
        <span>/</span>
        <span className="text-ink font-medium truncate">{typedWidget.name}</span>
      </div>

      <PageHeader
        title={typedWidget.name}
        subtitle={typedWidget.researchTopic}
        action={
          <div className="flex items-center gap-3">
            <WidgetStatusBadge status={typedWidget.status} />
            <span className="text-xs text-hanse-muted hidden sm:block">
              Updated {formatDistanceToNow(new Date(typedWidget.updatedAt), { addSuffix: true })}
            </span>
          </div>
        }
      />

      {typedWidget.status === "processing" && (
        <div className="border border-ink bg-parchment p-8 text-center mt-4">
          <RefreshCw className="size-8 text-hanse-red animate-spin mx-auto mb-3" />
          <p className="font-caslon text-lg font-bold text-ink mb-1">Analysis in progress</p>
          <p className="text-sm text-hanse-muted">
            Your intelligence report is being generated. This page will update automatically.
          </p>
        </div>
      )}

      {typedWidget.status === "failed" && (
        <ErrorState
          title="Analysis failed"
          message={
            typedWidget.errorMessage ??
            "The analysis encountered an error. Please try creating a new widget."
          }
        />
      )}

      {typedWidget.status === "draft" && (
        <div className="border border-ink bg-parchment p-8 text-center mt-4">
          <p className="font-caslon text-lg font-bold text-ink mb-1">Draft widget</p>
          <p className="text-sm text-hanse-muted mb-4">
            This widget has not been processed yet.
          </p>
          <Button variant="primary" onClick={() => router.push("/dashboard/new")}>
            Create new widget
          </Button>
        </div>
      )}

      {typedWidget.status === "complete" && (
        <>
          {isLoadingAnalysis && <LoadingState message="Loading intelligence report..." />}
          {!isLoadingAnalysis && analysis === null && (
            <ErrorState
              title="Report unavailable"
              message="The analysis result could not be loaded. Please refresh the page."
            />
          )}
          {!isLoadingAnalysis && analysis !== null && (
            <IntelligenceReport
              analysis={analysis as AnalysisResult}
              widgetName={typedWidget.name}
            />
          )}
        </>
      )}
    </div>
  );
}
