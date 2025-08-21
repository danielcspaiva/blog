import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://dcsp.dev",
  integrations: [
    sitemap(), 
    mdx(),
    react(),
  ],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "pt-br"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      theme: "css-variables",
    },
  },
  output: "static",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    imageService: {
      enabled: true,
    },
  }),
});