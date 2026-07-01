"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const BTN =
  "group flex size-9 items-center justify-center rounded-[2px] border border-ink-950/20 hover:bg-ink-950/5 focus-visible:bg-ink-950/5 dark:border-ink-50/20 dark:hover:bg-ink-50/5 dark:focus-visible:bg-ink-50/5";
const ICON =
  "transition-colors duration-300 ease-in-out group-hover:animate-pulse group-hover:stroke-black group-focus-visible:animate-pulse group-focus-visible:stroke-black dark:group-hover:stroke-white dark:group-focus-visible:stroke-white";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const active = mounted ? theme : undefined;
  const cls = (value: string) =>
    `${BTN}${active === value ? " bg-black/5 dark:bg-white/5" : ""}`;

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <button
        aria-label="Light theme"
        className={cls("light")}
        onClick={() => setTheme("light")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={ICON}
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      </button>
      <button
        aria-label="Dark theme"
        className={cls("dark")}
        onClick={() => setTheme("dark")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={ICON}
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </button>
      <button
        aria-label="System theme"
        className={cls("system")}
        onClick={() => setTheme("system")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={ICON}
        >
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      </button>
    </div>
  );
}
