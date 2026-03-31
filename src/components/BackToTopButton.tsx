"use client";

export function BackToTopButton() {
  return (
    <button
      className="group relative flex w-fit flex-nowrap rounded-sm border border-black/15 py-1.5 pr-3 pl-8 transition-colors duration-300 ease-in-out hover:bg-black/5 hover:text-black focus-visible:bg-black/5 focus-visible:text-black dark:border-white/20 dark:hover:bg-white/5 dark:hover:text-white dark:focus-visible:bg-white/5 dark:focus-visible:text-white"
      id="back-to-top"
      onClick={() => window.scrollTo({ behavior: "smooth", top: 0 })}
      type="button"
    >
      <svg
        className="absolute top-1/2 left-2 size-4 -translate-y-1/2 rotate-90 fill-none stroke-current stroke-2"
        viewBox="0 0 24 24"
      >
        <line
          className="translate-x-2 scale-x-0 transition-transform duration-300 ease-in-out group-hover:translate-x-0 group-hover:scale-x-100 group-focus-visible:translate-x-0 group-focus-visible:scale-x-100"
          x1="5"
          x2="19"
          y1="12"
          y2="12"
        ></line>
        <polyline
          className="translate-x-1 transition-transform duration-300 ease-in-out group-hover:translate-x-0 group-focus-visible:translate-x-0"
          points="12 5 5 12 12 19"
        ></polyline>
      </svg>
      <span className="text-sm">Back to top</span>
    </button>
  );
}
