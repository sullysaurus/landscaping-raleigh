# Garden & Art Landscapes SEO Audit

Audited: July 14, 2026

Domain: `https://www.landscapingraleigh.com/`

Scope: current Astro production build, live Netlify site, public local-search signals

## Executive summary

The current build has a solid technical and on-page foundation. Its provisional SEO health score is **73/100**, up from the earlier pre-fix score of 53/100. The live website is still serving the older build, however, so Google and social platforms cannot benefit from most of the improvements until the current branch is merged and deployed.

| Category | Current build |
| --- | ---: |
| Technical SEO | 82/100 |
| Content quality | 72/100 |
| On-page SEO | 82/100 |
| Structured data | 82/100 |
| Performance | 60/100 |
| AI search readiness | 48/100 |
| Images | 65/100 |

## Fixed in the current build

- Canonical URLs now use the indexed `www.landscapingraleigh.com` domain.
- Homepage title and description target Raleigh landscape design and Triangle services.
- The page has one H1 and a clear H2/H3 hierarchy.
- `robots.txt` and a valid XML sitemap are included.
- The sitemap includes the homepage and privacy page and excludes noindexed routes.
- Homepage schema now identifies a `HomeAndConstructionBusiness`, Norman Rabins, the website, five service areas and the offered services.
- A privacy page is linked beside the inquiry form and in the footer.
- The proposal and thank-you pages use `noindex, follow`.
- Open Graph and X/Twitter metadata now include the canonical URL, site name, locale, secure image URL, image type, dimensions and descriptive image alt text.
- The current 1,774 × 887 hero image is large enough to produce a useful social preview.
- All 29 rendered images include alt attributes and intrinsic width and height.
- The hero image is a real high-priority image rather than a CSS background.
- The 2.2 MB lighting PNG was replaced with a roughly 396 KB JPEG.
- Netlify security headers, asset caching rules and direct apex-to-`www` redirects are included.
- License wording now clearly associates `#1901` with the NC landscape contractor credential.

## Critical live-site discrepancy

Production is still serving the older site. Current live checks found:

- The live canonical and social-image URLs still point to `gardenandartlandscapes.com`.
- `/robots.txt` returns `404`.
- `/sitemap.xml` returns `404`.
- `/privacy/` is not deployed.
- No JSON-LD is live.
- The new security and cache rules are not live.

Deploying the current build fixes these items together. After deployment, recrawl the homepage, robots file, sitemap and privacy page before submitting the sitemap in Search Console.

## Remaining work

### Owner or account access required

1. Verify the website in Google Search Console and submit `https://www.landscapingraleigh.com/sitemap.xml`.
2. Set up GA4 and track form submissions, phone taps and email clicks.
3. Claim or verify the Google Business Profile and confirm the primary category, hours, service areas, services, website and photos.
4. Confirm whether customers visit a staffed business location. If this is a home-based service-area business, hide the street address on Google and consider showing only Raleigh, NC on the website.
5. Resolve the address conflict between `4909 Wood Valley Drive` and older listings using `5732 N Hawthorne Way`.
6. Verify that license `#1901`, bonding and insurance claims are current.
7. Confirm owned social and directory profile URLs before adding `sameAs` schema.
8. Correct the authoritative name, address policy and phone across BBB, Bing Places, Apple Business, Porch, Yelp, Houzz, Angi and Yellow Pages.

### Content and authority work

1. Create focused Raleigh service pages for landscape design, hardscaping, irrigation/drainage, outdoor lighting and garden maintenance.
2. Turn existing photography into project case studies with location, challenge, approach and result.
3. Add genuine reviews or testimonials and link to license verification.
4. Explain the inquiry process, expected response time, project fit and typical timeline.
5. Publish two useful local pieces per month, alternating a project story with a homeowner guide.
6. Add a focused About page for Norman and a separate Garden Art page when the content schedule allows.

### Performance and sharing improvements

1. The image library is still about 11 MB. Generate responsive AVIF/WebP variants and `srcset` values through Astro’s image pipeline.
2. Target roughly 150–300 KB for the hero and under 200 KB for most delivered gallery variants.
3. A dedicated branded 1,200 × 630 social card would improve brand recognition, although the current hero image and metadata are technically usable.
4. Verify the deployed preview with Facebook Sharing Debugger and LinkedIn Post Inspector.
5. Confirm all domain variants redirect to the canonical `https://www.landscapingraleigh.com/` URL in one hop after deployment.

## Recommended order

1. Merge and deploy the current build.
2. Verify Search Console, submit the sitemap and set up analytics conversions.
3. Verify and complete the Google Business Profile.
4. Confirm address policy, hours, license and owned profile URLs.
5. Publish service pages, reviews and case studies.
6. Add responsive image formats and a branded social card.

## Audit limitations

No authenticated Search Console, GA4 or Google Business Profile data was available. Live Core Web Vitals, index coverage, query performance, map rankings, review velocity and a comprehensive backlink profile must be assessed after deployment and account access.
