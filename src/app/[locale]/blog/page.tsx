import { notFound } from "next/navigation";

import { ArrowCard } from "@/components/ArrowCard";
import { Container } from "@/components/Container";
import { getBlogEntriesByLocale } from "@/lib/content-source";
import { isLocale } from "@/lib/i18n";
import { createMetadata, getPageMetadata } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const pageMetadata = getPageMetadata("blog", locale);

  return createMetadata({
    description: pageMetadata.description,
    image: `/open-graph/site/${locale}/blog`,
    locale,
    pathname: `/${locale}/blog`,
    title: pageMetadata.title,
  });
}

export default async function BlogIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const pageMetadata = getPageMetadata("blog", locale);
  const posts = getBlogEntriesByLocale(locale);
  const postsByYear = posts.reduce<Record<string, typeof posts>>((grouped, post) => {
    const year = post.date.getFullYear().toString();
    grouped[year] ??= [];
    grouped[year].push(post);
    return grouped;
  }, {});
  const years = Object.keys(postsByYear).sort((left, right) => Number(right) - Number(left));

  return (
    <Container>
      <aside>
        <div className="space-y-10">
          <section>
            <h1 className="font-semibold text-black dark:text-white">{pageMetadata.title}</h1>
            <p>{pageMetadata.description}</p>
          </section>
          <div className="space-y-4">
            {years.map((year) => (
              <section className="animate space-y-4" key={year}>
                <div className="font-semibold text-black dark:text-white">{year}</div>
                <ul className="not-prose flex flex-col gap-4">
                  {postsByYear[year].map((post) => (
                    <li key={post.id}>
                      <ArrowCard entry={post} locale={locale} />
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </aside>
    </Container>
  );
}
