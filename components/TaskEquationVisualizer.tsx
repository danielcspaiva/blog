'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import * as recharts from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';

type Factor = 'K' | 'C' | 'T';

function clamp01(value: number): number {
  if (Number.isNaN(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

function pow(x: number, e: number): number {
  if (x === 0 && e === 0) return 1;
  return Math.pow(x, e);
}

const chartConfig = {
  p: {
    label: 'Success Probability',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export default function TaskEquationVisualizer() {
  const t = useTranslations('equation');

  const [alpha, setAlpha] = useState(0.2);
  const [beta, setBeta] = useState(0.6);
  const [gamma, setGamma] = useState(0.2);
  const [K, setK] = useState(0.8);
  const [C, setC] = useState(0.9);
  const [T, setT] = useState(0.9);

  const [sweep, setSweep] = useState<Factor>('C');
  const [activePreset, setActivePreset] = useState<string | null>(null);

  const sweepColor = useMemo(() => {
    return sweep === 'K'
      ? 'var(--color-yellow-600)'
      : sweep === 'C'
        ? 'var(--color-red-600)'
        : 'var(--color-green-600)';
  }, [sweep]);

  const xAxisLabel = useMemo(() => {
    return sweep === 'K'
      ? t('chartXaxisKnowledge')
      : sweep === 'C'
        ? t('chartXaxisContext')
        : t('chartXaxisTools');
  }, [sweep, t]);

  const [a, b, g] = [alpha, beta, gamma];

  function handleWeightChange(
    which: 'a' | 'b' | 'g',
    newValue: number,
    setA: (v: number) => void,
    setB: (v: number) => void,
    setG: (v: number) => void
  ) {
    const v = clamp01(newValue);
    const currentA = alpha;
    const currentB = beta;
    const currentG = gamma;

    setActivePreset(null);

    if (which === 'a') {
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
    if (which === 'b') {
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
    if (which === 'g') {
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
    [p]
  );
  const barFillStyle = useMemo(() => {
    return {
      width: `${gauge.pct}%`,
      backgroundColor: `hsl(${probabilityHue}, 90%, 40%)`,
    } as const;
  }, [gauge.pct, probabilityHue]);

  const sweepData = useMemo(() => {
    const points: { x: number; p: number; isCurrent?: boolean }[] = [];
    const currentValue = sweep === 'K' ? K : sweep === 'C' ? C : T;
    for (let i = 0; i <= 20; i++) {
      const x = i / 20;
      const k = sweep === 'K' ? x : K;
      const c = sweep === 'C' ? x : C;
      const tVal = sweep === 'T' ? x : T;
      const value =
        pow(clamp01(k), a) * pow(clamp01(c), b) * pow(clamp01(tVal), g);
      const isCurrent = Math.abs(x - currentValue) < 0.03;
      points.push({ x, p: value, isCurrent });
    }
    return points;
  }, [sweep, K, C, T, a, b, g]);

  function applyPresetDataAnalysis() {
    setAlpha(0.2);
    setBeta(0.2);
    setGamma(0.6);
    setK(0.7);
    setC(0.6);
    setT(0.9);
    setSweep('T');
    setActivePreset('dataAnalysis');
  }

  function applyPresetCustomerService() {
    setAlpha(0.2);
    setBeta(0.6);
    setGamma(0.2);
    setK(0.6);
    setC(0.9);
    setT(0.6);
    setSweep('C');
    setActivePreset('customerService');
  }

  function applyPresetResearch() {
    setAlpha(0.6);
    setBeta(0.2);
    setGamma(0.2);
    setK(0.9);
    setC(0.6);
    setT(0.6);
    setSweep('K');
    setActivePreset('research');
  }

  function applyPresetAIPrompting() {
    setAlpha(0.1);
    setBeta(0.8);
    setGamma(0.1);
    setK(0.6);
    setC(0.95);
    setT(0.8);
    setSweep('C');
    setActivePreset('aiPrompting');
  }

  function resetAll() {
    setAlpha(1 / 3);
    setBeta(1 / 3);
    setGamma(1 / 3);
    setK(0.5);
    setC(0.5);
    setT(0.5);
    setSweep('C');
    setActivePreset(null);
  }

  return (
    <div className="px-6 py-3">
      <div className="mx-auto w-full max-w-4xl space-y-8">
        {/* Presets */}
      <section className="space-y-4">
        <h3 className="font-semibold text-navy-900 dark:text-neutral-50">
          {t('presets')}
        </h3>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={resetAll}
            className="rounded-lg border border-black/15 px-3 py-1.5 text-xs transition-colors duration-300 ease-in-out hover:bg-black/5 hover:text-black focus-visible:bg-black/5 focus-visible:text-black dark:border-white/20 dark:hover:bg-white/5 dark:hover:text-white dark:focus-visible:bg-white/5 dark:focus-visible:text-white"
          >
            {t('reset')}
          </button>
          <span className="text-xs text-navy-800/50 dark:text-neutral-100/50">
            &bull;
          </span>
          <button
            onClick={applyPresetDataAnalysis}
            className={`rounded-lg border px-3 py-2 text-xs transition-colors duration-300 ease-in-out ${
              activePreset === 'dataAnalysis'
                ? 'border-cyan-600 bg-cyan-600 text-white dark:border-cyan-500 dark:bg-cyan-500 dark:text-white'
                : 'border-black/15 hover:bg-black/5 hover:text-black focus-visible:bg-black/5 focus-visible:text-black dark:border-white/20 dark:hover:bg-white/5 dark:hover:text-white dark:focus-visible:bg-white/5 dark:focus-visible:text-white'
            }`}
          >
            {t('preset.dataAnalysis')}
          </button>
          <button
            onClick={applyPresetCustomerService}
            className={`rounded-lg border px-3 py-2 text-xs transition-colors duration-300 ease-in-out ${
              activePreset === 'customerService'
                ? 'border-cyan-600 bg-cyan-600 text-white dark:border-cyan-500 dark:bg-cyan-500 dark:text-white'
                : 'border-black/15 hover:bg-black/5 hover:text-black focus-visible:bg-black/5 focus-visible:text-black dark:border-white/20 dark:hover:bg-white/5 dark:hover:text-white dark:focus-visible:bg-white/5 dark:focus-visible:text-white'
            }`}
          >
            {t('preset.customerService')}
          </button>
          <button
            onClick={applyPresetResearch}
            className={`rounded-lg border px-3 py-2 text-xs transition-colors duration-300 ease-in-out ${
              activePreset === 'research'
                ? 'border-cyan-600 bg-cyan-600 text-white dark:border-cyan-500 dark:bg-cyan-500 dark:text-white'
                : 'border-black/15 hover:bg-black/5 hover:text-black focus-visible:bg-black/5 focus-visible:text-black dark:border-white/20 dark:hover:bg-white/5 dark:hover:text-white dark:focus-visible:bg-white/5 dark:focus-visible:text-white'
            }`}
          >
            {t('preset.research')}
          </button>
          <button
            onClick={applyPresetAIPrompting}
            className={`rounded-lg border px-3 py-2 text-xs transition-colors duration-300 ease-in-out ${
              activePreset === 'aiPrompting'
                ? 'border-cyan-600 bg-cyan-600 text-white dark:border-cyan-500 dark:bg-cyan-500 dark:text-white'
                : 'border-black/15 hover:bg-black/5 hover:text-black focus-visible:bg-black/5 focus-visible:text-black dark:border-white/20 dark:hover:bg-white/5 dark:hover:text-white dark:focus-visible:bg-white/5 dark:focus-visible:text-white'
            }`}
          >
            {t('preset.aiPrompting')}
          </button>
        </div>
      </section>

      <div className="h-px bg-black/10 dark:bg-white/10" />

      {/* Controls */}
      <div className="flex flex-col gap-8 md:flex-row md:gap-0">
        <section className="flex-1 space-y-4 md:pr-8">
          <div>
            <h3 className="!mt-0 font-semibold text-navy-900 dark:text-neutral-50">
              {t('weights')}
            </h3>
            <p className="mt-1 text-sm text-navy-800/70 dark:text-neutral-100/70">
              {t('weightsDescription')}
            </p>
          </div>
          <div className="space-y-4">
            <LabeledSlider
              label={t('alphaLabel')}
              value={alpha}
              onChange={(v) =>
                handleWeightChange('a', v, setAlpha, setBeta, setGamma)
              }
              min={0}
              max={1}
              step={0.01}
              color="var(--slider-knowledge-weight)"
            />
            <LabeledSlider
              label={t('betaLabel')}
              value={beta}
              onChange={(v) =>
                handleWeightChange('b', v, setAlpha, setBeta, setGamma)
              }
              min={0}
              max={1}
              step={0.01}
              color="var(--slider-context-weight)"
            />
            <LabeledSlider
              label={t('gammaLabel')}
              value={gamma}
              onChange={(v) =>
                handleWeightChange('g', v, setAlpha, setBeta, setGamma)
              }
              min={0}
              max={1}
              step={0.01}
              color="var(--slider-tools-weight)"
            />
          </div>
        </section>

        <div className="hidden md:block md:w-px md:bg-black/10 dark:md:bg-white/10" />

        <section className="flex-1 space-y-4 md:pl-8">
          <div>
            <h3 className="!mt-0 font-semibold text-navy-900 dark:text-neutral-50">
              {t('factors')}
            </h3>
            <p className="mt-1 text-sm text-navy-800/70 dark:text-neutral-100/70">
              {t('factorsDescription')}
            </p>
          </div>
          <div className="space-y-4">
            <LabeledSlider
              label={t('knowledgeLabel')}
              value={K}
              onChange={(v) => {
                setK(v);
                setActivePreset(null);
              }}
              min={0}
              max={1}
              step={0.01}
              color="var(--slider-knowledge)"
            />
            <LabeledSlider
              label={t('contextLabel')}
              value={C}
              onChange={(v) => {
                setC(v);
                setActivePreset(null);
              }}
              min={0}
              max={1}
              step={0.01}
              color="var(--slider-context)"
            />
            <LabeledSlider
              label={t('toolsLabel')}
              value={T}
              onChange={(v) => {
                setT(v);
                setActivePreset(null);
              }}
              min={0}
              max={1}
              step={0.01}
              color="var(--slider-tools)"
            />
          </div>
        </section>
      </div>

      <div className="h-px bg-black/10 dark:bg-white/10" />

      {/* Equation Display */}
      <section className="space-y-4 pt-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <h3 className="!mb-1 !mt-0 font-semibold text-navy-900 dark:text-neutral-50">
              {t('title')}
            </h3>
            <p className="!mt-0 text-sm text-navy-800/70 dark:text-neutral-100/70">
              {t('subtitle')}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="font-mono text-lg leading-relaxed">
            <span>p = </span>
            <span className="term-knowledge">{K.toFixed(2)}</span>
            <sup className="term-knowledge-weight">{a.toFixed(2)}</sup>
            <span> &times; </span>
            <span className="term-context">{C.toFixed(2)}</span>
            <sup className="term-context-weight">{b.toFixed(2)}</sup>
            <span> &times; </span>
            <span className="term-tools">{T.toFixed(2)}</span>
            <sup className="term-tools-weight">{g.toFixed(2)}</sup>
            <span> = </span>
            <span className="font-semibold">{p.toFixed(4)}</span>
          </div>

          <div>
            <div
              className="mb-2 h-3 w-full overflow-hidden rounded-full bg-black/10 dark:bg-white/10"
              aria-hidden="true"
            >
              <div
                className="h-full rounded-full transition-all duration-300"
                style={barFillStyle}
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-navy-800/70 dark:text-neutral-100/70">
                {t('currentProbability')}
              </span>
              <span className="font-semibold tabular-nums text-navy-900 dark:text-neutral-50">
                {gauge.label}
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="h-px bg-black/10 dark:bg-white/10" />

      {/* Chart */}
      <section className="space-y-4 pt-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <h3 className="!mb-1 !mt-0 font-semibold text-navy-900 dark:text-neutral-50">
              {t('chartTitle')}
            </h3>
            <p className="!mt-0 text-sm text-navy-800/70 dark:text-neutral-100/70">
              {t('chartSubtitle')}
            </p>
          </div>
          <div className="flex flex-col items-start gap-2 sm:items-end">
            <div className="flex overflow-hidden rounded-lg border border-black/15 text-xs dark:border-white/20">
              {(['K', 'C', 'T'] as Factor[]).map((f, idx) => (
                <button
                  key={f}
                  onClick={() => setSweep(f)}
                  className={`flex-1 px-3 py-1.5 transition-colors duration-300 ease-in-out ${
                    sweep === f
                      ? 'text-white dark:text-navy-950'
                      : 'hover:bg-black/5 hover:text-black focus-visible:bg-black/5 focus-visible:text-black dark:hover:bg-white/5 dark:hover:text-white dark:focus-visible:bg-white/5 dark:focus-visible:text-white'
                  } ${idx < 2 ? 'border-r border-black/15 dark:border-white/20' : ''}`}
                  style={
                    sweep === f
                      ? {
                          backgroundColor:
                            f === 'K'
                              ? 'var(--color-yellow-600)'
                              : f === 'C'
                                ? 'var(--color-red-600)'
                                : 'var(--color-green-600)',
                        }
                      : {}
                  }
                  aria-pressed={sweep === f}
                  aria-label={`${t('factor.analyze')} ${f === 'K' ? t('factor.knowledge') : f === 'C' ? t('factor.context') : t('factor.tools')} factor`}
                  title={`${t('factor.analyze')} ${f === 'K' ? t('factor.knowledge') : f === 'C' ? t('factor.context') : t('factor.tools')} ${t('factor.sensitivity')}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-black/15 bg-white/50 p-4 dark:border-white/20 dark:bg-navy-950/50">
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
                  value: t('chartYaxis'),
                  angle: -90,
                  position: 'insideLeft',
                  style: {
                    textAnchor: 'middle',
                    fontSize: '11px',
                    fontWeight: '500',
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
                    formatter={(value) => {
                      const numValue = Number(value);
                      if (isNaN(numValue)) {
                        return [t('tooltip.invalidData'), 'Success Probability'];
                      }
                      return [
                        `${Math.round(numValue * 100)}%`,
                        'Success Probability',
                      ];
                    }}
                    labelFormatter={(label) => {
                      const numLabel = Number(label);
                      if (isNaN(numLabel)) {
                        return `${sweep}=${t('tooltip.invalid')}`;
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
                  const { cx, cy, payload, index } = props;
                  return payload?.isCurrent ? (
                    <circle
                      key={`dot-${index}`}
                      cx={cx}
                      cy={cy}
                      r={4}
                      fill={sweepColor}
                      stroke="var(--color-background)"
                      strokeWidth={2}
                    />
                  ) : null;
                }}
              />
            </recharts.LineChart>
          </ChartContainer>
        </div>
        <p className="text-center text-xs text-navy-800/70 dark:text-neutral-100/70">
          {t('sweepDescription')}
        </p>
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
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span
          className={`text-navy-800 dark:text-neutral-100 ${labelClass ?? ''}`}
        >
          {label}
        </span>
        <span className="font-mono text-xs tabular-nums text-navy-800/70 dark:text-neutral-100/70">
          {value.toFixed(2)}
        </span>
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
        style={
          {
            '--slider-color': color,
            '--slider-percent': `${percent}%`,
            background: `linear-gradient(to right, var(--slider-color) 0%, var(--slider-color) var(--slider-percent), var(--neutral-track) var(--slider-percent), var(--neutral-track) 100%)`,
          } as React.CSSProperties
        }
      />
    </div>
  );
}
