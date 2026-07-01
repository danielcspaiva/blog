"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const current = useLocale();

  return (
    <div className="language-switcher">
      <ul className="flex gap-2">
        {routing.locales.map((lang) => (
          <li key={lang}>
            <button
              type="button"
              onClick={() => router.replace(pathname, { locale: lang })}
              className={`text-sm ${
                current === lang ? "font-bold" : "opacity-70 hover:opacity-100"
              }`}
            >
              {lang}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
