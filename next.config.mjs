import createMDX from "@next/mdx";
import { withContentCollections } from "@content-collections/next";

/** @type {import("next").NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  redirects: async () => {
    return [
      {
        destination: "/blog/ai-success-equation",
        permanent: true,
        source: "/blog/the-task-solving-equation",
      },
      {
        destination: "/en/blog/ai-success-equation",
        permanent: true,
        source: "/en/blog/the-task-solving-equation",
      },
      {
        destination: "/pt-br/blog/ai-success-equation",
        permanent: true,
        source: "/pt-br/blog/the-task-solving-equation",
      },
    ];
  },
};

const withMDX = createMDX({
  options: {
    rehypePlugins: [],
    remarkPlugins: ["remark-frontmatter", "remark-mdx-frontmatter"],
  },
});

export default withContentCollections(withMDX(nextConfig));
