"use client";

export function BackToTop() {
  return (
    <button
      id="back-to-top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="eyebrow group relative flex w-fit flex-nowrap rounded-[2px] border border-ink-950/22 py-1.5 pl-8 pr-3 text-[0.7rem] text-ink-600 transition-colors duration-200 ease-out hover:border-ink-950 hover:text-ink-950 focus-visible:border-ink-950 focus-visible:text-ink-950 dark:border-ink-50/20 dark:text-ink-300 dark:hover:border-ink-50 dark:hover:text-white dark:focus-visible:border-ink-50 dark:focus-visible:text-white"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="absolute left-2 top-1/2 size-4 -translate-y-1/2 rotate-90 fill-none stroke-current stroke-2"
      >
        <line
          x1="5"
          y1="12"
          x2="19"
          y2="12"
          className="translate-x-2 scale-x-0 transition-transform duration-300 ease-in-out group-hover:translate-x-0 group-hover:scale-x-100 group-focus-visible:translate-x-0 group-focus-visible:scale-x-100"
        />
        <polyline
          points="12 5 5 12 12 19"
          className="translate-x-1 transition-transform duration-300 ease-in-out group-hover:translate-x-0 group-focus-visible:translate-x-0"
        />
      </svg>
      <div className="text-sm">Back to top</div>
    </button>
  );
}
