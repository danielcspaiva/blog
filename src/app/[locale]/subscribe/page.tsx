import { setRequestLocale } from 'next-intl/server';
import { locales } from '@/i18n/config';
import Container from '@/components/Container';
import Newsletter from '@/components/Newsletter';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const getContent = (locale: string) => {
  if (locale === 'pt-br') {
    return {
      title: 'Inscreva-se na minha newsletter',
      description:
        'Seja notificado quando eu publicar novos artigos. Sem spam, cancele a inscrição a qualquer momento.',
    };
  }

  return {
    title: 'Subscribe to my newsletter',
    description:
      'Get notified when I publish new articles. No spam, unsubscribe anytime.',
  };
};

export default async function SubscribePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const content = getContent(locale);

  return (
    <Container>
      <div className="space-y-10">
        <div className="space-y-4">
          <h1 className="animate-in text-3xl font-semibold tracking-tight text-primary">
            {content.title}
          </h1>
          <p className="animate-in text-secondary">{content.description}</p>
        </div>

        <div className="animate-in">
          <Newsletter />
        </div>
      </div>
    </Container>
  );
}
