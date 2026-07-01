import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match everything except API routes, Next internals, Vercel internals,
  // any path with a file extension (rss.xml, sitemap.xml, /fonts/*, images),
  // and metadata image routes (opengraph-image, icon, apple-icon) — which can
  // appear as a trailing segment under a locale, e.g. /en/blog/x/opengraph-image.
  // Those must NOT be locale-redirected (the default locale would 404).
  matcher: [
    "/((?!api|_next|_vercel|.*\\..*|.*/(?:opengraph-image|twitter-image|icon|apple-icon)$).*)",
  ],
};
