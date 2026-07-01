import type { Metadata } from "next";
import { SITE } from "@/consts";

export const BASE_URL = "https://dcsp.dev";

// en is unprefixed; pt-br is under /pt-br.
export function localizedUrl(locale: string, path: string = "/"): string {
  const clean = path === "/" ? "" : path;
  return locale === "en" ? `${BASE_URL}${clean}` : `${BASE_URL}/pt-br${clean}`;
}

export function buildMetadata({
  locale,
  title,
  description,
  path = "/",
  type = "website",
}: {
  locale: string;
  title: string;
  description: string;
  path?: string;
  type?: "website" | "article";
}): Metadata {
  const fullTitle = `${title} | ${SITE.TITLE}`;
  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: localizedUrl(locale, path),
      languages: {
        en: localizedUrl("en", path),
        "pt-BR": localizedUrl("pt-br", path),
        "x-default": localizedUrl("en", path),
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url: localizedUrl(locale, path),
      siteName: SITE.TITLE,
      type,
      locale: locale === "en" ? "en_US" : "pt_BR",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      creator: "@danielcspaiva",
    },
  };
}
