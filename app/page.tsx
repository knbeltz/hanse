import Link from "next/link";
import { BarChart2, Brain, Video, ArrowRight, TrendingUp, Users, Target } from "lucide-react";

function ScorePreview({ label, value, unit = "" }: { label: string; value: number; unit?: string }) {
  return (
    <div className="bg-parchment border border-ink p-4">
      <p className="text-xs font-medium text-hanse-muted uppercase tracking-widest mb-1">{label}</p>
      <p className="font-caslon text-3xl font-bold text-ink">
        {value}
        <span className="text-base font-grotesk font-normal text-hanse-muted">{unit}</span>
      </p>
      <div className="mt-2 h-1 bg-ledger">
        <div className="h-full bg-hanse-red" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-parchment border border-ink p-6">
      <div className="w-10 h-10 border border-hanse-red flex items-center justify-center mb-4">
        <Icon className="size-5 text-hanse-red" />
      </div>
      <h3 className="font-caslon text-lg font-bold text-ink mb-2">{title}</h3>
      <p className="text-sm text-hanse-muted leading-relaxed">{description}</p>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-hanse-bg font-grotesk">
      {/* Top nav */}
      <header className="border-b border-ink bg-parchment">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between gap-4">
          <span className="font-caslon text-xl font-bold text-ink tracking-tight">Hanse</span>
          <nav className="flex items-center gap-2">
            <Link
              href="/sign-in"
              className="px-4 py-1.5 text-sm font-medium text-ink border border-ink hover:bg-surface transition-colors"
            >
              Log In
            </Link>
            <Link
              href="/sign-up"
              className="px-4 py-1.5 text-sm font-medium bg-hanse-red text-parchment border border-hanse-red hover:bg-ink hover:border-ink transition-colors"
            >
              Sign Up
            </Link>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="border-b border-ledger bg-parchment">
          <div className="max-w-screen-xl mx-auto px-4 md:px-8 py-20 md:py-32">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 border border-hanse-red px-3 py-1 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-hanse-red" />
                <span className="text-xs font-medium text-hanse-red uppercase tracking-widest">
                  Consumer Intelligence Platform
                </span>
              </div>
              <h1 className="font-caslon text-4xl md:text-6xl font-bold text-ink leading-[1.1] tracking-tight mb-6">
                Quantify What Consumers Actually Feel
              </h1>
              <p className="text-lg text-hanse-muted leading-relaxed mb-10 max-w-2xl">
                Hanse turns YouTube discussions into structured market intelligence. Generate
                dashboards with sentiment scores, momentum trends, opportunity ratings, and
                actionable consumer insights — powered by AI analysis.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/sign-up"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-hanse-red text-parchment border border-hanse-red hover:bg-ink hover:border-ink transition-colors font-medium"
                >
                  Start Your First Widget
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/sign-in"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-parchment text-ink border border-ink hover:bg-ink hover:text-parchment transition-colors font-medium"
                >
                  Log In
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Metrics Preview */}
        <section className="border-b border-ledger bg-hanse-bg">
          <div className="max-w-screen-xl mx-auto px-4 md:px-8 py-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-ledger" />
              <span className="text-xs font-medium text-hanse-muted uppercase tracking-widest">
                Sample Output
              </span>
              <div className="h-px flex-1 bg-ledger" />
            </div>
            <h2 className="font-caslon text-2xl font-bold text-ink text-center mb-2">
              AI Coding Assistants — Sample Intelligence Report
            </h2>
            <p className="text-sm text-hanse-muted text-center mb-8">
              10 structured market metrics generated from YouTube discussion analysis
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              <ScorePreview label="Opportunity Score" value={77} unit="/100" />
              <ScorePreview label="Problem Prevalence" value={74} unit="%" />
              <ScorePreview label="Purchase Intent" value={63} unit="%" />
              <ScorePreview label="Controversy" value={71} unit="/100" />
              <ScorePreview label="Momentum" value={81} unit="/100" />
              <ScorePreview label="Consensus" value={58} unit="/100" />
              <ScorePreview label="Switching Intent" value={44} unit="%" />
              <ScorePreview label="Barrier Score" value={61} unit="/100" />
              <ScorePreview label="Sentiment: Positive" value={28} unit="%" />
              <ScorePreview label="Emotional Intensity" value={76} unit="/100" />
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-b border-ledger bg-parchment">
          <div className="max-w-screen-xl mx-auto px-4 md:px-8 py-16">
            <h2 className="font-caslon text-3xl font-bold text-ink mb-10">
              Intelligence Built for Serious Research
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <FeatureCard
                icon={Video}
                title="YouTube Analysis"
                description="Analyze discussions, comments, and transcripts from the most relevant YouTube content in your niche."
              />
              <FeatureCard
                icon={Brain}
                title="AI-Powered Intelligence"
                description="GPT-4 extracts themes, sentiment signals, and purchase intent patterns from unstructured consumer language."
              />
              <FeatureCard
                icon={Target}
                title="10 Market Metrics"
                description="Prevalence, sentiment, momentum, barriers, controversy, purchase intent, opportunity — all in one dashboard."
              />
              <FeatureCard
                icon={TrendingUp}
                title="Trend Momentum"
                description="Track how consumer sentiment is evolving month-over-month to catch emerging signals early."
              />
              <FeatureCard
                icon={Users}
                title="Consumer Voice"
                description="Ground your strategy in what real consumers say, not surveys or assumptions."
              />
              <FeatureCard
                icon={BarChart2}
                title="Exportable Reports"
                description="Export your intelligence dashboards as CSV for use in spreadsheets, presentations, or data pipelines."
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-ink">
          <div className="max-w-screen-xl mx-auto px-4 md:px-8 py-20 text-center">
            <h2 className="font-caslon text-3xl md:text-4xl font-bold text-parchment mb-4">
              Stop Guessing. Start Knowing.
            </h2>
            <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.7)" }}>
              Create your first research widget in minutes and get a complete consumer intelligence
              report from YouTube discussions.
            </p>
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 px-8 py-3 bg-hanse-red text-parchment border border-hanse-red hover:bg-parchment hover:text-ink hover:border-parchment transition-colors font-medium text-base"
            >
              Get Started Free
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-ink bg-parchment">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-hanse-muted">
          <span className="font-caslon font-bold text-ink text-sm">Hanse</span>
          <span>Consumer Intelligence Platform — Built for market researchers and product teams</span>
        </div>
      </footer>
    </div>
  );
}
