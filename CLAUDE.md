# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm dev` - Start development server (with Turbopack)
- `pnpm build` - Build for production (runs contentlayer2 build + next build)
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code using Prettier

## Project Architecture

This is a Next.js 16 personal website and blog with internationalization support (English and Portuguese Brazilian). The site uses static site generation and is deployed on Vercel.

### Key Architecture Components

**Content Management:**
- Blog posts and projects are managed through Contentlayer2 (contentlayer.config.ts)
- Blog posts support multilingual content with locale-specific directories (content/blog/[post]/[locale]/index.mdx)
- Content types: Blog and Project with computed fields for slug, readingTime, and URL

**Internationalization (i18n):**
- Configured for English (default) and Portuguese Brazilian locales using next-intl
- Language routing handled through src/i18n/ with routing.ts and navigation.ts
- Localized UI strings defined in src/messages/en.json and src/messages/pt-br.json
- English uses /en/ prefix, Portuguese uses /pt-br/ prefix

**Site Configuration:**
- Global site constants in src/lib/constants.ts
- Next.js config in next.config.mjs with contentlayer and next-intl plugins
- TypeScript paths configured with @/* alias pointing to src/*

**Styling & UI:**
- TailwindCSS v4 for styling with typography plugin
- Components organized in src/components/
- Global styles in src/app/globals.css
- shadcn/ui components in src/components/ui/

**Content Structure:**
- Blog posts: content/blog/[post-name]/[locale]/index.mdx
- Projects: content/projects/[project-name]/[locale]/index.mdx
- Both collections support draft status and metadata like tags, dates, and external links

**File Structure:**
```
src/
  app/          # Next.js App Router pages
  components/   # React components
  i18n/         # Internationalization config
  lib/          # Utility functions
  messages/     # i18n translation files
content/        # Blog posts and projects (Contentlayer)
public/         # Static assets
```
