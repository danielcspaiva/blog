import type { ContentCollection } from "@/lib/content";
import { SITE } from "@/lib/site";

export type FeedSourceEntry = {
  collection: ContentCollection;
  date: Date;
  description: string;
  locale: string | null;
  slug: string;
  title: string;
};

export type FeedItem = {
  date: Date;
  description: string;
  link: string;
  title: string;
};

function getFeedLink(entry: FeedSourceEntry) {
  const locale = entry.locale ?? "en";
  const section = entry.collection === "blog" ? "blog" : "projects";

  return `/${locale}/${section}/${entry.slug}`;
}

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function getFeedItems(entries: FeedSourceEntry[]): FeedItem[] {
  return [...entries]
    .sort((left, right) => right.date.valueOf() - left.date.valueOf())
    .map((entry) => ({
      date: entry.date,
      description: entry.description,
      link: getFeedLink(entry),
      title: entry.title,
    }));
}

export function buildRssXml(items: FeedItem[]) {
  const channelLink = SITE.url;

  const renderedItems = items
    .map((item) => {
      const absoluteUrl = new URL(item.link, SITE.url).toString();

      return [
        "    <item>",
        `      <title>${escapeXml(item.title)}</title>`,
        `      <description>${escapeXml(item.description)}</description>`,
        `      <link>${escapeXml(absoluteUrl)}</link>`,
        `      <guid>${escapeXml(absoluteUrl)}</guid>`,
        `      <pubDate>${item.date.toUTCString()}</pubDate>`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    "  <channel>",
    `    <title>${escapeXml(SITE.title)}</title>`,
    `    <description>${escapeXml(SITE.description)}</description>`,
    `    <link>${escapeXml(channelLink)}</link>`,
    renderedItems,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");
}
