import { notFound } from "next/navigation";

import { Container } from "@/components/Container";
import { isLocale } from "@/lib/i18n";
import { createMetadata, getPageMetadata } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const pageMetadata = getPageMetadata("subscribe", locale);

  return createMetadata({
    description: pageMetadata.description,
    image: `/open-graph/site/${locale}/subscribe`,
    locale,
    pathname: `/${locale}/subscribe`,
    title: pageMetadata.title,
  });
}

export default async function SubscribePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <Container>{null}</Container>;
}
