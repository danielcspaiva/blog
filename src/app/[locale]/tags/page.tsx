import { notFound } from "next/navigation";

import { Container } from "@/components/Container";
import { isLocale } from "@/lib/i18n";
import { getTagSummariesByLocale } from "@/lib/content-source";
import { createMetadata, getPageMetadata } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const pageMetadata = getPageMetadata("tags", locale);

  return createMetadata({
    description: pageMetadata.description,
    image: `/open-graph/site/${locale}/tags`,
    locale,
    pathname: `/${locale}/tags`,
    title: pageMetadata.title,
  });
}

export default async function TagsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const tagSummaries = getTagSummariesByLocale(locale);
  const labels = {
    en: "All Tags",
    "pt-br": "Todas as Tags",
  } as const;

  return (
    <Container>
      <div className="space-y-10">
        <h1 className="animate font-semibold">{labels[locale]}</h1>
        <div className="animate flex flex-wrap gap-2">
          {tagSummaries.map((tag) => (
            <a
              className="rounded-sm border border-black/15 px-2 py-1 text-sm transition-colors duration-300 ease-in-out hover:bg-black/5 hover:text-black focus-visible:bg-black/5 focus-visible:text-black dark:border-white/20 dark:hover:bg-white/5 dark:hover:text-white dark:focus-visible:bg-white/5 dark:focus-visible:text-white"
              href={`/${locale}/tags/${tag.slug}`}
              key={tag.slug}
            >
              {tag.slug} <span className="text-sm text-gray-600">({tag.count})</span>
            </a>
          ))}
        </div>
      </div>
    </Container>
  );
}
