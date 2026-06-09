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
import type { ThemeMetric } from "@/types";

interface ProblemPrevalenceChartProps {
  themes: ThemeMetric[];
}

export function ProblemPrevalenceChart({ themes }: ProblemPrevalenceChartProps) {
  const data = themes.map((t) => ({ name: t.name, prevalence: t.prevalence }));

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 4 }}>
          <XAxis
            dataKey="name"
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
            contentStyle={{
              border: "1px solid #000",
              borderRadius: 0,
              fontFamily: "var(--font-grotesk)",
              fontSize: 12,
            }}
            formatter={(value) => [`${value ?? 0}%`, "Prevalence"]}
          />
          <Bar dataKey="prevalence" maxBarSize={48}>
            {data.map((_, index) => (
              <Cell key={index} fill={index === 0 ? "#CC0000" : "#000000"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
