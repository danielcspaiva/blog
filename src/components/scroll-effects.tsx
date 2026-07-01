"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Replaces the inline script in the old Head.astro:
 *  - toggles `html.scrolled` (gates back-to-top visibility)
 *  - replays the staggered `.animate` reveal (index * 100ms) on each route
 * Mounted once inside the [locale] layout.
 */
export function ScrollEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () =>
      document.documentElement.classList.toggle("scrolled", window.scrollY > 0);
    onScroll();
    document.addEventListener("scroll", onScroll, { passive: true });
    return () => document.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll(".animate");
    const timers: ReturnType<typeof setTimeout>[] = [];
    els.forEach((el, i) => {
      el.classList.remove("show");
      timers.push(setTimeout(() => el.classList.add("show"), i * 100));
    });
    return () => timers.forEach(clearTimeout);
  }, [pathname]);

  return null;
}
