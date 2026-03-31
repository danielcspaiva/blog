"use client";

import { useEffect, useRef } from "react";

type Props = {
  lang: string;
};

function getResolvedTheme() {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function GiscusComments({ lang }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", "danielcspaiva/blog");
    script.setAttribute("data-repo-id", "R_kgDOOFa0dA");
    script.setAttribute("data-category", "General");
    script.setAttribute("data-category-id", "DIC_kwDOOFa0dM4Cnz4W");
    script.setAttribute("data-mapping", "title");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", getResolvedTheme());
    script.setAttribute("data-lang", lang);

    container.innerHTML = "";
    container.append(script);

    const handleThemeChange = () => {
      const iframe = document.querySelector<HTMLIFrameElement>("iframe.giscus-frame");

      iframe?.contentWindow?.postMessage(
        {
          giscus: {
            setConfig: {
              theme: getResolvedTheme(),
            },
          },
        },
        "https://giscus.app",
      );
    };

    window.addEventListener("themechange", handleThemeChange);
    return () => window.removeEventListener("themechange", handleThemeChange);
  }, [lang]);

  return <div ref={containerRef} />;
}
