# Phase 1 Discovery & Implementation Plan — Sleeping Warrior Camp Guest Menu

**Project**: Standalone Digital Guest Menu Catalogue  
**Client / Property**: The Sleeping Warrior Camp, Elementaita, Rift Valley, Kenya  
**Phase**: Phase 1 — Discovery, Brand Audit, and Technical Foundation  
**Status**: Catalogue-only. The guest-facing experience is a premium read-only menu. Cart, quantity steppers, option configuration, suite/tent selection for ordering, and checkout-style flows described later in this Phase 1 plan were retired and must not be reintroduced.

---

## 1. Workspace & Environment Inspection

1. **Workspace Initial State**: Inspected `/home/yobra/Desktop/Sleeping Warriors` prior to scaffolding; confirmed it was completely empty (`0` files, not yet initialized as a Git repository).
2. **System Runtime**:
   - **Node.js**: `v24.17.0`
   - **npm**: `12.0.1`
   - **OS**: Linux `7.0.0-38-generic`
3. **Node Compatibility Verification**: Checked official `engines` metadata across Vite `8.3.5` (`^20.19.0 || >=22.12.0`), Vitest `5.0.5` (`^22.12.0 || ^24.0.0 || >=26.0.0`), ESLint `10.13.0` (`^20.19.0 || ^22.13.0 || >=24`), and `jsdom` `30.1.3` (`^22.22.2 || ^24.15.0 || >=26.0.0`). All selected packages are natively compatible with Node `v24.17.0` without modifying the system Node installation.

---

## 2. Official Brand References & Asset Audit

### 2.1 Inspected Official Pages & Endpoints

