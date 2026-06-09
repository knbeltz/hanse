"use client";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import type { ThemeMetric } from "@/types";
import { cn } from "@/lib/utils";

const columnHelper = createColumnHelper<ThemeMetric>();

const columns = [
  columnHelper.accessor("name", {
    header: "Theme",
    cell: (info) => (
      <span className="font-medium text-ink text-sm">{info.getValue()}</span>
    ),
  }),
  columnHelper.accessor("prevalence", {
    header: "Prevalence",
    cell: (info) => (
      <span className="text-sm tabular-nums">{info.getValue()}%</span>
    ),
  }),
  columnHelper.accessor("emotionalIntensity", {
    header: "Intensity",
    cell: (info) => (
      <span className={cn("text-sm font-medium tabular-nums", info.getValue() >= 4 ? "text-hanse-red" : "text-ink")}>
        {info.getValue().toFixed(1)}/5
      </span>
    ),
  }),
  columnHelper.accessor("sentiment", {
    header: "Sentiment",
    cell: (info) => (
      <span className="text-sm text-hanse-muted">{info.getValue()}</span>
    ),
  }),
  columnHelper.accessor("purchaseIntent", {
    header: "Purchase Intent",
    cell: (info) => (
      <span className="text-sm tabular-nums">{info.getValue()}%</span>
    ),
  }),
  columnHelper.accessor("switchingIntent", {
    header: "Switch Intent",
    cell: (info) => (
      <span className="text-sm tabular-nums">{info.getValue()}%</span>
    ),
  }),
  columnHelper.accessor("opportunityScore", {
    header: "Opportunity",
    cell: (info) => (
      <span className={cn("text-sm font-bold tabular-nums", info.getValue() >= 70 ? "text-hanse-red" : "text-ink")}>
        {info.getValue()}
      </span>
    ),
  }),
];

interface ThemeMetricsTableProps {
  themes: ThemeMetric[];
}

export function ThemeMetricsTable({ themes }: ThemeMetricsTableProps) {
  const table = useReactTable({
    data: themes,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto border border-ink">
      <table className="w-full min-w-[700px] text-sm">
        <thead className="bg-ledger">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-b border-ink">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-3 text-left text-xs font-bold text-ink uppercase tracking-widest whitespace-nowrap"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, index) => (
            <tr
              key={row.id}
              className={cn(
                "border-b border-ledger hover:bg-surface transition-colors",
                index % 2 === 0 ? "bg-parchment" : "bg-hanse-bg"
              )}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-3">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
