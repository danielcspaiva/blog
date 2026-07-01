"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";

export function Comments({ lang = "en" }: { lang?: string }) {
  const { resolvedTheme } = useTheme();
  return (
    <Giscus
      repo="danielcspaiva/blog"
      repoId="R_kgDOOFa0dA"
      category="General"
      categoryId="DIC_kwDOOFa0dM4Cnz4W"
      mapping="title"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="bottom"
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      lang={lang === "pt-br" ? "pt" : "en"}
      loading="lazy"
    />
  );
}
