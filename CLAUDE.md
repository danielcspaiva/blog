# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build for production (includes TypeScript check via `astro check`)
- `pnpm preview` - Preview production build locally
- `prettier --write .` - Format code using Prettier

## Project Architecture

This is an Astro-based personal website and blog with internationalization support (English and Portuguese Brazilian). The site uses static site generation and is deployed on Vercel.

### Key Architecture Components

**Content Management:**
- Blog posts and projects are managed through Astro's content collections (src/content.config.ts)
- Blog posts support multilingual content with locale-specific directories (en/, pt-br/)
- Content is loaded using Astro's glob loader for markdown/MDX files

**Internationalization (i18n):**
- Configured for English (default) and Portuguese Brazilian locales
- Language routing handled through src/i18n/utils.ts with functions like `getLangFromUrl()` and `getLocalizedRoute()`
- Localized metadata and UI strings defined in src/i18n/ui.ts and src/consts.ts
- Default locale (English) doesn't require URL prefix, other locales use /[locale]/ prefix

**Site Configuration:**
- Global site constants in src/consts.ts including social links, Cal.com integration, and localized metadata
- Astro config includes Vercel adapter with web analytics and image optimization enabled
- TypeScript paths configured with @* alias pointing to src/*

**Styling & UI:**
- TailwindCSS v4 for styling with typography plugin
- Components organized in src/components/ with focus on accessibility
- Global styles in src/styles/global.css

**Content Structure:**
- Blog posts: src/content/blog/[post-name]/[locale]/index.mdx
- Projects: src/content/projects/[project-name]/index.md
- Both collections support draft status and metadata like tags, dates, and external links