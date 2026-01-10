'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Container from './Container';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const t = useTranslations('nav');

  return (
    <header>
      <Container>
        <div className="flex flex-wrap justify-between gap-y-2">
          <div className="translate-y-1 overflow-x-auto">
            <Link href="/" className="block">
              <div className="select-none whitespace-pre font-mono text-[2.5px] leading-tight text-black dark:text-white sm:text-[3px] md:text-[3.5px]">
                {`██████╗  ██████╗███████╗██████╗
██╔══██╗██╔════╝██╔════╝██╔══██╗
██║  ██║██║     ███████╗██████╔╝
██║  ██║██║     ╚════██║██╔═══╝
██████╔╝╚██████╗███████║██║
╚═════╝  ╚═════╝╚══════╝╚═╝`}
              </div>
            </Link>
          </div>
          <nav className="flex items-center gap-1 text-sm">
            <span className="mr-2">
              <LanguageSwitcher />
            </span>
            <Link
              href="/blog"
              className="inline-block text-current underline decoration-black/30 underline-offset-[3px] transition-colors duration-300 ease-in-out hover:text-black hover:decoration-black/50 focus-visible:text-black focus-visible:decoration-black/50 dark:decoration-white/30 dark:hover:text-white dark:hover:decoration-white/50 dark:focus-visible:text-white dark:focus-visible:decoration-white/50"
            >
              {t('blog')}
            </Link>
            <span>/</span>
            <Link
              href="/experience"
              className="inline-block text-current underline decoration-black/30 underline-offset-[3px] transition-colors duration-300 ease-in-out hover:text-black hover:decoration-black/50 focus-visible:text-black focus-visible:decoration-black/50 dark:decoration-white/30 dark:hover:text-white dark:hover:decoration-white/50 dark:focus-visible:text-white dark:focus-visible:decoration-white/50"
            >
              {t('experience')}
            </Link>
          </nav>
        </div>
      </Container>
    </header>
  );
}
