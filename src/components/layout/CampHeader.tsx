import { House, Utensils } from 'lucide-react';
import { VERIFIED_BRAND_IDENTITY } from '../../data/brand.verified';
import styles from './CampHeader.module.css';

export interface CampHeaderProps {
  readonly isMenuView: boolean;
  readonly onGoHome: () => void;
  readonly onExploreMenu: () => void;
}

export function CampHeader({ isMenuView, onGoHome, onExploreMenu }: CampHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a
          href="#top"
          className={styles.brandLink}
          aria-label={`${VERIFIED_BRAND_IDENTITY.name} — Return to menu home`}
          onClick={(event) => {
            event.preventDefault();
            onGoHome();
          }}
        >
          <img
            src={VERIFIED_BRAND_IDENTITY.logos.primaryLogoPng}
            alt={VERIFIED_BRAND_IDENTITY.name}
            className={styles.logo}
            width={116}
            height={82}
          />
          <div className={styles.brandText}>
            <span className={styles.eyebrow}>Elementaita · Rift Valley</span>
            <span className={styles.brandName}>{VERIFIED_BRAND_IDENTITY.name}</span>
          </div>
        </a>

        <div className={styles.actions}>
          {isMenuView && (
            <button
              type="button"
              className={styles.iconBtn}
              onClick={onGoHome}
              aria-label="Return to menu home"
              data-testid="header-home-btn"
            >
              <House size={16} aria-hidden="true" />
              <span>Home</span>
            </button>
          )}
          <button
            type="button"
            className={styles.menuAnchorBtn}
            onClick={onExploreMenu}
            data-testid="header-explore-menu-btn"
          >
            <Utensils size={15} aria-hidden="true" />
            <span>Dining Menu</span>
          </button>
        </div>
      </div>
    </header>
  );
}
