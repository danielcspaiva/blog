import type { Locale } from '@/i18n/config';

export interface Site {
  TITLE: string;
  DESCRIPTION: string;
  EMAIL: string;
  NUM_POSTS_ON_HOMEPAGE: number;
  NUM_PROJECTS_ON_HOMEPAGE: number;
}

export interface Metadata {
  TITLE: string;
  DESCRIPTION: string;
}

export interface Social {
  NAME: string;
  HREF: string;
}

export const SITE: Site = {
  TITLE: 'Daniel Paiva',
  DESCRIPTION: 'CTO at Quarto à Vista | Full Stack Developer',
  EMAIL: 'danielcspaiva@gmail.com',
  NUM_POSTS_ON_HOMEPAGE: 5,
  NUM_PROJECTS_ON_HOMEPAGE: 3,
};

// Localized metadata
export const HOME: Record<Locale, Metadata> = {
  en: {
    TITLE: 'Home',
    DESCRIPTION: 'Personal site and blog.',
  },
  'pt-br': {
    TITLE: 'Home',
    DESCRIPTION: 'Site pessoal e blog.',
  },
};

export const BLOG: Record<Locale, Metadata> = {
  en: {
    TITLE: 'Blog',
    DESCRIPTION: 'A collection of articles on topics I am passionate about.',
  },
  'pt-br': {
    TITLE: 'Blog',
    DESCRIPTION: 'Uma coleção de artigos sobre tópicos que me interessam.',
  },
};

export const PROJECTS: Record<Locale, Metadata> = {
  en: {
    TITLE: 'Projects',
    DESCRIPTION:
      'A collection of my projects with links to repositories and live demos.',
  },
  'pt-br': {
    TITLE: 'Projetos',
    DESCRIPTION:
      'Uma coleção dos meus projetos com links para repositórios e demonstrações.',
  },
};

// Cal.com booking link
export const CAL_BOOKING = {
  USERNAME: 'danielcspaiva',
  MEETING_SLUG: '30min',
};

export const SOCIALS: Social[] = [
  {
    NAME: 'X',
    HREF: 'https://x.com/danielcspaiva',
  },
  {
    NAME: 'LinkedIn',
    HREF: 'https://www.linkedin.com/in/danielcspaiva',
  },
  {
    NAME: 'GitHub',
    HREF: 'https://github.com/danielcspaiva',
  },
  {
    NAME: 'Email',
    HREF: 'mailto:danielcspaiva@gmail.com',
  },
];

// Helper function to get localized metadata
export function getLocalizedMetadata<T extends Record<Locale, Metadata>>(
  metadata: T,
  locale: Locale
): Metadata {
  return metadata[locale] || metadata['en'];
}
