import { useState } from 'react';
import { Utensils } from 'lucide-react';
import styles from './EditorialImage.module.css';

export interface EditorialImageProps {
  readonly src: string | undefined;
  readonly alt: string;
  readonly aspectRatio?: 'landscape' | 'portrait' | 'square' | 'wide';
  readonly priority?: boolean;
  readonly className?: string;
  readonly motion?: 'still' | 'hover-zoom' | 'cinematic';
}

export function EditorialImage({
  src,
  alt,
  aspectRatio = 'landscape',
  priority = false,
  className,
  motion = 'hover-zoom',
}: EditorialImageProps) {
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  const hasError = !src || failedSrc === src;
  const isLoaded = Boolean(src && loadedSrc === src);

  const aspectClass =
    aspectRatio === 'portrait'
      ? styles.aspectPortrait
      : aspectRatio === 'square'
        ? styles.aspectSquare
        : aspectRatio === 'wide'
          ? styles.aspectWide
          : styles.aspectLandscape;

  const frameClassName = [
    styles.frame,
    aspectClass,
    motion === 'hover-zoom' ? styles.zoomable : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');
  const imgClassName = [
    styles.image,
    isLoaded ? styles.imageLoaded : undefined,
    motion === 'cinematic' ? styles.imageCinematic : undefined,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={frameClassName} data-testid="editorial-image-frame">
      {hasError ? (
        <div
          className={styles.fallback}
          role="img"
          aria-label={alt || 'Illustrative dish placeholder'}
        >
          <Utensils size={20} aria-hidden="true" className={styles.fallbackIcon} />
          <span className={styles.fallbackLabel}>Editorial Plate Preview</span>
        </div>
      ) : (
        <>
          {!isLoaded && <div className={styles.shimmer} aria-hidden="true" />}
          <img
            src={src}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            className={imgClassName}
            onLoad={() => {
              setLoadedSrc(src);
            }}
            onError={() => {
              setFailedSrc(src);
            }}
          />
        </>
      )}
    </div>
  );
}
