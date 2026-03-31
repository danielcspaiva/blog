import { notFound } from "next/navigation";

import { BackToPrevious } from "@/components/BackToPrevious";
import { Container } from "@/components/Container";
import { FormattedDate } from "@/components/FormattedDate";
import { GiscusComments } from "@/components/GiscusComments";
import { PostNavigation } from "@/components/PostNavigation";
import { TableOfContents } from "@/components/TableOfContents";
import { TwitterEmbeds } from "@/components/TwitterEmbeds";
import { getAdjacentBlogEntries, getBlogEntry, getBlogStaticParams } from "@/lib/content-source";
import { isLocale } from "@/lib/i18n";
import { createMetadata } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getBlogStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const post = getBlogEntry(slug, locale);

  if (!post) {
    return {};
  }

  return createMetadata({
    description: post.description,
    image: `/open-graph/blog/${locale}/${slug}`,
    locale,
    pathname: `/${locale}/blog/${slug}`,
    title: post.title,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const post = getBlogEntry(slug, locale);

  if (!post) {
    notFound();
  }

  const { next, prev } = getAdjacentBlogEntries(post.id, locale);
  const Content = post.mdxContent;
  const labels = {
    en: {
      backToBlog: "Back to blog",
      minuteRead: "min read",
    },
    "pt-br": {
      backToBlog: "Voltar para o blog",
      minuteRead: "min de leitura",
    },
  } as const;

  return (
    <Container>
      <div className="animate">
        <BackToPrevious href="/blog" locale={locale}>
          {labels[locale].backToBlog}
        </BackToPrevious>
      </div>
      <div className="my-10 space-y-1">
        <div className="animate flex items-center gap-1.5">
          <div className="font-base text-sm">
            <FormattedDate date={post.date} locale={locale} />
          </div>
          &bull;
          <div className="font-base text-sm">
            {post.readingTime} {labels[locale].minuteRead}
          </div>
        </div>
        <h1 className="animate py-4 text-3xl font-semibold text-black dark:text-white">
          {post.title}
        </h1>
        <p className="animate mb-4 text-gray-500">{post.description}</p>
        {post.tags?.length ? (
          <div className="animate flex gap-2 pt-1">
            {post.tags.map((tag) => (
              <a
                className="rounded-sm border border-black/15 px-2 py-1 text-sm transition-colors duration-300 ease-in-out hover:bg-black/5 hover:text-black focus-visible:bg-black/5 focus-visible:text-black dark:border-white/20 dark:hover:bg-white/5 dark:hover:text-white dark:focus-visible:bg-white/5 dark:focus-visible:text-white"
                href={`/${locale}/tags/${tag}`}
                key={tag}
              >
                {tag}
              </a>
            ))}
          </div>
        ) : null}
      </div>
      {!post.hideTableOfContents && post.headings.length > 0 ? (
        <TableOfContents headings={post.headings} />
      ) : null}
      <article className="animate prose prose-sm dark:prose-invert sm:prose-base max-w-none">
        <Content />
        <div className="mt-24">
          <PostNavigation locale={locale} nextPost={next} prevPost={prev} />
        </div>
        <div className="mt-24">
          <GiscusComments lang={locale} />
        </div>
        <TwitterEmbeds />
      </article>
    </Container>
  );
}
