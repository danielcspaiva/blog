import { OGImageRoute } from "astro-og-canvas";
import { SITE, HOME, BLOG, PROJECTS, getLocalizedMetadata } from "../../consts";
import { languages, ui, defaultLang } from "../../i18n/ui";

// Define the main routes for which we want to generate OG images
const routes = ["index", "blog", "experience", "projects", "tags"];

// Define the page interface
interface LocalizedPage {
  title: string;
  description: string;
  locale: keyof typeof ui;
}

// Create a mapping of all localized pages
const localizedPages: Record<string, LocalizedPage> = {};

// Get all locales
const locales = Object.keys(languages) as Array<keyof typeof ui>;

// For each locale and route combination, create an entry in the pages object
for (const locale of locales) {
  for (const route of routes) {
    // Get localized metadata based on the route
    let title = "";
    let description = "";
    
    if (route === "index") {
      const localizedHome = getLocalizedMetadata(HOME, locale);
      title = localizedHome.TITLE;
      description = localizedHome.DESCRIPTION;
    } else if (route === "blog") {
      const localizedBlog = getLocalizedMetadata(BLOG, locale);
      title = localizedBlog.TITLE;
      description = localizedBlog.DESCRIPTION;
    } else if (route === "projects") {
      const localizedProjects = getLocalizedMetadata(PROJECTS, locale);
      title = localizedProjects.TITLE;
      description = localizedProjects.DESCRIPTION;
    } else if (route === "experience") {
      // Hardcoded for now, could be moved to consts.ts later
      title = locale === "en" ? "Experience" : "Experiência";
      description = locale === "en" 
        ? "My professional experience and career journey" 
        : "Minha experiência profissional e trajetória de carreira";
    } else if (route === "tags") {
      // Hardcoded for now, could be moved to consts.ts later
      title = locale === "en" ? "Tags" : "Tags";
      description = locale === "en" 
        ? "Browse content by tags" 
        : "Navegue pelo conteúdo por tags";
    }
    
    // Add to the pages object with a locale-specific key
    localizedPages[`${locale}-${route}`] = {
      title,
      description,
      locale
    };
    
    // For the default locale's index page, also add an entry without the locale prefix
    // This will handle the root path (/) which redirects to the default locale
    if (locale === defaultLang && route === "index") {
      // Add multiple entries for the root path to ensure compatibility
      ["index", "root", "homepage", "home", ""].forEach(key => {
        localizedPages[key] = {
          title,
          description,
          locale
        };
      });
    }
  }
}

// Use the OGImageRoute helper from astro-og-canvas
export const { getStaticPaths, GET } = OGImageRoute({
  param: "site",
  
  // Pass our localized pages
  pages: localizedPages,
  
  // For each page, customize the OpenGraph image
  getImageOptions: (path, page) => ({
    title: `${page.title} | ${SITE.TITLE}`,
    description: page.description,
    // Use our custom template with ASCII art
    templatePath: "./src/components/og/site-template.ts",
    // Set background to white
    bgGradient: [[255, 255, 255]],
    // Add profile picture as logo with custom options
    logo: {
      path: "./public/profile.png",
      // Resize the logo to a reasonable size
      size: [250],
      // Make the logo circular by adding a mask
      mask: "circle"
    },
    // Add darker navy border
    border: {
      color: [15, 23, 42], // navy-900 (darker)
      width: 4,
      side: "block-start",
    },
    // Increase padding to give more space around content
    padding: 80,
    // Font configuration with dark colors for light background
    font: {
      title: {
        color: [2, 6, 23], // navy-950 (darkest navy)
        size: 64,
        weight: "Bold",
      },
      description: {
        color: [15, 23, 42], // navy-900 (very dark for description)
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