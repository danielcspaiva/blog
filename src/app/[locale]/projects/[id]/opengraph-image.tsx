import { routing } from "@/i18n/routing";
import { getLocalizedProject, allProjectSlugs } from "@/lib/content";
import { SITE } from "@/consts";
import { renderOG, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = SITE.TITLE;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    allProjectSlugs
      .filter((slug) => getLocalizedProject(slug, locale))
      .map((slug) => ({ locale, id: slug })),
  );
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const project = getLocalizedProject(id, locale);
  return renderOG({
    title: project?.title ?? SITE.TITLE,
    description: project?.description,
  });
}
