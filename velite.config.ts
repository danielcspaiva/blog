import { defineConfig, defineCollection, s } from "velite";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import { cssVariablesTheme } from "./src/lib/shiki-css-variables-theme";

// s.path() returns the directory path without the filename, e.g.
// "blog/ai-success-equation/en" -> slug = -2, locale = -1.
const deriveIds = (path: string) => {
  const seg = path.split("/");
  return {
    slug: seg.at(-2) ?? seg[0] ?? "",
    pathLocale: seg.at(-1) ?? "",
  };
};

const commonSchema = {
  title: s.string(),
  description: s.string(),
  date: s.isodate(),
  draft: s.boolean().optional(),
  locale: s.string().optional(),
  path: s.path(),
  metadata: s.metadata(),
  toc: s.toc(),
  code: s.mdx(),
};

const blog = defineCollection({
  name: "Post",
  pattern: "blog/**/index.{md,mdx}",
  schema: s
    .object({
      ...commonSchema,
      tags: s.array(s.string()).optional(),
      hideTableOfContents: s.boolean().optional(),
    })
    .transform((data) => {
      const { slug, pathLocale } = deriveIds(data.path);
      return {
        ...data,
        slug,
        frontmatterLocale: data.locale,
        locale: data.locale ?? pathLocale,
        // Preserve the exact old reading-time formula: (words / 200 + 1).
        readingTime: (data.metadata.wordCount / 200 + 1).toFixed(),
      };
    }),
});

const projects = defineCollection({
  name: "Project",
  pattern: "projects/**/index.{md,mdx}",
  schema: s
    .object({
      ...commonSchema,
      demoURL: s.string().optional(),
      repoURL: s.string().optional(),
    })
    .transform((data) => {
      const { slug, pathLocale } = deriveIds(data.path);
      return {
        ...data,
        slug,
        frontmatterLocale: data.locale,
        locale: data.locale ?? pathLocale,
        readingTime: (data.metadata.wordCount / 200 + 1).toFixed(),
      };
    }),
});

export default defineConfig({
  root: "src/content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { blog, projects },
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode, { theme: cssVariablesTheme, keepBackground: true }],
    ],
  },
});
