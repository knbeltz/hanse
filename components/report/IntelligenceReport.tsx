import { ScoreCard } from "@/components/dashboard/ScoreCard";
import { ProblemPrevalenceChart } from "@/components/report/ProblemPrevalenceChart";
import { EmotionalIntensityChart } from "@/components/report/EmotionalIntensityChart";
import { SentimentBreakdownChart } from "@/components/report/SentimentBreakdownChart";
import { MomentumChart } from "@/components/report/MomentumChart";
import { BarrierChart } from "@/components/report/BarrierChart";
import { ThemeMetricsTable } from "@/components/report/ThemeMetricsTable";
import { ExportCsvButton } from "@/components/report/ExportCsvButton";
import { BorderedCard } from "@/components/ui/bordered-card";
import type { AnalysisResult } from "@/types";

interface IntelligenceReportProps {
  analysis: AnalysisResult;
  widgetName: string;
}

interface ChartSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

function ChartSection({ title, description, children }: ChartSectionProps) {
  return (
    <BorderedCard className="p-5">
      <h3 className="font-caslon text-base font-bold text-ink mb-0.5">{title}</h3>
      {description && <p className="text-xs text-hanse-muted mb-4">{description}</p>}
      <div className={description ? "" : "mt-4"}>{children}</div>
    </BorderedCard>
  );
}

export function IntelligenceReport({ analysis, widgetName }: IntelligenceReportProps) {
  return (
    <div className="space-y-8">
      {/* Export */}
      <div className="flex justify-end">
        <ExportCsvButton analysis={analysis} widgetName={widgetName} />
      </div>

      {/* Score Grid */}
      <section>
        <h2 className="font-caslon text-xl font-bold text-ink mb-4">Market Intelligence Scores</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <ScoreCard
            label="Opportunity"
            score={analysis.opportunityScore}
            description="Overall market opportunity rating"
            highlight
          />
          <ScoreCard
            label="Problem Prevalence"
            score={analysis.problemPrevalence}
            description="How widespread the problem is among consumers"
          />
          <ScoreCard
            label="Purchase Intent"
            score={analysis.purchaseIntent}
            description="Likelihood of purchase conversion signals"
          />
          <ScoreCard
            label="Switching Intent"
            score={analysis.switchingIntent}
            description="Likelihood of switching from current solution"
          />
          <ScoreCard
            label="Momentum"
            score={analysis.momentum[analysis.momentum.length - 1]?.score ?? 0}
            description="Current discussion momentum trend"
          />
          <ScoreCard
            label="Consensus"
            score={analysis.consensus}
            description="Agreement level among consumers"
          />
          <ScoreCard
            label="Controversy"
            score={analysis.controversy}
            description="Degree of polarized opinion"
          />
          <ScoreCard
            label="Emotional Intensity"
            score={Math.round(analysis.emotionalIntensity * 20)}
            description={`Avg. ${analysis.emotionalIntensity.toFixed(1)}/5 intensity score`}
          />
          <ScoreCard
            label="Barrier Score"
            score={Math.round(analysis.barriers.reduce((sum, b) => sum + b.score, 0) / Math.max(analysis.barriers.length, 1))}
            description="Average strength of purchase barriers"
          />
          <ScoreCard
            label="Prevalence"
            score={analysis.problemPrevalence}
            description="Problem prevalence across themes"
          />
        </div>
      </section>

      {/* Charts */}
      <section>
        <h2 className="font-caslon text-xl font-bold text-ink mb-4">Visual Analysis</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <ChartSection
            title="Problem Prevalence by Theme"
            description="% of discussions mentioning each theme"
          >
            <ProblemPrevalenceChart themes={analysis.themes} />
          </ChartSection>

          <ChartSection
            title="Emotional Intensity by Theme"
            description="Average intensity score (1–5)"
          >
            <EmotionalIntensityChart themes={analysis.themes} />
          </ChartSection>

          <ChartSection
            title="Sentiment Distribution"
            description="Breakdown of consumer emotional categories"
          >
            <SentimentBreakdownChart sentiment={analysis.sentimentBreakdown} />
          </ChartSection>

          <ChartSection
            title="Discussion Momentum"
            description="Monthly trend in discussion activity"
          >
            <MomentumChart momentum={analysis.momentum} />
          </ChartSection>

          <ChartSection
            title="Purchase Barriers"
            description="Key obstacles blocking consumer decisions"
          >
            <BarrierChart barriers={analysis.barriers} />
          </ChartSection>
        </div>
      </section>

      {/* Theme Metrics Table */}
      <section>
        <h2 className="font-caslon text-xl font-bold text-ink mb-4">Theme Metrics</h2>
        <ThemeMetricsTable themes={analysis.themes} />
      </section>

      {/* Qualitative Insights */}
      <div className="grid md:grid-cols-3 gap-4">
        <BorderedCard redTop className="p-5">
          <h3 className="font-caslon text-base font-bold text-ink mb-3">Pain Points</h3>
          <ul className="space-y-2">
            {analysis.painPoints.map((point, index) => (
              <li key={index} className="text-sm text-hanse-muted flex gap-2">
                <span className="text-hanse-red font-bold shrink-0">—</span>
                {point}
              </li>
            ))}
          </ul>
        </BorderedCard>

        <BorderedCard className="p-5">
          <h3 className="font-caslon text-base font-bold text-ink mb-3">
            Competitive Mentions
          </h3>
          <ul className="space-y-2">
            {analysis.competitiveMentions.map((mention, index) => (
              <li key={index} className="text-sm text-hanse-muted flex gap-2">
                <span className="text-ink font-bold shrink-0">·</span>
                {mention}
              </li>
            ))}
          </ul>
        </BorderedCard>

        <BorderedCard className="p-5">
          <h3 className="font-caslon text-base font-bold text-ink mb-3">Trend Indicators</h3>
          <ul className="space-y-2">
            {analysis.trendIndicators.map((indicator, index) => (
              <li key={index} className="text-sm text-hanse-muted flex gap-2">
                <span className="text-hanse-red font-bold shrink-0">↑</span>
                {indicator}
              </li>
            ))}
          </ul>
        </BorderedCard>
      </div>
    </div>
  );
}
