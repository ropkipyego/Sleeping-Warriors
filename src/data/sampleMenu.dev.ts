import { type MenuCatalog, type MenuCategory, type MenuItem } from '../domain/menu.types';

/**
 * DEVELOPMENT-ONLY SAMPLE DISH CATALOGUE
 *
 * IMPORTANT:
 * - These categories, dishes, descriptions, and KES prices are illustrative
 *   sample items created strictly for menu catalogue design review.
 * - They are NOT the approved menu of The Sleeping Warrior Camp and do not claim
 *   that specific ingredients are grown on the camp's land.
 * - All food photographs are Creative Commons / CC0 licensed third-party images stored
 *   locally in `/public/dev-sample-food/` with full attribution in `/public/dev-sample-food/manifest.json`.
 * - Production builds (`import.meta.env.PROD`) do NOT silently load this module.
 */

export const SAMPLE_PREVIEW_NOTICE_TEXT = 'MENU PREVIEW — SAMPLE DISHES AND PRICES';

export const DEV_SAMPLE_CATEGORIES: readonly MenuCategory[] = [
  {
    id: 'cat-breakfast',
    slug: 'breakfast',
    title: 'Breakfast',
    subtitle: 'Unhurried mornings on the escarpment',
    serviceWindow: '06:30 – 10:30 · Sample Window',
    editorialNote:
      'Sample morning plates inspired by highland lodge breakfasts — warm grains, seasonal fruit, and farm-style eggs.',
    sortOrder: 1,
  },
  {
    id: 'cat-garden-lighter',
    slug: 'garden-and-lighter-meals',
    title: 'Garden & Lighter Meals',
    subtitle: 'Crisp leaves, warm bowls & midday soups',
    serviceWindow: '12:00 – 16:30 · Sample Window',
    editorialNote:
      'Sample midday selections emphasizing fresh greens, oven-roasted vegetables, and light restorative bowls.',
    sortOrder: 2,
  },
  {
    id: 'cat-mains',
    slug: 'main-courses',
    title: 'Main Courses',
    subtitle: 'Unhurried plates for lunch & evening dining',
    serviceWindow: '12:30 – 21:30 · Sample Window',
    editorialNote:
      'Sample main courses featuring grilled poultry, catch of the day, slow-braised stews, and seasonal vegetarian plates.',
    sortOrder: 3,
  },
  {
    id: 'cat-sides',
    slug: 'sides',
    title: 'Sides & Staples',
    subtitle: 'For the table & accompaniment',
    serviceWindow: '12:00 – 21:30 · Sample Window',
    editorialNote:
      'Sample side dishes and East African table staples designed to accompany main courses or share.',
    sortOrder: 4,
  },
  {
    id: 'cat-desserts',
    slug: 'desserts',
    title: 'Desserts',
    subtitle: 'Simple sweet finishes & orchard fruit',
    serviceWindow: '12:30 – 21:30 · Sample Window',
    editorialNote:
      'Sample desserts ranging from chilled seasonal fruit platters to warm baked tarts and dark chocolate.',
    sortOrder: 5,
  },
  {
    id: 'cat-beverages',
    slug: 'hot-and-cold-beverages',
    title: 'Hot & Cold Beverages',
    subtitle: 'Brewed coffee, loose-leaf infusions & chilled refreshers',
    serviceWindow: 'All Day · Sample Window',
    editorialNote:
      'Sample non-alcoholic beverage selections including freshly brewed coffee, highland teas, pressed juices, and mineral water.',
    sortOrder: 6,
  },
];

