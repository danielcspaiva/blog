import { defaultLang, languages, ui } from "@/i18n/ui";

export type Locale = keyof typeof languages;
export type TranslationKey = keyof (typeof ui)[typeof defaultLang];

const LOCALE_PREFIXES = Object.keys(languages);
export const locales = Object.keys(languages) as Locale[];

export function isLocale(value: string): value is Locale {
  return value in languages;
}

export function getRouteWithoutLocale(pathname: string): string {
  if (pathname === "/") {
    return pathname;
  }

  const segments = pathname.split("/").filter(Boolean);
  const [first, ...rest] = segments;

  if (first && isLocale(first)) {
    return rest.length > 0 ? `/${rest.join("/")}` : "/";
  }

  return pathname;
}

export function getLocalizedHref(href: string, locale: Locale): string {
  if (
    href.startsWith("#") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("sms:") ||
    href.startsWith("http://") ||
    href.startsWith("https://")
  ) {
    return href;
  }

  if (LOCALE_PREFIXES.some((prefix) => href === `/${prefix}` || href.startsWith(`/${prefix}/`))) {
    return href;
  }

  if (href === "/") {
    return `/${locale}`;
  }

  return `/${locale}${href.startsWith("/") ? href : `/${href}`}`;
}

export function useTranslations(locale: Locale) {
  return function t(key: TranslationKey): string {
    return ui[locale][key] ?? ui[defaultLang][key];
  };
}

export { defaultLang, languages, ui };
