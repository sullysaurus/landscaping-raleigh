# Garden & Art SEO content machine

This repository contains a supervised SEO publishing system modeled on the Popstar Lawn Games workflow.

## Current release plan

- 13 original Journal guides are already live.
- `topics.json` contains 37 additional, non-duplicative guides.
- The scheduled run starts August 15, 2026 and ends September 20, 2026.
- One new guide becomes eligible each day, bringing the Journal to 50 posts.
- Future-dated guides are excluded from the homepage, Journal index, article routes and sitemap until their publication date.
- The existing daily workflow updates reporting, advances `src/data/seo-release.json`, and pushes a small commit to `main`. That push triggers a fresh Netlify deploy and releases that day's eligible guide even when Google reporting data has not changed.
- A Google reporting failure does not prevent the release marker from advancing; the dashboard retains the last successful snapshots.

Google does not require a fixed publishing interval. The daily cadence is an operating choice. Quality gates—not volume—decide whether a page belongs in the schedule.

## Evidence used

Topic priority follows this order:

1. Search Console query and landing-page evidence
2. Keywords Everywhere exports collected August 3, 2026
3. Existing Raleigh service-page gaps
4. Recurring homeowner decision and maintenance questions
5. Seasonal usefulness for the scheduled publication date

Each queue item records its evidence. A `null` search volume means the topic is supported by business or audience evidence but still needs measurement in the next Keywords Everywhere refresh. It must not be presented as a validated-volume term.

## Authoring

Articles are authored directly in this repository from the briefs in `topics.json`. No external drafting API or repository API key is required.

Each file lives in `src/content/journal/<slug>.md`, uses the scheduled `publishDate` as `publishedAt`, and follows the typed frontmatter in `src/content.config.ts`. Research should prefer government, university, Extension, standards-body and original program sources.

## Required review rules

- Do not invent Garden & Art prices, project outcomes, testimonials, opinions or service guarantees.
- Do not attribute generated advice to Norman Rabins.
- Cost guides may explain drivers, scopes and estimate comparison without claiming company price ranges.
- Existing portfolio images may illustrate a design principle but may not be described as proof of an undocumented project.
- Regulations, programs, safety guidance and time-sensitive figures require current primary sources.
- Each guide must own a distinct search intent and link to one relevant service plus an earlier live Journal guide.
- Any guide that fails validation stays out of the build.

## Validation

```bash
npm run content:validate
npm run build -- --force
npm run content:validate-build
```

Validation checks queue uniqueness, schedule order, internal links, frontmatter, sources, article length, unsafe markup and suspiciously similar bodies. The production build is the final check that future-dated routes and the sitemap behave correctly.

## Ongoing operating rhythm

- Daily: refresh Search Console and GA4, rebuild, and release the next eligible guide.
- Weekly: inspect indexing, impressions, clicks, conversions and pages approaching positions 4–20.
- Monthly: refresh keyword volumes, improve emerging pages, check query ownership and pause weak or duplicative topics.
- After 90 days: consolidate, expand or prune from observed search and lead evidence rather than publishing another batch by default.
