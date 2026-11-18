"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const NAMES: Record<string, string> = {
  en: "English",
  "pt-br": "Português (Brasil)",
};

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const current = useLocale();

  return (
    <ul className="language-switcher border-ink flex border">
      {routing.locales.map((lang) => (
        <li key={lang} className="flex">
          <button
            type="button"
            lang={lang}
            aria-label={NAMES[lang] ?? lang}
            aria-pressed={current === lang}
            onClick={() => router.replace(pathname, { locale: lang })}
            className="text-ink-soft hover:bg-ink hover:text-paper aria-pressed:bg-ink aria-pressed:text-paper cursor-pointer px-1.5 py-0.5 uppercase"
          >
            {lang.split("-")[0]}
          </button>
        </li>
      ))}
    </ul>
  );
}
