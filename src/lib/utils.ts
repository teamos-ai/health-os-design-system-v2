import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * tailwind-merge, taught the five Health OS type roles. Without this, `text-body` or
 * `text-heading` would be read as text COLOURS and could silently drop a real colour
 * such as `text-white`. Registering them as font sizes keeps size and colour separate.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: ['heading', 'subheading', 'title', 'body', 'label'] }],
    },
  },
});

/** Merge Tailwind classes with conflict resolution. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
