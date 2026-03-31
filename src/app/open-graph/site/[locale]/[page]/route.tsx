import { ImageResponse } from "next/og";

import { isLocale, locales } from "@/lib/i18n";
import {
  getSiteOpenGraphData,
  OpenGraphCard,
  OPEN_GRAPH_IMAGE_SIZE,
  type SiteOpenGraphPage,
  SITE_OG_PAGES,
} from "@/lib/og";

export const dynamicParams = false;
export const runtime = "nodejs";

function isSiteOpenGraphPage(value: string): value is SiteOpenGraphPage {
  return SITE_OG_PAGES.includes(value as SiteOpenGraphPage);
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    SITE_OG_PAGES.map((page) => ({
      locale,
      page,
    })),
  );
}

export async function GET(
  _request: Request,
  {
    params,
  }: {
    params: Promise<{ locale: string; page: string }>;
  },
) {
  const { locale, page } = await params;

  if (!isLocale(locale) || !isSiteOpenGraphPage(page)) {
    return new Response("Not found", { status: 404 });
  }

  const data = getSiteOpenGraphData(page, locale);

  return new ImageResponse(
    <OpenGraphCard description={data.description} eyebrow="Daniel Paiva" title={data.title} />,
    OPEN_GRAPH_IMAGE_SIZE,
  );
}
