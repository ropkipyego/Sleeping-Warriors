import { AlertCircle } from 'lucide-react';
import { SAMPLE_PREVIEW_NOTICE_TEXT } from '../../data/sampleMenu.dev';
import styles from './PreviewNoticeBanner.module.css';

export interface PreviewNoticeBannerProps {
  readonly noticeText?: string;
}

export function PreviewNoticeBanner({
  noticeText = SAMPLE_PREVIEW_NOTICE_TEXT,
}: PreviewNoticeBannerProps) {
  return (
    <div
      className={styles.banner}
      role="region"
      aria-label="Design review sample menu notice"
      data-testid="sample-preview-banner"
    >
      <div className={styles.inner}>
        <AlertCircle size={14} className={styles.icon} aria-hidden="true" />
        <p className={styles.text}>{noticeText}</p>
      </div>
    </div>
  );
}
