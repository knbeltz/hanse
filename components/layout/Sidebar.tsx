"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Plus, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Intelligence Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/new", label: "New Widget", icon: Plus, exact: true },
  { href: "/dashboard/settings", label: "Settings", icon: Settings, exact: false },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 shrink-0 min-h-screen bg-parchment border-r border-ink flex flex-col">
      <div className="px-4 py-5 border-b border-ink">
        <Link href="/dashboard" className="block">
          <span className="font-caslon text-xl font-bold text-ink tracking-tight">Hanse</span>
          <span className="block text-xs text-hanse-muted mt-0.5 font-grotesk">
            Consumer Intelligence
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-2 py-4">
        <ul className="space-y-0.5">
          {NAV_ITEMS.map(({ href, label, icon: Icon, exact }) => {
            const active = exact ? pathname === href : pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors",
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

      </nav>
    </aside>
  );
}
