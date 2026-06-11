import healthos from './design-system/tokens/tailwind.preset.js';

/** @type {import('tailwindcss').Config} */
export default {
  presets: [healthos],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: { extend: {} },
  plugins: [],
};
