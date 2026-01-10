'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex flex-wrap items-center gap-1.5">
        <div className="size-9" />
        <div className="size-9" />
        <div className="size-9" />
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <button
        onClick={() => setTheme('light')}
        aria-label="Light theme"
        className={`group flex size-9 items-center justify-center rounded-sm border border-black/15 hover:bg-black/5 focus-visible:bg-black/5 dark:border-white/20 dark:hover:bg-white/5 dark:focus-visible:bg-white/5 ${theme === 'light' ? 'bg-black/5 dark:bg-white/5' : ''}`}
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
          className="transition-colors duration-300 ease-in-out group-hover:animate-pulse group-hover:stroke-black group-focus-visible:animate-pulse group-focus-visible:stroke-black dark:group-hover:stroke-white dark:group-focus-visible:stroke-white"
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
        onClick={() => setTheme('dark')}
        aria-label="Dark theme"
        className={`group flex size-9 items-center justify-center rounded-sm border border-black/15 hover:bg-black/5 focus-visible:bg-black/5 dark:border-white/20 dark:hover:bg-white/5 dark:focus-visible:bg-white/5 ${theme === 'dark' ? 'bg-black/5 dark:bg-white/5' : ''}`}
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
          className="transition-colors duration-300 ease-in-out group-hover:animate-pulse group-hover:stroke-black group-focus-visible:animate-pulse group-focus-visible:stroke-black dark:group-hover:stroke-white dark:group-focus-visible:stroke-white"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </button>
      <button
        onClick={() => setTheme('system')}
        aria-label="System theme"
        className={`group flex size-9 items-center justify-center rounded-sm border border-black/15 hover:bg-black/5 focus-visible:bg-black/5 dark:border-white/20 dark:hover:bg-white/5 dark:focus-visible:bg-white/5 ${theme === 'system' ? 'bg-black/5 dark:bg-white/5' : ''}`}
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
          className="transition-colors duration-300 ease-in-out group-hover:animate-pulse group-hover:stroke-black group-focus-visible:animate-pulse group-focus-visible:stroke-black dark:group-hover:stroke-white dark:group-focus-visible:stroke-white"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      </button>
    </div>
  );
}
