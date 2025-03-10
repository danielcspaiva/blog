import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  site: "https://astro-micro.vercel.app",
  integrations: [
    sitemap(), 
    mdx(),
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