import { getCollection } from "astro:content";
import { OGImageRoute } from "astro-og-canvas";
import { languages, ui } from "../../../i18n/ui";
import { getSlugFromId, getLocalizedPost, type BlogPost } from "../../../i18n/blog";

// Get all blog posts
const blogEntries = await getCollection("blog") as BlogPost[];

// Get all locales
const locales = Object.keys(languages) as Array<keyof typeof ui>;

// Create a mapping for localized blog posts
const localizedPages: Record<string, any> = {};

// For each blog post and locale combination
for (const entry of blogEntries) {
  const slug = getSlugFromId(entry.id);
  
  // Create an entry for each locale
  for (const locale of locales) {
    // Get the properly localized post for this slug and locale
    const localizedPost = getLocalizedPost(blogEntries, slug, locale);
    
    // Skip if no localized post is found
    if (!localizedPost) continue;
    
    // Create a localized key for this blog post and locale
    const localizedKey = `${String(locale)}-${slug}`;
    
    // Store the localized post data with the localized key
    localizedPages[localizedKey] = {
      ...localizedPost.data,
      locale
    };
  }
}

export const { getStaticPaths, GET } = OGImageRoute({
  // Tell us the name of your dynamic route segment
  param: "slug",

  // Pass our localized blog posts
  pages: localizedPages,

  // For each page, customize the OpenGraph image
  getImageOptions: (path, page) => ({
    title: page.title,
    description: page.description,
    // Use our custom template
    templatePath: "./src/components/og/default-template.ts",
    // Set background color to white
    bgGradient: [[255, 255, 255]],
    // Add profile picture as logo with custom options
    logo: {
      path: "./public/dcsp-pp-3.png",
      // Resize the logo to a reasonable size
      size: [650],
    },
    // Add a subtle border
    border: {
      color: [15, 23, 42], // navy-900 (darker)
      width: 40,
    },
    // Increase padding to give more space around content
    padding: 80,
    // Font configuration
    font: {
      title: {
        color: [9, 9, 11], // Dark text color
        size: 64,
        weight: "Bold",
      },
      description: {
        color: [100, 100, 100], // Lighter gray for description
        size: 32,
        weight: "Normal",
      },
    },
    // Add author name as a custom property to be used in the template
    authorName: "Daniel Paiva",
    // Add custom font for author name
    fonts: [
      "./public/fonts/GeistSans-Regular.otf",
      "./public/fonts/GeistSans-Bold.otf",
    ],
  }),
}); 