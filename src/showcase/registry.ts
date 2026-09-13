/**
 * Section registry: the one list that drives navigation order, grouping, scroll-spy and
 * rendering. Titles and leads live in the catalogue; icons live here. Section ids are
 * permanent anchors: add rows, never rename ids.
 */
import {
  House,
  Clapperboard,
  LayoutDashboard,
  ListChecks,
  Palette,
  Hexagon,
  Shapes,
  Wand2,
  MousePointerClick,
  Tags,
  SlidersHorizontal,
  LayoutGrid,
  Rows3,
  Blocks,
  LayoutTemplate,
  ScrollText,
  Newspaper,
  Calculator,
  Share2,
  Wallpaper,
  Images,
  NotebookText,
  Globe,
  type LucideIcon,
} from 'lucide-react';
import { SECTIONS, type CatalogSection } from '@/showcase/catalog';

const ICONS: Record<string, LucideIcon> = {
  hero: House,
  video: Clapperboard,
  overview: LayoutDashboard,
  checklist: ListChecks,
  tokens: Palette,
  logo: Hexagon,
  icons: Shapes,
  motion: Wand2,
  buttons: MousePointerClick,
  badges: Tags,
  elements: SlidersHorizontal,
  'card-bento': LayoutGrid,
  blocks: Rows3,
  widgets: Blocks,
  signature: LayoutTemplate,
  banners: ScrollText,
  blog: Newspaper,
  calculators: Calculator,
  social: Share2,
  backgrounds: Wallpaper,
  imagery: Images,
  notion: NotebookText,
  live: Globe,
};

export interface NavItem extends CatalogSection {
  Icon: LucideIcon;
  number: string;
}

export const NAV: NavItem[] = SECTIONS.map((s, i) => ({
  ...s,
  Icon: ICONS[s.id] ?? LayoutDashboard,
  number: String(i + 1).padStart(2, '0'),
}));
