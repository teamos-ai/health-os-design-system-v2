/**
 * Typed access to design-system/reference/catalog.json, the one source for section titles,
 * usage guidance, the pre-asset checklist and the open decisions. The written reference (REFERENCE.md) is
 * generated from the same file by scripts/docs.mjs.
 */
import catalog from '../../design-system/reference/catalog.json';

export type EntryStatus = 'stable' | 'experimental' | 'in-progress';

export interface CatalogEntry {
  id: string;
  section: string;
  name: string;
  kind: string;
  status: EntryStatus;
  purpose: string;
  use: string[];
  avoid: string[];
  api: string;
  source: string;
  number?: string;
  group?: string;
}

/** A decision that is still Tumai's to make, with what the system does in the meantime. */
export interface OpenDecision {
  id: string;
  ref: string;
  topic: string;
  question: string;
  current: string;
}

export interface CatalogSection {
  id: string;
  group: string;
  label: string;
  title: string;
  lead: string;
}

export const GROUPS = catalog.groups;
export const SECTIONS = catalog.sections as CatalogSection[];
export const ENTRIES = catalog.entries as CatalogEntry[];
export const CHECKLIST = catalog.checklist;
export const OPEN = catalog.open as OpenDecision[];

export const sectionMeta = (id: string): CatalogSection => {
  const s = SECTIONS.find((x) => x.id === id);
  if (!s) throw new Error(`Unknown catalogue section "${id}"`);
  return s;
};

export const entry = (id: string): CatalogEntry => {
  const e = ENTRIES.find((x) => x.id === id);
  if (!e) throw new Error(`Unknown catalogue entry "${id}"`);
  return e;
};

export const entriesFor = (section: string) => ENTRIES.filter((e) => e.section === section);
