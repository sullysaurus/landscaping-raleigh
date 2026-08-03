# Sitemap validation report

Checked August 3, 2026 after Google Search Console reported “Sitemap could not be read.”

## Result

The live sitemap is valid and publicly readable at:

`https://www.landscapingraleigh.com/sitemap.xml`

- HTTP status: 200
- Content type: `application/xml`
- XML parsing: valid
- Public URLs: 25
- HTTPS only: yes
- All 25 listed URLs: HTTP 200
- Googlebot user agent: receives the same sitemap with HTTP 200
- Robots reference: present at `https://www.landscapingraleigh.com/robots.txt`
- Non-www request: redirects to the canonical www sitemap
- No noindex dashboard, proposal or thank-you routes included

## Likely Search Console cause

The live file has no delivery or XML failure. The most likely causes are a temporary first-fetch error or submitting the sitemap under a property that does not exactly match `https://www.landscapingraleigh.com/`.

Use the verified URL-prefix property `https://www.landscapingraleigh.com/`, remove the failed sitemap entry if necessary, and submit `sitemap.xml` again.
