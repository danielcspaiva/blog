import { ImageResponse } from "next/og";

import { getBlogEntry, getBlogStaticParams } from "@/lib/content-source";
import { isLocale } from "@/lib/i18n";
import { getEntryOpenGraphData, OpenGraphCard, OPEN_GRAPH_IMAGE_SIZE } from "@/lib/og";

export const dynamicParams = false;
export const runtime = "nodejs";

export function generateStaticParams() {
  return getBlogStaticParams();
}

export async function GET(
  _request: Request,
  {
    params,
  }: {
    params: Promise<{ locale: string; slug: string }>;
  },
) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    return new Response("Not found", { status: 404 });
  }

  const entry = getBlogEntry(slug, locale);

  if (!entry) {
    return new Response("Not found", { status: 404 });
  }

  const data = getEntryOpenGraphData({
    collection: "blog",
    description: entry.description,
    locale,
    slug,
    title: entry.title,
  });

  return new ImageResponse(
    <OpenGraphCard description={data.description} eyebrow={data.routeLabel} title={data.title} />,
    OPEN_GRAPH_IMAGE_SIZE,
  );
}
