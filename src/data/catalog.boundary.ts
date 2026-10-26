import { INITIAL_MENU_CATALOG } from './brand.verified';
import { DEV_SAMPLE_MENU_CATALOG } from './sampleMenu.dev';
import { type MenuCatalog } from '../domain/menu.types';

/**
 * Clean catalog / API boundary for resolving the active guest menu.
 *
 * - Keeps a single, well-typed boundary ready for future replacement with the camp's
 *   approved static catalog or read-only menu endpoint, without coupling to any POS.
 * - Production builds (`isProd === true`) NEVER silently load sample dishes or sample prices:
 *   if no approved production catalog is configured, `INITIAL_MENU_CATALOG`
 *   (`status: 'awaiting_official_data'`) is returned so the UI renders an elegant empty-menu state.
 */

export type CatalogResolutionMode =
  'auto' | 'sample_preview' | 'production_empty' | 'simulated_error';

export interface ResolveCatalogOptions {
  readonly mode?: CatalogResolutionMode;
  readonly isProdEnv?: boolean;
  readonly approvedCatalog?: MenuCatalog | null;
}

export function resolveMenuCatalog(options: ResolveCatalogOptions = {}): MenuCatalog {
  const isProd = options.isProdEnv ?? import.meta.env.PROD;
  const mode = options.mode ?? 'auto';

  if (mode === 'simulated_error') {
    throw new Error(
      'Unable to load the menu catalogue at this moment. Please refresh or speak with your camp host.',
    );
  }

  if (mode === 'production_empty') {
    return INITIAL_MENU_CATALOG;
  }

  if (mode === 'sample_preview') {
    if (isProd) {
      // Production safety guard: never silently serve sample items in a production build
      return options.approvedCatalog ?? INITIAL_MENU_CATALOG;
    }
    return DEV_SAMPLE_MENU_CATALOG;
  }

  // 'auto' mode:
  if (options.approvedCatalog?.status === 'ready') {
    return options.approvedCatalog;
  }

  if (isProd) {
    return INITIAL_MENU_CATALOG;
  }

  return DEV_SAMPLE_MENU_CATALOG;
}
