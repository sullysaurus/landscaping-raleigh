import { access, readFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const sitemapIndex = path.join(root, 'dist/sitemap-index.xml');
const sitemap = path.join(root, 'dist/sitemap-0.xml');
await access(sitemapIndex);
await access(sitemap);

const robots = await readFile(path.join(root, 'dist/robots.txt'), 'utf8');
if (!robots.includes('https://www.landscapingraleigh.com/sitemap-index.xml')) {
  throw new Error('Built robots.txt does not reference the generated sitemap index.');
}
const redirects = await readFile(path.join(root, 'dist/_redirects'), 'utf8');
if (!redirects.includes('/sitemap.xml /sitemap-index.xml 301')) {
  throw new Error('Legacy sitemap.xml does not redirect to the generated sitemap index.');
}

const sitemapXml = await readFile(sitemap, 'utf8');
if (!sitemapXml.includes('https://www.landscapingraleigh.com/journal/')) {
  throw new Error('Generated sitemap does not include the Journal.');
}
for (const utilityPath of ['/proposal/', '/seo-dashboard/', '/thank-you/']) {
  if (sitemapXml.includes(`https://www.landscapingraleigh.com${utilityPath}`)) {
    throw new Error(`Generated sitemap includes utility route ${utilityPath}.`);
  }
}

console.log('Built SEO validation passed: sitemap index, sitemap, and robots.txt agree.');
