import { blog, projects } from "@content";

export type Post = (typeof blog)[number];
export type Project = (typeof projects)[number];

const byDateDesc = <T extends { date: string }>(a: T, b: T) =>
  new Date(b.date).getTime() - new Date(a.date).getTime();

// Mirrors the old getLocalizedPost fallback: match the current locale, else fall
// back to items that have no explicit frontmatter locale.
function inLocale(
  item: { frontmatterLocale?: string; locale: string },
  locale: string,
) {
  return !item.frontmatterLocale || item.locale === locale;
}

/* ---------------- posts ---------------- */

export function getPosts(locale: string): Post[] {
  return blog.filter((p) => !p.draft && inLocale(p, locale)).sort(byDateDesc);
}

export function getLocalizedPost(
  slug: string,
  locale: string,
): Post | undefined {
  return (
    blog.find((p) => p.slug === slug && p.locale === locale) ??
    blog.find((p) => p.slug === slug && !p.frontmatterLocale)
  );
}

export function getAdjacentPosts(
  slug: string,
  locale: string,
): { prev?: Post; next?: Post } {
  const posts = getPosts(locale);
  const i = posts.findIndex((p) => p.slug === slug);
  if (i === -1) return {};
  // Mirror the original ordering: prev = previous entry, next = following entry.
  return { prev: posts[i - 1], next: posts[i + 1] };
}

export const allPostSlugs = [...new Set(blog.map((p) => p.slug))];

/* ---------------- projects ---------------- */

export function getProjects(locale: string): Project[] {
  return projects
    .filter((p) => !p.draft && inLocale(p, locale))
    .sort(byDateDesc);
}

export function getLocalizedProject(
  slug: string,
  locale: string,
): Project | undefined {
  return (
    projects.find((p) => p.slug === slug && p.locale === locale) ??
    projects.find((p) => p.slug === slug && !p.frontmatterLocale)
  );
}

export const allProjectSlugs = [...new Set(projects.map((p) => p.slug))];

/* ---------------- tags ---------------- */

export function getTags(locale: string): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const post of getPosts(locale)) {
    for (const tag of post.tags ?? []) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export function getPostsByTag(tag: string, locale: string): Post[] {
  return getPosts(locale).filter((p) => p.tags?.includes(tag));
}

export const allTags = [...new Set(blog.flatMap((p) => p.tags ?? []))];