| Resource                        | URL                                                                                                                                            | Status & Inspection Method                                                  |
| :------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------- |
| Main Website                    | [https://sleepingwarriorcamp.com/](https://sleepingwarriorcamp.com/)                                                                           | **Inspected** (`200 OK`, page content + WP REST API Page ID `11`)           |
| Official Gallery                | [https://sleepingwarriorcamp.com/gallery/](https://sleepingwarriorcamp.com/gallery/)                                                           | **Inspected** (`200 OK`, page content + WP REST API Page ID `1035`)         |
| The Shamba Experience           | [https://sleepingwarriorcamp.com/the-experience/the-shamba-experience/](https://sleepingwarriorcamp.com/the-experience/the-shamba-experience/) | **Inspected** (`200 OK`, page content + WP REST API Page ID `398`)          |
| Suites & Camp                   | [https://sleepingwarriorcamp.com/suites-camp/](https://sleepingwarriorcamp.com/suites-camp/)                                                   | **Inspected** (`200 OK`, page content + WP REST API Page ID `434`)          |
| Batian Cabin                    | [https://sleepingwarriorcamp.com/suites-camp/batian-cabin/](https://sleepingwarriorcamp.com/suites-camp/batian-cabin/)                         | **Inspected** (`200 OK`, page content + WP REST API Page ID `443`)          |
| Nelion Cabin                    | [https://sleepingwarriorcamp.com/suites-camp/nelion-cabin/](https://sleepingwarriorcamp.com/suites-camp/nelion-cabin/)                         | **Inspected** (`200 OK`, page content + WP REST API Page ID `586`)          |
| Moran Tent                      | [https://sleepingwarriorcamp.com/suites-camp/moran-tent/](https://sleepingwarriorcamp.com/suites-camp/moran-tent/)                             | **Inspected** (`200 OK`, page content + WP REST API Page ID `605`)          |
| The Experience                  | [https://sleepingwarriorcamp.com/the-experience/](https://sleepingwarriorcamp.com/the-experience/)                                             | **Inspected** (`200 OK`, page content + WP REST API Page ID `250`)          |
| Conservation & Community        | [https://sleepingwarriorcamp.com/conservation-community/](https://sleepingwarriorcamp.com/conservation-community/)                             | **Inspected** (`200 OK`, page content + WP REST API Page ID `931`)          |
| Plan Your Journey               | [https://sleepingwarriorcamp.com/plan-your-journey/](https://sleepingwarriorcamp.com/plan-your-journey/)                                       | **Inspected** (`200 OK`, page content + WP REST API Page ID `985`)          |
| Enquire / Contact               | [https://sleepingwarriorcamp.com/enquire/](https://sleepingwarriorcamp.com/enquire/)                                                           | **Inspected** (`200 OK`, page content + WP REST API Page ID `62`)           |
| WP REST API Root, Pages & Media | `https://sleepingwarriorcamp.com/wp-json/wp/v2/{pages,media,types}`                                                                            | **Inspected** (`200 OK`, 13 published pages & 94 media attachments audited) |

### 2.2 Inaccessible Resources Recorded

Rather than assuming or guessing unverified resources, the following endpoints returned errors or were blocked during inspection:

1. **XML Sitemaps**:
   - `https://sleepingwarriorcamp.com/wp-sitemap.xml` — returned `500 Internal Server Error`.
   - `https://sleepingwarriorcamp.com/sitemap_index.xml` — returned `500 Internal Server Error`.
2. **Protected WordPress REST Endpoints**:
   - `https://sleepingwarriorcamp.com/wp-json/wp/v2/elementor_library` — returned `401 Unauthorized` (requires WP admin authentication).
   - `https://sleepingwarriorcamp.com/wp-json/wp/v2/font-families` — returned `401 Unauthorized` (custom uploaded font file URLs for `'Carefree'` are not publicly listable via REST).
3. **External Elementor Static CSS Paths**:
   - `https://sleepingwarriorcamp.com/wp-content/uploads/elementor/css/post-*.css` — returned `404 Not Found` (Elementor styles on this Elementor Cloud / Breeze-optimized WordPress instance are inlined or served via Breeze cache bundles rather than static per-post CSS files).
4. **Direct Sandbox Shell `curl` to `sleepingwarriorcamp.com`**:
   - Blocked by the sandbox egress proxy (`CONNECT tunnel failed, response 403`) because only package registries are allowlisted in the shell sandbox. Web inspection was therefore completed via `WebFetch` against the live HTML pages and WordPress REST API.

---

## 3. Verified Brand Assets vs. Excluded Third-Party / AI Assets

### 3.1 Official Logos & Icons (Verified)

| Asset Role                  | Media ID | Dimensions  | Verified Source URL                                                                                                                                               |
| :-------------------------- | :------- | :---------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Primary Brand Logo (PNG)    | `155`    | `1754x1241` | `https://sleepingwarriorcamp.com/wp-content/uploads/2026/01/Sleeping-Warrior-Camp-03.png`                                                                         |
| Optimized Brand Logo (WebP) | —        | `1754x1241` | `https://sleepingwarriorcamp.com/wp-content/uploads/al_opt_content/IMAGE/sleepingwarriorcamp.com/wp-content/uploads/2026/01/Sleeping-Warrior-Camp-03.png.bv.webp` |
| Site Icon / Favicon (PNG)   | `1297`   | `512x512`   | `https://sleepingwarriorcamp.com/wp-content/uploads/2026/01/cropped-Sleeping-Warrior-Camp-03.png`                                                                 |

### 3.2 Verified Original Camp Photography (Curated Highlights from 75 Verified Assets)

The camp's WordPress media library contains **75 authentic camp photographs** (identifiable by camera filenames `DSC0*`, `3W1A*`, `0Q3A*`, `P193*`, `DJI_*`, `BRA08490ed21`, and named property shoots):

- **The Shamba Experience (Page ID `398`)**:
  - `https://sleepingwarriorcamp.com/wp-content/uploads/2026/01/P1933080-scaled.webp` (`2560x1442`, Media ID `430`)
  - `https://sleepingwarriorcamp.com/wp-content/uploads/2026/01/DSC03316-scaled.webp` (`2560x1440`, Media ID `426`)
  - `https://sleepingwarriorcamp.com/wp-content/uploads/2026/01/DSC03306-scaled.webp` (`2560x2529`, Media ID `411`)
- **Camp Landscape, Sunrise & Evening Bonfire (Page IDs `11`, `250`, `931`)**:
  - `https://sleepingwarriorcamp.com/wp-content/uploads/2026/01/Sunrise-at-Sleeping-Warrior-Camp-scaled.webp` (`2560x1440`, Media ID `308`)
  - `https://sleepingwarriorcamp.com/wp-content/uploads/2026/01/bonfire-scaled.webp` (`2560x1707`, Media ID `1309`)
  - `https://sleepingwarriorcamp.com/wp-content/uploads/2026/01/About-us_.webp` (`1600x2400`, Media ID `1302`)
  - `https://sleepingwarriorcamp.com/wp-content/uploads/2026/01/BRA08490ed21-scaled.webp` (`2560x1707`, Media ID `1313`)
  - `https://sleepingwarriorcamp.com/wp-content/uploads/2026/01/DSC03319-scaled.webp` (`2560x1707`, Media ID `371`)
  - `https://sleepingwarriorcamp.com/wp-content/uploads/2026/01/DSC03292-scaled.webp` (`2560x1707`, Media ID `366`)
  - `https://sleepingwarriorcamp.com/wp-content/uploads/2026/01/DSC03603-scaled.webp` (`2560x1440`, Media ID `360`)
  - `https://sleepingwarriorcamp.com/wp-content/uploads/2026/01/DSC03701-scaled.webp` (`2560x1707`, Media ID `359`)
  - `https://sleepingwarriorcamp.com/wp-content/uploads/2026/01/DJI_0668-scaled.webp` (`2560x1637`, Media ID `942`)
  - `https://sleepingwarriorcamp.com/wp-content/uploads/2026/01/DJI_0654-scaled.webp` (`2560x1666`, Media ID `940`)
- **Accommodations (Batian Cabin, Nelion Cabin, Moran Tent)**:
  - `https://sleepingwarriorcamp.com/wp-content/uploads/2026/01/Batian-Premier-Cabins-2-scaled.webp` (`2560x1707`, Media ID `447`)
  - `https://sleepingwarriorcamp.com/wp-content/uploads/2026/01/Batian-Premier-Cabins-3-scaled.webp` (`2560x1707`, Media ID `445`)
  - `https://sleepingwarriorcamp.com/wp-content/uploads/2026/01/Nelion-Premier-Cabins.-1-scaled.webp` (`2560x1707`, Media ID `595`)
  - `https://sleepingwarriorcamp.com/wp-content/uploads/2026/01/Nelion-Premier-Cabins.-2-scaled.webp` (`2560x1707`, Media ID `594`)
  - `https://sleepingwarriorcamp.com/wp-content/uploads/2026/02/3W1A8583-scaled.webp` (`2560x1707`, Media ID `1670`)
  - `https://sleepingwarriorcamp.com/wp-content/uploads/2026/01/15Moran-Luxury-Tents-scaled.webp` (`2560x1707`, Media ID `614`)

### 3.3 Excluded Third-Party Stock, Freepik & AI-Generated Assets (19 Files)

Our audit of the WordPress media library identified **19 non-authentic / third-party files** that **must not** be used as authentic camp or culinary photography in the guest menu:

1. **Google Gemini AI-Generated Images (6 files)**:
   - `Gemini_Generated_Image_g1ecvtg1ecvtg1ec.webp` (ID `1640`)
   - `Gemini_Generated_Image_8i2ets8i2ets8i2e.webp` (ID `1603`)
   - `Gemini_Generated_Image_2s0miq2s0miq2s0m.webp` (ID `1566`)
   - `Gemini_Generated_Image_wch1y3wch1y3wch1.webp` (ID `1475`)
   - `Gemini_Generated_Image_h1f5oh1f5oh1f5oh.webp` (ID `1474`)
   - `Gemini_Generated_Image_lgd7zelgd7zelgd7.webp` (ID `1471`)
2. **Freepik AI / Assistant & Talk Exports (3 files)**:
   - `freepik__assistant__95982.webp` (ID `2051`)
   - `freepik__assistant__95983.webp` (ID `2049`)
   - `freepik__talk__82147.png` (ID `2048`)
3. **Freepik Numeric Stock Photos (`1500x1000` / `1500x1200`, 5 files)**:
   - `2148704430.webp` (ID `1124`, attached to Home)
   - `2148761542.webp` (ID `903`, attached to Shamba Experience)
   - `2151441260.webp` (ID `422`, attached to Shamba Experience)
   - `2149026833.webp` (ID `394`, attached to The Experience)
   - `38551.webp` (ID `361`, attached to The Experience)
4. **Generic Stock Pool / Sunhat Banners (3 files)**:
   - `young-woman-yellow-swimsuit-hat-sunglasses-floating-mattress-pool-scaled.webp` (ID `1374`)
   - `young-beautiful-unrecognizable-woman-straw-hat-is-resting-vacation-pool-copy-space-banner-scaled.webp` (ID `1344`)
   - `woman-sitting-swimming-pool-ring-pool-float-large-yellow-sunhat-banner-long-format-scaled.webp` (ID `1325`)
5. **Generic / Unverified Graphic Exports (2 files)**:
   - `tree.png` (`128x128` icon, ID `2050`)
   - `Untitled-design-19.png` (`563x338` Canva export, ID `2045`)

---

## 4. Missing Assets & Permissions Requiring Confirmation

Before populating the guest menu catalog in Phase 2, we require confirmation or delivery of the following from the camp team / product owner:

1. **Official Camp Menu & Beverage Catalog**:
   - The public website describes the culinary philosophy (_"From Soil to Table"_, _"Coffee Grown Here"_, _"Raised With Care"_, _"Late Breakfast with a View"_, _"Evening by Firelight"_) but **does not publish any menu items, dish descriptions, course categories, or beverage lists**.
2. **Verified Pricing & Currency Policy**:
   - Confirmation of exact dish/beverage prices in **KES** (or whether certain board meals are inclusive with supplemental prices for premium drinks/sundowners), and whether prices are inclusive of VAT and Catering Levy.
3. **Verified Dietary, Allergen & Preparation Matrix**:
   - Confirmation of per-dish dietary tags (`vegetarian`, `vegan`, `gluten-free`, `dairy-free`, `nut-free`, `halal`) and customization options (e.g., coffee preparation, meat temperatures, side choices).
4. **Custom Display Font File (`'Carefree'`)**:
   - The website CSS references `font-family: 'Carefree'` for display titles. Because `/wp-json/wp/v2/font-families` requires authentication (`401`), we need either the `.woff2` font file with web license confirmation or approval to use our configured editorial serif fallback (`Cormorant Garamond`) paired with the verified `Raleway` and `Montserrat` Google Fonts.
5. **Dish-Specific Food Photography**:
   - While we have 3 verified Shamba photography assets (`P1933080`, `DSC03316`, `DSC03306`), individual dish photography is not on the public website. We recommend an **editorial typography-first menu layout** accented by verified Shamba imagery rather than using stock food photos.

---

## 5. Proposed Design System

### 5.1 Color Tokens (Codified in `src/styles/tokens.css`)

| Token                            | Value     | Provenance                                                   | Usage                                                         |
| :------------------------------- | :-------- | :----------------------------------------------------------- | :------------------------------------------------------------ |
| `--swc-color-terracotta-primary` | `#8A251C` | **Verified** (`.room-btn`, `.btn-direct-wa`, `.nav-arrow`)   | Primary CTAs, Add-to-Cart buttons, active category indicators |
| `--swc-color-terracotta-hover`   | `#6F1D16` | **Verified** (`.btn-direct-wa:hover`)                        | Primary button hover/active state                             |
| `--swc-color-terracotta-warm`    | `#942A1E` | **Verified** (`.urgency-status-note`)                        | Status badges, important callout labels                       |
| `--swc-color-crimson-deep`       | `#5E0F02` | **Verified** (`--badge-bg`)                                  | Deep badge fills, high-contrast tags                          |
| `--swc-color-parchment-cream`    | `#F6F3E9` | **Verified** (`.room-overlay:hover`, `.urgency-status-note`) | Primary page canvas & warm editorial surface                  |
| `--swc-color-valley-sand`        | `#E7E5D8` | **Verified** (`.hero-slider-wrapper`)                        | Secondary container fill, filter bar, cart summary panel      |
| `--swc-color-obsidian`           | `#0C0D0D` | **Verified** (`.room-title:hover`)                           | Primary heading & dish title ink                              |
| `--swc-color-charcoal`           | `#3B3B3B` | **Verified** (`.room-desc` `rgb(59, 59, 59)`)                | Body copy & dish descriptions                                 |
| `--swc-color-shamba-olive`       | `#3D4F38` | **Proposed** (harmonized with Shamba foliage)                | _"From Our Shamba"_ provenance badges & icons                 |
| `--swc-color-shamba-sage-bg`     | `#EEF2EB` | **Proposed**                                                 | Soft background pill for Shamba provenance tags               |

### 5.2 Typography

- **Display / Headings (`--swc-font-display`)**: `'Carefree', 'Cormorant Garamond', Georgia, serif` — captures the quiet, unhurried editorial tone of the lodge.
- **Primary Body & UI (`--swc-font-sans`)**: `'Raleway', sans-serif` (weights `400`, `500`, `600`, `700`) — verified directly from `.room-desc`, `.room-btn`, `.testimonial-wrapper`, and `.wrc-vision-container`.
- **Numeric, Prices & Micro-Labels (`--swc-font-numeric`)**: `'Montserrat', sans-serif` (weights `400`, `500`, `600`, `700`) — verified from `--body-font` and `.custom-whatsapp-container`; provides clean tabular alignment for KES prices and cart quantities.

### 5.3 Layout, Elevation & Motion

- **Mobile-First Editorial Layout**: Guests primarily browse on smartphones from their cabin/tent deck (`Batian`, `Nelion`, `Moran`) or at the dining table, with seamless expansion to tablet/desktop widths (`max-width: 1120px`).
- **Radii & Borders**: Subtle radii (`4px`–`6px` for buttons and cards, `12px` for feature panels) and warm hairline borders (`rgba(12, 13, 13, 0.12)`).
- **Motion**: Smooth, unhurried transitions (`cubic-bezier(0.25, 1, 0.5, 1)`) verified from the camp website's sliders, with full `@media (prefers-reduced-motion: reduce)` support.

---

## 6. Proposed Component & Directory Structure

```text
src/
├── app/
│   ├── App.tsx                        # Top-level application shell & layout composition
│   ├── App.module.css                 # Scoped styles for application shell
│   └── __tests__/
│       └── App.test.tsx               # Integration tests for application shell
├── components/
│   ├── layout/
│   │   ├── CampHeader.tsx             # Verified brand logo, tagline & active cart trigger
│   │   ├── ShambaBanner.tsx           # Editorial storytelling banner ("From Soil to Table")
│   │   └── CampFooter.tsx             # Verified Elementaita address & host contact details
│   └── ui/
│       ├── Badge.tsx                  # Shamba provenance & dietary tag pill component
│       ├── Button.tsx                 # Terracotta primary / outline / ghost button primitive
│       ├── Drawer.tsx                 # Accessible modal drawer for cart & item customization
│       └── QuantityStepper.tsx        # Accessible +/- stepper with aria-live announcements
├── data/
│   ├── brand.verified.ts              # Verified camp metadata, logos, rooms & Shamba photography
│   └── menu.catalog.ts                # Official menu catalog (populated once camp data is confirmed)
├── domain/
│   ├── menu.types.ts                  # Strict types for MenuCatalog, MenuCategory, MenuItem
│   ├── cart.types.ts                  # Strict types for CartState, CartLineItem, CartAction
│   ├── cart.logic.ts                  # Pure cart reducer, line merging, KES formatting & totals
│   ├── menu.filter.ts                 # Pure filtering by category, Shamba provenance & dietary tags
│   ├── index.ts                       # Barrel export for domain layer
│   └── __tests__/
│       └── cart.logic.test.ts         # Unit tests for cart domain logic
├── features/
│   ├── menu/
│   │   ├── CategoryNav.tsx            # Sticky horizontal category & rhythm-of-day selector
│   │   ├── DietaryFilterBar.tsx       # Filter toggles (Shamba Harvest, Estate Coffee, Vegetarian, etc.)
│   │   ├── MenuSection.tsx            # Category group with editorial intro & dish list
│   │   ├── MenuItemCard.tsx           # Dish card with provenance badges, price & quick-add
│   │   └── ItemDetailSheet.tsx        # Dish customization modal (options & preparation notes)
│   └── cart/
│       ├── CartContext.tsx            # React 19 Context provider + sessionStorage persistence
│       ├── CartDrawer.tsx             # Slide-over guest selection tray with line editing
│       ├── GuestContextSelector.tsx   # Optional selector for Batian Cabin / Nelion Cabin / Moran Tent
│       └── OrderSummaryView.tsx       # Clean in-person / table order review screen (non-POS)
├── hooks/
│   └── useSessionCart.ts              # Safe sessionStorage synchronization hook
├── styles/
│   ├── tokens.css                     # Verified CSS custom properties
│   └── global.css                     # Reset, typography & accessibility focus styles
├── test/
│   └── setup.ts                       # Vitest + @testing-library/jest-dom configuration
└── main.tsx                           # Application bootstrap
```

---

## 7. Dependency Choices & Justification

All dependencies were verified against official npm registry metadata and Node `v24.17.0` `engines` constraints:

| Package                                              | Version                          | Role & Justification                                                                                                                                                                                       |
| :--------------------------------------------------- | :------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `react` / `react-dom`                                | `^19.3.1`                        | Latest stable React 19 release; native support for `<Context value={...}>` and modern concurrent rendering.                                                                                                |
| `vite` / `@vitejs/plugin-react`                      | `^8.3.5` / `^6.1.2`              | Current stable Vite 8 build tool; instant HMR and optimized static asset bundling (`engines: ^20.19.0 \|\| >=22.12.0`).                                                                                    |
| `typescript`                                         | `~5.9.3`                         | Latest stable TypeScript 5.9 release that satisfies `typescript-eslint@8.72.0`'s peer dependency (`>=4.8.4 <6.1.0`), avoiding peer conflicts with TypeScript 7 while supporting all strict compiler flags. |
| `lucide-react`                                       | `^1.61.0`                        | Clean, tree-shakeable SVG stroke icons for dietary indicators, Shamba botanicals, and cart controls; compatible with React 19.                                                                             |
| `vitest` / `jsdom`                                   | `^5.0.5` / `^30.1.3`             | Native Vite-powered test runner and DOM environment supporting Node `v24.17.0`.                                                                                                                            |
| `@testing-library/react` / `jest-dom` / `user-event` | `^16.3.3` / `^7.0.1` / `^14.6.8` | Industry-standard user-centric component and accessibility testing suite with React 19 peer support.                                                                                                       |
| `eslint` / `typescript-eslint`                       | `^10.13.0` / `^8.72.0`           | ESLint 10 flat configuration with `strictTypeChecked` and `stylisticTypeChecked` rulesets.                                                                                                                 |
| `prettier` / `eslint-config-prettier`                | `^3.9.10` / `^10.1.8`            | Deterministic formatting across TypeScript, CSS, JSON, and Markdown files.                                                                                                                                 |

**Why no external state management or CSS framework?**

- A pure `useReducer` + React Context (`src/domain/cart.logic.ts`) provides 100% deterministic, testable state transitions for a client-side guest cart with zero bundle overhead.
- CSS Modules + CSS Custom Properties (`src/styles/tokens.css`) map 1:1 to the camp's bespoke editorial design tokens without utility-class bloat.

---

## 8. Automated Test Strategy

1. **Layer 1 — Pure Domain Unit Tests (`src/domain/__tests__/`)**:
   - Cart reducer transitions: adding items, merging identical item+option+note combinations, separating distinct configurations, rejecting unavailable items, clamping quantities (`0` removes line, max `25`), recording guest accommodation context (`batian-cabin`, `nelion-cabin`, `moran-tent`, `valley-dining-deck`), subtotal calculation, and `KES` currency formatting.
   - Menu filtering logic (Phase 2): filtering by category, Shamba provenance tags, dietary tags, and search queries.
2. **Layer 2 — Component & Accessibility Interaction Tests (`src/features/**/__tests__/`)**:
   - Keyboard navigation and screen-reader roles (`role="status"`, `aria-labelledby`, `aria-live`) for category tabs, dish cards, quantity steppers, and the cart drawer.
   - Verification that empty/unverified catalog states render transparently without fabricated data.
3. **Layer 3 — Static Analysis Gates**:
   - `npm run typecheck` (`tsc -b --noEmit` with `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`).
   - `npm run lint` (`eslint .` with `strictTypeChecked`).
   - `npm run build` (full production bundle verification).

---

## 9. Known Constraints

1. **Strict Independence**: The application must remain a standalone static web app with zero coupling to any POS, KDS, payment processor, or backend database.
2. **Zero Fabricated Menu Data**: Until the camp provides its official menu, prices, and allergen matrix, the application must not invent placeholder dishes, fake KES prices, promotions, or guest reviews in application data.
3. **Variable Rural Connectivity**: Lake Elementaita / Soysambu Conservancy guests may experience variable mobile network quality; bundle size must stay minimal, and client-side cart state should persist safely in `sessionStorage` so accidental page refreshes do not lose a guest's selections.
4. **WordPress Media Hygiene**: 19 files in the camp's WordPress media library are third-party Freepik/stock or Gemini AI images and are blocked by `.cursor/rules/content-and-asset-integrity.mdc`.

---

## 10. Recommended Implementation Sequence

- **Phase 1 — Discovery, Brand Audit & Foundation (Current Phase — Complete)**
  - Inspect workspace, Node/npm versions, and official Sleeping Warrior Camp pages.
  - Separate verified brand assets (75 files) from third-party/AI uploads (19 files).
  - Scaffold React 19 + TypeScript + Vite 8 + Vitest 5 + ESLint 10 + Prettier 3 foundation.
  - Implement strict domain contracts (`menu.types.ts`, `cart.types.ts`), pure cart engine (`cart.logic.ts`), design tokens (`tokens.css`), foundation shell (`App.tsx`), unit tests, `README.md`, `AGENTS.md`, and `.cursor/rules/`.
- **Phase 2 — Official Menu Data Integration & Editorial Catalog UI**
  - Ingest confirmed camp menu categories, dish descriptions, KES pricing, and verified dietary/Shamba provenance tags into `src/data/menu.catalog.ts`.
  - Build `CategoryNav`, `DietaryFilterBar`, `MenuSection`, `MenuItemCard`, and `ItemDetailSheet`.
- **Phase 3 — Interactive Client-Side Cart & Guest Context Flow**
  - Build `CartContext` with `sessionStorage` resilience, `CartDrawer`, `QuantityStepper`, `GuestContextSelector` (`Batian Cabin`, `Nelion Cabin`, `Moran Tent`, `Valley Dining Deck`), and `OrderSummaryView` for sharing selections with camp hosts.
- **Phase 4 — Polish, Accessibility Audit & Performance Verification**
  - Conduct WCAG AA contrast, keyboard focus-trap, reduced-motion, and mobile viewport verification across all user flows.
