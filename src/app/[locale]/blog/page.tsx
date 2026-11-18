import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Container } from "@/components/Container";
import { ArrowCard } from "@/components/ArrowCard";
import { PageHeader } from "@/components/PageHeader";
import { SectionHead } from "@/components/SectionHead";
import { BLOG, getLocalizedMetadata } from "@/consts";
import { getPosts, type Post } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { formatStamp } from "@/lib/utils";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const m = getLocalizedMetadata(BLOG, locale as keyof typeof BLOG);
  return buildMetadata({
    locale,
    title: m.TITLE,
    description: m.DESCRIPTION,
    path: "/blog",
  });
}

export default async function BlogIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const m = getLocalizedMetadata(BLOG, locale as keyof typeof BLOG);
  const posts = getPosts(locale);

  const postsByYear = posts.reduce<Record<string, Post[]>>((acc, post) => {
    const year = new Date(post.date).getFullYear().toString();
    (acc[year] ??= []).push(post);
    return acc;
  }, {});
  const years = Object.keys(postsByYear).sort((a, b) => Number(b) - Number(a));

  return (
    <Container>
      <div className="space-y-12">
        <PageHeader
          eyebrow={`${String(posts.length).padStart(2, "0")} ${locale === "pt-br" ? "artigos" : "entries"}`}
          title={m.TITLE}
          description={m.DESCRIPTION}
        />
        <div className="space-y-12">
          {years.map((year) => (
            <section key={year} className="animate space-y-6">
              <SectionHead title={year}>
                [{String(postsByYear[year].length).padStart(2, "0")}]
              </SectionHead>
              <ul className="not-prose flex flex-col gap-5">
                {postsByYear[year].map((post) => (
                  <li key={post.slug}>
                    <ArrowCard
                      href={`/blog/${post.slug}`}
                      title={post.title}
                      description={post.description}
                      meta={
                        <>
                          {formatStamp(post.date)}
                          <span className="px-1.5">·</span>
                          {post.readingTime} min
                        </>
                      }
                    />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </Container>
  );
}
