import { useMemo, useState } from "react";
import { useTranslations } from "@/i18n/utils";
import type { ui } from "@/i18n/ui";
import * as recharts from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

type Lang = keyof typeof ui;

interface Props {
  lang: Lang;
}

type Factor = "K" | "C" | "T";

function clamp01(value: number): number {
  if (Number.isNaN(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

function pow(x: number, e: number): number {
  // Handle 0^0 -> treat as 1 for continuity in visualization
  if (x === 0 && e === 0) return 1;
  return Math.pow(x, e);
}

const chartConfig = {
  p: {
    label: "Success Probability",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function TaskEquationVisualizer({ lang }: Props) {
  const t = useTranslations(lang);

  const [alpha, setAlpha] = useState(0.2);
  const [beta, setBeta] = useState(0.6);
  const [gamma, setGamma] = useState(0.2);
  const [K, setK] = useState(0.8);
  const [C, setC] = useState(0.9);
  const [T, setT] = useState(0.9);

  const [sweep, setSweep] = useState<Factor>("C");

  const sweepColor = useMemo(() => {
    return sweep === "K" ? "#f59e0b" : sweep === "C" ? "#ef4444" : "#22c55e";
  }, [sweep]);

  const xAxisLabel = useMemo(() => {
    return sweep === "K"
      ? t("equation.chart.xaxis.knowledge")
      : sweep === "C"
        ? t("equation.chart.xaxis.context")
        : t("equation.chart.xaxis.tools");
  }, [sweep, t]);

  // Weights are always normalized to sum to 1 via slider handlers
  const [a, b, g] = [alpha, beta, gamma];

  function handleWeightChange(
    which: "a" | "b" | "g",
    newValue: number,
    setA: (v: number) => void,
    setB: (v: number) => void,
    setG: (v: number) => void,
  ) {
    const v = clamp01(newValue);
    const currentA = alpha;
    const currentB = beta;
    const currentG = gamma;

    if (which === "a") {
      const remaining = Math.max(0, 1 - v);
      const otherSum = currentB + currentG;
      if (otherSum <= 0) {
        setA(v);
        setB(remaining / 2);
        setG(remaining / 2);
      } else {
        setA(v);
        setB((currentB / otherSum) * remaining);
        setG((currentG / otherSum) * remaining);
      }
      return;
    }
    if (which === "b") {
      const remaining = Math.max(0, 1 - v);
      const otherSum = currentA + currentG;
      if (otherSum <= 0) {
        setB(v);
        setAlpha(remaining / 2);
        setG(remaining / 2);
      } else {
        setB(v);
        setAlpha((currentA / otherSum) * remaining);
        setG((currentG / otherSum) * remaining);
      }
      return;
    }
    if (which === "g") {
      const remaining = Math.max(0, 1 - v);
      const otherSum = currentA + currentB;
      if (otherSum <= 0) {
        setG(v);
        setAlpha(remaining / 2);
        setB(remaining / 2);
      } else {
        setG(v);
        setAlpha((currentA / otherSum) * remaining);
        setB((currentB / otherSum) * remaining);
      }
    }
  }

  const p = useMemo(() => {
    const kk = clamp01(K);
    const cc = clamp01(C);
    const tt = clamp01(T);
    return pow(kk, a) * pow(cc, b) * pow(tt, g);
  }, [K, C, T, a, b, g]);

  const gauge = useMemo(() => {
    const pct = Math.round(p * 100);
    return { pct, label: `${pct}%` };
  }, [p]);

  const probabilityHue = useMemo(
    () => Math.max(0, Math.min(120, p * 120)),
    [p],
  );
  const barFillStyle = useMemo(() => {
    return {
      width: `${gauge.pct}%`,
      backgroundColor: `hsl(${probabilityHue}, 90%, 40%)`,
    } as const;
  }, [gauge.pct, probabilityHue]);

  const sweepData = useMemo(() => {
    const points: { x: number; p: number; isCurrent?: boolean }[] = [];
    const currentValue = sweep === "K" ? K : sweep === "C" ? C : T;
    for (let i = 0; i <= 20; i++) {
      const x = i / 20;
      const k = sweep === "K" ? x : K;
      const c = sweep === "C" ? x : C;
      const t = sweep === "T" ? x : T;
      const value =
        pow(clamp01(k), a) * pow(clamp01(c), b) * pow(clamp01(t), g);
      const isCurrent = Math.abs(x - currentValue) < 0.03;
      points.push({ x, p: value, isCurrent });
    }
    return points;
  }, [sweep, K, C, T, a, b, g]);

  function applyPresetDataAnalysis() {
    // Tool-heavy
    setAlpha(0.2);
    setBeta(0.2);
    setGamma(0.6);
    setK(0.7);
    setC(0.6);
    setT(0.9);
    setSweep("T");
  }

  function applyPresetCustomerService() {
    // Context-heavy
    setAlpha(0.2);
    setBeta(0.6);
    setGamma(0.2);
    setK(0.6);
    setC(0.9);
    setT(0.6);
    setSweep("C");
  }

  function applyPresetResearch() {
    // Knowledge-heavy
    setAlpha(0.6);
    setBeta(0.2);
    setGamma(0.2);
    setK(0.9);
    setC(0.6);
    setT(0.6);
    setSweep("K");
  }

  function applyPresetAIPrompting() {
    // Extremely context-heavy (thesis)
    setAlpha(0.1);
    setBeta(0.8);
    setGamma(0.1);
    setK(0.6);
    setC(0.95);
    setT(0.8);
    setSweep("C");
  }

  function resetAll() {
    setAlpha(1 / 3);
    setBeta(1 / 3);
    setGamma(1 / 3);
    setK(0.5);
    setC(0.5);
    setT(0.5);
    setSweep("C");
  }

  return (
    <div className="mx-auto w-full max-w-4xl rounded-xl bg-white/60 p-6 backdrop-blur dark:bg-neutral-900/60">
      <div className="flex flex-col gap-6">
        <section>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex overflow-hidden rounded-md border border-neutral-300 dark:border-neutral-700">
                <button
                  onClick={applyPresetDataAnalysis}
                  title={t("equation.preset.dataAnalysis")}
                  className="border-r border-neutral-300 px-3 py-2 text-xs hover:bg-neutral-100 focus:ring-2 focus:ring-neutral-300 focus:outline-none dark:border-neutral-700 dark:hover:bg-neutral-800 dark:focus:ring-neutral-600"
                >
                  {t("equation.preset.dataAnalysis")}
                </button>
                <button
                  onClick={applyPresetCustomerService}
                  title={t("equation.preset.customerService")}
                  className="border-r border-neutral-300 px-3 py-2 text-xs hover:bg-neutral-100 focus:ring-2 focus:ring-neutral-300 focus:outline-none dark:border-neutral-700 dark:hover:bg-neutral-800 dark:focus:ring-neutral-600"
                >
                  {t("equation.preset.customerService")}
                </button>
                <button
                  onClick={applyPresetResearch}
                  title={t("equation.preset.research")}
                  className="border-r border-neutral-300 px-3 py-2 text-xs hover:bg-neutral-100 focus:ring-2 focus:ring-neutral-300 focus:outline-none dark:border-neutral-700 dark:hover:bg-neutral-800 dark:focus:ring-neutral-600"
                >
                  {t("equation.preset.research")}
                </button>
                <button
                  onClick={applyPresetAIPrompting}
                  title={t("equation.preset.aiPrompting")}
                  className="px-3 py-2 text-xs hover:bg-neutral-100 focus:ring-2 focus:ring-neutral-300 focus:outline-none dark:hover:bg-neutral-800 dark:focus:ring-neutral-600"
                >
                  {t("equation.preset.aiPrompting")}
                </button>
              </div>
            </div>
            <button
              onClick={resetAll}
              className="rounded-md border border-neutral-300 px-3 py-1.5 text-xs hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
            >
              {t("equation.reset")}
            </button>
          </div>
        </section>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <section className="col-span-1 md:col-span-1">
            <h4 className="mb-2 text-sm font-medium">
              {t("equation.weights")}
            </h4>
            <div className="space-y-3">
              <LabeledSlider
                label={t("equation.alpha.label")}
                value={alpha}
                onChange={(v) =>
                  handleWeightChange("a", v, setAlpha, setBeta, setGamma)
                }
                min={0}
                max={1}
                step={0.01}
                color="#eab308"
              />
              <LabeledSlider
                label={t("equation.beta.label")}
                value={beta}
                onChange={(v) =>
                  handleWeightChange("b", v, setAlpha, setBeta, setGamma)
                }
                min={0}
                max={1}
                step={0.01}
                color="#ef4444"
              />
              <LabeledSlider
                label={t("equation.gamma.label")}
                value={gamma}
                onChange={(v) =>
                  handleWeightChange("g", v, setAlpha, setBeta, setGamma)
                }
                min={0}
                max={1}
                step={0.01}
                color="#22c55e"
              />
            </div>
            <div className="mt-2 text-[11px] opacity-70">
              {t("equation.sumNote")}
            </div>
          </section>

          <section className="col-span-1 md:col-span-1">
            <h4 className="mb-2 text-sm font-medium">
              {t("equation.factors")}
            </h4>
            <div className="space-y-3">
              <LabeledSlider
                label={t("equation.knowledge.label")}
                labelClass="term-knowledge"
                value={K}
                onChange={setK}
                min={0}
                max={1}
                step={0.01}
                color="#f59e0b"
              />
              <LabeledSlider
                label={t("equation.context.label")}
                labelClass="term-context"
                value={C}
                onChange={setC}
                min={0}
                max={1}
                step={0.01}
                color="#ef4444"
              />
              <LabeledSlider
                label={t("equation.tools.label")}
                labelClass="term-tools"
                value={T}
                onChange={setT}
                min={0}
                max={1}
                step={0.01}
                color="#22c55e"
              />
            </div>
          </section>
        </div>

        <section className="w-full">
          <div className="rounded-lg border border-neutral-200 bg-white/70 p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/50">
            <div className="mb-4">
              <h4 className="text-sm font-medium !mt-0 mb-1">{t("equation.title")}</h4>
              <p className="text-xs opacity-70 !mt-0">
                {t("equation.subtitle")}
              </p>
            </div>
            <div className="mb-4 m-0 p-0">
              <div className="font-mono text-base leading-relaxed md:text-lg m-0 p-0">
                <span>p = </span>
                <span className="term-knowledge">{K.toFixed(2)}</span>
                <sup className="term-knowledge-weight">{a.toFixed(2)}</sup>
                <span> × </span>
                <span className="term-context">{C.toFixed(2)}</span>
                <sup className="term-context-weight">{b.toFixed(2)}</sup>
                <span> × </span>
                <span className="term-tools">{T.toFixed(2)}</span>
                <sup className="term-tools-weight">{g.toFixed(2)}</sup>
                <span> = </span>
                <span className="font-semibold">{p.toFixed(4)}</span>
              </div>
            </div>
            <div className="m-0 p-0">
              <div
                className="h-2 w-full overflow-hidden rounded-full bg-[var(--neutral-track)] mb-1"
                aria-hidden="true"
              >
                <div className="h-full rounded-full" style={barFillStyle} />
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="opacity-70">
                  {t("equation.currentProbability")}
                </span>
                <span className="font-semibold tabular-nums">
                  {gauge.label}
                </span>
              </div>
            </div>
          </div>
          <div className="sr-only" aria-live="polite">
            {t("equation.currentProbability")}: {gauge.label}
          </div>
        </section>

        <section className="w-full">
          <Card className="overflow-hidden">
            <CardHeader className="border-b">
              <CardTitle className="text-base">{t("equation.chart.title")}</CardTitle>
              <CardDescription>{t("equation.chart.subtitle")}</CardDescription>
            </CardHeader>
            <CardContent className="py-4">
              <div className="relative">
                <ChartContainer config={chartConfig} className="h-64 w-full">
                  <recharts.LineChart data={sweepData}>
                    <recharts.CartesianGrid strokeDasharray="3 3" />
                    <recharts.XAxis
                      dataKey="x"
                      type="number"
                      domain={[0, 1]}
                      tickFormatter={(v) => v.toFixed(1)}
                      label={{
                        value: xAxisLabel,
                        position: 'insideBottom',
                        offset: -2,
                        fontSize: 12,
                      }}
                      tick={{
                        fontSize: 10,
                      }}
                    />
                    <recharts.YAxis
                      domain={[0, 1]}
                      tickFormatter={(v) => `${Math.round(v * 100)}%`}
                      label={{
                        value: t("equation.chart.yaxis"),
                        angle: -90,
                        position: 'insideLeft',
                        style: { 
                          textAnchor: 'middle',
                          fontSize: '11px',
                          fontWeight: '500'
                        },
                        offset: 10,
                      }}
                      tick={{
                        fontSize: 10,
                      }}
                    />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          formatter={(value, name) => {
                            const numValue = Number(value);
                            if (isNaN(numValue)) {
                              return ["Invalid data", "Success Probability"];
                            }
                            return [`${Math.round(numValue * 100)}%`, "Success Probability"];
                          }}
                          labelFormatter={(label) => {
                            const numLabel = Number(label);
                            if (isNaN(numLabel)) {
                              return `${sweep}=Invalid`;
                            }
                            return `${sweep}=${numLabel.toFixed(2)}`;
                          }}
                        />
                      }
                    />
                    <recharts.Line
                      type="monotone"
                      dataKey="p"
                      stroke={sweepColor}
                      strokeWidth={2}
                      dot={(props) => {
                        const { cx, cy, payload } = props;
                        return payload?.isCurrent ? (
                          <circle
                            cx={cx}
                            cy={cy}
                            r={4}
                            fill={sweepColor}
                            stroke="hsl(var(--background))"
                            strokeWidth={2}
                          />
                        ) : (
                          <></>
                        );
                      }}
                    />
                  </recharts.LineChart>
                </ChartContainer>
              </div>
              <div className="mt-4 flex flex-col items-center gap-2">
                <h4 className="text-xs font-medium opacity-80">{t("equation.sweep")}</h4>
                <div className="inline-flex overflow-hidden rounded-md border border-neutral-300 text-xs dark:border-neutral-700">
                  {(["K", "C", "T"] as Factor[]).map((f, idx) => (
                    <button
                      key={f}
                      onClick={() => setSweep(f)}
                      className={`px-3 py-1.5 ${
                        sweep === f
                          ? "text-white dark:text-neutral-900"
                          : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      } ${idx < 2 ? "border-r border-neutral-300 dark:border-neutral-700" : ""}`}
                      style={
                        sweep === f
                          ? {
                              backgroundColor:
                                f === "K"
                                  ? "#f59e0b"
                                  : f === "C"
                                    ? "#ef4444"
                                    : "#22c55e",
                            }
                          : {}
                      }
                      aria-pressed={sweep === f}
                      aria-label={`Sweep ${f}`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
                <p className="text-center text-xs opacity-70">
                  {t("equation.sweep.description")}
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}

function LabeledSlider({
  label,
  value,
  onChange,
  min,
  max,
  step,
  color,
  labelClass,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  color: string;
  labelClass?: string;
}) {
  const percent = ((value - min) / (max - min)) * 100;
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className={`opacity-80 ${labelClass ?? ""}`}>{label}</span>
        <span className="tabular-nums">{value.toFixed(2)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        aria-label={label}
        className="slider w-full"
        style={{
          ["--slider-color" as any]: color,
          ["--slider-percent" as any]: `${percent}%`,
          background:
            "linear-gradient(to right, var(--slider-color) 0%, var(--slider-color) var(--slider-percent), var(--neutral-track) var(--slider-percent), var(--neutral-track) 100%)",
        }}
      />
      <div className="flex justify-between text-[10px] opacity-60">
        <span>{min.toFixed(0)}</span>
        <span>{max.toFixed(0)}</span>
      </div>
    </div>
  );
}


