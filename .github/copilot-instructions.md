# Copilot Instructions for NotionNext

## Overview
This project is a production-grade static blog system built with **Next.js**, **React**, and **Notion API**, supporting multiple deployment options (Vercel, Netlify, Docker, static export). It is highly modular, themeable, and extensible, with a strong focus on code quality, performance, and security.

## Key Architecture
- **Major directories:**
  - `components/`: All React UI components (atomic, composable, and theme-aware)
  - `pages/`: Next.js routing, API endpoints, and page-level logic
  - `themes/`: Pluggable blog themes (each folder = a theme)
  - `lib/`: Utilities, config, middleware, Notion API integration, and language/localization
  - `conf/`: Modular configuration files (analytics, comments, ads, etc.)
  - `scripts/`: Project automation and quality tools
  - `types/`: TypeScript type definitions
- **Configuration priority:** Notion Config Table > Environment Variables > `blog.config.js`
- **Theme system:** Add new themes by copying `themes/example/` and registering in config.
- **Extensibility:** Most features (comments, analytics, widgets) are enabled/disabled via `conf/` modules and environment variables.

## Developer Workflows
- **Install dependencies:** `npm install` or `yarn`
- **Start dev server:** `npm run dev` (uses `init-dev` for first-time setup)
- **Build for production:** `npm run build`
- **Run all quality checks:** `npm run quality`
- **Run tests:** `npm test` (Jest)
- **Format code:** `npm run format`
- **Lint & fix:** `npm run lint:fix`
- **Type check:** `npm run type-check`
- **Dev tools menu:** `npm run dev-tools` (see all helper scripts)
- **Setup Git hooks:** `npm run setup-hooks`
- **Health check:** `npm run health-check`
- **Final validation:** `npm run final-validation`

## Project Conventions
- **Component naming:** PascalCase (e.g., `LazyImage`)
- **File naming:** kebab-case (e.g., `lazy-image.js`)
- **Variables/functions:** camelCase
- **Constants:** UPPER_SNAKE_CASE
- **Commits:** Conventional Commits (see `DEVELOPMENT.md`)
- **All config is modularized** in `conf/` and loaded in `blog.config.js`.
- **TypeScript** is used for type safety; all new code should be typed.
- **Prettier** and **ESLint** are enforced for style and quality.

## Integration & Patterns
- **Notion API** is the primary data source (see `lib/notion/` and `blog.config.js`).
- **Comments, analytics, ads, widgets**: Each is a pluggable module in `conf/` and `components/`.
- **SEO & accessibility:** Handled via `components/SEO.js`, `components/Accessibility.js`, and related utilities.
- **Security:** Custom middleware in `lib/middleware/` and security config in `conf/`.
- **Performance:** Use `components/PerformanceMonitor.js` and run `npm run analyze` for bundle insights.

## Examples
- To add a new theme: Copy `themes/example/` → `themes/mytheme/`, update config, and test with `NEXT_PUBLIC_THEME=mytheme`.
- To add a new language: Copy `lib/lang/en-US.js`, translate, and register in `lib/lang.js`.
- To add a new widget: Implement in `components/`, register in `conf/widget.config.js`.

## References
- See `DEVELOPMENT.md` for full dev workflow and troubleshooting.
- See `DEPLOYMENT.md` for deployment options and best practices.
- See `PROJECT_COMPLETION_REPORT.md` for optimization and quality summary.
- See `blog.config.js` and `conf/` for all runtime configuration.

---
For any unclear patterns or missing documentation, check the referenced files or ask for clarification to keep this guide up to date.
