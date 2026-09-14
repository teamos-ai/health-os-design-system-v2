#!/usr/bin/env node
/**
 * lint-tokens.mjs — fails when source uses a value the system does not have.
 *
 * Tailwind silently ignores classes it does not know, so an off-system class such as
 * `rounded-xl`, `text-rose-600` or `bg-gray-100` renders as nothing and nobody notices.
 * This script catches those, plus typed hex values and pixel sizes in class names.
 *
 *   node scripts/lint-tokens.mjs
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const tokens = JSON.parse(readFileSync(join(ROOT, 'design-system/tokens/tokens.json'), 'utf8'));

const allowedSteps = {};
for (const [name, group] of Object.entries(tokens.color)) {
  const steps = Object.keys(group).filter((k) => /^\d+$/.test(k));
  if (steps.length) allowedSteps[name] = new Set(steps);
}

const SKIP = [/src\/lib\/palette\.ts$/, /src\/data\/(photos|backgrounds|media)\.ts$/];
const files = [];
const walk = (dir) => {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (['.ts', '.tsx', '.css'].includes(extname(p)) && !SKIP.some((re) => re.test(p))) files.push(p);
  }
};
walk(join(ROOT, 'src'));

const PREFIX = '(?:bg|text|border(?:-[trblxy])?|ring(?:-offset)?|outline|from|via|to|fill|stroke|divide|decoration|placeholder|caret|accent|shadow)';
const DEFAULT_PALETTE = 'slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|brand|gold|info|warn|danger';

const RULES = [
  { re: new RegExp(`(?<![\\w-])(?:[a-z0-9-]+:)*${PREFIX}-(rose|apricot|lavender|ink|success|warning|error)-(\\d{2,3})\\b`, 'g'), check: (m) => !allowedSteps[m[1]]?.has(m[2]) && `${m[1]}-${m[2]} is not a token step (${m[1]} has ${[...allowedSteps[m[1]]].join(', ')})` },
  { re: new RegExp(`(?<![\\w-])(?:[a-z0-9-]+:)*${PREFIX}-(${DEFAULT_PALETTE})-\\d{2,3}\\b`, 'g'), check: (m) => `${m[0]} uses a colour outside the Health OS palette` },
  { re: /(?<![\w-])(?:[a-z0-9-]+:)*text-(xs|sm|base|lg|[2-9]?xl|display-[a-z]+|h[1-6]|body-[a-z]+|caption|overline|micro|code)\b/g, check: (m) => `${m[0]} is not a type role (heading, subheading, body, label)` },
  { re: /(?<![\w-])(?:[a-z0-9-]+:)*rounded(?:-[trblse]{1,2})?-(xs|sm|xl|2xl|3xl)\b/g, check: (m) => `${m[0]} is not a radius token (md, lg, full)` },
  { re: /(?<![\w-])(?:[a-z0-9-]+:)*shadow-(xs|xl|2xl|inner|carbon)\b/g, check: (m) => `${m[0]} is not a shadow token (sm, md, lg)` },
  { re: /(?<![\w-])(?:[a-z0-9-]+:)*font-(mono|heading|thin|light|medium|semibold|extrabold|black)\b/g, check: (m) => `${m[0]}: two families (display, sans) and one weight per role` },
  { re: /(?<![\w-])dark:[\w-]+/g, check: (m) => `${m[0]}: there is no dark theme` },
  { re: /(?<![\w-])bg-glow-[\w-]+/g, check: (m) => `${m[0]}: glows are not tokens; use the three gradients` },
  { re: /(?<![\w-])(?:[a-z0-9-]+:)*bg-ink-900(?![\w/-])[^'"`\n]*text-white\b/g, check: (m) => `${m[0].split(' ')[0]} with white text: selected states are apricot-50 with an apricot-200 edge, not a dark fill` },
  { re: /(?<![\w-])(?:[a-z0-9-]+:)*bg-carbon(?![\w/-])/g, check: (m) => `${m[0]}: carbon is never a background, only a translucent veil (bg-carbon/40 to /80)` },
  { re: /(?<![\w-])(?:[a-z0-9-]+:)*(?:ring|outline)-(?:rose|lavender)-400\b|(?<![\w-])(?:[a-z-]*:)*(?:focus|focus-visible|focus-within|checked|indeterminate|peer-checked|aria-selected|aria-pressed|aria-current)(?::[a-z-]+)*:(?:bg|border|ring|text)-(?:rose|lavender)-\d{2,3}\b/g, check: (m) => `${m[0]}: apricot is the only interactive accent (focus, checked and selected states)` },
  { re: /(?<![\w-])(?:[a-z0-9-]+:)*(?:ring|outline)-apricot-400\b|(?<![\w-])(?:[a-z-]*:)*(?:focus|focus-visible|focus-within)(?::[a-z-]+)*:(?:border|ring|outline)-apricot-\d{2,3}\b/g, check: (m) => `${m[0]}: focus is drawn in ink-900 (ring-ink-900), apricot marks state` },
  { re: /(?<![\w-])(?:[a-z0-9-]+:)*[\w-]+-\[#[0-9a-fA-F]{3,8}\]/g, check: (m) => `${m[0]} types a hex value; use a token` },
  { re: /(?<![\w-])(?:[a-z0-9-]+:)*text-\[\d+(?:\.\d+)?px\]/g, check: (m) => `${m[0]} types a font size; use a type role` },
  { re: /(?<![\w-])-?(?:p|px|py|pt|pr|pb|pl|m|mx|my|mt|mr|mb|ml|gap|gap-x|gap-y|space-x|space-y)-(0\.5|1\.5|2\.5|3\.5)\b/g, check: (m) => `${m[0]} is off the 4px grid` },
];

let problems = 0;
for (const file of files) {
  const lines = readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, i) => {
    for (const { re, check } of RULES) {
      re.lastIndex = 0;
      let m;
      while ((m = re.exec(line))) {
        const msg = check(m);
        if (msg) {
          problems++;
          console.error(`${relative(ROOT, file)}:${i + 1}  ${msg}`);
        }
      }
    }
  });
}

if (problems) {
  console.error(`\n✗ ${problems} off-system value${problems === 1 ? '' : 's'}`);
  process.exit(1);
}
console.log(`✓ ${files.length} files use only system tokens`);
