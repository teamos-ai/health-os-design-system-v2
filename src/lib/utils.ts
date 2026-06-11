import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * tailwind-merge, taught about our custom font-size tokens. Without this, classes
 * like `text-body-md` / `text-h1` are mistaken for text-COLOUR utilities and would
 * clobber a real colour (e.g. `text-white` on a primary button → carbon text, an AA
 * failure). Registering them in the `font-size` group keeps size and colour separate.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: [
            'display-xl',
            'display-lg',
            'h1',
            'h2',
            'h3',
            'h4',
            'body-lg',
            'body-md',
            'body-sm',
            'caption',
            'overline',
            'label',
            'code',
          ],
        },
      ],
    },
  },
});

/** Merge Tailwind classes with conflict resolution. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
