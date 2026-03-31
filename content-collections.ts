import { createDefaultImport, defineCollection, defineConfig } from "@content-collections/core";
import type { ComponentType } from "react";
import { z } from "zod";

import { getContentPathMeta } from "@/lib/content";
import { getReadingTimeMinutes, getTocHeadingsFromMarkdown } from "@/lib/markdown";

type MDXContentComponent = ComponentType<Record<string, never>>;

const blogCollection = defineCollection({
  directory: "src/content/blog",
  include: "**/*/index.mdx",
  name: "blogs",
  parser: "frontmatter",
  schema: z.object({
    content: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    draft: z.boolean().optional(),
    hideTableOfContents: z.boolean().optional(),
    locale: z.string().optional(),
    tags: z.array(z.string()).optional(),
    title: z.string(),
  }),
  transform: ({ _meta, content, ...data }) => {
    const pathMeta = getContentPathMeta(_meta.filePath);

    return {
      ...data,
      collection: "blog" as const,
      headings: getTocHeadingsFromMarkdown(content),
      id: `${pathMeta.slug}/${data.locale ?? pathMeta.locale}`,
      locale: data.locale ?? pathMeta.locale,
      mdxContent: createDefaultImport<MDXContentComponent>(`@/content/blog/${_meta.filePath}`),
      readingTime: getReadingTimeMinutes(content),
      slug: pathMeta.slug,
      sourcePath: `src/content/blog/${_meta.filePath}`,
    };
  },
});

const projectCollection = defineCollection({
  directory: "src/content/projects",
  include: "**/*/index.{md,mdx}",
  name: "projects",
  parser: "frontmatter",
  schema: z.object({
    content: z.string(),
    date: z.coerce.date(),
    demoURL: z.string().optional(),
    description: z.string(),
    draft: z.boolean().optional(),
    locale: z.string().optional(),
    repoURL: z.string().optional(),
    title: z.string(),
  }),
  transform: ({ _meta, content, ...data }) => {
    const pathMeta = getContentPathMeta(_meta.filePath);

    return {
      ...data,
      collection: "projects" as const,
      headings: getTocHeadingsFromMarkdown(content),
      id: `${pathMeta.slug}/${data.locale ?? pathMeta.locale}`,
      locale: data.locale ?? pathMeta.locale,
      mdxContent: createDefaultImport<MDXContentComponent>(`@/content/projects/${_meta.filePath}`),
      readingTime: getReadingTimeMinutes(content),
      slug: pathMeta.slug,
      sourcePath: `src/content/projects/${_meta.filePath}`,
    };
  },
});

export default defineConfig({
  content: [blogCollection, projectCollection],
});
