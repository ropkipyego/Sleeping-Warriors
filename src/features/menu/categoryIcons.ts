import {
  CakeSlice,
  Coffee,
  GlassWater,
  Heart,
  Leaf,
  type LucideIcon,
  Sprout,
  Utensils,
  Wheat,
} from 'lucide-react';

const CATEGORY_ICONS: Readonly<Record<string, LucideIcon>> = {
  'cat-breakfast': Coffee,
  'cat-garden-lighter': Leaf,
  'cat-mains': Utensils,
  'cat-sides': Wheat,
  'cat-desserts': CakeSlice,
  'cat-beverages': GlassWater,
};

const SHAMBA_ICONS: Readonly<Record<string, LucideIcon>> = {
  'shamba-harvest': Sprout,
  'estate-coffee': Coffee,
  'camp-livestock': Heart,
};

export function getCategoryIcon(categoryId: string): LucideIcon {
  return CATEGORY_ICONS[categoryId] ?? Utensils;
}

export function getShambaIcon(pillarId: string): LucideIcon {
  return SHAMBA_ICONS[pillarId] ?? Sprout;
}
