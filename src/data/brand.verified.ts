import { type MenuCatalog } from '../domain/menu.types';

/**
 * Verified Brand & Camp Metadata
 *
 * Every field in this file is directly verified from official Sleeping Warrior Camp pages:
 * - https://sleepingwarriorcamp.com/
 * - https://sleepingwarriorcamp.com/gallery/
 * - https://sleepingwarriorcamp.com/the-experience/the-shamba-experience/
 * - https://sleepingwarriorcamp.com/suites-camp/
 *
 * Third-party stock images (Freepik numeric IDs, pool banners) and AI-generated images
 * (Gemini_Generated_Image_*) present in the WordPress Media Library are explicitly excluded.
 */

export const VERIFIED_BRAND_IDENTITY = {
  name: 'The Sleeping Warrior Camp',
  tagline: 'Where Time Slows and Nature Speaks',
  culinaryHeadline: 'From land to table, naturally',
  heroIntroduction:
    'Walk through the shamba, understand where your food comes from, and taste ingredients grown with care on the land itself. Meals at the Sleeping Warrior follow the unhurried rhythm of the valley.',
  location: {
    region: 'Lake Elementaita, Soysambu Conservancy, Rift Valley, Kenya',
    addressCode: 'Sleeping Warrior Camp Elementaita F7V2+W6, Kenya',
  },
  contact: {
    phoneDisplay: '+254 727 844 134',
    phoneHref: 'tel:+254727844134',
    email: 'info@sleepingwarriorcamp.com',
    officialWebsite: 'https://sleepingwarriorcamp.com/',
  },
  logos: {
    primaryLogoPng:
      'https://sleepingwarriorcamp.com/wp-content/uploads/2026/01/Sleeping-Warrior-Camp-03.png',
    primaryLogoWebp:
      'https://sleepingwarriorcamp.com/wp-content/uploads/al_opt_content/IMAGE/sleepingwarriorcamp.com/wp-content/uploads/2026/01/Sleeping-Warrior-Camp-03.png.bv.webp',
    faviconPng:
      'https://sleepingwarriorcamp.com/wp-content/uploads/2026/01/cropped-Sleeping-Warrior-Camp-03.png',
  },
  heroPhotography: {
    primaryLandscape: {
      id: 308,
      url: 'https://sleepingwarriorcamp.com/wp-content/uploads/2026/01/Sunrise-at-Sleeping-Warrior-Camp-scaled.webp',
      alt: 'Sunrise over the Rift Valley escarpment at The Sleeping Warrior Camp, Elementaita',
      dimensions: '2560x1440',
    },
    secondaryEveningFire: {
      id: 1309,
      url: 'https://sleepingwarriorcamp.com/wp-content/uploads/2026/01/bonfire-scaled.webp',
      alt: 'Evening bonfire under open Rift Valley skies at The Sleeping Warrior Camp',
      dimensions: '2560x1707',
    },
    aerialCampVista: {
      id: 942,
      url: 'https://sleepingwarriorcamp.com/wp-content/uploads/2026/01/DJI_0668-scaled.webp',
      alt: 'Aerial view of The Sleeping Warrior Camp nestled in the Soysambu valley',
      dimensions: '2560x1637',
    },
  },
  shambaPillars: [
    {
      id: 'shamba-harvest',
      title: 'From Soil to Table',
      summary:
        'Herbs are picked just before cooking, vegetables harvested according to the day’s needs, and meals shaped by the rhythm of the shamba.',
      sourceUrl: 'https://sleepingwarriorcamp.com/the-experience/the-shamba-experience/',
    },
    {
      id: 'estate-coffee',
      title: 'Coffee Grown Here',
      summary:
        'Grown on the land surrounding the lodge and shaped by the valley climate and volcanic soil — served simply and slowly.',
      sourceUrl: 'https://sleepingwarriorcamp.com/the-experience/the-shamba-experience/',
    },
    {
      id: 'camp-livestock',
      title: 'Raised With Care',
      summary:
        'Livestock is raised responsibly and respectfully on camp land, ensuring transparency and stewardship at every stage.',
      sourceUrl: 'https://sleepingwarriorcamp.com/the-experience/the-shamba-experience/',
    },
  ],
  accommodations: [
    {
      id: 'batian-cabin',
      name: 'Batian Cabin',
      sizeSqm: 200,
      summary:
        'Nestled on the Warrior Hills with sunrise landmark views, separate living and sleeping areas, and a private balcony.',
      sourceUrl: 'https://sleepingwarriorcamp.com/suites-camp/batian-cabin/',
      verifiedHeroImage:
        'https://sleepingwarriorcamp.com/wp-content/uploads/2026/01/Batian-Premier-Cabins-2-scaled.webp',
    },
    {
      id: 'nelion-cabin',
      name: 'Nelion Cabin',
      sizeSqm: 173,
      summary:
        'Perched on elevated ground with sweeping forest vistas, sunrise views, and a scenic soaking bathtub.',
      sourceUrl: 'https://sleepingwarriorcamp.com/suites-camp/nelion-cabin/',
      verifiedHeroImage:
        'https://sleepingwarriorcamp.com/wp-content/uploads/2026/01/Nelion-Premier-Cabins.-1-scaled.webp',
    },
    {
      id: 'moran-tent',
      name: 'Moran Tent',
      sizeSqm: 145,
      summary:
        'Arranged in an intimate circular layout with a private patio, terrace, and indoor fireplace.',
      sourceUrl: 'https://sleepingwarriorcamp.com/suites-camp/moran-tent/',
      verifiedHeroImage:
        'https://sleepingwarriorcamp.com/wp-content/uploads/2026/02/3W1A8583-scaled.webp',
    },
  ],
  verifiedShambaPhotography: [
    {
      id: 430,
      url: 'https://sleepingwarriorcamp.com/wp-content/uploads/2026/01/P1933080-scaled.webp',
      alt: 'The Shamba Experience at Sleeping Warrior Camp (P1933080)',
      dimensions: '2560x1442',
    },
    {
      id: 426,
      url: 'https://sleepingwarriorcamp.com/wp-content/uploads/2026/01/DSC03316-scaled.webp',
      alt: 'Fresh Shamba produce and land at Sleeping Warrior Camp (DSC03316)',
      dimensions: '2560x1440',
    },
    {
      id: 411,
      url: 'https://sleepingwarriorcamp.com/wp-content/uploads/2026/01/DSC03306-scaled.webp',
      alt: 'Shamba harvest and farm-to-table life at Sleeping Warrior Camp (DSC03306)',
      dimensions: '2560x2529',
    },
  ],
} as const;

/**
 * Production Catalog Baseline:
 * Explicitly empty and marked 'awaiting_official_data' until the camp's approved
 * production menu and prices are supplied. Production builds never silently load sample items.
 */
export const INITIAL_MENU_CATALOG: MenuCatalog = {
  status: 'awaiting_official_data',
  lastVerifiedIso: null,
  currency: 'KES',
  categories: [],
  items: [],
};
