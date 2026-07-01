import { routing } from "@/i18n/routing";
import { getLocalizedPost, allPostSlugs } from "@/lib/content";
import { SITE } from "@/consts";
import { renderOG, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = SITE.TITLE;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    allPostSlugs
      .filter((slug) => getLocalizedPost(slug, locale))
      .map((slug) => ({ locale, slug })),
  );
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = getLocalizedPost(slug, locale);
  return renderOG({
    title: post?.title ?? SITE.TITLE,
    description: post?.description,
  });
}
