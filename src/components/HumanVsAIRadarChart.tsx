"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { useTranslations } from "next-intl";

// 4×4 Bayer matrix — the same one behind the site's flat dither tiles.
const BAYER4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];
const CELL = 2;

/** An SVG <pattern> of 2px dots: `level` of every 16 cells are inked. */
function DitherPattern({ id, level }: { id: string; level: number }) {
  return (
    <pattern
      id={id}
      width={4 * CELL}
      height={4 * CELL}
      patternUnits="userSpaceOnUse"
    >
      {BAYER4.flatMap((row, y) =>
        row.map((threshold, x) =>
          threshold < level ? (
            <rect
              key={`${x}-${y}`}
              x={x * CELL}
              y={y * CELL}
              width={CELL}
              height={CELL}
              fill="currentColor"
              shapeRendering="crispEdges"
            />
          ) : null,
        ),
      )}
    </pattern>
  );
}

// The three series are told apart by dot density and stroke, not by hue.
const SERIES = [
  { key: "expert", label: "chart.humanExpert", level: 2, dash: undefined },
  { key: "averageHuman", label: "chart.averageHuman", level: 5, dash: "5 4" },
  { key: "ai", label: "chart.ai", level: 10, dash: undefined },
] as const;

export default function HumanVsAIRadarChart() {
  const t = useTranslations();

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
    <figure className="not-prose text-ink mx-auto my-8 w-full max-w-2xl">
      <div className="h-80 sm:h-96">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <defs>
              {SERIES.map((s) => (
                <DitherPattern
                  key={s.key}
                  id={`radar-dither-${s.key}`}
                  level={s.level}
                />
              ))}
            </defs>
            <PolarGrid stroke="var(--line)" />
            <PolarAngleAxis
              dataKey="dimension"
              tick={{
                fontSize: 11,
                fill: "currentColor",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.1em",
              }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 1]}
              stroke="var(--line)"
              tick={{
                fontSize: 10,
                fill: "var(--ink-4)",
                fontFamily: "var(--font-mono)",
              }}
            />
            {SERIES.map((s) => (
              <Radar
                key={s.key}
                name={t(s.label)}
                dataKey={s.key}
                stroke="currentColor"
                strokeWidth={1.5}
                strokeDasharray={s.dash}
                fill={`url(#radar-dither-${s.key})`}
                fillOpacity={1}
                isAnimationActive={false}
              />
            ))}
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <figcaption>
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-mono text-[0.7rem] tracking-[0.14em] uppercase">
          {SERIES.map((s) => (
            <li key={s.key} className="flex items-center gap-2">
              <svg width="18" height="12" aria-hidden="true">
                <rect
                  x="0.5"
                  y="0.5"
                  width="17"
                  height="11"
                  fill={`url(#radar-dither-${s.key})`}
                  stroke="currentColor"
                  strokeDasharray={s.dash ? "3 2" : undefined}
                />
              </svg>
              {t(s.label)}
            </li>
          ))}
        </ul>
      </figcaption>
    </figure>
  );
}
