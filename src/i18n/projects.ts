import type { CollectionEntry } from "astro:content";

// Interface for project
export interface Project extends CollectionEntry<"projects"> {
  data: {
    title: string;
    description: string;
    date: Date;
    draft?: boolean;
    demoURL?: string;
    repoURL?: string;
    locale?: string;
  };
  render: () => Promise<{ Content: any; headings: any; remarkPluginFrontmatter: any }>;
}

// Function to get clean slug from project id
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

// Get the appropriate localized project if available, or fall back to default
export function getLocalizedProject(projects: Project[], slug: string, locale: string): Project | undefined {
  // First try to find a project with the matching locale
  const localizedProject = projects.find(project =>
    getSlugFromId(project.id) === slug &&
    project.data.locale === locale
  );

  // If found, return it
  if (localizedProject) return localizedProject;

  // If not found, try to find a project without locale specified (for backward compatibility)
  return projects.find(project =>
    getSlugFromId(project.id) === slug &&
    !project.data.locale
  );
}
