"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    twttr?: { widgets?: { load?: () => void } };
  }
}

// Loads Twitter's widgets.js once and (re)renders any .twitter-tweet blockquotes
// on the page — including after client-side navigation.
export function TwitterEmbed() {
  const pathname = usePathname();

  useEffect(() => {
    const id = "twitter-widgets-js";
    const render = () => window.twttr?.widgets?.load?.();

    if (document.getElementById(id)) {
      render();
      return;
    }
    const script = document.createElement("script");
    script.id = id;
    script.async = true;
    script.src = "https://platform.twitter.com/widgets.js";
    script.onload = render;
    document.body.appendChild(script);
  }, [pathname]);

  return null;
}
