# Garden & Art Landscapes SEO Audit

Audited: July 14, 2026  
Scope: pre-launch Astro build, currently indexed website, and public local-search signals

## Executive summary

The redesigned site is a strong visual and brand foundation, with good metadata, original photography, clear contact actions, credible credentials, and search-friendly static HTML. Its biggest weakness is structural: one homepage is being asked to rank for eight services and several cities.

The provisional SEO health score is **53/100**. This is directional because the new site is not deployed, Search Console and analytics were not available, and live Core Web Vitals could not be measured.

| Category | Score |
| --- | ---: |
| Technical SEO | 59/100 |
| Content quality | 72/100 |
| On-page SEO | 65/100 |
| Structured data | 0/100 |
| Performance | 45/100 |
| AI search readiness | 40/100 |
| Images | 45/100 |

## Most important findings

### 1. Domain migration is the launch priority

Google currently indexes `https://www.landscapingraleigh.com/`, but the redesign generates canonical URLs for `https://gardenandartlandscapes.com/`. The proposed domain currently has no public DNS record. The live site's `robots.txt` also points to a sitemap on a third domain, `gardenartlandscapes.com`, while `/sitemap.xml` returns a 404.

The safest SEO choice is to keep `landscapingraleigh.com` as the primary domain and redirect the brand domain to it. If the client deliberately wants the new brand domain, deploy it first, redirect every old URL to its closest new equivalent with permanent 301 redirects, and verify both domains in Google Search Console.

### 2. Local business information is inconsistent

The new site uses `4909 Wood Valley Drive`; BBB and several older listings use `5732 N Hawthorne Way`. The business name also appears in more than one form. The phone number is consistent.

Confirm the authoritative business name and current address, then correct the major listings. If clients do not visit a staffed and signed business location, treat the company as a service-area business, hide the home address on Google, and consider removing it from the public website. Google explicitly requires service-area businesses that do not receive customers at their address to hide it.

### 3. Google Business Profile should come before a blog

The exact profile could not be verified in public search, so ownership and status must be checked while signed into Norman's Google account. Claiming or correcting the profile is the highest-value local growth action. Complete the services, service areas, hours, business description, photos, and website link; then establish a consistent review-request process.

Google says local visibility is primarily shaped by relevance, distance, and prominence, and that complete information, links, and reviews contribute to those signals.

### 4. The site needs dedicated revenue pages

The homepage contains approximately 493 rendered words and is the only indexable content page. Each service receives only one sentence, and all internal navigation points to page anchors. This makes it difficult to rank for searches such as “hardscaping Raleigh,” “rain garden installation Raleigh,” or “landscape lighting Raleigh.”

Create dedicated pages for:

- Landscape design in Raleigh
- Hardscaping and retaining walls
- Irrigation, rainwater, and drainage
- Outdoor landscape lighting
- Garden and lawn maintenance
- Sod installation

Each page should use original project photos, explain Norman's process, include Raleigh-specific expertise, show credentials and proof, answer common buying questions, and end with a clear inquiry action.

### 5. Technical foundations are incomplete

The Astro build succeeds and produces crawlable static HTML. Titles, descriptions, canonicals, social metadata, headings, the homepage image alt text, and the thank-you page's `noindex` directive are implemented well.

Before launch, add:

- A correct `robots.txt` and XML sitemap
- Local business and service JSON-LD, validated with Google's Rich Results Test
- Search Console and analytics
- A privacy page for the contact form
- Deployment redirects and security/cache headers

Do not copy the old site's unsupported `AggregateRating` markup unless the displayed review data is genuine, visible on the page, and eligible under Google's guidelines.

### 6. Images need another optimization pass

The 29 image assets total approximately 13.3 MB. The outdoor-lighting PNG alone is about 2.2 MB, portfolio images approach 1 MB each, and the HTML images do not include intrinsic width and height attributes. Convert large images to responsive AVIF/WebP variants, add `srcset`, `sizes`, width, and height, and serve the hero through an optimized image component rather than only as a CSS background.

## Content and trust opportunities

The strongest differentiator is Norman's combination of horticultural experience, sustainable practices, original art, and more than 20 years working in the Triangle. Preserve the brand-led hero, but make the supporting sentence explicitly say “landscape design, installation, and garden care in Raleigh.”

Turn project photos into individual case studies that explain the client's goal, site challenge, materials or plant choices, Norman's approach, location, and result. Add selected testimonials, a link to license verification, a clear description of what happens after an inquiry, and a domain-based email address when practical.

Start with Raleigh. Add Cary, Durham, Chapel Hill, or Holly Springs landing pages only when each page can contain distinct projects, testimonials, and genuinely local information. Avoid duplicated city pages.

## Recommended publishing cadence

- Google Business Profile: one useful update every two weeks; weekly is reasonable during the active season when there is real project news.
- Photos: add authentic before-and-after or finished-project photos after each completed project, or at least monthly.
- Reviews: ask every completed customer and respond promptly; never gate or incentivize reviews.
- Blog and case studies: two strong pieces per month, alternating a homeowner guide and a project story.
- Email: one seasonal newsletter per quarter with explicit opt-in. This is a retention and referral channel, not the first acquisition priority.

## Sources

- [Google: improve local ranking](https://support.google.com/business/answer/7091)
- [Google: service-area business rules](https://support.google.com/business/answer/9157481)
- [Google: Business Profile posts](https://support.google.com/business/answer/7342169)
- [Google: manage customer reviews](https://support.google.com/business/answer/3474050)
- [Google Search Central: LocalBusiness structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- [Google Search Central: sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)
- [Current indexed website](https://www.landscapingraleigh.com/)
- [BBB business profile](https://www.bbb.org/us/nc/raleigh/profile/landscape-design/garden-art-landscapes-0593-90123309)

## Audit limitations

The redesign was audited from source and its production build. The new domain was not live, and no Google Business Profile access, Search Console, analytics, backlink provider, real-user Core Web Vitals, or geo-grid ranking data was available. Scores should be refreshed after launch and again after 60–90 days of data collection.
