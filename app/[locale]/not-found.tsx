import { useTranslations } from 'next-intl';
import Container from '@/components/Container';
import BackToPrevious from '@/components/BackToPrevious';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <Container>
      <div className="mt-16 grid place-items-center gap-3">
        <h4 className="animate text-2xl font-semibold text-primary">
          {t('title')}
        </h4>
        <p className="animate text-center text-secondary">{t('message')}</p>
        <span className="animate">
          <BackToPrevious href="/">{t('backHome')}</BackToPrevious>
        </span>
      </div>
    </Container>
  );
}
