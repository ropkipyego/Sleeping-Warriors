import { createElement, useRef } from 'react';
import { LayoutGrid } from 'lucide-react';
import { type MenuCategory } from '../../domain/menu.types';
import { getCategoryIcon } from './categoryIcons';
import styles from './CategoryNav.module.css';

export const HOME_CATEGORY_TAB_ID = 'home';

export interface CategoryNavProps {
  readonly categories: readonly MenuCategory[];
  readonly activeCategoryId: string | null;
  readonly onSelectCategory: (categoryId: string) => void;
  readonly onSelectHome: () => void;
  readonly itemCountsByCategory: Readonly<Record<string, number>>;
}

export function CategoryNav({
  categories,
  activeCategoryId,
  onSelectCategory,
  onSelectHome,
  itemCountsByCategory,
}: CategoryNavProps) {
  const tabListRef = useRef<HTMLDivElement | null>(null);
  const tabIds = [HOME_CATEGORY_TAB_ID, ...categories.map((cat) => cat.id)];
  const selectedTabId = activeCategoryId ?? HOME_CATEGORY_TAB_ID;

  const focusTab = (tabId: string) => {
    const buttonEl = tabListRef.current?.querySelector<HTMLButtonElement>(
      `#tab-${tabId}`,
    );
    buttonEl?.focus();
  };

  const activateTab = (tabId: string) => {
    if (tabId === HOME_CATEGORY_TAB_ID) {
      onSelectHome();
      return;
    }
    onSelectCategory(tabId);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (
      event.key !== 'ArrowRight' &&
      event.key !== 'ArrowLeft' &&
      event.key !== 'Home' &&
      event.key !== 'End'
    ) {
      return;
    }

    event.preventDefault();
    const currentIndex = Math.max(0, tabIds.indexOf(selectedTabId));
    const nextIndex =
      event.key === 'ArrowRight'
        ? (currentIndex + 1) % tabIds.length
        : event.key === 'ArrowLeft'
          ? (currentIndex - 1 + tabIds.length) % tabIds.length
          : event.key === 'Home'
            ? 0
            : tabIds.length - 1;

    const nextTabId = tabIds[nextIndex];
    if (!nextTabId) {
      return;
    }

    activateTab(nextTabId);
    focusTab(nextTabId);
  };

  return (
    <nav
      className={styles.navBar}
      aria-label="Menu categories"
      data-testid="category-navigation"
    >
      <div className={styles.inner}>
        <div
          ref={tabListRef}
          className={styles.tabList}
          role="tablist"
          aria-orientation="horizontal"
          onKeyDown={handleKeyDown}
        >
          <button
            type="button"
            role="tab"
            id={`tab-${HOME_CATEGORY_TAB_ID}`}
            tabIndex={selectedTabId === HOME_CATEGORY_TAB_ID ? 0 : -1}
            aria-selected={selectedTabId === HOME_CATEGORY_TAB_ID}
            className={[
              styles.tabButton,
              selectedTabId === HOME_CATEGORY_TAB_ID ? styles.tabActive : undefined,
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={() => {
              onSelectHome();
            }}
            data-testid="category-tab-home"
          >
            <LayoutGrid size={14} aria-hidden="true" />
            <span className={styles.tabTitle}>Home</span>
          </button>

          {categories.map((category) => {
            const isActive = selectedTabId === category.id;
            const count = itemCountsByCategory[category.id] ?? 0;
            const tabClass = [styles.tabButton, isActive ? styles.tabActive : undefined]
              .filter(Boolean)
              .join(' ');
            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                id={`tab-${category.id}`}
                tabIndex={isActive ? 0 : -1}
                aria-selected={isActive}
                className={tabClass}
                onClick={() => {
                  onSelectCategory(category.id);
                }}
                data-testid={`category-tab-${category.id}`}
              >
                {createElement(getCategoryIcon(category.id), {
                  size: 14,
                  'aria-hidden': true,
                })}
                <span className={styles.tabTitle}>{category.title}</span>
                <span className={styles.tabCount} aria-label={`${String(count)} items`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
