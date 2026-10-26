import { createElement, useRef } from 'react';
import { type MenuCategory } from '../../domain/menu.types';
import { getCategoryIcon } from './categoryIcons';
import styles from './CategoryNav.module.css';

export interface CategoryNavProps {
  readonly categories: readonly MenuCategory[];
  readonly activeCategoryId: string;
  readonly onSelectCategory: (categoryId: string) => void;
  readonly itemCountsByCategory: Readonly<Record<string, number>>;
}

export function CategoryNav({
  categories,
  activeCategoryId,
  onSelectCategory,
  itemCountsByCategory,
}: CategoryNavProps) {
  const tabListRef = useRef<HTMLDivElement | null>(null);
  const tabIds = categories.map((cat) => cat.id);

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
    const currentIndex = Math.max(0, tabIds.indexOf(activeCategoryId));
    const nextIndex =
      event.key === 'ArrowRight'
        ? (currentIndex + 1) % tabIds.length
        : event.key === 'ArrowLeft'
          ? (currentIndex - 1 + tabIds.length) % tabIds.length
          : event.key === 'Home'
            ? 0
            : tabIds.length - 1;

    const nextCategoryId = tabIds[nextIndex];
    if (!nextCategoryId) {
      return;
    }

    onSelectCategory(nextCategoryId);
    const buttonEl = tabListRef.current?.querySelector<HTMLButtonElement>(
      `#tab-${nextCategoryId}`,
    );
    buttonEl?.focus();
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
          {categories.map((category) => {
            const isActive = activeCategoryId === category.id;
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
