"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import type { SentimentBreakdown } from "@/types";

const COLORS: Record<string, string> = {
  positive: "#16a34a",
  neutral: "#5d5f5f",
  excitement: "#2563eb",
  negative: "#CC0000",
  anxiety: "#9e0000",
  frustration: "#000000",
  confusion: "#E5E5E5",
};

interface SentimentBreakdownChartProps {
  sentiment: SentimentBreakdown;
}

export function SentimentBreakdownChart({ sentiment }: SentimentBreakdownChartProps) {
  const data = Object.entries(sentiment)
    .filter(([, value]) => value > 0)
    .map(([key, value]) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      value,
      key,
    }));

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={48}
            outerRadius={90}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[entry.key] ?? "#E5E5E5"}
                stroke="#000"
                strokeWidth={0.5}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ border: "1px solid #000", borderRadius: 0, fontFamily: "var(--font-grotesk)", fontSize: 12 }}
            formatter={(value) => [`${value ?? 0}%`, "Share"]}
          />
          <Legend
            iconSize={10}
            iconType="square"
            wrapperStyle={{ fontSize: 11, fontFamily: "var(--font-grotesk)" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
