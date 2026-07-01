import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

// Note: the Velite content layer is built via the `dev`/`build` npm scripts
// (`velite` / `velite --watch`), not here — a transpiled next.config.ts cannot
// use top-level await.

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/blog/the-task-solving-equation",
        destination: "/blog/ai-success-equation",
        permanent: true,
      },
      {
        source: "/pt-br/blog/the-task-solving-equation",
        destination: "/pt-br/blog/ai-success-equation",
        permanent: true,
      },
      // en is unprefixed in the new site; keep this for previously-shared links.
      {
        source: "/en/blog/the-task-solving-equation",
        destination: "/blog/ai-success-equation",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
