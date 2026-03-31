"use client";

import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

import { defaultLang, useTranslations } from "@/lib/i18n";
import type { ui } from "@/lib/i18n";

interface Props {
  lang?: keyof typeof ui;
}

export default function HumanVsAIRadarChart({ lang = defaultLang }: Props) {
  const t = useTranslations(lang);

  const data = [
    {
      dimension: t("chart.knowledge"),
      averageHuman: 0.5,
      expert: 0.95,
      ai: 0.85,
    },
    {
      dimension: t("chart.context"),
      averageHuman: 0.7,
      expert: 0.98,
      ai: 0.4,
    },
    {
      dimension: t("chart.tools"),
      averageHuman: 0.75,
      expert: 0.92,
      ai: 0.6,
    },
  ];
  return (
    <div className="mx-auto w-full max-w-2xl p-6">
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid className="stroke-gray-300" />
            <PolarAngleAxis
              dataKey="dimension"
              className="fill-navy-50 dark:fill-navy-900 text-sm"
              tick={{ fill: "currentColor", fontSize: 12 }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 1]}
              className="text-xs"
              tick={{ fill: "currentColor", fontSize: 10 }}
            />
            <Radar
              name={t("chart.humanExpert")}
              dataKey="expert"
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={0.25}
              strokeWidth={2}
            />
            <Radar
              name={t("chart.averageHuman")}
              dataKey="averageHuman"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.55}
              strokeWidth={2}
            />
            <Radar
              name={t("chart.ai")}
              dataKey="ai"
              stroke="#ef4444"
              fill="#ef4444"
              fillOpacity={0.35}
              strokeWidth={2}
            />
            <Legend wrapperStyle={{ paddingTop: "20px" }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
