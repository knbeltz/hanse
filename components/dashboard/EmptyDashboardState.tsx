"use client";

import { useRouter } from "next/navigation";
import { BarChart2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyDashboardState() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
      <div className="w-16 h-16 border-2 border-dashed border-ledger flex items-center justify-center mb-6">
        <BarChart2 className="size-7 text-hanse-muted" />
      </div>
      <h2 className="font-caslon text-2xl font-bold text-ink mb-2">No widgets yet</h2>
      <p className="text-sm text-hanse-muted max-w-sm mb-6">
        Create your first research widget to start generating consumer intelligence from YouTube
        discussions.
      </p>
      <Button variant="primary" onClick={() => router.push("/dashboard/new")}>
        Create your first widget
      </Button>
    </div>
  );
}
