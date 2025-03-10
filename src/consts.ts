import type { Metadata, Site, Socials } from "@types";

export const SITE: Site = {
  TITLE: "Daniel Paiva",
  DESCRIPTION: "CTO at Quarto à Vista | Full Stack Developer",
  EMAIL: "danielcspaiva@gmail.com",
  NUM_POSTS_ON_HOMEPAGE: 5,
  NUM_PROJECTS_ON_HOMEPAGE: 3,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION: "Astro Micro is an accessible theme for Astro.",
};

export const BLOG: Metadata = {
  TITLE: "Blog",
  DESCRIPTION: "A collection of articles on topics I am passionate about.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION:
    "A collection of my projects with links to repositories and live demos.",
};

// Cal.com booking link - replace with your own Cal.com username
export const CAL_BOOKING = {
  USERNAME: "danielcspaiva",
  MEETING_SLUG: "30min",
};

export const SOCIALS: Socials = [
  {
    NAME: "LinkedIn",
    HREF: "https://www.linkedin.com/in/danielcspaiva",
  },
  {
    NAME: "GitHub",
    HREF: "https://github.com/danielcspaiva",
  },
  {
    NAME: "Quarto à Vista",
    HREF: "https://quartoavista.com.br",
  },
];
