import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Analytics } from "@vercel/analytics/next";
import { routing } from "@/i18n/routing";
import { fontVariables } from "@/app/fonts";
import { Providers } from "@/app/providers";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Newsletter } from "@/components/Newsletter";
import { ScrollEffects } from "@/components/scroll-effects";
import { CalEmbed } from "@/components/CalEmbed";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale} className={fontVariables} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider>
          <Providers>
            <Header />
            <main>
              {children}
              <div className="pt-12">
                <Newsletter locale={locale} />
              </div>
            </main>
            <Footer />
            <ScrollEffects />
            <CalEmbed />
          </Providers>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
