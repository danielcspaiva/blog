# Repository Guidelines

## Project Structure & Module Organization
- **Source**: `src/` with `app/` (Next.js App Router with i18n at `src/app/[locale]`), `components/`, `lib/`, `i18n/`, `messages/`.
- **Content**: Blog posts and projects in `content/` directory. Configure in `contentlayer.config.ts`.
- **Public Assets**: `public/` for images and static files.
- **Aliases**: `@/* -> src/*` (see `tsconfig.json`). Use `@/components/...`, `@/lib/...`, etc.
- **Config**: `next.config.mjs` defines i18n (next-intl), Contentlayer, and experimental features.

## Build, Test, and Development Commands
- `pnpm dev`: Start local development server with Turbopack.
- `pnpm build`: Build contentlayer and Next.js for production.
- `pnpm start`: Serve the production build locally.
- `pnpm lint`: Run ESLint checks.
- `pnpm format`: Format codebase with Prettier.

## Coding Style & Naming Conventions
- **Languages**: TypeScript with React (strict mode enabled).
- **Naming**: camelCase (vars/functions), PascalCase (components/types), SCREAMING_SNAKE_CASE (constants).
- **Files**: Pages in `app/` as `page.tsx`; components as `.tsx`. Keep modules focused and typed.
- **Imports**: Prefer `@/*` aliases over deep relative paths.
- **Formatting**: Prettier with `prettier-plugin-tailwindcss`.
- **Styling**: TailwindCSS v4 (+ typography). Favor utility classes and semantic HTML.

## Testing Guidelines
- No unit test suite yet. Validate with `pnpm build` and `pnpm start`.
- Add lightweight runtime guards for nullish values where appropriate.
- If introducing tests, prefer Vitest; mirror source path and name `*.test.ts`.

## Commit & Pull Request Guidelines
- **Commits**: Concise, imperative; prefer Conventional Commits (e.g., `feat: add i18n helpers`, `fix: correct OG image path`).
- **PRs**: Include summary, linked issues, screenshots for UI, i18n/content notes, and manual test steps (dev/preview).

## Security & Configuration Tips
- **Env Vars**: Use `.env` for secrets; never commit. Configure in Vercel for deployments.
- **Images**: Next.js Image component with sharp for optimization; keep large assets in `public/`.
