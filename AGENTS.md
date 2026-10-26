# AGENTS.md — Sleeping Warrior Camp Guest Menu Catalogue

Durable architectural, design, and engineering instructions for AI agents and contributors working in this repository.

## 1. Project Identity & Scope Boundaries

We are building a **standalone, premium, read-only digital guest menu catalogue** for **The Sleeping Warrior Camp** (Lake Elementaita, Soysambu Conservancy, Rift Valley, Kenya — `https://sleepingwarriorcamp.com/`).

### Strict Architectural Boundaries

This project **IS**:

- A guest-facing digital menu catalogue and culinary discovery experience rooted in the camp's _"From land to table, naturally"_ (Shamba) philosophy.
- A purely read-only client-side catalogue where guests browse categories, view dishes, and inspect dish details on mobile, tablet, and desktop.
- Completely independent of the camp's future POS and all other internal applications.

This project **IS NOT**:

- A Point of Sale (POS) application.
- A cart, ordering, or checkout application.
- A Kitchen Display System (KDS).
- A payment gateway or checkout processing application.
- A production ordering backend, database, or API server.
- An administration or inventory dashboard.

**Do not** introduce carts, checkout flows, mock backends, databases, authentication flows, or simulated payment processors.

## 2. Content & Brand Integrity Rules

1. **Verified Brand vs. Development-Only Sample Data**:
   - Verified camp identity, logos, rooms, and authentic property/Shamba photography live in `src/data/brand.verified.ts`.
   - Illustrative sample dishes, descriptions, and provisional KES prices live **exclusively** in `src/data/sampleMenu.dev.ts` (`status: 'sample_preview'`, `isSamplePreview: true`, `isSampleData: true`).
   - Production builds (`import.meta.env.PROD`) resolved via `src/data/catalog.boundary.ts` **never** silently load sample dishes or sample prices; when no approved production catalog is supplied, `INITIAL_MENU_CATALOG` (`status: 'awaiting_official_data'`) is returned so the UI renders an elegant empty-menu state.
   - Whenever sample content is displayed, the persistent banner `"MENU PREVIEW — SAMPLE DISHES AND PRICES"` must remain visible on screen, and every price must be clearly marked `SAMPLE · KES ...`.
2. **Distinguish verified brand assets from third-party/AI uploads**:
   - The official WordPress media library (`https://sleepingwarriorcamp.com/wp-json/wp/v2/media`) contains **75 verified camp assets** alongside **19 third-party stock/Freepik/Gemini AI assets**.
   - Only use verified camp assets cataloged in `src/data/brand.verified.ts` and `docs/IMPLEMENTATION_PLAN.md` for property and experience imagery.
   - Never use `Gemini_Generated_Image_*`, `freepik__*`, numeric Freepik stock files (`2148704430.webp`, `2148761542.webp`, `2151441260.webp`, `2149026833.webp`, `38551.webp`), stock pool banners (`young-woman-*`, `young-beautiful-*`, `woman-sitting-swimming-pool-*`), `tree.png`, or `Untitled-design-19.png`.
3. **Sample Dish Food Photography**:
   - Creative Commons / CC0 licensed sample food photographs are stored in `public/dev-sample-food/` with full provenance and license records in `public/dev-sample-food/manifest.json`. Never present third-party food photographs as meals prepared at Sleeping Warrior Camp.

## 3. Technical Stack & Environment Standards

- **Runtime Environment**: Node.js `v24.17.0` (`>=22.12.0`), npm `12.0.1`. Do not upgrade or replace the system Node installation.
- **Framework**: React `^19.3.1` with TypeScript `~5.9.3` (pinned `<6.1.0` for full `typescript-eslint` compatibility).
- **Build Tool**: Vite `^8.3.5` with `@vitejs/plugin-react` `^6.1.2`.
- **Styling**: White-first editorial luxury CSS Modules (`*.module.css`) backed by centralized CSS custom properties in `src/styles/tokens.css`.
- **Testing**: Vitest `^5.0.5` + `jsdom` + `@testing-library/react` + `@testing-library/user-event` + `@testing-library/jest-dom`.
- **Linting & Formatting**: ESLint 10 flat config (`eslint.config.js`) with `strictTypeChecked` rules + Prettier 3 (`.prettierrc.json`).

## 4. Coding Conventions

- **Strict TypeScript**: `strict: true`, `noUncheckedIndexedAccess: true`, `exactOptionalPropertyTypes: true`, and `verbatimModuleSyntax: true` are enforced. Avoid `any` and non-null assertions (`!`).
- **Domain Separation**:
  - Keep domain types and KES currency formatting pure and framework-agnostic inside `src/domain/`.
  - Keep UI components in `src/components/` and `src/features/` focused on accessibility, keyboard navigation, and presentation.
- **Design Tokens**: Always reference `--swc-*` CSS custom properties from `src/styles/tokens.css` rather than hardcoding hex colors or font stacks in component stylesheets.

## 5. Verification Commands

Run these checks before completing any implementation task:

```bash
npm run typecheck
npm run lint
npm run test
npm run build
npm run format:check
```
