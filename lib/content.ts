import { allBlogs, allProjects, Blog, Project } from 'contentlayer/generated';

export type { Blog, Project };

export function getBlogPosts(locale: string): Blog[] {
  return allBlogs
    .filter((post) => !post.draft && post.locale === locale)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPostBySlug(
  slug: string,
  locale: string
): Blog | undefined {
  return allBlogs.find(
    (post) => post.slug === slug && post.locale === locale && !post.draft
  );
}

export function getAllBlogSlugs(): { slug: string; locale: string }[] {
  return allBlogs
    .filter((post) => !post.draft)
    .map((post) => ({
      slug: post.slug,
      locale: post.locale,
    }));
}

export function getProjects(locale: string): Project[] {
  return allProjects
    .filter((project) => !project.draft && project.locale === locale)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getProjectBySlug(
  slug: string,
  locale: string
): Project | undefined {
  return allProjects.find(
    (project) =>
      project.slug === slug && project.locale === locale && !project.draft
  );
}

export function getAllProjectSlugs(): { slug: string; locale: string }[] {
  return allProjects
    .filter((project) => !project.draft)
    .map((project) => ({
      slug: project.slug,
      locale: project.locale,
    }));
}

export function getAllTags(locale: string): string[] {
  const posts = getBlogPosts(locale);
  const tags = posts.flatMap((post) => post.tags || []);
  return [...new Set(tags)].sort();
}

export function getAllTagsWithCount(
  locale: string
): { tag: string; count: number }[] {
  const posts = getBlogPosts(locale);
  const tagCounts: Record<string, number> = {};

  posts.forEach((post) => {
    post.tags?.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  return Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => a.tag.localeCompare(b.tag));
}

export function getPostsByTag(tag: string, locale: string): Blog[] {
  return getBlogPosts(locale).filter((post) => post.tags?.includes(tag));
}

// Group posts by year for blog listing
export function getPostsByYear(
  locale: string
): { year: string; posts: Blog[] }[] {
  const posts = getBlogPosts(locale);
  const grouped = posts.reduce(
    (acc, post) => {
      const year = new Date(post.date).getFullYear().toString();
      if (!acc[year]) acc[year] = [];
      acc[year].push(post);
      return acc;
    },
    {} as Record<string, Blog[]>
  );

  return Object.entries(grouped)
    .map(([year, posts]) => ({ year, posts }))
    .sort((a, b) => parseInt(b.year) - parseInt(a.year));
}

// Get adjacent posts for navigation
export function getAdjacentPosts(
  slug: string,
  locale: string
): { prev: Blog | null; next: Blog | null } {
  const posts = getBlogPosts(locale);
  const currentIndex = posts.findIndex((p) => p.slug === slug);

  return {
    prev: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null,
    next: currentIndex > 0 ? posts[currentIndex - 1] : null,
  };
}
