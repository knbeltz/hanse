"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, LayoutDashboard, Plus, Settings, FolderOpen, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Intelligence Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/new", label: "New Widget", icon: Plus, exact: true },
  { href: "/dashboard/settings", label: "Settings", icon: Settings, exact: false },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className="lg:hidden p-2 border border-ink bg-parchment hover:bg-surface transition-colors"
        aria-label="Open navigation"
      >
        <Menu className="size-5 text-ink" />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-72 border-r border-ink bg-parchment">
        <div className="px-4 py-5 border-b border-ink flex items-center justify-between">
          <div>
            <span className="font-caslon text-xl font-bold text-ink tracking-tight">Hanse</span>
            <span className="block text-xs text-hanse-muted mt-0.5">Consumer Intelligence</span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-1 hover:bg-surface transition-colors"
            aria-label="Close navigation"
          >
            <X className="size-5 text-ink" />
          </button>
        </div>

        <nav className="px-2 py-4">
          <ul className="space-y-0.5">
            {NAV_ITEMS.map(({ href, label, icon: Icon, exact }) => {
              const active = exact ? pathname === href : pathname.startsWith(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-3 text-sm font-medium transition-colors",
                      active
                        ? "bg-surface text-ink border-l-4 border-l-hanse-red pl-2"
                        : "text-hanse-muted hover:bg-surface hover:text-ink border-l-4 border-l-transparent pl-2"
                    )}
                  >
                    <Icon className="size-4 shrink-0" />
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 pt-6 border-t border-ledger">
            <p className="px-3 text-xs font-medium text-hanse-muted uppercase tracking-widest mb-2">
              Workspaces
            </p>
            <div className="flex items-center gap-3 px-3 py-3 text-sm text-hanse-muted opacity-50">
              <FolderOpen className="size-4 shrink-0" />
              Coming soon
            </div>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
