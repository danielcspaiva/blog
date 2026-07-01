"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Replaces the old Head.astro `addCopyCodeButtons()`: appends a clipboard
 * button to every code block. Mounted inside the article; re-scans on route
 * change and de-dupes so buttons aren't added twice.
 */
export function CodeCopyButtons() {
  const pathname = usePathname();

  useEffect(() => {
    const pres = Array.from(
      document.querySelectorAll<HTMLPreElement>("article pre"),
    );
    const cleanups: Array<() => void> = [];

    for (const pre of pres) {
      const parent = pre.parentElement;
      const container =
        parent && parent.matches("figure[data-rehype-pretty-code-figure]")
          ? (parent as HTMLElement)
          : pre;
      if (container.querySelector(":scope > .copy-code")) continue;
      if (!container.style.position) container.style.position = "relative";

      const button = document.createElement("button");
      button.type = "button";
      button.className = "copy-code";
      button.innerText = "📋";

      const onClick = async () => {
        const code = pre.querySelector("code")?.innerText ?? pre.innerText;
        try {
          await navigator.clipboard.writeText(code);
          button.innerText = "✅";
          setTimeout(() => (button.innerText = "📋"), 2000);
        } catch {
          /* clipboard unavailable */
        }
      };

      button.addEventListener("click", onClick);
      container.appendChild(button);
      cleanups.push(() => {
        button.removeEventListener("click", onClick);
        button.remove();
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}
