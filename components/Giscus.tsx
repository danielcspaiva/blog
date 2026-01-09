'use client';

import { useTheme } from 'next-themes';
import { useEffect, useRef } from 'react';

export default function Giscus() {
  const { resolvedTheme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Remove existing script if any
    if (scriptRef.current) {
      scriptRef.current.remove();
    }

    // Clear the container
    ref.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'danielcspaiva/blog');
    script.setAttribute('data-repo-id', 'R_kgDOOFa0dA');
    script.setAttribute('data-category', 'General');
    script.setAttribute('data-category-id', 'DIC_kwDOOFa0dM4Cnz4W');
    script.setAttribute('data-mapping', 'title');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute(
      'data-theme',
      resolvedTheme === 'dark' ? 'dark' : 'light'
    );
    script.setAttribute('data-lang', 'en');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    ref.current.appendChild(script);
    scriptRef.current = script;

    return () => {
      if (scriptRef.current) {
        scriptRef.current.remove();
      }
    };
  }, [resolvedTheme]);

  return <div ref={ref} className="giscus" />;
}
