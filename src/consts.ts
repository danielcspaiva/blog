import type { Metadata, Site, Socials } from "@/types";
import { routing, type Locale } from "@/i18n/routing";

export const SITE: Site = {
  TITLE: "Daniel Paiva",
  DESCRIPTION: "CTO at Quarto à Vista | Full Stack Developer",
  EMAIL: "danielcspaiva@gmail.com",
  NUM_POSTS_ON_HOMEPAGE: 5,
  NUM_PROJECTS_ON_HOMEPAGE: 3,
};

// Localized metadata
export const HOME: Record<Locale, Metadata> = {
  en: {
    TITLE: "Home",
    DESCRIPTION: "Personal site and blog.",
  },
  "pt-br": {
    TITLE: "Home",
    DESCRIPTION: "Site pessoal e blog.",
  },
};

export const BLOG: Record<Locale, Metadata> = {
  en: {
    TITLE: "Blog",
    DESCRIPTION: "A collection of articles on topics I am passionate about.",
  },
  "pt-br": {
    TITLE: "Blog",
    DESCRIPTION: "Uma coleção de artigos sobre tópicos que me interessam.",
  },
};

export const PROJECTS: Record<Locale, Metadata> = {
  en: {
    TITLE: "Projects",
    DESCRIPTION:
      "A collection of my projects with links to repositories and live demos.",
  },
  "pt-br": {
    TITLE: "Projetos",
    DESCRIPTION:
      "Uma coleção dos meus projetos com links para repositórios e demonstrações.",
  },
};

// Cal.com booking link - replace with your own Cal.com username
export const CAL_BOOKING = {
  USERNAME: "danielcspaiva",
  MEETING_SLUG: "30min",
};

export const SOCIALS: Socials = [
  {
    NAME: "X",
    HREF: "https://x.com/danielcspaiva",
  },
  {
    NAME: "LinkedIn",
    HREF: "https://www.linkedin.com/in/danielcspaiva",
  },
  {
    NAME: "GitHub",
    HREF: "https://github.com/danielcspaiva",
  },
  {
    NAME: "Email",
    HREF: "mailto:danielcspaiva@gmail.com",
  },
];

// Helper function to get localized metadata
export function getLocalizedMetadata<T extends Record<Locale, Metadata>>(
  metadata: T,
  locale: Locale
): Metadata {
  return metadata[locale] || metadata[routing.defaultLocale];
}
