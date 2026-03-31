"use client";

import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    twttr?: {
      widgets?: {
        load: () => void;
      };
    };
  }
}

export function TwitterEmbeds() {
  useEffect(() => {
    window.twttr?.widgets?.load();
  });

  return <Script src="https://platform.twitter.com/widgets.js" strategy="lazyOnload" />;
}
