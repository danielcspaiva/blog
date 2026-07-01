import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "pt-br"],
  defaultLocale: "en",
  // 'en' is served unprefixed (/), 'pt-br' is prefixed (/pt-br/...).
  localePrefix: "as-needed",
  // Deterministic '/' = English; no cookie-based redirect (parity + caching).
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];

// Display names for the language switcher.
export const localeNames: Record<Locale, string> = {
  en: "English",
  "pt-br": "Português (Brasil)",
};
