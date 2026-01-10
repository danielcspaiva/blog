import { setRequestLocale } from 'next-intl/server';
import { getPostsByYear } from '@/lib/content';
import { locales } from '@/i18n/config';
import ArrowCard from '@/components/ArrowCard';
import Container from '@/components/Container';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const postsByYear = getPostsByYear(locale);

  return (
    <Container>
      <div className="space-y-10">
        <div className="space-y-4">
          <h1 className="animate-in text-3xl font-semibold tracking-tight text-primary">
            Blog
          </h1>
          <p className="animate-in text-secondary">
            {locale === 'en'
              ? 'A collection of articles on topics I am passionate about.'
              : 'Uma coleção de artigos sobre temas que me interessam.'}
          </p>
        </div>

        <div className="animate-in space-y-12">
          {postsByYear.map(({ year, posts }) => (
            <section key={year} className="space-y-4">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-tertiary">
                {year}
              </h2>
              <div className="space-y-4">
                {posts.map((post) => (
                  <ArrowCard key={post.slug} entry={post} type="blog" />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </Container>
  );
}
