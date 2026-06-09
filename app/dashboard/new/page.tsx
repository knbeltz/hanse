"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { PageHeader } from "@/components/layout/PageHeader";
import { StepIndicator } from "@/components/new-widget/StepIndicator";
import { NewWidgetForm } from "@/components/new-widget/NewWidgetForm";
import { ResearchScopeReview } from "@/components/new-widget/ResearchScopeReview";
import { LoadingState } from "@/components/ui/loading-state";
import { ErrorState } from "@/components/ui/error-state";
import type { NewWidgetFormValues } from "@/types";

const STEPS = [
  { number: 1, label: "Details" },
  { number: 2, label: "Scope" },
  { number: 3, label: "Review" },
  { number: 4, label: "Analyze" },
];

type Step = 1 | 2 | 3 | 4;

export default function NewWidgetPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [widgetId, setWidgetId] = useState<Id<"widgets"> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const createWidgetDraft = useMutation(api.widgets.createWidgetDraft);
  const generateResearchScope = useMutation(api.widgets.generateResearchScope);
  const approveResearchScope = useMutation(api.widgets.approveResearchScope);
  const researchScope = useQuery(
    api.widgets.getResearchScope,
    widgetId ? { widgetId } : "skip"
  );

  useEffect(() => {
    if (step === 2 && researchScope) {
      setStep(3);
    }
  }, [step, researchScope]);

  async function handleFormSubmit(values: NewWidgetFormValues) {
    setError(null);
    setStep(2);
    try {
      const newWidgetId = await createWidgetDraft({
        name: values.name,
        researchTopic: values.researchTopic,
        researchPrompt: values.researchPrompt,
      });
      setWidgetId(newWidgetId as Id<"widgets">);

      await generateResearchScope({
        widgetId: newWidgetId as Id<"widgets">,
      });
      // step advances to 3 reactively via useEffect when researchScope query resolves
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStep(1);
    }
  }

  async function handleApproveScope() {
    if (!widgetId) return;
    setError(null);
    setStep(4);
    try {
      await approveResearchScope({ widgetId });
      router.push(`/dashboard/widgets/${widgetId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed. Please try again.");
      setStep(3);
    }
  }

  return (
    <div className="p-4 md:p-8 max-w-screen-xl mx-auto">
      <PageHeader
        title="New Research Widget"
        subtitle="Define your topic, review the scope, and generate consumer intelligence"
      />

      <div className="mb-8">
        <StepIndicator steps={STEPS} currentStep={step} />
      </div>

      {error && (
        <div className="mb-6">
          <ErrorState title="Error" message={error} />
        </div>
      )}

      {step === 1 && (
        <div className="max-w-xl">
          <div className="mb-6">
            <h2 className="font-caslon text-xl font-bold text-ink mb-1">Widget Details</h2>
            <p className="text-sm text-hanse-muted">
              Give your widget a name and describe what you want to research.
            </p>
          </div>
          <NewWidgetForm onSubmit={handleFormSubmit} />
        </div>
      )}

      {step === 2 && (
        <LoadingState message="Generating research scope from your prompt..." />
      )}

      {step === 3 && researchScope && (
        <div className="max-w-3xl">
          <div className="mb-6">
            <h2 className="font-caslon text-xl font-bold text-ink mb-1">Review Research Scope</h2>
            <p className="text-sm text-hanse-muted">
              Hanse has suggested the following themes, channels, and videos for your research.
            </p>
          </div>
          <ResearchScopeReview
            themes={researchScope.suggestedThemes}
            channels={researchScope.suggestedChannels}
            videos={researchScope.suggestedVideos}
            onApprove={handleApproveScope}
          />
        </div>
      )}

      {step === 3 && !researchScope && (
        <LoadingState message="Loading research scope..." />
      )}

      {step === 4 && (
        <LoadingState message="Running intelligence analysis. This may take a moment..." />
      )}
    </div>
  );
}
