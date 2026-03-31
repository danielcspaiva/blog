import { notFound } from "next/navigation";

import { ArrowCard } from "@/components/ArrowCard";
import { BackToPrevious } from "@/components/BackToPrevious";
import { Container } from "@/components/Container";
import { getEntriesForTag, getTagSummariesByLocale } from "@/lib/content-source";
import { isLocale, locales } from "@/lib/i18n";
import { createMetadata } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getTagSummariesByLocale(locale).map((tag) => ({
      locale,
      tag: tag.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; tag: string }>;
}) {
  const { locale, tag } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const title = `Tag: ${tag}`;
  const description = locale === "en" ? `Posts with the tag: ${tag}` : `Posts com a tag: ${tag}`;

  return createMetadata({
    description,
    locale,
    pathname: `/${locale}/tags/${tag}`,
    title,
  });
}

export default async function TagDetailPage({
  params,
}: {
  params: Promise<{ locale: string; tag: string }>;
}) {
  const { locale, tag } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const posts = getEntriesForTag(locale, tag);

  if (!posts.length) {
    notFound();
  }

  const labels = {
    en: {
      allTags: "All tags",
      postsTaggedWith: `Posts tagged with "${tag}"`,
    },
    "pt-br": {
      allTags: "Todas as tags",
      postsTaggedWith: `Posts com a tag "${tag}"`,
    },
  } as const;

  return (
    <Container>
      <div className="space-y-10">
        <BackToPrevious href="/tags" locale={locale}>
          {labels[locale].allTags}
        </BackToPrevious>
        <h1 className="animate font-semibold text-black dark:text-white">
          {labels[locale].postsTaggedWith}
        </h1>
        <ul className="animate flex flex-col gap-4">
          {posts.map((post) => (
            <li key={post.id}>
              <ArrowCard entry={post} locale={locale} />
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
