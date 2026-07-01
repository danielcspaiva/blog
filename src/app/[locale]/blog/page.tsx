import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Container } from "@/components/Container";
import { ArrowCard } from "@/components/ArrowCard";
import { BLOG, getLocalizedMetadata } from "@/consts";
import { getPosts, type Post } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

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
      <aside>
        <div className="space-y-10">
          <section className="space-y-2">
            <h1 className="font-pixel text-3xl tracking-tight text-ink-950 sm:text-4xl dark:text-ink-50">
              {m.TITLE}
            </h1>
            <p className="text-ink-600 dark:text-ink-300">{m.DESCRIPTION}</p>
          </section>
          <div className="space-y-8">
            {years.map((year) => (
              <section key={year} className="animate space-y-4">
                <div className="hr-eink flex items-baseline justify-between border-t pt-4">
                  <h2 className="eyebrow text-xs text-ink-700 dark:text-ink-200">
                    {year}
                  </h2>
                  <span className="eyebrow text-[0.7rem] text-ink-500 dark:text-ink-400">
                    [{String(postsByYear[year].length).padStart(2, "0")}]
                  </span>
                </div>
                <ul className="not-prose flex flex-col gap-4">
                  {postsByYear[year].map((post) => (
                    <li key={post.slug}>
                      <ArrowCard
                        href={`/blog/${post.slug}`}
                        title={post.title}
                        description={post.description}
                      />
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
