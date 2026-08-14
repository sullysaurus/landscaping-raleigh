import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.landscapingraleigh.com',
  output: 'static',
  integrations: [
    sitemap({
      filter: (page) => !['/proposal/', '/seo-dashboard/', '/thank-you/'].some((path) => page.endsWith(path)),
    }),
  ],
});
