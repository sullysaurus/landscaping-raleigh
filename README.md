# Garden & Art Landscapes

Astro website for Garden & Art Landscapes, a licensed landscape design and installation company serving Raleigh and the Triangle.

## Local development

Requires Node.js 22 or newer.

```bash
npm install
npm run dev
```

The local site runs at `http://localhost:4321`.

## Production build

```bash
npm run build
npm run preview
```

Astro writes the static site to `dist/`.

## Project structure

- `src/pages/` contains the homepage and thank-you route.
- `src/layouts/` contains the shared document layout and metadata.
- `src/components/` contains reusable interface elements.
- `src/styles/global.css` contains the design system and responsive styles.
- `public/` contains project photography, artwork, icons, and the web manifest.

## Contact form

The inquiry form uses Netlify Forms with a honeypot field for spam prevention. Successful submissions redirect to `/thank-you/`.

After deploying to Netlify:

1. Open the site’s **Forms** tab and enable form detection.
2. Redeploy the site so Netlify scans the static form.
3. Confirm the `contact` form appears under Active forms.
4. Submit a realistic test and check both **Verified** and **Spam** submissions.
5. Add an email notification under **Configuration → Notifications → Form submission notifications**.

The form only works when the site is deployed through Netlify or another host configured to process Netlify Forms.

## Deployment

The site is configured as a static Astro build:

- Build command: `npm run build`
- Publish directory: `dist`

The canonical production URL is configured in `astro.config.mjs`.
