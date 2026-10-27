import { INITIAL_MENU_CATALOG } from './brand.verified';
import { DEV_SAMPLE_MENU_CATALOG } from './sampleMenu.dev';
import { type MenuCatalog } from '../domain/menu.types';

/**
 * Clean catalog / API boundary for resolving the active guest menu.
 *
 * Guest-preview delivery: dummy sample dishes are served until the camp supplies an
 * approved production catalog (`status: 'ready'`). The SAMPLE banner and
 * `SAMPLE · KES` prefixes remain required so this is never silent official data.
 *
 * `production_empty` still returns `INITIAL_MENU_CATALOG` for the empty-menu path.
 */

export type CatalogResolutionMode =
  'auto' | 'sample_preview' | 'production_empty' | 'simulated_error';

export interface ResolveCatalogOptions {
  readonly mode?: CatalogResolutionMode;
  readonly isProdEnv?: boolean;
  readonly approvedCatalog?: MenuCatalog | null;
}

export function resolveMenuCatalog(options: ResolveCatalogOptions = {}): MenuCatalog {
  const mode = options.mode ?? 'auto';

  if (mode === 'simulated_error') {
    throw new Error(
      'Unable to load the menu catalogue at this moment. Please refresh or speak with your camp host.',
    );
  }

  if (mode === 'production_empty') {
    return INITIAL_MENU_CATALOG;
  }

  if (options.approvedCatalog?.status === 'ready') {
    return options.approvedCatalog;
  }

  return DEV_SAMPLE_MENU_CATALOG;
}