export const DEV_SAMPLE_MENU_ITEMS: readonly MenuItem[] = [
  // ============================================================================
  // 1. BREAKFAST (5 Sample Items)
  // ============================================================================
  {
    id: 'sample-bf-farm-eggs',
    categoryId: 'cat-breakfast',
    name: 'Farm-Style Eggs with Artisan Toast',
    description:
      'Sample dish: Two pasture-style eggs prepared to your preference, served over toasted country sourdough with roasted vine tomatoes, sliced avocado, and herb butter.',
    priceKES: 1350,
    currency: 'KES',
    available: true,
    provenanceTags: [],
    dietaryTags: ['vegetarian', 'nut-free'],
    allergenNotes: 'Sample allergen note: Contains eggs, gluten (wheat), and dairy.',
    imageUrl: '/dev-sample-food/breakfast-farm-eggs-toast.jpg',
    imageAlt:
      'Sample dish photo: Poached eggs on toasted bread with tomatoes and sliced avocado (CC BY-SA 4.0, Kgbo)',
    imageCredit: 'Photo: Kgbo · Wikimedia Commons (CC BY-SA 4.0) · Illustrative Sample',
    isSampleData: true,
    layoutVariant: 'feature-lead',
  },
  {
    id: 'sample-bf-fruit-bowl',
    categoryId: 'cat-breakfast',
    name: 'Fresh Seasonal Fruit Bowl',
    description:
      'Sample dish: Chilled selection of ripe mango, papaya, pineapple, sweet melon, and passionfruit, finished with fresh mint and a squeeze of lime.',
    priceKES: 950,
    currency: 'KES',
    available: true,
    provenanceTags: [],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'nut-free'],
    imageUrl: '/dev-sample-food/breakfast-seasonal-fruit-bowl.jpg',
    imageAlt:
      'Sample dish photo: Bowl of fresh cut seasonal fruit on a linen runner (CC BY 2.0, Dinner Series)',
    imageCredit:
      'Photo: Dinner Series · Wikimedia Commons (CC BY 2.0) · Illustrative Sample',
    isSampleData: true,
    layoutVariant: 'editorial-row',
  },
  {
    id: 'sample-bf-pancakes',
    categoryId: 'cat-breakfast',
    name: 'Griddle Pancakes with Seasonal Fruit',
    description:
      'Sample dish: Warm stack of light buttermilk griddle cakes topped with macerated berries, sliced banana, and warm blossom honey.',
    priceKES: 1250,
    currency: 'KES',
    available: true,
    provenanceTags: [],
    dietaryTags: ['vegetarian', 'nut-free'],
    allergenNotes: 'Sample allergen note: Contains wheat, eggs, and dairy.',
    imageUrl: '/dev-sample-food/breakfast-pancakes-berries.jpg',
    imageAlt:
      'Sample dish photo: Griddle pancakes topped with fresh berries (CC BY-SA 4.0, Auctor quaerendae)',
    imageCredit:
      'Photo: Auctor quaerendae · Wikimedia Commons (CC BY-SA 4.0) · Illustrative Sample',
    isSampleData: true,
    layoutVariant: 'editorial-row',
  },
  {
    id: 'sample-bf-porridge',
    categoryId: 'cat-breakfast',
    name: 'Warm Rolled-Oat Porridge with Fruit',
    description:
      'Sample dish: Slow-simmered rolled oats with cinnamon and vanilla pod, topped with caramelized banana, seasonal berries, and toasted pumpkin seeds.',
    priceKES: 900,
    currency: 'KES',
    available: true,
    provenanceTags: [],
    dietaryTags: ['vegetarian', 'nut-free'],
    allergenNotes: 'Sample allergen note: Oats prepared with choice of milk or water.',
    imageUrl: '/dev-sample-food/breakfast-porridge-fruit.jpg',
    imageAlt:
      'Sample dish photo: Warm oatmeal porridge bowl topped with sliced banana (CC BY 2.0, Ella Olsson)',
    imageCredit:
      'Photo: Ella Olsson · Wikimedia Commons (CC BY 2.0) · Illustrative Sample',
    isSampleData: true,
    layoutVariant: 'compact-pair',
  },
  {
    id: 'sample-bf-cooked-plate',
    categoryId: 'cat-breakfast',
    name: 'Full Cooked Breakfast Plate',
    description:
      'Sample dish: Two eggs to order, grilled breakfast sausage, seared mushrooms, slow-roasted plum tomatoes, sautéed potatoes, and toasted sourdough.',
    priceKES: 1850,
    currency: 'KES',
    available: true,
    provenanceTags: [],
    dietaryTags: ['nut-free'],
    allergenNotes: 'Sample allergen note: Contains eggs, gluten, and dairy.',
    imageUrl: '/dev-sample-food/breakfast-cooked-plate.jpg',
    imageAlt:
      'Sample dish photo: Cooked breakfast plate with eggs, sausage, mushrooms, tomatoes, and toast (CC0, Andy Li)',
    imageCredit: 'Photo: Andy Li · Wikimedia Commons (CC0) · Illustrative Sample',
    isSampleData: true,
    layoutVariant: 'compact-pair',
  },

  // ============================================================================
  // 2. GARDEN & LIGHTER MEALS (5 Sample Items)
  // ============================================================================
  {
    id: 'sample-gd-seasonal-salad',
    categoryId: 'cat-garden-lighter',
    name: 'Seasonal Garden Salad',
    description:
      'Sample dish: Crisp rocket, young leaf lettuces, shaved cabbage, vine-ripened tomato wedges, cucumber ribbons, and a cold-pressed lemon-herb vinaigrette.',
    priceKES: 1150,
    currency: 'KES',
    available: true,
    provenanceTags: [],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'nut-free'],
    imageUrl: '/dev-sample-food/garden-seasonal-salad.jpg',
    imageAlt:
      'Sample dish photo: Fresh green salad with arugula, cabbage, and tomato in a bowl (CC BY-SA 3.0, Horacio Cambeiro)',
    imageCredit:
      'Photo: Horacio Cambeiro · Wikimedia Commons (CC BY-SA 3.0) · Illustrative Sample',
    isSampleData: true,
    layoutVariant: 'feature-lead',
  },
  {
    id: 'sample-gd-roasted-veg-bowl',
    categoryId: 'cat-garden-lighter',
    name: 'Roasted Vegetable Bowl',
    description:
      'Sample dish: Oven-caramelized cauliflower florets, broccoli, sweet red onion petals, and roasted garlic cloves tossed with olive oil, sea salt, and lemon.',
    priceKES: 1300,
    currency: 'KES',
    available: true,
    provenanceTags: [],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'nut-free'],
    imageUrl: '/dev-sample-food/garden-roasted-vegetable-bowl.jpg',
    imageAlt:
      'Sample dish photo: Bowl of oven-roasted broccoli, cauliflower, red onions, and garlic (CC BY-SA 4.0, Liat Portal)',
    imageCredit:
      'Photo: Liat Portal · Wikimedia Commons (CC BY-SA 4.0) · Illustrative Sample',
    isSampleData: true,
    layoutVariant: 'editorial-row',
  },
  {
    id: 'sample-gd-soup-of-the-day',
    categoryId: 'cat-garden-lighter',
    name: 'Fresh Soup of the Day',
    description:
      'Sample dish: Velvety roasted butternut squash and sweet carrot soup simmered with vegetable stock, ginger, and fresh herbs, served with warm crusty bread.',
    priceKES: 1050,
    currency: 'KES',
    available: true,
    provenanceTags: [],
    dietaryTags: ['vegetarian', 'nut-free'],
    allergenNotes:
      'Sample allergen note: Contains dairy (cream garnish) and wheat in side bread.',
    imageUrl: '/dev-sample-food/garden-soup-of-the-day.jpg',
    imageAlt:
      'Sample dish photo: Creamy pumpkin soup garnished with cream and herbs in a white cup (CC BY-SA 4.0, PattayaPatrol)',
    imageCredit:
      'Photo: PattayaPatrol · Wikimedia Commons (CC BY-SA 4.0) · Illustrative Sample',
    isSampleData: true,
    layoutVariant: 'editorial-row',
  },
  {
    id: 'sample-gd-grilled-chicken-salad',
    categoryId: 'cat-garden-lighter',
    name: 'Grilled Chicken Salad',
    description:
      'Sample dish: Tender herb-marinated grilled chicken thighs served warm over baby spinach, finely diced tomato-cucumber salad, and toasted pearl couscous.',
    priceKES: 1650,
    currency: 'KES',
    available: true,
    provenanceTags: [],
    dietaryTags: ['dairy-free', 'nut-free'],
    allergenNotes: 'Sample allergen note: Contains wheat in pearl couscous.',
    imageUrl: '/dev-sample-food/garden-grilled-chicken-salad.jpg',
    imageAlt:
      'Sample dish photo: Grilled chicken thighs with chopped vegetable salad and pearl couscous (CC BY-SA 4.0, Liat Portal)',
    imageCredit:
      'Photo: Liat Portal · Wikimedia Commons (CC BY-SA 4.0) · Illustrative Sample',
    isSampleData: true,
    layoutVariant: 'compact-pair',
  },
  {
    id: 'sample-gd-grain-veg-bowl',
    categoryId: 'cat-garden-lighter',
    name: 'Vegetarian Grain & Skillet Vegetable Bowl',
    description:
      'Sample dish: Sizzling skillet of seasonal market vegetables, crisp snow peas, and seared tofu served alongside a bowl of fragrant steamed jasmine grain.',
    priceKES: 1450,
    currency: 'KES',
    available: false,
    provenanceTags: [],
    dietaryTags: ['vegan', 'vegetarian', 'dairy-free', 'nut-free'],
    allergenNotes: 'Sample allergen note: Contains soy (tofu).',
    imageUrl: '/dev-sample-food/garden-grain-vegetable-bowl.jpg',
    imageAlt:
      'Sample dish photo: Skillet of roasted colorful vegetables and tofu with steamed grain bowl (CC0, Mojmir Churavy)',
    imageCredit: 'Photo: Mojmir Churavy · Wikimedia Commons (CC0) · Illustrative Sample',
    isSampleData: true,
    layoutVariant: 'compact-pair',
  },

  // ============================================================================
  // 3. MAIN COURSES (5 Sample Items)
  // ============================================================================
  {
    id: 'sample-mn-grilled-chicken',
    categoryId: 'cat-mains',
    name: 'Grilled Chicken with Seasonal Vegetables',
    description:
      'Sample dish: Flame-grilled free-range chicken seasoned with rosemary, garlic, and cracked black pepper, plated with roasted cauliflower, green beans, and sweet peppers.',
    priceKES: 2150,
    currency: 'KES',
    available: true,
    provenanceTags: [],
    dietaryTags: ['gluten-free', 'dairy-free', 'nut-free', 'halal'],
    imageUrl: '/dev-sample-food/main-grilled-chicken-vegetables.jpg',
    imageAlt:
      'Sample dish photo: Grilled chicken served with roasted cauliflower, green beans, and peppers (CC BY-SA 4.0, Liat Portal)',
    imageCredit:
      'Photo: Liat Portal · Wikimedia Commons (CC BY-SA 4.0) · Illustrative Sample',
    isSampleData: true,
    layoutVariant: 'feature-lead',
  },
  {
    id: 'sample-mn-grilled-fish',
    categoryId: 'cat-mains',
    name: 'Grilled Fish Fillet with Herb Potatoes & Greens',
    description:
      'Sample dish: Pan-seared fillet of catch seasoned with garlic, lemon zest, and parsley, served alongside golden roasted potato slices and tender green asparagus.',
    priceKES: 2450,
    currency: 'KES',
    available: true,
    provenanceTags: [],
    dietaryTags: ['gluten-free', 'dairy-free', 'nut-free'],
    allergenNotes: 'Sample allergen note: Contains fish.',
    imageUrl: '/dev-sample-food/main-grilled-fish-side.jpg',
    imageAlt:
      'Sample dish photo: Grilled fish fillet with roasted potatoes and asparagus (CC BY-SA 4.0, Liat Portal)',
    imageCredit:
      'Photo: Liat Portal · Wikimedia Commons (CC BY-SA 4.0) · Illustrative Sample',
    isSampleData: true,
    layoutVariant: 'editorial-row',
  },
  {
    id: 'sample-mn-slow-beef-stew',
    categoryId: 'cat-mains',
    name: 'Slow-Cooked Beef Stew',
    description:
      'Sample dish: Tender cubes of pasture beef braised slowly for four hours in a rich stock with highland potatoes, sweet carrots, celery, and thyme.',
    priceKES: 2250,
    currency: 'KES',
    available: true,
    provenanceTags: [],
    dietaryTags: ['dairy-free', 'nut-free'],
    imageUrl: '/dev-sample-food/main-slow-beef-stew.jpg',
    imageAlt:
      'Sample dish photo: Slow-cooked beef stew with potatoes and carrots in a white bowl (CC0, Daderot)',
    imageCredit: 'Photo: Daderot · Wikimedia Commons (CC0) · Illustrative Sample',
    isSampleData: true,
    layoutVariant: 'editorial-row',
  },
  {
    id: 'sample-mn-vegetarian-main',
    categoryId: 'cat-mains',
    name: 'Seasonal Vegetarian Harvest Braise',
    description:
      'Sample dish: Aromatic slow-simmered medley of seasonal root vegetables, squash, and soaked pulses with mild warming spices, served with steamed white rice.',
    priceKES: 1750,
    currency: 'KES',
    available: true,
    provenanceTags: [],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'nut-free'],
    imageUrl: '/dev-sample-food/main-seasonal-vegetarian.jpg',
    imageAlt:
      'Sample dish photo: Spiced mixed vegetable and pulse braise served with steamed rice (CC BY-SA 4.0, Subhransuphotography)',
    imageCredit:
      'Photo: Subhransuphotography · Wikimedia Commons (CC BY-SA 4.0) · Illustrative Sample',
    isSampleData: true,
    layoutVariant: 'compact-pair',
  },
  {
    id: 'sample-mn-roasted-meat',
    categoryId: 'cat-mains',
    name: 'Roasted Lamb Cutlets with Vegetables',
    description:
      'Sample dish: Seared highland lamb cutlets roasted with rosemary and whole garlic cloves, served with caramelized onions, roasted sweet potatoes, and basmati rice.',
    priceKES: 2750,
    currency: 'KES',
    available: true,
    provenanceTags: [],
    dietaryTags: ['gluten-free', 'dairy-free', 'nut-free', 'halal'],
    imageUrl: '/dev-sample-food/main-roasted-meat-vegetables.jpg',
    imageAlt:
      'Sample dish photo: Roasted lamb chops with basmati rice, grilled potatoes, and caramelized onions (CC BY-SA 4.0, Liat Portal)',
    imageCredit:
      'Photo: Liat Portal · Wikimedia Commons (CC BY-SA 4.0) · Illustrative Sample',
    isSampleData: true,
    layoutVariant: 'compact-pair',
  },

  // ============================================================================
  // 4. SIDES & STAPLES (5 Sample Items)
  // ============================================================================
  {
    id: 'sample-sd-seasonal-vegetables',
    categoryId: 'cat-sides',
    name: 'Seasonal Market Vegetables',
    description:
      'Sample dish: Wok-tossed baby corn, crisp garden greens, carrots, and snow peas finished with a light vegetable glaze.',
    priceKES: 650,
    currency: 'KES',
    available: true,
    provenanceTags: [],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'],
    imageUrl: '/dev-sample-food/side-seasonal-vegetables.jpg',
    imageAlt:
      'Sample dish photo: Sautéed baby corn and fresh seasonal greens (CC BY-SA 4.0, PattayaPatrol)',
    imageCredit:
      'Photo: PattayaPatrol · Wikimedia Commons (CC BY-SA 4.0) · Illustrative Sample',
    isSampleData: true,
    layoutVariant: 'editorial-row',
  },
  {
    id: 'sample-sd-roasted-potatoes',
    categoryId: 'cat-sides',
    name: 'Roasted Highland Potatoes',
    description:
      'Sample dish: Golden oven-roasted new potatoes tossed with chopped fresh dill, sea salt flakes, and extra-virgin olive oil.',
    priceKES: 600,
    currency: 'KES',
    available: true,
    provenanceTags: [],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'nut-free'],
    imageUrl: '/dev-sample-food/side-roasted-potatoes.jpg',
    imageAlt:
      'Sample dish photo: Golden roasted potatoes seasoned with fresh dill on a ceramic plate (CC BY-SA 4.0, Silar)',
    imageCredit: 'Photo: Silar · Wikimedia Commons (CC BY-SA 4.0) · Illustrative Sample',
    isSampleData: true,
    layoutVariant: 'editorial-row',
  },
  {
    id: 'sample-sd-steamed-rice',
    categoryId: 'cat-sides',
    name: 'Steamed Long-Grain Rice',
    description:
      'Sample dish: Fluffy steamed aromatic white rice, prepared simply to accompany stews, curries, and grilled mains.',
    priceKES: 500,
    currency: 'KES',
    available: true,
    provenanceTags: [],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'nut-free'],
    imageUrl: '/dev-sample-food/side-steamed-rice.jpg',
    imageAlt: 'Sample dish photo: Bowl of steamed white rice (CC0, Douglas Perkins)',
    imageCredit: 'Photo: Douglas Perkins · Wikimedia Commons (CC0) · Illustrative Sample',
    isSampleData: true,
    layoutVariant: 'compact-pair',
  },
  {
    id: 'sample-sd-fresh-salad',
    categoryId: 'cat-sides',
    name: 'Fresh Cucumber & Herb Side Salad',
    description:
      'Sample dish: Crisp sliced garden cucumbers dressed lightly with aged vinegar, cold-pressed oil, and cracked black pepper.',
    priceKES: 550,
    currency: 'KES',
    available: true,
    provenanceTags: [],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'nut-free'],
    imageUrl: '/dev-sample-food/side-fresh-salad.jpg',
    imageAlt:
      'Sample dish photo: Fresh cucumber salad dressed with vinegar in a bowl (CC BY-SA 3.0, Horacio Cambeiro)',
    imageCredit:
      'Photo: Horacio Cambeiro · Wikimedia Commons (CC BY-SA 3.0) · Illustrative Sample',
    isSampleData: true,
    layoutVariant: 'compact-pair',
  },
  {
    id: 'sample-sd-ugali-staple',
    categoryId: 'cat-sides',
    name: 'Traditional Ugali & Sukuma Wiki',
    description:
      'Sample dish: Classic Kenyan table staple of warm white maize-meal ugali paired with finely shredded collard greens sautéed with onions and tomatoes.',
    priceKES: 650,
    currency: 'KES',
    available: true,
    provenanceTags: [],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'nut-free'],
    imageUrl: '/dev-sample-food/side-ugali-greens.jpg',
    imageAlt:
      'Sample dish photo: Traditional Kenyan ugali and sukuma wiki greens (CC BY-SA 4.0, Napendakukula)',
    imageCredit:
      'Photo: Napendakukula · Wikimedia Commons (CC BY-SA 4.0) · Illustrative Sample',
    isSampleData: true,
    layoutVariant: 'feature-lead',
  },

  // ============================================================================
  // 5. DESSERTS (4 Sample Items)
  // ============================================================================
  {
    id: 'sample-ds-seasonal-fruit',
    categoryId: 'cat-desserts',
    name: 'Seasonal Fruit Plate',
    description:
      'Sample dish: Chilled assortment of sweet watermelon, cantaloupe, honeydew melon, golden pineapple, and red grapes.',
    priceKES: 850,
    currency: 'KES',
    available: true,
    provenanceTags: [],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'nut-free'],
    imageUrl: '/dev-sample-food/dessert-seasonal-fruit-plate.jpg',
    imageAlt:
      'Sample dish photo: Assorted fresh sliced melon, pineapple, and grapes (CC BY-SA 4.0, Liat Portal)',
    imageCredit:
      'Photo: Liat Portal · Wikimedia Commons (CC BY-SA 4.0) · Illustrative Sample',
    isSampleData: true,
    layoutVariant: 'editorial-row',
  },
  {
    id: 'sample-ds-baked-tart',
    categoryId: 'cat-desserts',
    name: 'Warm Baked Apple Tart',
    description:
      'Sample dish: Thinly sliced orchard apples baked in a crisp buttery pastry shell with cinnamon and dusted with icing sugar.',
    priceKES: 1100,
    currency: 'KES',
    available: true,
    provenanceTags: [],
    dietaryTags: ['vegetarian', 'nut-free'],
    allergenNotes: 'Sample allergen note: Contains wheat (gluten), dairy, and eggs.',
    imageUrl: '/dev-sample-food/dessert-baked-apple-tart.jpg',
    imageAlt:
      'Sample dish photo: Baked apple tart dusted with powdered sugar on a white plate (CC BY 2.0, Vincent Ros)',
    imageCredit:
      'Photo: Vincent Ros · Wikimedia Commons (CC BY 2.0) · Illustrative Sample',
    isSampleData: true,
    layoutVariant: 'feature-lead',
  },
  {
    id: 'sample-ds-chocolate-cake',
    categoryId: 'cat-desserts',
    name: 'Dark Chocolate Gateau',
    description:
      'Sample dish: Rich layered dark chocolate sponge with bittersweet cocoa ganache and a delicate chocolate glaze.',
    priceKES: 1200,
    currency: 'KES',
    available: true,
    provenanceTags: [],
    dietaryTags: ['vegetarian', 'nut-free'],
    allergenNotes: 'Sample allergen note: Contains wheat, eggs, and dairy.',
    imageUrl: '/dev-sample-food/dessert-chocolate-cake.jpg',
    imageAlt:
      'Sample dish photo: Slice of dark chocolate cake dusted with cocoa powder on a white plate (CC0, Daria Yakovleva)',
    imageCredit: 'Photo: Daria Yakovleva · Wikimedia Commons (CC0) · Illustrative Sample',
    isSampleData: true,
    layoutVariant: 'compact-pair',
  },
  {
    id: 'sample-ds-fruit-panna-cotta',
    categoryId: 'cat-desserts',
    name: 'Vanilla Panna Cotta with Fresh Berries',
    description:
      'Sample dish: Silky set sweet cream infused with vanilla pod, topped with fresh blackberries and golden and red raspberries.',
    priceKES: 1150,
    currency: 'KES',
    available: true,
    provenanceTags: [],
    dietaryTags: ['vegetarian', 'gluten-free', 'nut-free'],
    allergenNotes: 'Sample allergen note: Contains dairy.',
    imageUrl: '/dev-sample-food/dessert-berry-panna-cotta.jpg',
    imageAlt:
      'Sample dish photo: Vanilla panna cotta topped with fresh blackberries and raspberries (CC BY 2.0, Kimberly Vardeman)',
    imageCredit:
      'Photo: Kimberly Vardeman · Wikimedia Commons (CC BY 2.0) · Illustrative Sample',
    isSampleData: true,
    layoutVariant: 'compact-pair',
  },

  // ============================================================================
  // 6. HOT & COLD BEVERAGES (5 Sample Items — Strictly Non-Alcoholic)
  // ============================================================================
  {
    id: 'sample-bv-coffee',
    categoryId: 'cat-beverages',
    name: 'Freshly Brewed Kenyan Coffee',
    description:
      'Sample beverage: Medium-roasted highland arabica coffee brewed fresh to order — served as a double espresso, French press pot, or with steamed milk.',
    priceKES: 450,
    currency: 'KES',
    available: true,
    provenanceTags: [],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free', 'nut-free'],
    imageUrl: '/dev-sample-food/beverage-hot-coffee.jpg',
    imageAlt:
      'Sample beverage photo: Freshly brewed espresso coffee in a ceramic cup (CC BY-SA 4.0, Vee Satayamas)',
    imageCredit:
      'Photo: Vee Satayamas · Wikimedia Commons (CC BY-SA 4.0) · Illustrative Sample',
    isSampleData: true,
    layoutVariant: 'feature-lead',
  },
  {
    id: 'sample-bv-tea',
    categoryId: 'cat-beverages',
    name: 'Highland Loose-Leaf Tea & Herbal Infusion',
    description:
      'Sample beverage: Whole-leaf Kenyan black tea, masala spiced chai, or soothing herbal infusion served in a warmed ceramic pot.',
    priceKES: 400,
    currency: 'KES',
    available: true,
    provenanceTags: [],
    dietaryTags: ['vegetarian', 'gluten-free', 'nut-free'],
    imageUrl: '/dev-sample-food/beverage-loose-leaf-tea.jpg',
    imageAlt:
      'Sample beverage photo: Ceramic teapot and cup of hot tea (CC BY-SA 4.0, KQuhen)',
    imageCredit: 'Photo: KQuhen · Wikimedia Commons (CC BY-SA 4.0) · Illustrative Sample',
    isSampleData: true,
    layoutVariant: 'editorial-row',
  },
  {
    id: 'sample-bv-fresh-juice',
    categoryId: 'cat-beverages',
    name: 'Freshly Pressed Seasonal Juice',
    description:
      'Sample beverage: Cold-pressed to order from ripe seasonal fruit with no added sugar, served chilled over ice.',
    priceKES: 550,
    currency: 'KES',
    available: true,
    provenanceTags: [],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'nut-free'],
    imageUrl: '/dev-sample-food/beverage-fresh-pressed-juice.jpg',
    imageAlt:
      'Sample beverage photo: Glass of freshly pressed orange juice with citrus slices (CC BY-SA 4.0, Rebeloasisx)',
    imageCredit:
      'Photo: Rebeloasisx · Wikimedia Commons (CC BY-SA 4.0) · Illustrative Sample',
    isSampleData: true,
    layoutVariant: 'editorial-row',
  },
  {
    id: 'sample-bv-still-water',
    categoryId: 'cat-beverages',
    name: 'Still Mineral Water',
    description:
      'Sample beverage: Chilled glass bottle of still natural spring water, served with or without ice and fresh lime.',
    priceKES: 350,
    currency: 'KES',
    available: true,
    provenanceTags: [],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'nut-free'],
    imageUrl: '/dev-sample-food/beverage-still-water.jpg',
    imageAlt:
      'Sample beverage photo: Glass bottle of still mineral water on a dining table (CC BY-SA 4.0, Beluwater)',
    imageCredit:
      'Photo: Beluwater · Wikimedia Commons (CC BY-SA 4.0) · Illustrative Sample',
    isSampleData: true,
    layoutVariant: 'compact-pair',
  },
  {
    id: 'sample-bv-sparkling-water',
    categoryId: 'cat-beverages',
    name: 'Sparkling Mineral Water',
    description:
      'Sample beverage: Crisp carbonated mineral water served chilled with a slice of fresh lemon or lime.',
    priceKES: 400,
    currency: 'KES',
    available: true,
    provenanceTags: [],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'nut-free'],
    imageUrl: '/dev-sample-food/beverage-sparkling-water.jpg',
    imageAlt:
      'Sample beverage photo: Chilled glass of mineral water (CC BY-SA 4.0, Jirka.h23)',
    imageCredit:
      'Photo: Jirka.h23 · Wikimedia Commons (CC BY-SA 4.0) · Illustrative Sample',
    isSampleData: true,
    layoutVariant: 'compact-pair',
  },
];

export const DEV_SAMPLE_MENU_CATALOG: MenuCatalog = {
  status: 'sample_preview',
  lastVerifiedIso: null,
  currency: 'KES',
  isSamplePreview: true,
  previewNoticeText: SAMPLE_PREVIEW_NOTICE_TEXT,
  categories: DEV_SAMPLE_CATEGORIES,
  items: DEV_SAMPLE_MENU_ITEMS,
};
