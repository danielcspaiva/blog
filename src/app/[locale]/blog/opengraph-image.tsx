import { routing } from "@/i18n/routing";
import { BLOG, getLocalizedMetadata } from "@/consts";
import { renderOG, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Blog";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const m = getLocalizedMetadata(BLOG, locale as keyof typeof BLOG);
  return renderOG({ title: m.TITLE, description: m.DESCRIPTION });
}
