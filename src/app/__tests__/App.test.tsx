import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from '../App';
import {
  DEV_SAMPLE_CATEGORIES,
  DEV_SAMPLE_MENU_ITEMS,
  SAMPLE_PREVIEW_NOTICE_TEXT,
} from '../../data/sampleMenu.dev';
import { EditorialImage } from '../../components/ui/EditorialImage';

function openCategoryFromDashboard(categoryId: string) {
  fireEvent.click(screen.getByTestId(`dashboard-category-${categoryId}`));
}

describe('Sleeping Warrior Camp — Read-Only Digital Menu Catalogue', () => {
  it('renders a dashboard with categories and the land-to-table story once', () => {
    render(<App />);

    expect(screen.getByTestId('sample-preview-banner')).toHaveTextContent(
      SAMPLE_PREVIEW_NOTICE_TEXT,
    );
    expect(screen.getByTestId('guest-dashboard')).toBeInTheDocument();
    expect(screen.getByTestId('land-to-table-panel')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /From land to table, naturally/i, level: 1 }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /From Soil to Table/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /Coffee Grown Here/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /Raised With Care/i }),
    ).toBeInTheDocument();

    expect(DEV_SAMPLE_CATEGORIES).toHaveLength(6);
    for (const category of DEV_SAMPLE_CATEGORIES) {
      expect(screen.getByTestId(`dashboard-category-${category.id}`)).toBeInTheDocument();
    }

    expect(screen.queryByTestId('menu-sections-container')).not.toBeInTheDocument();
    expect(screen.queryByTestId('category-navigation')).not.toBeInTheDocument();
    expect(screen.queryAllByTestId(/^view-details-/)).toHaveLength(0);
    expect(screen.queryByRole('button', { name: /view dish/i })).not.toBeInTheDocument();
  });

  it('opens a category from the dashboard, marks every price as SAMPLE · KES, and has no ordering controls', () => {
    render(<App />);

    expect(DEV_SAMPLE_MENU_ITEMS).toHaveLength(29);
    openCategoryFromDashboard('cat-breakfast');

    expect(screen.queryByTestId('guest-dashboard')).not.toBeInTheDocument();
    expect(screen.queryByTestId('land-to-table-panel')).not.toBeInTheDocument();
    expect(screen.getByTestId('category-navigation')).toBeInTheDocument();
    expect(screen.queryByTestId('category-tab-all')).not.toBeInTheDocument();

    let seenDishCount = 0;
    for (const category of DEV_SAMPLE_CATEGORIES) {
      fireEvent.click(screen.getByTestId(`category-tab-${category.id}`));
      expect(screen.getByTestId(`menu-section-${category.id}`)).toBeInTheDocument();

      const itemsForCategory = DEV_SAMPLE_MENU_ITEMS.filter(
        (item) => item.categoryId === category.id,
      );
      expect(screen.getAllByTestId(/^view-details-/)).toHaveLength(
        itemsForCategory.length,
      );

      for (const item of itemsForCategory) {
        expect(screen.getByTestId(`price-${item.id}`).textContent).toContain(
          'SAMPLE · KES',
        );
      }
      seenDishCount += itemsForCategory.length;
    }

    expect(seenDishCount).toBe(29);
    expect(screen.queryByTestId('header-cart-trigger')).not.toBeInTheDocument();
    expect(screen.queryByTestId('floating-cart-trigger')).not.toBeInTheDocument();
    expect(screen.queryByTestId('cart-drawer')).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', {
        name: /add to (selection|cart)|select options|checkout/i,
      }),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole('spinbutton')).not.toBeInTheDocument();
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText(/suite|tent|quantity|order note/i),
    ).not.toBeInTheDocument();
  });

  it('supports keyboard and click navigation across categories and displays unavailable badges where applicable', () => {
    render(<App />);
    openCategoryFromDashboard('cat-breakfast');

    const tabList = screen.getByRole('tablist');
    fireEvent.keyDown(tabList, { key: 'ArrowRight' });
    expect(screen.getByTestId('category-tab-cat-garden-lighter')).toHaveAttribute(
      'aria-selected',
      'true',
    );
    expect(screen.getByTestId('menu-section-cat-garden-lighter')).toBeInTheDocument();
    expect(screen.queryByTestId('menu-section-cat-breakfast')).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId('category-tab-cat-sides'));
    expect(screen.getByTestId('menu-section-cat-sides')).toBeInTheDocument();
    expect(screen.queryByTestId('menu-section-cat-breakfast')).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId('category-tab-cat-garden-lighter'));
    expect(
      screen.getByTestId('unavailable-badge-sample-gd-grain-veg-bowl'),
    ).toHaveTextContent(/Currently Unavailable/i);
  });

  it('opens and closes the read-only dish detail drawer for all 29 sample items', () => {
    render(<App />);
    openCategoryFromDashboard('cat-breakfast');

    for (const category of DEV_SAMPLE_CATEGORIES) {
      fireEvent.click(screen.getByTestId(`category-tab-${category.id}`));
      const itemsForCategory = DEV_SAMPLE_MENU_ITEMS.filter(
        (item) => item.categoryId === category.id,
      );

      for (const item of itemsForCategory) {
        fireEvent.click(screen.getByTestId(`view-details-${item.id}`));

        const drawer = screen.getByTestId('item-detail-drawer');
        expect(drawer).toBeInTheDocument();
        expect(
          within(drawer).getByRole('heading', { name: item.name }),
        ).toBeInTheDocument();
        expect(within(drawer).getByTestId('detail-base-price')).toHaveTextContent(
          'SAMPLE · KES',
        );
        expect(within(drawer).queryByRole('radio')).not.toBeInTheDocument();
        expect(within(drawer).queryByRole('checkbox')).not.toBeInTheDocument();
        expect(within(drawer).queryByRole('spinbutton')).not.toBeInTheDocument();
        expect(within(drawer).queryByRole('textbox')).not.toBeInTheDocument();
        expect(
          within(drawer).queryByRole('button', { name: /add to (selection|cart)/i }),
        ).not.toBeInTheDocument();

        fireEvent.click(within(drawer).getByTestId('detail-close-action-btn'));
        expect(screen.queryByTestId('item-detail-drawer')).not.toBeInTheDocument();
      }
    }
  });

  it('returns to the dashboard from a category view', () => {
    render(<App />);
    openCategoryFromDashboard('cat-mains');
    expect(screen.getByTestId('menu-section-cat-mains')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('header-home-btn'));
    expect(screen.getByTestId('guest-dashboard')).toBeInTheDocument();
    expect(screen.getByTestId('land-to-table-panel')).toBeInTheDocument();
    expect(screen.queryByTestId('menu-sections-container')).not.toBeInTheDocument();
  });

  it('supplies a graceful fallback when a food image is missing or fails to load', () => {
    render(
      <EditorialImage
        src="/dev-sample-food/non-existent-dish.jpg"
        alt="Missing dish photo fallback test"
      />,
    );

    const imgEl = screen.getByRole('img', { name: /Missing dish photo fallback test/i });
    fireEvent.error(imgEl);

    expect(screen.getByText(/Editorial Plate Preview/i)).toBeInTheDocument();
  });

  it('renders the elegant empty-menu state in production mode when no approved catalog exists', () => {
    render(<App isProdEnvOverride={true} />);
    expect(screen.getByTestId('empty-production-catalog-state')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: /Awaiting Official Camp Menu, Pricing & Allergen Confirmation/i,
      }),
    ).toBeInTheDocument();
    expect(screen.queryByTestId('guest-dashboard')).not.toBeInTheDocument();
  });

  it('renders an accessible error state when catalog resolution fails', () => {
    render(<App initialCatalogMode="simulated_error" />);
    expect(screen.getByTestId('catalog-error-state')).toBeInTheDocument();
  });
});
