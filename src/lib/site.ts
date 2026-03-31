import type { Metadata as NextMetadata } from "next";

import type { Locale } from "@/lib/i18n";

export const SITE = {
  description: "CTO at Quarto à Vista | Full Stack Developer",
  email: "danielcspaiva@gmail.com",
  numPostsOnHomepage: 5,
  numProjectsOnHomepage: 3,
  title: "Daniel Paiva",
  url: "https://dcsp.dev",
};

export const CAL_BOOKING = {
  meetingSlug: "30min",
  username: "danielcspaiva",
};

export const SOCIALS = [
  {
    href: "https://x.com/danielcspaiva",
    name: "X",
  },
  {
    href: "https://www.linkedin.com/in/danielcspaiva",
    name: "LinkedIn",
  },
  {
    href: "https://github.com/danielcspaiva",
    name: "GitHub",
  },
  {
    href: "mailto:danielcspaiva@gmail.com",
    name: "Email",
  },
] as const;

export const LOCALIZED_METADATA = {
  blog: {
    en: {
      description: "A collection of articles on topics I am passionate about.",
      title: "Blog",
    },
    "pt-br": {
      description: "Uma coleção de artigos sobre tópicos que me interessam.",
      title: "Blog",
    },
  },
  experience: {
    en: {
      description: "My professional journey and experience",
      title: "Work experience",
    },
    "pt-br": {
      description: "Minha jornada profissional e experiência",
      title: "Experiência",
    },
  },
  home: {
    en: {
      description: "Personal site and blog.",
      title: "Home",
    },
    "pt-br": {
      description: "Site pessoal e blog.",
      title: "Home",
    },
  },
  projects: {
    en: {
      description: "A collection of my projects with links to repositories and live demos.",
      title: "Projects",
    },
    "pt-br": {
      description: "Uma coleção dos meus projetos com links para repositórios e demonstrações.",
      title: "Projetos",
    },
  },
  subscribe: {
    en: {
      description: "Subscribe to receive new articles by email.",
      title: "Subscribe",
    },
    "pt-br": {
      description: "Inscreva-se para receber novos artigos por email.",
      title: "Inscreva-se",
    },
  },
  tags: {
    en: {
      description: "List of tags used.",
      title: "Tags",
    },
    "pt-br": {
      description: "Lista de tags utilizadas.",
      title: "Tags",
    },
  },
} as const;

export function getPageMetadata(page: keyof typeof LOCALIZED_METADATA, locale: Locale) {
  return LOCALIZED_METADATA[page][locale];
}

export function createMetadata({
  description,
  image,
  locale,
  pathname,
  title,
}: {
  description: string;
  image?: string;
  locale: Locale;
  pathname: string;
  title: string;
}): NextMetadata {
  const url = new URL(pathname, SITE.url);

  return {
    alternates: {
      canonical: url,
    },
    description,
    metadataBase: new URL(SITE.url),
    openGraph: {
      description,
      images: image ? [image] : undefined,
      locale,
      title,
      type: "website",
      url,
    },
    title,
    twitter: {
      card: "summary_large_image",
      description,
      images: image ? [image] : undefined,
      title,
    },
  };
}
