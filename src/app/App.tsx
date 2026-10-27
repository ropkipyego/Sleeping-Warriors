import { useMemo, useRef, useState } from 'react';
import { AlertTriangle, RefreshCw, UtensilsCrossed } from 'lucide-react';
import { type CatalogResolutionMode, resolveMenuCatalog } from '../data/catalog.boundary';
import { type MenuCatalog, type MenuItem } from '../domain/menu.types';
import { PreviewNoticeBanner } from '../components/layout/PreviewNoticeBanner';
import { CampHeader } from '../components/layout/CampHeader';
import { CampFooter } from '../components/layout/CampFooter';
import { CategoryNav } from '../features/menu/CategoryNav';
import { GuestDashboard } from '../features/menu/GuestDashboard';
import { MenuSection } from '../features/menu/MenuSection';
import { ItemDetailDrawer } from '../features/menu/ItemDetailDrawer';
import styles from './App.module.css';

export interface AppProps {
  readonly initialCatalogMode?: CatalogResolutionMode;
  readonly isProdEnvOverride?: boolean;
}

function scrollIntoViewSafe(element: HTMLElement | null) {
  if (element && typeof element.scrollIntoView === 'function') {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export function App({ initialCatalogMode = 'auto', isProdEnvOverride }: AppProps = {}) {
  const [catalogMode, setCatalogMode] =
    useState<CatalogResolutionMode>(initialCatalogMode);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [activeDetailItem, setActiveDetailItem] = useState<MenuItem | null>(null);

  const menuStartRef = useRef<HTMLDivElement | null>(null);
  const isDashboardView = activeCategoryId === null;

  const catalogOutcome = useMemo((): {
    readonly catalog: MenuCatalog | null;
    readonly errorMessage: string | null;
  } => {
    try {
      const resolved = resolveMenuCatalog({
        mode: catalogMode,
        ...(isProdEnvOverride !== undefined ? { isProdEnv: isProdEnvOverride } : {}),
      });
      return { catalog: resolved, errorMessage: null };
    } catch (err) {
      return {
        catalog: null,
        errorMessage:
          err instanceof Error
            ? err.message
            : 'Unable to load the menu catalogue right now.',
      };
    }
  }, [catalogMode, isProdEnvOverride]);

  const catalog = catalogOutcome.catalog;
  const isSamplePreview =
    catalog?.isSamplePreview === true || catalog?.status === 'sample_preview';
  const hasMenuItems = Boolean(catalog && catalog.items.length > 0);

  const itemCountsByCategory = useMemo(() => {
    const counts: Record<string, number> = {};
    if (!catalog) {
      return counts;
    }
    for (const item of catalog.items) {
      counts[item.categoryId] = (counts[item.categoryId] ?? 0) + 1;
    }
    return counts;
  }, [catalog]);

  const visibleCategories = useMemo(() => {
    if (!catalog || !activeCategoryId) {
      return [];
    }
    return catalog.categories.filter((cat) => cat.id === activeCategoryId);
  }, [catalog, activeCategoryId]);

  const activeDetailCategoryTitle = useMemo(() => {
    if (!activeDetailItem || !catalog) {
      return undefined;
    }
    return catalog.categories.find((cat) => cat.id === activeDetailItem.categoryId)
      ?.title;
  }, [activeDetailItem, catalog]);

  const handleGoHome = () => {
    setActiveCategoryId(null);
    setActiveDetailItem(null);
    if (typeof window !== 'undefined' && typeof window.scrollTo === 'function') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleExploreMenu = () => {
    if (isDashboardView) {
      scrollIntoViewSafe(document.getElementById('menu-dashboard-categories'));
      return;
    }
    scrollIntoViewSafe(menuStartRef.current);
  };

  const handleSelectCategory = (categoryId: string) => {
    setActiveCategoryId(categoryId);
    setActiveDetailItem(null);
    scrollIntoViewSafe(menuStartRef.current);
  };

  return (
    <div id="top" className={styles.page}>
      <div className={styles.stickyChrome}>
        {isSamplePreview && (
          <PreviewNoticeBanner
            {...(catalog.previewNoticeText
              ? { noticeText: catalog.previewNoticeText }
              : {})}
          />
        )}

        <CampHeader
          isMenuView={!isDashboardView}
          onGoHome={handleGoHome}
          onExploreMenu={handleExploreMenu}
        />

        {hasMenuItems && catalog && (
          <CategoryNav
            categories={catalog.categories}
            activeCategoryId={activeCategoryId}
            onSelectCategory={handleSelectCategory}
            onSelectHome={handleGoHome}
            itemCountsByCategory={itemCountsByCategory}
          />
        )}
      </div>

      <main ref={menuStartRef} className={styles.main} id="dining-menu">
        {catalogOutcome.errorMessage && (
          <section
            className={styles.statePanel}
            role="alert"
            data-testid="catalog-error-state"
          >
            <div className={styles.stateIcon} aria-hidden="true">
              <AlertTriangle size={24} />
            </div>
            <div className={styles.stateBody}>
              <h2 className={styles.stateTitle}>Menu Catalogue Unavailable</h2>
              <p className={styles.stateDescription}>{catalogOutcome.errorMessage}</p>
              <button
                type="button"
                className={styles.retryBtn}
                onClick={() => {
                  setCatalogMode('auto');
                }}
              >
                <RefreshCw size={14} aria-hidden="true" />
                <span>Reload Menu</span>
              </button>
            </div>
          </section>
        )}

        {catalog?.items.length === 0 && (
          <section
            className={styles.statePanel}
            aria-labelledby="catalog-status-heading"
            data-testid="empty-production-catalog-state"
          >
            <div className={styles.stateIcon} aria-hidden="true">
              <UtensilsCrossed size={24} />
            </div>
            <div className={styles.stateBody}>
              <span className={styles.stateEyebrow}>
                Catalog Status: {catalog.status.replaceAll('_', ' ')}
              </span>
              <h2 id="catalog-status-heading" className={styles.stateTitle}>
                Awaiting Official Camp Menu, Pricing &amp; Allergen Confirmation
              </h2>
              <p className={styles.stateDescription}>
                The official camp catalogue has not been supplied yet. Please speak with
                your camp host at the Valley Dining Deck or call +254 727 844 134 for
                today’s shamba harvest selections.
              </p>
            </div>
          </section>
        )}

        {hasMenuItems && isDashboardView && catalog && (
          <GuestDashboard
            categories={catalog.categories}
            items={catalog.items}
            itemCountsByCategory={itemCountsByCategory}
            onSelectCategory={handleSelectCategory}
          />
        )}

        {hasMenuItems && !isDashboardView && catalog && (
          <div
            key={activeCategoryId}
            className={styles.menuCanvas}
            data-testid="menu-sections-container"
          >
            {visibleCategories.map((category) => {
              const itemsForCategory = catalog.items.filter(
                (item) => item.categoryId === category.id,
              );
              return (
                <MenuSection
                  key={category.id}
                  category={category}
                  items={itemsForCategory}
                  isSamplePreview={isSamplePreview}
                  onOpenItemDetail={(item) => {
                    setActiveDetailItem(item);
                  }}
                />
              );
            })}
          </div>
        )}
      </main>

      <ItemDetailDrawer
        item={activeDetailItem}
        {...(activeDetailCategoryTitle !== undefined
          ? { categoryTitle: activeDetailCategoryTitle }
          : {})}
        isSamplePreview={isSamplePreview}
        onClose={() => {
          setActiveDetailItem(null);
        }}
      />

      {isDashboardView && <CampFooter isSamplePreview={isSamplePreview} />}
    </div>
  );
}

export default App;
