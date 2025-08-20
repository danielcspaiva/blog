# Agent Guidelines

## Commands

- **Dev**: `pnpm dev` - Start development server
- **Build**: `pnpm build` - Build for production (includes `astro check` for TypeScript validation)
- **Preview**: `pnpm preview` - Preview production build
- **Format**: `prettier --write .` - Format code using Prettier
- **TypeCheck**: `astro check` - Validate TypeScript (runs as part of build)

## Code Style

- **Imports**: Use `@*` alias for src imports (`@components`, `@consts`, etc.)
- **Formatting**: Prettier with astro and tailwindcss plugins configured
- **TypeScript**: Strict mode enabled with null checks
- **Naming**: camelCase for variables/functions, PascalCase for components/types, SCREAMING_SNAKE_CASE for constants
- **Components**: Astro components (.astro), TypeScript utilities (.ts)
- **Error Handling**: Use TypeScript strict types, handle nullish values explicitly

## Architecture

- **i18n**: English (default) and Portuguese Brazilian with locale-based routing
- **Content**: Collections in `src/content/` with multilingual support (en/, pt-br/ subdirs)
- **Styling**: TailwindCSS v4 with typography plugin
- **Deployment**: Vercel with web analytics and image optimization
