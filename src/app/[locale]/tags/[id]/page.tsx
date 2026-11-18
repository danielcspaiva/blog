import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Container } from "@/components/Container";
import { ArrowCard } from "@/components/ArrowCard";
import { BackToPrevious } from "@/components/BackToPrevious";
import { PageHeader } from "@/components/PageHeader";
import { getPostsByTag, getTags } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { formatStamp } from "@/lib/utils";

const strings = (id: string) => ({
  en: {
    description: `Posts with the tag: ${id}`,
    allTags: "All tags",
    postsTaggedWith: `Posts tagged with "${id}"`,
  },
  "pt-br": {
    description: `Posts com a tag: ${id}`,
    allTags: "Todas as tags",
    postsTaggedWith: `Posts com a tag "${id}"`,
  },
});

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getTags(locale).map(({ tag }) => ({ locale, id: tag })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const s = strings(id)[locale as "en" | "pt-br"] ?? strings(id).en;
  return buildMetadata({
    locale,
    title: `Tag: ${id}`,
    description: s.description,
    path: `/tags/${id}`,
  });
}

export default async function TagDetail({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const s = strings(id)[locale as "en" | "pt-br"] ?? strings(id).en;
  const posts = getPostsByTag(id, locale);

  return (
    <Container>
      <div className="space-y-10">
        <div className="animate">
          <BackToPrevious href="/tags">{s.allTags}</BackToPrevious>
        </div>
        <PageHeader
          eyebrow={`Tag · ${String(posts.length).padStart(2, "0")} posts`}
          title={`#${id}`}
          description={s.postsTaggedWith}
        />
        <ul className="animate flex flex-col gap-5">
          {posts.map((post) => (
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
      </div>
    </Container>
  );
}
