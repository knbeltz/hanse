"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from "recharts";
import type { ThemeMetric } from "@/types";

interface EmotionalIntensityChartProps {
  themes: ThemeMetric[];
}

export function EmotionalIntensityChart({ themes }: EmotionalIntensityChartProps) {
  const data = themes.map((t) => ({ name: t.name, intensity: t.emotionalIntensity }));

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
            domain={[0, 5]}
            ticks={[1, 2, 3, 4, 5]}
          />
          <ReferenceLine y={3} stroke="#E5E5E5" strokeDasharray="4 4" />
          <Tooltip
            contentStyle={{ border: "1px solid #000", borderRadius: 0, fontFamily: "var(--font-grotesk)", fontSize: 12 }}
            formatter={(value) => [`${value ?? 0}/5`, "Intensity"]}
          />
          <Bar dataKey="intensity" maxBarSize={48}>
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={entry.intensity >= 4 ? "#CC0000" : entry.intensity >= 3 ? "#9e0000" : "#000000"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
