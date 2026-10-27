import { MapPin, Phone, Mail, ExternalLink } from 'lucide-react';
import { VERIFIED_BRAND_IDENTITY } from '../../data/brand.verified';
import styles from './CampFooter.module.css';

export interface CampFooterProps {
  readonly isSamplePreview: boolean;
}

export function CampFooter({ isSamplePreview }: CampFooterProps) {
  return (
    <footer className={styles.footer} data-testid="camp-footer">
      <div className={styles.inner}>
        <div className={styles.topRow}>
          <div className={styles.brandCol}>
            <img
              src={VERIFIED_BRAND_IDENTITY.logos.primaryLogoPng}
              alt={VERIFIED_BRAND_IDENTITY.name}
              className={styles.logo}
              width={110}
              height={78}
            />
            <p className={styles.tagline}>{VERIFIED_BRAND_IDENTITY.tagline}</p>
            <p className={styles.region}>{VERIFIED_BRAND_IDENTITY.location.region}</p>
          </div>

          <div className={styles.suitesCol}>
            <h2 className={styles.colHeading}>Sanctuary &amp; Suites</h2>
            <ul className={styles.suiteList}>
              {VERIFIED_BRAND_IDENTITY.accommodations.map((suite) => (
                <li key={suite.id} className={styles.suiteItem}>
                  <a
                    href={suite.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.suiteLink}
                  >
                    <span>{suite.name}</span>
                    <span className={styles.suiteMeta}>{suite.sizeSqm} m²</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.contactCol}>
            <h2 className={styles.colHeading}>Speak With Our Hosts</h2>
            <p className={styles.contactItem}>
              <MapPin size={15} aria-hidden="true" />
              <span>{VERIFIED_BRAND_IDENTITY.location.addressCode}</span>
            </p>
            <a
              href={VERIFIED_BRAND_IDENTITY.contact.phoneHref}
              className={styles.contactLink}
            >
              <Phone size={15} aria-hidden="true" />
              <span>{VERIFIED_BRAND_IDENTITY.contact.phoneDisplay}</span>
            </a>
            <a
              href={`mailto:${VERIFIED_BRAND_IDENTITY.contact.email}`}
              className={styles.contactLink}
            >
              <Mail size={15} aria-hidden="true" />
              <span>{VERIFIED_BRAND_IDENTITY.contact.email}</span>
            </a>
            <a
              href={VERIFIED_BRAND_IDENTITY.contact.officialWebsite}
              target="_blank"
              rel="noreferrer"
              className={styles.contactLink}
            >
              <ExternalLink size={15} aria-hidden="true" />
              <span>sleepingwarriorcamp.com</span>
            </a>
          </div>
        </div>

        <div className={styles.bottomRow}>
          <p className={styles.disclaimer}>
            {isSamplePreview
              ? 'Menu Preview: Sample dishes, descriptions, Creative Commons food photography (/dev-sample-food/manifest.json), and provisional KES amounts are for design review only and are not the camp’s approved menu.'
              : 'Standalone Digital Guest Menu Catalogue · The Sleeping Warrior Camp, Elementaita, Kenya.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
