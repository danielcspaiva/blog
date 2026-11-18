"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

// Lives on the footer's ink bar, so its colours are the page's inverted.
const BTN =
  "flex size-8 cursor-pointer items-center justify-center border border-paper/40 text-paper hover:border-paper hover:bg-paper hover:text-ink focus-visible:bg-paper focus-visible:text-ink focus-visible:outline-paper aria-pressed:border-paper aria-pressed:bg-paper aria-pressed:text-ink";

const ICON = {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "square",
  strokeLinejoin: "miter",
} as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const active = mounted ? theme : undefined;

  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        aria-label="Light theme"
        aria-pressed={active === "light"}
        className={BTN}
        onClick={() => setTheme("light")}
      >
        <svg xmlns="http://www.w3.org/2000/svg" {...ICON}>
          <circle cx="12" cy="12" r="4.5" />
          <line x1="12" y1="1.5" x2="12" y2="3.5" />
          <line x1="12" y1="20.5" x2="12" y2="22.5" />
          <line x1="4.6" y1="4.6" x2="6" y2="6" />
          <line x1="18" y1="18" x2="19.4" y2="19.4" />
          <line x1="1.5" y1="12" x2="3.5" y2="12" />
          <line x1="20.5" y1="12" x2="22.5" y2="12" />
          <line x1="4.6" y1="19.4" x2="6" y2="18" />
          <line x1="18" y1="6" x2="19.4" y2="4.6" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Dark theme"
        aria-pressed={active === "dark"}
        className={BTN}
        onClick={() => setTheme("dark")}
      >
        <svg xmlns="http://www.w3.org/2000/svg" {...ICON}>
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="System theme"
        aria-pressed={active === "system"}
        className={BTN}
        onClick={() => setTheme("system")}
      >
        <svg xmlns="http://www.w3.org/2000/svg" {...ICON}>
          <rect x="2.5" y="3.5" width="19" height="13" />
          <line x1="8" y1="20.5" x2="16" y2="20.5" />
          <line x1="12" y1="16.5" x2="12" y2="20.5" />
        </svg>
      </button>
    </div>
  );
}
