"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { exportToCsv } from "@/lib/csv";
import { Button } from "@/components/ui/button";
import type { AnalysisResult } from "@/types";

interface ExportCsvButtonProps {
  analysis: AnalysisResult;
  widgetName: string;
}

export function ExportCsvButton({ analysis, widgetName }: ExportCsvButtonProps) {
  const [isExporting, setIsExporting] = useState(false);
  const createExportRecord = useMutation(api.exports.createExportRecord);

  async function handleExport() {
    setIsExporting(true);
    try {
      exportToCsv(analysis, widgetName);
      await createExportRecord({
        widgetId: analysis.widgetId as Id<"widgets">,
        exportType: "csv",
      });
    } catch (err) {
      console.error("Export failed:", err);
    } finally {
      setIsExporting(false);
    }
  }

  return (
    <Button
      variant="secondary"
      onClick={handleExport}
      disabled={isExporting}
      className="gap-2"
    >
      <Download className="size-4" />
      {isExporting ? "Exporting..." : "Export CSV"}
    </Button>
  );
}
