import { type MenuItem } from '../../domain/menu.types';
import { formatCurrencyKES } from '../../domain/money';
import { Drawer } from '../../components/ui/Drawer';
import { EditorialImage } from '../../components/ui/EditorialImage';
import styles from './ItemDetailDrawer.module.css';

export interface ItemDetailDrawerProps {
  readonly item: MenuItem | null;
  readonly categoryTitle?: string;
  readonly isSamplePreview: boolean;
  readonly onClose: () => void;
}

export function ItemDetailDrawer({
  item,
  categoryTitle,
  isSamplePreview,
  onClose,
}: ItemDetailDrawerProps) {
  if (!item) {
    return null;
  }

  const isSample = isSamplePreview || item.isSampleData === true;
  const subtitleParts = [
    categoryTitle,
    isSample ? 'Sample Dish · Design Review' : 'Dish Detail',
  ].filter(Boolean);

  const footerNode = (
    <div className={styles.footerBar}>
      <span className={styles.footerNote}>
        {isSample
          ? 'Sample dish and provisional KES price for catalogue review.'
          : 'Speak with your camp host for today’s availability.'}
      </span>
      <button
        type="button"
        className={styles.closeActionBtn}
        onClick={onClose}
        data-testid="detail-close-action-btn"
      >
        Back to Menu
      </button>
    </div>
  );

  return (
    <Drawer
      isOpen={true}
      onClose={onClose}
      title={item.name}
      subtitle={subtitleParts.join(' · ')}
      footer={footerNode}
      testId="item-detail-drawer"
    >
      <div className={styles.content}>
        <div className={styles.imageSection}>
          <EditorialImage
            src={item.imageUrl}
            alt={item.imageAlt ?? item.name}
            aspectRatio="wide"
          />
          {item.imageCredit && <p className={styles.imageCredit}>{item.imageCredit}</p>}
        </div>

        <div className={styles.summaryBlock}>
          <div className={styles.priceBadgeRow}>
            <span className={styles.basePrice} data-testid="detail-base-price">
              {formatCurrencyKES(item.priceKES, { isSample })}
            </span>
            {!item.available && (
              <span className={styles.unavailablePill}>Currently Unavailable</span>
            )}
          </div>

          <p className={styles.description}>{item.description}</p>

          {item.dietaryTags.length > 0 && (
            <div className={styles.dietarySection}>
              <span className={styles.sectionLabel}>
                {isSample ? 'Sample Dietary Labels' : 'Dietary Information'}
              </span>
              <div className={styles.dietaryRow} aria-label="Dietary classifications">
                {item.dietaryTags.map((tag) => (
                  <span key={tag} className={styles.dietaryChip}>
                    {tag.replace('-', ' ')}
                  </span>
                ))}
              </div>
            </div>
          )}

          {item.allergenNotes && (
            <p className={styles.allergenNote}>{item.allergenNotes}</p>
          )}
        </div>
      </div>
    </Drawer>
  );
}
