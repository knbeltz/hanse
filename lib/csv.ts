import Papa from "papaparse";
import type { AnalysisResult, ExportRow } from "@/types";

export function buildExportRows(analysis: AnalysisResult): ExportRow[] {
  return analysis.themes.map((theme, index) => ({
    theme: theme.name,
    prevalence: theme.prevalence,
    emotionalIntensity: theme.emotionalIntensity,
    sentiment: theme.sentiment,
    purchaseIntent: theme.purchaseIntent,
    switchingIntent: theme.switchingIntent,
    barrier: analysis.barriers[index]?.name ?? "",
    opportunityScore: theme.opportunityScore,
  }));
}

export function exportToCsv(analysis: AnalysisResult, widgetName: string): void {
  const rows = buildExportRows(analysis);

  const csv = Papa.unparse(rows, {
    header: true,
    columns: [
      "theme",
      "prevalence",
      "emotionalIntensity",
      "sentiment",
      "purchaseIntent",
      "switchingIntent",
      "barrier",
      "opportunityScore",
    ],
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `${widgetName.replace(/\s+/g, "_")}_intelligence.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
