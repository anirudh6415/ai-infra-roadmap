// @ts-check
import { defineConfig } from 'astro/config';
import { SITE } from './src/config.mjs';

export default defineConfig({
  site: SITE.origin,
  base: SITE.base,
  trailingSlash: 'ignore',
  build: { format: 'directory' },
});
