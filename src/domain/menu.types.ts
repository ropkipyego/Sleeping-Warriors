/**
 * Strict domain contracts for the Sleeping Warrior Camp Digital Menu Catalogue.
 *
 * IMPORTANT:
 * - Official menu items and pricing must be populated only from verified camp sources.
 * - Sample dishes live exclusively in a separate development-only module
 *   (`src/data/sampleMenu.dev.ts`) with `status: 'sample_preview'` and `isSampleData: true`.
 */

export type CurrencyCode = 'KES';

/**
 * Provenance pillars verified from https://sleepingwarriorcamp.com/the-experience/the-shamba-experience/
 */
export type ShambaProvenanceTag =
  | 'shamba-harvest' /* Vegetables, herbs and spices grown on camp land */
  | 'estate-coffee' /* Coffee grown on the land surrounding the lodge */
  | 'camp-livestock'; /* Livestock raised responsibly on camp land */

/**
 * Standard hospitality dietary labels (only displayed when verified or clearly marked as sample data)
 */
export type DietaryTag =
  'vegetarian' | 'vegan' | 'gluten-free' | 'dairy-free' | 'nut-free' | 'halal';

/**
 * Optional presentation hints for editorial layout rhythm
 */
export type EditorialLayoutVariant = 'feature-lead' | 'editorial-row' | 'compact-pair';

export interface MenuCategory {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly subtitle?: string;
  readonly serviceWindow?: string;
  readonly editorialNote?: string;
  readonly sortOrder: number;
}

export interface MenuItem {
  readonly id: string;
  readonly categoryId: string;
  readonly name: string;
  readonly description: string;
  /**
   * Price in whole Kenyan Shillings (KES).
   * In sample preview mode, this is a provisional sample amount for design review.
   */
  readonly priceKES: number;
  readonly currency: CurrencyCode;
  readonly available: boolean;
  readonly provenanceTags: readonly ShambaProvenanceTag[];
  readonly dietaryTags: readonly DietaryTag[];
  readonly allergenNotes?: string;
  readonly imageUrl?: string;
  readonly imageAlt?: string;
  readonly imageCredit?: string;
  readonly isSampleData?: boolean;
  readonly layoutVariant?: EditorialLayoutVariant;
}

export type MenuCatalogStatus = 'awaiting_official_data' | 'sample_preview' | 'ready';

export interface MenuCatalog {
  readonly status: MenuCatalogStatus;
  readonly lastVerifiedIso: string | null;
  readonly currency: CurrencyCode;
  readonly isSamplePreview?: boolean;
  readonly previewNoticeText?: string;
  readonly categories: readonly MenuCategory[];
  readonly items: readonly MenuItem[];
}
