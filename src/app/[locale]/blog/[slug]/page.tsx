import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Container } from "@/components/Container";
import { BackToPrevious } from "@/components/BackToPrevious";
import { FormattedDate } from "@/components/FormattedDate";
import { PostNavigation } from "@/components/PostNavigation";
import { TableOfContents } from "@/components/TableOfContents";
import { Comments } from "@/components/Giscus";
import { Link as IntlLink } from "@/i18n/navigation";
import { MDXContent } from "@/lib/mdx/mdx-content";
import { CodeCopyButtons } from "@/components/mdx/code-copy-buttons";
import { TwitterEmbed } from "@/components/mdx/twitter-embed";
import {
  getLocalizedPost,
  getAdjacentPosts,
  allPostSlugs,
} from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

const strings = {
  en: { backToBlog: "Back to blog", minuteRead: "min read" },
  "pt-br": { backToBlog: "Voltar para o blog", minuteRead: "min de leitura" },
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    allPostSlugs
      .filter((slug) => getLocalizedPost(slug, locale))
      .map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getLocalizedPost(slug, locale);
  if (!post) return {};
  return buildMetadata({
    locale,
    title: post.title,
    description: post.description,
    path: `/blog/${slug}`,
    type: "article",
  });
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = getLocalizedPost(slug, locale);
  if (!post) notFound();

  const { prev, next } = getAdjacentPosts(slug, locale);
  const s = strings[locale as "en" | "pt-br"] ?? strings.en;

  return (
    <Container>
      <div className="animate">
        <BackToPrevious href="/blog">{s.backToBlog}</BackToPrevious>
      </div>
      <div className="my-10 space-y-1">
        <div className="animate eyebrow flex items-center gap-2 text-[0.7rem] text-ink-500 dark:text-ink-400">
          <FormattedDate date={post.date} locale={locale} />
          <span className="text-ink-400 dark:text-ink-500">·</span>
          <span>
            {post.readingTime} {s.minuteRead}
          </span>
        </div>
        <h1 className="animate py-4 font-pixel text-3xl leading-tight tracking-tight text-ink-950 sm:text-4xl dark:text-ink-50">
          {post.title}
        </h1>
        <p className="animate mb-4 text-ink-600 dark:text-ink-300">
          {post.description}
        </p>
        {post.tags && post.tags.length > 0 ? (
          <div className="animate flex gap-2 pt-1">
            {post.tags.map((tag) => (
              <IntlLink
                key={tag}
                href={`/tags/${tag}`}
                className="eyebrow rounded-[2px] border border-ink-950/25 px-2 py-1 text-[0.7rem] text-ink-600 transition-colors duration-200 ease-out hover:border-ink-950 hover:text-ink-950 focus-visible:border-ink-950 focus-visible:text-ink-950 dark:border-ink-50/25 dark:text-ink-300 dark:hover:border-ink-50 dark:hover:text-white dark:focus-visible:border-ink-50 dark:focus-visible:text-white"
              >
                {tag}
              </IntlLink>
            ))}
          </div>
        ) : null}
      </div>
      {!post.hideTableOfContents && <TableOfContents toc={post.toc} />}
      <article className="animate prose prose-sm max-w-none dark:prose-invert sm:prose-base">
        <MDXContent code={post.code} />
        <div className="mt-24">
          <PostNavigation
            prev={prev ? { title: prev.title, href: `/blog/${prev.slug}` } : undefined}
            next={next ? { title: next.title, href: `/blog/${next.slug}` } : undefined}
          />
        </div>
        <div className="mt-24">
          <Comments lang={locale} />
        </div>
      </article>
      <CodeCopyButtons />
      <TwitterEmbed />
    </Container>
  );
}
