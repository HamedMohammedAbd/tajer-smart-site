import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// '/' locally and on Vercel; GitHub Pages serves the site from /<repo>/,
// which the deploy workflow passes in SITE_BASE.
const base = process.env.SITE_BASE || '/';
// Absolute address of the live site, for link previews (og:image).
const siteUrl = process.env.SITE_URL || '';

const siteUrlInHtml = (): Plugin => ({
  name: 'site-url-in-html',
  transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', siteUrl),
});

export default defineConfig({
  base,
  plugins: [react(), tailwindcss(), siteUrlInHtml()],
});
