import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import styles from './Drawer.module.css';

export interface DrawerProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly title: string;
  readonly subtitle?: string;
  readonly children: React.ReactNode;
  readonly footer?: React.ReactNode;
  readonly testId?: string;
}

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Drawer({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  testId = 'editorial-drawer',
}: DrawerProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousFocused =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    // Focus the close button on mount for immediate keyboard accessibility
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === 'Tab' && panelRef.current) {
        const focusables = Array.from(
          panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
        );
        if (focusables.length === 0) {
          return;
        }
        const firstElement = focusables[0];
        const lastElement = focusables[focusables.length - 1];
        if (!firstElement || !lastElement) {
          return;
        }

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocused?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.overlay} data-testid={`${testId}-overlay`}>
      <div
        className={styles.backdrop}
        onClick={onClose}
        aria-hidden="true"
        data-testid={`${testId}-backdrop`}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={styles.panel}
        data-testid={testId}
      >
        <header className={styles.header}>
          <div className={styles.headerTitles}>
            {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
            <h2 className={styles.title}>{title}</h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label={`Close ${title}`}
          >
            <X size={20} aria-hidden="true" />
          </button>
        </header>

        <div className={styles.body}>{children}</div>

        {footer && <footer className={styles.footer}>{footer}</footer>}
      </div>
    </div>
  );
}
