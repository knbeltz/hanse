import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Settings, CreditCard } from "lucide-react";
import { MobileNav } from "@/components/layout/MobileNav";

export function TopNav() {
  return (
    <header className="h-14 border-b border-ink bg-parchment flex items-center px-4 gap-4 shrink-0">
      <div className="lg:hidden">
        <MobileNav />
      </div>

      <div className="lg:hidden font-caslon text-lg font-bold text-ink tracking-tight">Hanse</div>

      <div className="flex-1" />

      <nav className="flex items-center gap-1">
        <Link
          href="/dashboard/settings"
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm text-hanse-muted hover:text-ink hover:bg-surface transition-colors border border-transparent hover:border-ink"
        >
          <Settings className="size-4" />
          <span className="hidden md:inline">Settings</span>
        </Link>

        <button
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm text-hanse-muted hover:text-ink hover:bg-surface transition-colors border border-transparent hover:border-ink cursor-not-allowed opacity-60 select-none"
          title="Billing (coming soon)"
          disabled
        >
          <CreditCard className="size-4" />
          <span className="hidden md:inline">Billing</span>
        </button>

        <div className="ml-2">
          <UserButton />
        </div>
      </nav>
    </header>
  );
}
