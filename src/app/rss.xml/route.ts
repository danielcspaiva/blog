import { blog, projects } from "@content";
import { SITE } from "@/consts";
import { BASE_URL, localizedUrl } from "@/lib/metadata";

export const dynamic = "force-static";

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const items = [
    ...blog
      .filter((p) => !p.draft)
      .map((p) => ({
        title: p.title,
        description: p.description,
        date: p.date,
        url: localizedUrl(p.locale, `/blog/${p.slug}`),
      })),
    ...projects
      .filter((p) => !p.draft)
      .map((p) => ({
        title: p.title,
        description: p.description,
        date: p.date,
        url: localizedUrl(p.locale, `/projects/${p.slug}`),
      })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const body = items
    .map(
      (i) => `    <item>
      <title>${esc(i.title)}</title>
      <description>${esc(i.description)}</description>
      <pubDate>${new Date(i.date).toUTCString()}</pubDate>
      <link>${i.url}</link>
      <guid>${i.url}</guid>
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(SITE.TITLE)}</title>
    <description>${esc(SITE.DESCRIPTION)}</description>
    <link>${BASE_URL}</link>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <language>en</language>
${body}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
