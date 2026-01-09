import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { getAllTags, getPostsByTag } from '@/lib/content';
import { locales } from '@/i18n/config';
import Container from '@/components/Container';
import ArrowCard from '@/components/ArrowCard';
import BackToPrevious from '@/components/BackToPrevious';

export async function generateStaticParams() {
  const params: { locale: string; tag: string }[] = [];

  for (const locale of locales) {
    const tags = getAllTags(locale);
    for (const tag of tags) {
      params.push({ locale, tag });
    }
  }

  return params;
}

const getContent = (locale: string, tag: string) => {
  if (locale === 'pt-br') {
    return {
      title: `Tag: ${tag}`,
      description: `Posts com a tag: ${tag}`,
      allTags: 'Todas as tags',
      postsTaggedWith: `Posts com a tag "${tag}"`,
    };
  }

  return {
    title: `Tag: ${tag}`,
    description: `Posts with the tag: ${tag}`,
    allTags: 'All tags',
    postsTaggedWith: `Posts tagged with "${tag}"`,
  };
};

export default async function TagPage({
  params,
}: {
  params: Promise<{ locale: string; tag: string }>;
}) {
  const { locale, tag } = await params;
  setRequestLocale(locale);

  const posts = getPostsByTag(tag, locale);

  if (posts.length === 0) {
    notFound();
  }

  const content = getContent(locale, tag);

  return (
    <Container>
      <div className="space-y-10">
        <BackToPrevious href="/tags">{content.allTags}</BackToPrevious>
        <h1 className="animate font-semibold text-primary">
          {content.postsTaggedWith}
        </h1>
        <ul className="animate flex flex-col gap-4">
          {posts.map((post) => (
            <ArrowCard key={post.slug} entry={post} type="blog" />
          ))}
        </ul>
      </div>
    </Container>
  );
}
