import { describe, expect, it } from "vitest";

import { buildRssXml, getFeedItems, type FeedSourceEntry } from "@/lib/feed";

function createEntry(
  overrides: Partial<FeedSourceEntry> &
    Pick<FeedSourceEntry, "collection" | "date" | "description" | "locale" | "slug" | "title">,
): FeedSourceEntry {
  return {
    collection: overrides.collection,
    date: overrides.date,
    description: overrides.description,
    locale: overrides.locale,
    slug: overrides.slug,
    title: overrides.title,
    ...overrides,
  };
}

describe("getFeedItems", () => {
  it("sorts entries by date descending and preserves localized content paths", () => {
    const items = getFeedItems([
      createEntry({
        collection: "projects",
        date: new Date("2024-03-01"),
        description: "Project description",
        locale: "pt-br",
        slug: "project-alpha",
        title: "Project Alpha",
      }),
      createEntry({
        collection: "blog",
        date: new Date("2025-02-01"),
        description: "Post description",
        locale: "en",
        slug: "post-beta",
        title: "Post Beta",
      }),
    ]);

    expect(items).toEqual([
      expect.objectContaining({
        link: "/en/blog/post-beta",
        title: "Post Beta",
      }),
      expect.objectContaining({
        link: "/pt-br/projects/project-alpha",
        title: "Project Alpha",
      }),
    ]);
  });
});

describe("buildRssXml", () => {
  it("renders a valid rss document with escaped content and absolute links", () => {
    const xml = buildRssXml([
      {
        date: new Date("2025-02-01T10:00:00.000Z"),
        description: "Use <TypeScript> & React",
        link: "/en/blog/post-beta",
        title: "Post Beta",
      },
    ]);

    expect(xml).toContain('<rss version="2.0">');
    expect(xml).toContain("<title>Daniel Paiva</title>");
    expect(xml).toContain("<link>https://dcsp.dev/en/blog/post-beta</link>");
    expect(xml).toContain("<description>Use &lt;TypeScript&gt; &amp; React</description>");
    expect(xml).toContain("<pubDate>Sat, 01 Feb 2025 10:00:00 GMT</pubDate>");
  });
});
