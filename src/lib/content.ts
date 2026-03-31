export type ContentCollection = "blog" | "projects";

export type ContentEntry = {
  collection: ContentCollection;
  componentPath: string;
  date: Date;
  description: string;
  draft?: boolean;
  id: string;
  locale: string | null;
  slug: string;
  sourcePath: string;
  tags?: string[];
  title: string;
};

export type TagSummary = {
  count: number;
  slug: string;
};

export function getContentPathMeta(filePath: string): {
  locale: string;
  slug: string;
} {
  const segments = filePath.split("/").filter(Boolean);

  if (segments.length < 3) {
    throw new Error(`Unsupported content path: ${filePath}`);
  }

  return {
    locale: segments.at(-2) ?? "",
    slug: segments.at(-3) ?? "",
  };
}

export function sortEntriesByDate<T extends Pick<ContentEntry, "date">>(entries: T[]): T[] {
  return [...entries].sort((left, right) => right.date.valueOf() - left.date.valueOf());
}

export function getLocalizedEntry<T extends Pick<ContentEntry, "locale" | "slug">>(
  entries: T[],
  slug: string,
  locale: string,
): T | undefined {
  return (
    entries.find((entry) => entry.slug === slug && entry.locale === locale) ??
    entries.find((entry) => entry.slug === slug && entry.locale == null)
  );
}

export function getAdjacentEntries<T extends Pick<ContentEntry, "date" | "id">>(
  entries: T[],
  currentId: string,
): {
  next: T | null;
  prev: T | null;
} {
  const sortedEntries = sortEntriesByDate(entries);
  const currentIndex = sortedEntries.findIndex((entry) => entry.id === currentId);

  if (currentIndex === -1) {
    return {
      next: null,
      prev: null,
    };
  }

  return {
    next: sortedEntries[currentIndex + 1] ?? null,
    prev: sortedEntries[currentIndex - 1] ?? null,
  };
}

export function getTagSummaries<T extends Pick<ContentEntry, "tags">>(entries: T[]): TagSummary[] {
  const tagCounts = new Map<string, number>();

  for (const entry of entries) {
    for (const tag of entry.tags ?? []) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    }
  }

  return [...tagCounts.entries()]
    .map(([slug, count]) => ({ count, slug }))
    .sort((left, right) => left.slug.localeCompare(right.slug));
}
