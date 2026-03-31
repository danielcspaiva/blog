import { ImageResponse } from "next/og";

import { getProjectEntry, getProjectStaticParams } from "@/lib/content-source";
import { isLocale } from "@/lib/i18n";
import { getEntryOpenGraphData, OpenGraphCard, OPEN_GRAPH_IMAGE_SIZE } from "@/lib/og";

export const dynamicParams = false;
export const runtime = "nodejs";

export function generateStaticParams() {
  return getProjectStaticParams();
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

  const entry = getProjectEntry(slug, locale);

  if (!entry) {
    return new Response("Not found", { status: 404 });
  }

  const data = getEntryOpenGraphData({
    collection: "projects",
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
