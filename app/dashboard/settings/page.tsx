"use client";

import { useUser } from "@clerk/nextjs";
import { PageHeader } from "@/components/layout/PageHeader";
import { BorderedCard } from "@/components/ui/bordered-card";
import { User } from "lucide-react";

export default function SettingsPage() {
  const { user } = useUser();

  return (
    <div className="p-4 md:p-8 max-w-screen-xl mx-auto">
      <PageHeader
        title="Settings"
        subtitle="Manage your account and preferences"
      />

      <div className="space-y-4 max-w-2xl">
        <BorderedCard redTop className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 border border-ink flex items-center justify-center">
              <User className="size-4 text-ink" />
            </div>
            <h2 className="font-caslon text-lg font-bold text-ink">Account</h2>
          </div>
          <dl className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-ledger">
              <dt className="text-sm text-hanse-muted">Name</dt>
              <dd className="text-sm font-medium text-ink">{user?.fullName ?? "—"}</dd>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-ledger">
              <dt className="text-sm text-hanse-muted">Email</dt>
              <dd className="text-sm font-medium text-ink">
                {user?.primaryEmailAddress?.emailAddress ?? "—"}
              </dd>
            </div>
            <div className="flex items-center justify-between py-2">
              <dt className="text-sm text-hanse-muted">Account ID</dt>
              <dd className="text-xs font-medium text-hanse-muted font-mono">{user?.id ?? "—"}</dd>
            </div>
          </dl>
        </BorderedCard>

      </div>
    </div>
  );
}
