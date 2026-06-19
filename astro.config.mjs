// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// GitHub Pages user site (username.github.io): base = '/'
export default defineConfig({
  site: 'http://rasxcore.ru/',
  output: 'static',

  vite: {
    plugins: [tailwindcss()],
  },
});
