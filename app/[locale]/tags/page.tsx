import { setRequestLocale } from 'next-intl/server';
import { getAllTagsWithCount } from '@/lib/content';
import { locales } from '@/i18n/config';
import Container from '@/components/Container';
import { Link } from '@/i18n/navigation';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const getContent = (locale: string) => {
  if (locale === 'pt-br') {
    return {
      title: 'Tags',
      description: 'Lista de tags utilizadas.',
      allTags: 'Todas as Tags',
    };
  }

  return {
    title: 'Tags',
    description: 'List of tags used.',
    allTags: 'All Tags',
  };
};

export default async function TagsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tags = getAllTagsWithCount(locale);
  const content = getContent(locale);

  return (
    <Container>
      <div className="space-y-10">
        <h1 className="animate font-semibold text-primary">
          {content.allTags}
        </h1>
        <div className="animate flex flex-wrap gap-2">
          {tags.map(({ tag, count }) => (
            <Link
              key={tag}
              href={`/tags/${tag}` as any}
              className="rounded-sm border border-border px-2 py-1 text-sm transition-colors duration-300 ease-in-out hover:bg-secondary hover:text-primary focus-visible:bg-secondary focus-visible:text-primary"
            >
              {tag} <span className="text-sm text-tertiary">({count})</span>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}
