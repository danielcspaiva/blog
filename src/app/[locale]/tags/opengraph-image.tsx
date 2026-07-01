import { routing } from "@/i18n/routing";
import { renderOG, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Tags";

const titles: Record<string, { title: string; description: string }> = {
  en: { title: "Tags", description: "List of tags used." },
  "pt-br": { title: "Tags", description: "Lista de tags utilizadas." },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = titles[locale] ?? titles.en;
  return renderOG({ title: t.title, description: t.description });
}
