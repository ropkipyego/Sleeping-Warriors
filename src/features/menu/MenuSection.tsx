import { createElement, type CSSProperties } from 'react';
import { Info } from 'lucide-react';
import { type MenuCategory, type MenuItem } from '../../domain/menu.types';
import { formatCurrencyKES } from '../../domain/money';
import { EditorialImage } from '../../components/ui/EditorialImage';
import { getCategoryIcon } from './categoryIcons';
import styles from './MenuSection.module.css';

type StaggerStyle = CSSProperties & {
  readonly '--swc-stagger': string;
};

function staggerStyle(index: number): StaggerStyle {
  return {
    '--swc-stagger': String(index),
  };
}

export interface MenuSectionProps {
  readonly category: MenuCategory;
  readonly items: readonly MenuItem[];
  readonly isSamplePreview: boolean;
  readonly onOpenItemDetail: (item: MenuItem) => void;
}

export function MenuSection({
  category,
  items,
  isSamplePreview,
  onOpenItemDetail,
}: MenuSectionProps) {
  if (items.length === 0) {
    return null;
  }

  const featureItem = items.find((item) => item.layoutVariant === 'feature-lead');
  const remainingItems = featureItem
    ? items.filter((item) => item.id !== featureItem.id)
    : items;

  const editorialRows = remainingItems.filter(
    (item) => item.layoutVariant !== 'compact-pair',
  );
  const compactPairs = remainingItems.filter(
    (item) => item.layoutVariant === 'compact-pair',
  );

  const renderItemActions = (item: MenuItem) => {
    return (
      <div className={styles.actionGroup}>
        {!item.available && (
          <span
            className={styles.unavailableBadge}
            data-testid={`unavailable-badge-${item.id}`}
          >
            Currently Unavailable
          </span>
        )}
        <button
          type="button"
          className={styles.detailsBtn}
          aria-label={`Details for ${item.name}`}
          onClick={() => {
            onOpenItemDetail(item);
          }}
          data-testid={`view-details-${item.id}`}
        >
          <Info size={16} aria-hidden="true" />
        </button>
      </div>
    );
  };

  return (
    <section
      id={`section-${category.id}`}
      className={styles.section}
      aria-labelledby={`heading-${category.id}`}
      data-testid={`menu-section-${category.id}`}
    >
      <header className={styles.sectionHeader}>
        <div className={styles.headerMeta}>
          {category.serviceWindow && (
            <span className={styles.serviceWindow}>{category.serviceWindow}</span>
          )}
        </div>
        <div className={styles.headerTitleRow}>
          <h2 id={`heading-${category.id}`} className={styles.categoryTitle}>
            <span className={styles.categoryIcon} aria-hidden="true">
              {createElement(getCategoryIcon(category.id), { size: 22 })}
            </span>
            {category.title}
          </h2>
          {category.subtitle && (
            <p className={styles.categorySubtitle}>{category.subtitle}</p>
          )}
        </div>
        {category.editorialNote && (
          <p className={styles.editorialNote}>{category.editorialNote}</p>
        )}
      </header>

      {/* 1. Asymmetric Feature Lead Composition */}
      {featureItem && (
        <article
          className={styles.featureLead}
          data-testid={`menu-item-${featureItem.id}`}
        >
          <div
            className={styles.featureImageCol}
            onClick={() => {
              onOpenItemDetail(featureItem);
            }}
          >
            <EditorialImage
              src={featureItem.imageUrl}
              alt={featureItem.imageAlt ?? featureItem.name}
              aspectRatio="wide"
            />
          </div>

          <div className={styles.featureContentCol}>
            <div className={styles.itemMetaRow}>
              <span className={styles.featureEyebrow}>Featured plate</span>
              {featureItem.dietaryTags.map((tag) => (
                <span key={tag} className={styles.dietaryLabel}>
                  {tag.replace('-', ' ')}
                </span>
              ))}
            </div>

            <h3 className={styles.featureTitle}>
              <button
                type="button"
                className={styles.titleTrigger}
                onClick={() => {
                  onOpenItemDetail(featureItem);
                }}
              >
                {featureItem.name}
              </button>
            </h3>

            <p className={styles.featureDescription}>{featureItem.description}</p>

            <div className={styles.featureFooter}>
              <span className={styles.priceText} data-testid={`price-${featureItem.id}`}>
                {formatCurrencyKES(featureItem.priceKES, {
                  isSample: isSamplePreview || featureItem.isSampleData === true,
                })}
              </span>
              {renderItemActions(featureItem)}
            </div>
          </div>
        </article>
      )}

      {/* 2. Carefully Aligned Editorial Menu Rows with Thin Dividers */}
      {editorialRows.length > 0 && (
        <div className={styles.rowsContainer}>
          {editorialRows.map((item, rowIndex) => {
            const rowClass = [
              styles.editorialRow,
              !item.available ? styles.itemUnavailable : undefined,
            ]
              .filter(Boolean)
              .join(' ');
            return (
              <article
                key={item.id}
                className={rowClass}
                style={staggerStyle(rowIndex)}
                data-testid={`menu-item-${item.id}`}
              >
                <div
                  className={styles.rowThumb}
                  onClick={() => {
                    onOpenItemDetail(item);
                  }}
                >
                  <EditorialImage
                    src={item.imageUrl}
                    alt={item.imageAlt ?? item.name}
                    aspectRatio="landscape"
                  />
                </div>

                <div className={styles.rowBody}>
                  <div className={styles.rowTitleLine}>
                    <h3 className={styles.itemTitle}>
                      <button
                        type="button"
                        className={styles.titleTrigger}
                        onClick={() => {
                          onOpenItemDetail(item);
                        }}
                      >
                        {item.name}
                      </button>
                    </h3>
                    <span className={styles.priceText} data-testid={`price-${item.id}`}>
                      {formatCurrencyKES(item.priceKES, {
                        isSample: isSamplePreview || item.isSampleData === true,
                      })}
                    </span>
                  </div>

                  <p className={styles.itemDescription}>{item.description}</p>

                  <div className={styles.rowBottomLine}>
                    <div className={styles.tagsGroup}>
                      {item.dietaryTags.slice(0, 3).map((tag) => (
                        <span key={tag} className={styles.dietaryLabel}>
                          {tag.replace('-', ' ')}
                        </span>
                      ))}
                    </div>
                    {renderItemActions(item)}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* 3. Two-Column Editorial Pairings */}
      {compactPairs.length > 0 && (
        <div className={styles.pairsGrid}>
          {compactPairs.map((item, pairIndex) => {
            const pairClass = [
              styles.pairItem,
              !item.available ? styles.itemUnavailable : undefined,
            ]
              .filter(Boolean)
              .join(' ');
            return (
              <article
                key={item.id}
                className={pairClass}
                style={staggerStyle(pairIndex)}
                data-testid={`menu-item-${item.id}`}
              >
                <div
                  className={styles.pairImageWrap}
                  onClick={() => {
                    onOpenItemDetail(item);
                  }}
                >
                  <EditorialImage
                    src={item.imageUrl}
                    alt={item.imageAlt ?? item.name}
                    aspectRatio="landscape"
                  />
                </div>

                <div className={styles.pairContent}>
                  <div className={styles.rowTitleLine}>
                    <h3 className={styles.itemTitle}>
                      <button
                        type="button"
                        className={styles.titleTrigger}
                        onClick={() => {
                          onOpenItemDetail(item);
                        }}
                      >
                        {item.name}
                      </button>
                    </h3>
                    <span className={styles.priceText} data-testid={`price-${item.id}`}>
                      {formatCurrencyKES(item.priceKES, {
                        isSample: isSamplePreview || item.isSampleData === true,
                      })}
                    </span>
                  </div>

                  <p className={styles.itemDescription}>{item.description}</p>

                  <div className={styles.rowBottomLine}>
                    <div className={styles.tagsGroup}>
                      {item.dietaryTags.slice(0, 2).map((tag) => (
                        <span key={tag} className={styles.dietaryLabel}>
                          {tag.replace('-', ' ')}
                        </span>
                      ))}
                    </div>
                    {renderItemActions(item)}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
