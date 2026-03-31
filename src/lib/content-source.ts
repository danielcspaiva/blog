import { cache } from "react";
import type { ComponentType } from "react";

import { allBlogs, allProjects } from "../../.content-collections/generated/index.js";
import {
  getAdjacentEntries,
  getLocalizedEntry,
  getTagSummaries,
  sortEntriesByDate,
  type ContentCollection,
} from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import type { TocHeading } from "@/lib/toc";

export type SiteEntry = {
  collection: ContentCollection;
  date: Date;
  demoURL?: string;
  description: string;
  draft?: boolean;
  headings: TocHeading[];
  hideTableOfContents?: boolean;
  id: string;
  locale: string | null;
  mdxContent: ComponentType<Record<string, never>>;
  readingTime: string;
  repoURL?: string;
  slug: string;
  sourcePath: string;
  tags?: string[];
  title: string;
};

function isPublishedEntry(entry: SiteEntry) {
  return !entry.draft;
}

function isLocaleMatch(entry: SiteEntry, locale: Locale) {
  return entry.locale == null || entry.locale === locale;
}

export const getAllBlogEntries = cache(() => {
  return sortEntriesByDate(allBlogs.filter(isPublishedEntry) as SiteEntry[]);
});

export const getAllProjectEntries = cache(() => {
  return sortEntriesByDate(allProjects.filter(isPublishedEntry) as SiteEntry[]);
});

export const getBlogEntriesByLocale = cache((locale: Locale) => {
  return getAllBlogEntries().filter((entry) => isLocaleMatch(entry, locale));
});

export const getProjectEntriesByLocale = cache((locale: Locale) => {
  return getAllProjectEntries().filter((entry) => isLocaleMatch(entry, locale));
});

export const getBlogEntry = cache((slug: string, locale: Locale) => {
  return getLocalizedEntry(getAllBlogEntries(), slug, locale) as SiteEntry | undefined;
});

export const getProjectEntry = cache((slug: string, locale: Locale) => {
  return getLocalizedEntry(getAllProjectEntries(), slug, locale) as SiteEntry | undefined;
});

export const getAdjacentBlogEntries = cache((entryId: string, locale: Locale) => {
  return getAdjacentEntries(getBlogEntriesByLocale(locale), entryId);
});

export const getTagSummariesByLocale = cache((locale: Locale) => {
  return getTagSummaries(getBlogEntriesByLocale(locale));
});

export const getEntriesForTag = cache((locale: Locale, tag: string) => {
  return getBlogEntriesByLocale(locale).filter((entry) => entry.tags?.includes(tag));
});

export const getBlogStaticParams = cache(() => {
  return getAllBlogEntries().map((entry) => ({
    locale: entry.locale ?? "en",
    slug: entry.slug,
  }));
});

export const getProjectStaticParams = cache(() => {
  return getAllProjectEntries().map((entry) => ({
    locale: entry.locale ?? "en",
    slug: entry.slug,
  }));
});
