import type { ReactNode } from "react";
import { notFound } from "next/navigation";

import { LocaleDocumentEffect } from "@/components/LocaleDocumentEffect";
import { SiteShell } from "@/components/SiteShell";
import { isLocale, locales } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <>
      <LocaleDocumentEffect locale={locale} />
      <SiteShell locale={locale}>{children}</SiteShell>
    </>
  );
}
