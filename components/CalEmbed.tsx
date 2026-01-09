'use client';

import { useEffect } from 'react';

export default function CalEmbed() {
  useEffect(() => {
    // Cal.com embed script
    if (typeof window !== 'undefined') {
      (function (C: any, A: string, L: string) {
        let p = function (a: any, ar: any) {
          a.q.push(ar);
        };
        let d = C.document;
        C.Cal =
          C.Cal ||
          function () {
            let cal = C.Cal;
            let ar = arguments;
            if (!cal.loaded) {
              cal.ns = {};
              cal.q = cal.q || [];
              d.head.appendChild(d.createElement('script')).src = A;
              cal.loaded = true;
            }
            if (ar[0] === L) {
              const api: any = function () {
                p(api, arguments);
              };
              const namespace = ar[1];
              api.q = api.q || [];
              if (typeof namespace === 'string') {
                cal.ns[namespace] = cal.ns[namespace] || api;
                p(cal.ns[namespace], ar);
                p(cal, ['initNamespace', namespace]);
              } else p(cal, ar);
              return;
            }
            p(cal, ar);
          };
      })(window, 'https://app.cal.com/embed/embed.js', 'init');

      // Initialize Cal.com
      const initCal = () => {
        if ((window as any).Cal) {
          (window as any).Cal('init');
        }
      };

      if (document.readyState === 'complete') {
        initCal();
      } else {
        window.addEventListener('load', initCal);
        return () => window.removeEventListener('load', initCal);
      }
    }
  }, []);

  return null;
}

declare global {
  interface Window {
    Cal: any;
  }
}
