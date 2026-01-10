import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { getBlogPosts, getBlogPostBySlug, getAdjacentPosts } from '@/lib/content';
import { locales } from '@/i18n/config';
import Container from '@/components/Container';
import FormattedDate from '@/components/FormattedDate';
import TableOfContents from '@/components/TableOfContents';
import PostNavigation from '@/components/PostNavigation';
import Giscus from '@/components/Giscus';
import MdxContent from '@/components/MdxContent';
import BackToPrevious from '@/components/BackToPrevious';
import { Link } from '@/i18n/navigation';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    const posts = getBlogPosts(locale);
    for (const post of posts) {
      params.push({ locale, slug: post.slug });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getBlogPostBySlug(slug, locale);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: ['Daniel Paiva'],
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(post.title)}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [`/api/og?title=${encodeURIComponent(post.title)}`],
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = getBlogPostBySlug(slug, locale);

  if (!post) {
    notFound();
  }

  const { prev, next } = getAdjacentPosts(slug, locale);

  return (
    <>
      <Container>
        {/* Back to blog link */}
        <div className="animate">
          <BackToPrevious href="/blog">Back to blog</BackToPrevious>
        </div>

        {/* Header */}
        <div className="my-10 space-y-1">
          <div className="animate flex items-center gap-1.5">
            <div className="font-base text-sm">
              <FormattedDate date={new Date(post.date)} />
            </div>
            <span>&bull;</span>
            <div className="font-base text-sm">{post.readingTime} min read</div>
          </div>
          <h1 className="animate py-4 text-3xl font-semibold text-black dark:text-white">
            {post.title}
          </h1>
          <p className="animate mb-4 text-gray-500">{post.description}</p>
          {post.tags && post.tags.length > 0 && (
            <div className="animate flex flex-wrap gap-2 pt-1">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${tag}`}
                  className="rounded-sm border border-black/15 px-2 py-1 text-sm transition-colors duration-300 ease-in-out hover:bg-black/5 hover:text-black focus-visible:bg-black/5 focus-visible:text-black dark:border-white/20 dark:hover:bg-white/5 dark:hover:text-white dark:focus-visible:bg-white/5 dark:focus-visible:text-white"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Table of Contents */}
        {!post.hideTableOfContents && <TableOfContents />}

        {/* Article Content */}
        <article className="prose prose-sm max-w-none animate dark:prose-invert sm:prose-base">
          <MdxContent code={post.body.code} />

          {/* Post Navigation */}
          <div className="mt-24">
            <PostNavigation prevPost={prev} nextPost={next} />
          </div>

          {/* Comments */}
          <div className="mt-24">
            <Giscus />
          </div>
        </article>
      </Container>
    </>
  );
}
