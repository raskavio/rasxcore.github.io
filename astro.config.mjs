// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://rasxcore.ru/',
  output: 'static',

  vite: {
    plugins: [tailwindcss()],
  },
});
