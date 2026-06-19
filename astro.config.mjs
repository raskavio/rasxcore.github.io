// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// GitHub Pages user site (username.github.io): base = '/'
export default defineConfig({
  site: 'https://rasxcore.github.io',
  output: 'static',

  vite: {
    plugins: [tailwindcss()],
  },
});