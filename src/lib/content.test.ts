import { describe, expect, it } from "vitest";

import {
  getAdjacentEntries,
  getContentPathMeta,
  getLocalizedEntry,
  getTagSummaries,
  type ContentEntry,
} from "@/lib/content";

function createEntry(
  overrides: Partial<ContentEntry> & Pick<ContentEntry, "id" | "slug">,
): ContentEntry {
  return {
    collection: "blog",
    componentPath: "",
    date: new Date("2025-01-01"),
    description: "",
    draft: false,
    id: overrides.id,
    locale: "en",
    slug: overrides.slug,
    sourcePath: "",
    title: overrides.slug,
    ...overrides,
  };
}

describe("getContentPathMeta", () => {
  it("extracts the collection slug and locale from nested index files", () => {
    expect(getContentPathMeta("ai-success-equation/en/index.mdx")).toEqual({
      locale: "en",
      slug: "ai-success-equation",
    });

    expect(getContentPathMeta("hacker-reader/pt-br/index.md")).toEqual({
      locale: "pt-br",
      slug: "hacker-reader",
    });
  });
});

describe("getLocalizedEntry", () => {
  const entries = [
    createEntry({
      id: "hello-world/default",
      locale: null,
      slug: "hello-world",
      title: "Default",
    }),
    createEntry({
      id: "hello-world/en",
      locale: "en",
      slug: "hello-world",
      title: "English",
    }),
    createEntry({
      id: "hello-world/pt-br",
      locale: "pt-br",
      slug: "hello-world",
      title: "Portuguese",
    }),
  ];

  it("returns the matching localized entry when it exists", () => {
    expect(getLocalizedEntry(entries, "hello-world", "pt-br")?.title).toBe("Portuguese");
  });

  it("falls back to the locale-less entry when the locale-specific one is missing", () => {
    expect(getLocalizedEntry(entries, "hello-world", "es")?.title).toBe("Default");
  });
});

describe("getAdjacentEntries", () => {
  const entries = [
    createEntry({
      date: new Date("2025-03-15"),
      id: "third/en",
      slug: "third",
      title: "Third",
    }),
    createEntry({
      date: new Date("2025-02-15"),
      id: "second/en",
      slug: "second",
      title: "Second",
    }),
    createEntry({
      date: new Date("2025-01-15"),
      id: "first/en",
      slug: "first",
      title: "First",
    }),
  ];

  it("returns previous and next entries from a descending-by-date list", () => {
    expect(getAdjacentEntries(entries, "second/en")).toEqual({
      next: entries[2],
      prev: entries[0],
    });
  });
});

describe("getTagSummaries", () => {
  it("counts and sorts tags alphabetically", () => {
    const entries = [
      createEntry({ id: "a/en", slug: "a", tags: ["ai", "tech"] }),
      createEntry({ id: "b/en", slug: "b", tags: ["tech"] }),
      createEntry({ id: "c/en", slug: "c", tags: ["career"] }),
    ];

    expect(getTagSummaries(entries)).toEqual([
      { count: 1, slug: "ai" },
      { count: 1, slug: "career" },
      { count: 2, slug: "tech" },
    ]);
  });
});
