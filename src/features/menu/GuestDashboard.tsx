import { createElement } from 'react';
import { ArrowRight, Quote } from 'lucide-react';
import { VERIFIED_BRAND_IDENTITY } from '../../data/brand.verified';
import { type MenuCategory, type MenuItem } from '../../domain/menu.types';
import { EditorialImage } from '../../components/ui/EditorialImage';
import { getCategoryIcon, getShambaIcon } from './categoryIcons';
import styles from './GuestDashboard.module.css';

export interface GuestDashboardProps {
  readonly categories: readonly MenuCategory[];
  readonly items: readonly MenuItem[];
  readonly itemCountsByCategory: Readonly<Record<string, number>>;
  readonly onSelectCategory: (categoryId: string) => void;
}

export function GuestDashboard({
  categories,
  items,
  itemCountsByCategory,
  onSelectCategory,
}: GuestDashboardProps) {
  const shambaPhoto = VERIFIED_BRAND_IDENTITY.verifiedShambaPhotography[0];

  return (
    <div className={styles.dashboard} data-testid="guest-dashboard">
      <section className={styles.welcome} aria-labelledby="hero-heading">
        <div className={styles.welcomeCopy}>
          <span className={styles.kicker}>
            Soysambu Conservancy · Lake Elementaita · Kenya
          </span>
          <h1 id="hero-heading" className={styles.headline}>
            {VERIFIED_BRAND_IDENTITY.culinaryHeadline}
          </h1>
          <p className={styles.lead}>{VERIFIED_BRAND_IDENTITY.heroIntroduction}</p>
        </div>
        <div className={styles.welcomeVisual}>
          <EditorialImage
            src={VERIFIED_BRAND_IDENTITY.heroPhotography.primaryLandscape.url}
            alt={VERIFIED_BRAND_IDENTITY.heroPhotography.primaryLandscape.alt}
            aspectRatio="wide"
            priority={true}
            motion="cinematic"
          />
        </div>
      </section>

      <section
        className={styles.categories}
        aria-labelledby="dashboard-categories-heading"
        id="menu-dashboard-categories"
      >
        <header className={styles.sectionIntro}>
          <span className={styles.sectionEyebrow}>Dining Menu</span>
          <h2 id="dashboard-categories-heading" className={styles.sectionTitle}>
            Choose a course
          </h2>
        </header>

        <div className={styles.categoryGrid}>
          {categories.map((category) => {
            const coverItem = items.find((item) => item.categoryId === category.id);
            const count = itemCountsByCategory[category.id] ?? 0;
            return (
              <button
                key={category.id}
                type="button"
                className={styles.categoryCard}
                onClick={() => {
                  onSelectCategory(category.id);
                }}
                data-testid={`dashboard-category-${category.id}`}
              >
                <div className={styles.categoryImage}>
                  <EditorialImage
                    src={coverItem?.imageUrl}
                    alt={coverItem?.imageAlt ?? category.title}
                    aspectRatio="landscape"
                    motion="hover-zoom"
                  />
                </div>
                <div className={styles.categoryBody}>
                  <span className={styles.categoryIcon} aria-hidden="true">
                    {createElement(getCategoryIcon(category.id), { size: 16 })}
                  </span>
                  <span className={styles.categoryTitle}>{category.title}</span>
                  <span className={styles.categoryCount}>
                    {count} {count === 1 ? 'dish' : 'dishes'}
                  </span>
                  <ArrowRight
                    size={16}
                    className={styles.categoryArrow}
                    aria-hidden="true"
                  />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section
        className={styles.landToTable}
        aria-labelledby="land-to-table-heading"
        data-testid="land-to-table-panel"
      >
        <div className={styles.landCopy}>
          <span className={styles.sectionEyebrow}>The Shamba</span>
          <h2 id="land-to-table-heading" className={styles.sectionTitle}>
            From land to table
          </h2>
          <p className={styles.landLead}>
            The kitchen follows the unhurried rhythm of camp land. This story lives here,
            once, so the menu itself can stay quiet and readable.
          </p>

          <div className={styles.pillarList}>
            {VERIFIED_BRAND_IDENTITY.shambaPillars.map((pillar) => {
              return (
                <article key={pillar.id} className={styles.pillar}>
                  <span className={styles.pillarIcon} aria-hidden="true">
                    {createElement(getShambaIcon(pillar.id), { size: 18 })}
                  </span>
                  <div>
                    <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                    <p className={styles.pillarBody}>{pillar.summary}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className={styles.landVisual}>
          <EditorialImage
            src={shambaPhoto.url}
            alt={shambaPhoto.alt}
            aspectRatio="landscape"
            motion="hover-zoom"
          />
          <blockquote className={styles.quote}>
            <Quote size={16} aria-hidden="true" />
            <p>
              Working with nature rather than against it allows us to offer food that is
              fresh, honest and deeply connected to place.
            </p>
          </blockquote>
        </div>
      </section>
    </div>
  );
}
