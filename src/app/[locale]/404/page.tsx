import { NotFoundContent } from "@/components/NotFoundContent";
import { createMetadata } from "@/lib/site";
import { isLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const resolvedLocale = isLocale(locale) ? locale : "en";

  return createMetadata({
    description:
      resolvedLocale === "en"
        ? "The page you were looking for doesn't exist."
        : "A página que você estava procurando não existe.",
    locale: resolvedLocale,
    pathname: `/${resolvedLocale}/404`,
    title: resolvedLocale === "en" ? "404: Not Found" : "404: Não Encontrado",
  });
}

export default async function Localized404Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return <NotFoundContent locale={isLocale(locale) ? locale : "en"} />;
}
