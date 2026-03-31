"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type ThemePreference = "dark" | "light" | "system";

function getResolvedTheme(theme: ThemePreference): "dark" | "light" {
  if (theme === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  return theme;
}

function applyTheme(theme: ThemePreference) {
  const resolvedTheme = getResolvedTheme(theme);
  document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
  document.documentElement.dataset.themePreference = theme;
  localStorage.setItem("theme", theme);
  window.dispatchEvent(new CustomEvent("themechange", { detail: { theme: resolvedTheme } }));
}

function ThemeButton({
  active,
  ariaLabel,
  children,
  onClick,
}: {
  active: boolean;
  ariaLabel: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      aria-label={ariaLabel}
      className={cn(
        "group flex size-9 items-center justify-center rounded-sm border border-black/15 hover:bg-black/5 focus-visible:bg-black/5 dark:border-white/20 dark:hover:bg-white/5 dark:focus-visible:bg-white/5",
        active && "bg-black/5 dark:bg-white/5",
      )}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

export function ThemeControls() {
  const [theme, setTheme] = useState<ThemePreference>("system");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme === "light" || storedTheme === "dark" || storedTheme === "system") {
      setTheme(storedTheme);
      applyTheme(storedTheme);
    } else {
      applyTheme("system");
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if ((localStorage.getItem("theme") ?? "system") === "system") {
        applyTheme("system");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  function updateTheme(nextTheme: ThemePreference) {
    setTheme(nextTheme);
    applyTheme(nextTheme);
  }

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <ThemeButton
        active={theme === "light"}
        ariaLabel="Light theme"
        onClick={() => updateTheme("light")}
      >
        <svg
          className="transition-colors duration-300 ease-in-out group-hover:animate-pulse group-hover:stroke-black group-focus-visible:animate-pulse group-focus-visible:stroke-black dark:group-hover:stroke-white dark:group-focus-visible:stroke-white"
          fill="none"
          height="18"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          width="18"
        >
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" x2="12" y1="1" y2="3"></line>
          <line x1="12" x2="12" y1="21" y2="23"></line>
          <line x1="4.22" x2="5.64" y1="4.22" y2="5.64"></line>
          <line x1="18.36" x2="19.78" y1="18.36" y2="19.78"></line>
          <line x1="1" x2="3" y1="12" y2="12"></line>
          <line x1="21" x2="23" y1="12" y2="12"></line>
          <line x1="4.22" x2="5.64" y1="19.78" y2="18.36"></line>
          <line x1="18.36" x2="19.78" y1="5.64" y2="4.22"></line>
        </svg>
      </ThemeButton>
      <ThemeButton
        active={theme === "dark"}
        ariaLabel="Dark theme"
        onClick={() => updateTheme("dark")}
      >
        <svg
          className="transition-colors duration-300 ease-in-out group-hover:animate-pulse group-hover:stroke-black group-focus-visible:animate-pulse group-focus-visible:stroke-black dark:group-hover:stroke-white dark:group-focus-visible:stroke-white"
          fill="none"
          height="18"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          width="18"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </ThemeButton>
      <ThemeButton
        active={theme === "system"}
        ariaLabel="System theme"
        onClick={() => updateTheme("system")}
      >
        <svg
          className="transition-colors duration-300 ease-in-out group-hover:animate-pulse group-hover:stroke-black group-focus-visible:animate-pulse group-focus-visible:stroke-black dark:group-hover:stroke-white dark:group-focus-visible:stroke-white"
          fill="none"
          height="18"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          width="18"
        >
          <rect height="14" rx="2" ry="2" width="20" x="2" y="3"></rect>
          <line x1="8" x2="16" y1="21" y2="21"></line>
          <line x1="12" x2="12" y1="17" y2="21"></line>
        </svg>
      </ThemeButton>
    </div>
  );
}
