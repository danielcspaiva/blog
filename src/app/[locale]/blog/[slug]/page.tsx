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
      <header className="mt-10 mb-10 space-y-5">
        <div className="animate eyebrow text-ink-faint flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.7rem]">
          <FormattedDate date={post.date} locale={locale} />
          <span aria-hidden="true">·</span>
          <span>
            {post.readingTime} {s.minuteRead}
          </span>
        </div>
        <h1 className="animate font-pixel text-ink text-4xl leading-[1.08] tracking-tight text-balance sm:text-5xl">
          {post.title}
        </h1>
        <p className="animate text-ink-muted text-lg text-pretty">
          {post.description}
        </p>
        {post.tags && post.tags.length > 0 ? (
          <div className="animate flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <IntlLink key={tag} href={`/tags/${tag}`} className="chip">
                {tag}
              </IntlLink>
            ))}
          </div>
        ) : null}
      </header>
      {!post.hideTableOfContents && (
        <TableOfContents toc={post.toc} locale={locale} />
      )}
      <article className="animate prose prose-sm sm:prose-base max-w-none">
        <MDXContent code={post.code} />
      </article>
      <div className="mt-20">
        <PostNavigation
          locale={locale}
          prev={
            prev ? { title: prev.title, href: `/blog/${prev.slug}` } : undefined
          }
          next={
            next ? { title: next.title, href: `/blog/${next.slug}` } : undefined
          }
        />
      </div>
      <div className="mt-20">
        <Comments lang={locale} />
      </div>
      <CodeCopyButtons />
      <TwitterEmbed />
    </Container>
  );
}
