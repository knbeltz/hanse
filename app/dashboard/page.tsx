"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { PageHeader } from "@/components/layout/PageHeader";
import { WidgetCard } from "@/components/dashboard/WidgetCard";
import { EmptyDashboardState } from "@/components/dashboard/EmptyDashboardState";
import { CardSkeleton } from "@/components/ui/loading-state";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { Widget } from "@/types";

export default function DashboardPage() {
  const router = useRouter();
  const widgets = useQuery(api.widgets.listWidgetsForCurrentUser);

  const isLoading = widgets === undefined;

  return (
    <div className="p-4 md:p-8 max-w-screen-xl mx-auto">
      <PageHeader
        title="Intelligence Dashboard"
        subtitle="All your consumer intelligence research widgets"
        action={
          <Button
            variant="primary"
            onClick={() => router.push("/dashboard/new")}
            className="gap-2"
          >
            <Plus className="size-4" />
            New Widget
          </Button>
        }
      />

      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      )}

      {!isLoading && widgets.length === 0 && <EmptyDashboardState />}

      {!isLoading && widgets.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(widgets as Widget[]).map((widget) => (
            <WidgetCard key={widget._id} widget={widget} />
          ))}
        </div>
      )}
    </div>
  );
}
