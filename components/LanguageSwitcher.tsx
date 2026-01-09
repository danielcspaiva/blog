'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { locales } from '@/i18n/config';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <ul className="flex gap-2">
      {locales.map((lang) => (
        <li key={lang}>
          <button
            onClick={() => switchLocale(lang)}
            className={`text-sm ${locale === lang ? 'font-bold' : 'opacity-70 hover:opacity-100'}`}
          >
            {lang}
          </button>
        </li>
      ))}
    </ul>
  );
}
