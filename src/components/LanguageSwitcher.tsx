"use client";

import { usePathname } from "next/navigation";

import { AppLink } from "@/components/AppLink";
import { defaultLang, languages, type Locale } from "@/lib/i18n";

function replaceLocale(pathname: string, targetLocale: Locale) {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return `/${targetLocale}`;
  }

  const [first, ...rest] = segments;
  const currentLocale = first in languages ? first : null;

  if (currentLocale) {
    return rest.length > 0 ? `/${targetLocale}/${rest.join("/")}` : `/${targetLocale}`;
  }

  return `/${targetLocale}${pathname === "/" ? "" : pathname}`;
}

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? `/${defaultLang}`;

  return (
    <ul className="flex gap-2">
      {Object.keys(languages).map((entryLocale) => (
        <li key={entryLocale}>
          <AppLink
            className={
              locale === entryLocale
                ? "font-bold no-underline"
                : "no-underline opacity-70 hover:opacity-100"
            }
            href={replaceLocale(pathname, entryLocale as Locale)}
            localize={false}
            underline={false}
          >
            {entryLocale}
          </AppLink>
        </li>
      ))}
    </ul>
  );
}
