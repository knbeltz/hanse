"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { BarrierMetric } from "@/types";

interface BarrierChartProps {
  barriers: BarrierMetric[];
}

export function BarrierChart({ barriers }: BarrierChartProps) {
  const sorted = [...barriers].sort((a, b) => b.score - a.score);

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={sorted}
          layout="vertical"
          margin={{ top: 4, right: 8, left: 4, bottom: 4 }}
        >
          <XAxis
            type="number"
            tick={{ fontSize: 11, fill: "#5d5f5f", fontFamily: "var(--font-grotesk)" }}
            tickLine={false}
            axisLine={{ stroke: "#000000" }}
            domain={[0, 100]}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={120}
            tick={{ fontSize: 11, fill: "#5d5f5f", fontFamily: "var(--font-grotesk)" }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{ border: "1px solid #000", borderRadius: 0, fontFamily: "var(--font-grotesk)", fontSize: 12 }}
            formatter={(value) => [`${value ?? 0}/100`, "Barrier Score"]}
          />
          <Bar dataKey="score" maxBarSize={32}>
            {sorted.map((_, index) => (
              <Cell key={index} fill={index === 0 ? "#CC0000" : "#000000"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
