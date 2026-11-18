"use client";

export function BackToTop() {
  return (
    <button
      id="back-to-top"
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="btn transition-opacity"
    >
      <span aria-hidden="true">↑</span>
      Back to top
    </button>
  );
}
