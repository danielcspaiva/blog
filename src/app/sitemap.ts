import type { MetadataRoute } from "next";
import { blog, projects } from "@content";
import { localizedUrl } from "@/lib/metadata";

const staticPaths = [
  "/",
  "/blog",
  "/projects",
  "/experience",
  "/tags",
  "/subscribe",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (
    path: string,
    lastModified?: string | Date,
  ): MetadataRoute.Sitemap[number] => ({
    url: localizedUrl("en", path),
    lastModified,
    alternates: {
      languages: {
        en: localizedUrl("en", path),
        "pt-BR": localizedUrl("pt-br", path),
      },
    },
  });

  const postSlugs = [...new Set(blog.filter((p) => !p.draft).map((p) => p.slug))];
  const projectSlugs = [
    ...new Set(projects.filter((p) => !p.draft).map((p) => p.slug)),
  ];
  const tags = [
    ...new Set(blog.filter((p) => !p.draft).flatMap((p) => p.tags ?? [])),
  ];

  return [
    ...staticPaths.map((p) => entry(p)),
    ...postSlugs.map((s) =>
      entry(`/blog/${s}`, blog.find((b) => b.slug === s)?.date),
    ),
    ...projectSlugs.map((s) =>
      entry(`/projects/${s}`, projects.find((p) => p.slug === s)?.date),
    ),
    ...tags.map((t) => entry(`/tags/${t}`)),
  ];
}
