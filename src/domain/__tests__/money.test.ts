import { describe, expect, it } from 'vitest';
import {
  formatCurrencyKES,
  fromMinorUnitsKES,
  multiplyMinorUnits,
  sumMinorUnits,
  toMinorUnitsKES,
} from '../money';
import { resolveMenuCatalog } from '../../data/catalog.boundary';
import {
  DEV_SAMPLE_CATEGORIES,
  DEV_SAMPLE_MENU_ITEMS,
  SAMPLE_PREVIEW_NOTICE_TEXT,
} from '../../data/sampleMenu.dev';

describe('money & catalog boundary domain logic', () => {
  it('performs exact integer minor-unit arithmetic and KES formatting', () => {
    expect(toMinorUnitsKES(1350)).toBe(135000);
    expect(fromMinorUnitsKES(135000)).toBe(1350);
    expect(multiplyMinorUnits(135000, 3)).toBe(405000);
    expect(sumMinorUnits([135000, 95000])).toBe(230000);
    expect(formatCurrencyKES(1850)).toBe('KES 1,850');
    expect(formatCurrencyKES(1850, { isSample: true })).toBe('SAMPLE · KES 1,850');
  });

  it('resolves the 6 sample categories and 29 sample dishes in development preview mode', () => {
    const devCatalog = resolveMenuCatalog({ isProdEnv: false });
    expect(devCatalog.status).toBe('sample_preview');
    expect(devCatalog.isSamplePreview).toBe(true);
    expect(devCatalog.previewNoticeText).toBe(SAMPLE_PREVIEW_NOTICE_TEXT);
    expect(devCatalog.categories).toHaveLength(6);
    expect(devCatalog.items).toHaveLength(29);
    expect(DEV_SAMPLE_CATEGORIES).toHaveLength(6);
    expect(DEV_SAMPLE_MENU_ITEMS).toHaveLength(29);
  });

  it('serves the dummy sample menu in production until an approved catalog is supplied', () => {
    const prodAuto = resolveMenuCatalog({ isProdEnv: true, mode: 'auto' });
    expect(prodAuto.status).toBe('sample_preview');
    expect(prodAuto.isSamplePreview).toBe(true);
    expect(prodAuto.items).toHaveLength(29);
    expect(prodAuto.categories).toHaveLength(6);

    const prodEmpty = resolveMenuCatalog({
      isProdEnv: true,
      mode: 'production_empty',
    });
    expect(prodEmpty.status).toBe('awaiting_official_data');
    expect(prodEmpty.items).toHaveLength(0);
  });
});
