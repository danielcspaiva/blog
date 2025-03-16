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
    locale?: string;
    hideTableOfContents?: boolean;
  };
  render: () => Promise<{ Content: any; headings: any; remarkPluginFrontmatter: any }>;
}

// Function to get clean slug from post id
export function getSlugFromId(id: string): string {
  // Extract the base directory name without the language subfolder
  const segments = id.split('/');
  // Remove the language segment and index.md(x) file
  if (segments.length > 2) {
    // Return the parent directory name as the slug
    return segments[segments.length - 3];
  }
  return segments[0] || '';
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

// Get the appropriate localized post if available, or fall back to default
export function getLocalizedPost(posts: BlogPost[], slug: string, locale: string): BlogPost | undefined {
  // First try to find a post with the matching locale
  const localizedPost = posts.find(post => 
    getSlugFromId(post.id) === slug && 
    post.data.locale === locale
  );
  
  // If found, return it
  if (localizedPost) return localizedPost;
  
  // If not found, try to find a post without locale specified (for backward compatibility)
  return posts.find(post => 
    getSlugFromId(post.id) === slug && 
    !post.data.locale
  );
} 