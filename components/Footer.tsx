'use client';

import { useTranslations } from 'next-intl';
import Container from './Container';
import BackToTop from './BackToTop';
import ThemeToggle from './ThemeToggle';
import { SITE } from '@/lib/constants';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="animate py-6 text-sm">
      <Container>
        <div className="relative">
          <div className="absolute -top-12 right-0">
            <BackToTop />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            &copy; {new Date().getFullYear()} &bull; {SITE.TITLE} &bull;{' '}
            {t('rights')}
          </div>
          <ThemeToggle />
        </div>
      </Container>
    </footer>
  );
}
