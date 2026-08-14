import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const queue = JSON.parse(await readFile(path.join(root, 'content-machine/topics.json'), 'utf8'));
const contentDir = path.join(root, 'src/content/journal');
const files = (await readdir(contentDir)).filter((file) => /\.(md|mdx)$/.test(file));
const errors = [];
const scheduledJournalRoutes = new Map(
  queue.map((topic) => [`/journal/${topic.slug}/`, topic.publishDate]),
);
const parsedArticles = [];

const duplicateValues = (values) => values.filter((value, index) => values.indexOf(value) !== index);
for (const duplicate of new Set(duplicateValues(queue.map((topic) => topic.slug)))) errors.push(`duplicate topic slug: ${duplicate}`);
for (const duplicate of new Set(duplicateValues(queue.map((topic) => topic.primaryKeyword.toLowerCase())))) errors.push(`duplicate primary keyword: ${duplicate}`);
for (const duplicate of new Set(duplicateValues(queue.map((topic) => topic.publishDate).filter(Boolean)))) errors.push(`duplicate publication date: ${duplicate}`);
for (let index = 1; index < queue.length; index += 1) {
  const previous = new Date(`${queue[index - 1].publishDate}T00:00:00Z`);
  const current = new Date(`${queue[index].publishDate}T00:00:00Z`);
  if ((current - previous) / 86400000 !== 1) errors.push(`${queue[index].slug}: schedule must advance exactly one day after ${queue[index - 1].slug}`);
}

for (const topic of queue) {
  if (!['queued', 'drafted', 'published', 'paused'].includes(topic.status)) errors.push(`${topic.slug}: invalid status ${topic.status}`);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(topic.slug)) errors.push(`${topic.slug}: slug is not URL-safe`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(topic.publishDate || '')) errors.push(`${topic.slug}: publishDate must use YYYY-MM-DD`);
  if (!topic.serviceHref?.startsWith('/') || !topic.relatedJournalHref?.startsWith('/')) errors.push(`${topic.slug}: internal links must start with /`);
  for (const href of [topic.serviceHref, topic.relatedJournalHref]) {
    if (!(await internalRouteExists(href, topic.publishDate))) errors.push(`${topic.slug}: internal target does not exist or publishes after this article: ${href}`);
  }
}

for (const file of files) {
  const slug = file.replace(/\.(md|mdx)$/, '');
  const raw = await readFile(path.join(contentDir, file), 'utf8');
  const { data, body } = parseGeneratedFrontmatter(raw, file);
  const topic = queue.find((item) => item.slug === slug);
  const wordCount = body.trim().split(/\s+/).length;
  const sourceLinks = [...body.matchAll(/\[[^\]]+\]\((https:\/\/[^)]+)\)/g)];
  parsedArticles.push({ file, body, title: data.title });

  if (!topic) errors.push(`${file}: no matching topic queue entry`);
  if (data.draft !== false) errors.push(`${file}: generated posts must explicitly set draft: false before a review PR is opened`);
  if (topic && data.publishedAt !== topic.publishDate) errors.push(`${file}: publishedAt must match scheduled date ${topic.publishDate}`);
  if (wordCount < 650 || wordCount > 1600) errors.push(`${file}: expected 650-1,600 useful words; found ${wordCount}`);
  if (/^#\s+/m.test(body)) errors.push(`${file}: body contains an H1`);
  if ((body.match(/^##\s+/gm) || []).length < 4) errors.push(`${file}: fewer than four H2 sections`);
  if (!Array.isArray(data.sources) || data.sources.length < 3) errors.push(`${file}: fewer than three sources`);
  if (sourceLinks.length < 3) errors.push(`${file}: fewer than three inline source citations`);
  if (topic && !body.includes(`](${topic.serviceHref})`)) errors.push(`${file}: missing service link ${topic.serviceHref}`);
  if (topic && !body.includes(`](${topic.relatedJournalHref})`)) errors.push(`${file}: missing related Journal link ${topic.relatedJournalHref}`);
  if (data.description?.length < 120 || data.description?.length > 170) errors.push(`${file}: meta description must be 120-170 characters`);
  if (/<script|<iframe|javascript:/i.test(body)) errors.push(`${file}: unsafe HTML found`);
}

for (const duplicate of new Set(duplicateValues(parsedArticles.map((article) => article.title?.toLowerCase())))) {
  errors.push(`duplicate generated title: ${duplicate}`);
}
for (let left = 0; left < parsedArticles.length; left += 1) {
  for (let right = left + 1; right < parsedArticles.length; right += 1) {
    const similarity = jaccard(shingles(parsedArticles[left].body), shingles(parsedArticles[right].body));
    if (similarity > 0.72) errors.push(`${parsedArticles[left].file} and ${parsedArticles[right].file}: body similarity is ${(similarity * 100).toFixed(0)}%`);
  }
}

if (errors.length) {
  console.error(`SEO content validation failed:\n- ${errors.join('\n- ')}`);
  process.exit(1);
}

console.log(`SEO content validation passed for ${queue.length} queued topics and ${files.length} generated posts.`);

function parseGeneratedFrontmatter(raw, filename) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error(`${filename}: missing frontmatter`);
  const data = {};
  for (const line of match[1].split('\n')) {
    const separator = line.indexOf(':');
    if (separator < 1) throw new Error(`${filename}: malformed frontmatter line: ${line}`);
    const key = line.slice(0, separator);
    data[key] = JSON.parse(line.slice(separator + 1).trim());
  }
  return { data, body: match[2] };
}

async function internalRouteExists(href, articlePublishDate) {
  if (href === '/') return true;
  const scheduledDate = scheduledJournalRoutes.get(href);
  if (scheduledDate && scheduledDate <= articlePublishDate) return true;
  const segments = href.replace(/^\//, '').replace(/\/$/, '').split('/');
  const pagePath = path.join(root, 'src/pages', ...segments);
  const candidates = [`${pagePath}.astro`, path.join(pagePath, 'index.astro')];
  for (const candidate of candidates) {
    try {
      await access(candidate);
      return true;
    } catch {
      // Try the next route representation.
    }
  }
  if (segments[0] === 'journal') {
    try {
      await access(path.join(contentDir, `${segments.at(-1)}.md`));
      return true;
    } catch {
      return false;
    }
  }
  return false;
}

function shingles(value) {
  const words = value.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);
  const result = new Set();
  for (let index = 0; index <= words.length - 5; index += 1) result.add(words.slice(index, index + 5).join(' '));
  return result;
}

function jaccard(left, right) {
  if (!left.size || !right.size) return 0;
  let intersection = 0;
  for (const item of left) if (right.has(item)) intersection += 1;
  return intersection / (left.size + right.size - intersection);
}
