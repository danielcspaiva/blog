import { getAllBlogEntries, getAllProjectEntries } from "@/lib/content-source";
import { buildRssXml, getFeedItems } from "@/lib/feed";

export function GET() {
  const items = getFeedItems([...getAllBlogEntries(), ...getAllProjectEntries()]);
  const xml = buildRssXml(items);

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
