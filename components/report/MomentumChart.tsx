"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import type { MomentumPoint } from "@/types";

interface MomentumChartProps {
  momentum: MomentumPoint[];
}

export function MomentumChart({ momentum }: MomentumChartProps) {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={momentum} margin={{ top: 4, right: 8, left: -20, bottom: 4 }}>
          <CartesianGrid strokeDasharray="4 4" stroke="#E5E5E5" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: "#5d5f5f", fontFamily: "var(--font-grotesk)" }}
            tickLine={false}
            axisLine={{ stroke: "#000000" }}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#5d5f5f", fontFamily: "var(--font-grotesk)" }}
            tickLine={false}
            axisLine={false}
            domain={[0, 100]}
          />
          <Tooltip
            contentStyle={{ border: "1px solid #000", borderRadius: 0, fontFamily: "var(--font-grotesk)", fontSize: 12 }}
            formatter={(value) => [value ?? 0, "Momentum Score"]}
          />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#CC0000"
            strokeWidth={2.5}
            dot={{ fill: "#CC0000", r: 4, strokeWidth: 0 }}
            activeDot={{ r: 6, fill: "#000000" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
