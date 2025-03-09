import type { CollectionEntry } from "astro:content";

// Interface for blog post reading time
export interface BlogPost extends CollectionEntry<"blog"> {
  data: {
    title: string;
    description: string;
    date: Date;
    draft?: boolean;
    tags?: string[];
    readingTime?: string;
    minutesRead?: string;
  };
  render: () => Promise<{ Content: any; headings: any; remarkPluginFrontmatter: any }>;
}

// Function to get clean slug from post id
export function getSlugFromId(id: string): string {
  return id.split('/').pop() || '';
}

// Function to get formatted date based on locale
export function getFormattedDate(date: Date, locale: string): string {
  return date.toLocaleDateString(locale === 'pt-br' ? 'pt-BR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Function to get reading time from post
export function getReadingTime(post: BlogPost): string {
  return post.data.readingTime || post.data.minutesRead || '';
} 