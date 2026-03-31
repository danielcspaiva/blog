import type { ReactNode } from "react";

import { Newsletter } from "@/components/Newsletter";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import type { Locale } from "@/lib/i18n";

export function SiteShell({ children, locale }: { children: ReactNode; locale: Locale }) {
  return (
    <>
      <SiteHeader locale={locale} />
      <main>
        {children}
        <div className="pt-12">
          <Newsletter locale={locale} />
        </div>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
