# Sleeping Warrior Camp — Digital Guest Menu Catalogue

Standalone, read-only digital guest menu catalogue for **The Sleeping Warrior Camp** in Elementaita, Rift Valley, Kenya ([sleepingwarriorcamp.com](https://sleepingwarriorcamp.com/)).

Built as an independent, self-contained frontend application that reflects the camp's quiet luxury and _"From land to table, naturally"_ Shamba philosophy, without coupling to any POS, ordering system, kitchen display system, payment processor, or backend database.

---

## Current Architecture: Read-Only Editorial Menu Catalogue

- **White-First Editorial Design System**: Clean white (`#FFFFFF`) canvas paired with warm parchment (`#F6F3E9`), valley sand (`#E7E5D8`), intentional terracotta accents (`#8A251C` / `#6F1D16`), obsidian ink (`#0C0D0D`), and charcoal copy (`#3B3B3B`) in `src/styles/tokens.css`.
- **Typography**: Configured with `'Carefree', 'Cormorant Garamond', Georgia, serif` for editorial display headings, `'Raleway'` for body and UI controls, and `'Montserrat'` for tabular `KES` pricing and uppercase micro-labels.
- **Guest dashboard**: Home opens onto six course cards plus a single _From land to table_ Shamba panel. Category dishes appear only after a course is chosen, so the land-to-table story is not repeated on every plate.
- **Verified camp photography**: Authentic camp photography (`Sunrise-at-Sleeping-Warrior-Camp-scaled.webp`, `P1933080-scaled.webp`) and official logo (`Sleeping-Warrior-Camp-03.png`) from `src/data/brand.verified.ts`.
- **Development-Only Sample Catalogue (29 Dishes across 6 Categories)**:
  - Isolated in `src/data/sampleMenu.dev.ts` (`Breakfast`, `Garden & Lighter Meals`, `Main Courses`, `Sides & Staples`, `Desserts`, `Hot & Cold Beverages`).
  - Every price is formatted as `SAMPLE · KES ...` and accompanied by a discreet persistent notice (`"MENU PREVIEW — SAMPLE DISHES AND PRICES"`).
  - All 29 sample dish photographs are locally stored in `public/dev-sample-food/` with full Creative Commons / CC0 provenance in `public/dev-sample-food/manifest.json`.
- **Guest-preview catalogue**: Dummy sample dishes are served until the camp supplies an approved production catalog. Every price remains `SAMPLE · KES ...` with the persistent notice `"MENU PREVIEW — SAMPLE DISHES AND PRICES"`.

---

## Replacing or Editing the Sample Catalogue

1. **Editing Sample Items During Design Review**:
   - Open `src/data/sampleMenu.dev.ts` and modify `DEV_SAMPLE_CATEGORIES` or `DEV_SAMPLE_MENU_ITEMS`.
   - Sample food photography and license credits are indexed in `public/dev-sample-food/manifest.json`.
2. **Replacing Sample Data with the Camp's Approved Menu**:
   - Populate `INITIAL_MENU_CATALOG` in `src/data/brand.verified.ts` (or pass an approved `MenuCatalog` object with `status: 'ready'` and `isSamplePreview: false` to `resolveMenuCatalog` in `src/data/catalog.boundary.ts`).
   - Once `status === 'ready'` and `isSamplePreview` is `false`, the persistent `MENU PREVIEW` banner and `SAMPLE ·` price prefixes automatically turn off.

---

## Quick Start & Verification Commands

```bash
# Install dependencies
npm install

# Start local Vite development server
npm run dev

# Run TypeScript strict project-reference typecheck
npm run typecheck

# Run ESLint (strictTypeChecked + React Hooks)
npm run lint

# Run automated unit and component tests (Vitest + Testing Library)
npm run test

# Verify production bundle build
npm run build

# Check formatting with Prettier
npm run format:check
```

---

## Deploy (Vercel)

This is a static Vite SPA. `vercel.json` points the build at `dist/` and rewrites unknown routes to `index.html`.

```bash
npm run build
```

Guest-preview deploys serve the dummy sample menu with the SAMPLE banner until an official catalog is supplied.
