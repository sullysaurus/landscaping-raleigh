import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const journal = defineCollection({
  loader: glob({ base: './src/content/journal', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    excerpt: z.string(),
    category: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    image: z.string(),
    imageAlt: z.string(),
    imageCaption: z.string(),
    imageWidth: z.number().int().positive().default(1200),
    imageHeight: z.number().int().positive().default(900),
    eyebrow: z.string(),
    headline: z.string(),
    emphasis: z.string(),
    deck: z.string(),
    shortAnswer: z.string(),
    about: z.array(z.string()).min(1),
    toc: z.array(z.object({ href: z.string(), label: z.string() })).min(2),
    serviceHref: z.string(),
    serviceLabel: z.string(),
    primaryKeyword: z.string(),
    sources: z.array(z.object({ title: z.string(), url: z.string().url() })).min(3),
    productionNote: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { journal };
