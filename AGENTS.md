# Repository Guidelines

## Project Structure & Module Organization
- **Source**: `src/` with `pages/` (i18n at `src/pages/[locale]`), `components/`, `layouts/`, `lib/`, `i18n/`, `styles/`, `types/`.
- **Content**: Collections in `src/content/` (e.g., `blog/`, `projects/`, `blog-template/`). Configure in `content.config.ts`.
- **Public Assets**: `public/` for images and static files.
- **Aliases**: `@* -> src/*` (see `tsconfig.json`). Use `@components/...`, `@lib/...`, `@consts`, etc.
- **Config**: `astro.config.mjs` defines i18n, Tailwind v4, Shiki, and Vercel adapter.

## Build, Test, and Development Commands
- `pnpm dev`: Start local development server with HMR.
- `pnpm build`: Type-check (`astro check`) and build for production.
- `pnpm preview`: Serve the production build locally for QA.
- `astro check`: Validate TypeScript and Astro types.
- `prettier --write .`: Format codebase with configured plugins.

## Coding Style & Naming Conventions
- **Languages**: Astro + TypeScript (strict null checks enabled).
- **Naming**: camelCase (vars/functions), PascalCase (components/types), SCREAMING_SNAKE_CASE (constants).
- **Files**: UI in `.astro`; utilities in `.ts`. Keep modules focused and typed.
- **Imports**: Prefer `@*` aliases over deep relative paths.
- **Formatting**: Prettier with `prettier-plugin-astro` and `prettier-plugin-tailwindcss`.
- **Styling**: TailwindCSS v4 (+ typography). Favor utility classes and semantic HTML.

## Testing Guidelines
- No unit test suite yet. Validate with `astro check` and `pnpm preview`.
- Add lightweight runtime guards for nullish values where appropriate.
- If introducing tests, prefer Vitest; mirror source path and name `*.test.ts`.

## Commit & Pull Request Guidelines
- **Commits**: Concise, imperative; prefer Conventional Commits (e.g., `feat: add i18n helpers`, `fix: correct OG image path`).
- **PRs**: Include summary, linked issues, screenshots for UI, i18n/content notes, and manual test steps (dev/preview).

## Security & Configuration Tips
- **Env Vars**: Use `.env` for secrets; never commit. Configure in Vercel for deployments.
- **Images & Analytics**: Vercel image service and web analytics are enabled; keep large assets in `public/` and use optimized formats.
