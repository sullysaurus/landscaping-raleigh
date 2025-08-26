export async function GET() {
  return new Response(
    `User-agent: *
Allow: /

Sitemap: https://gardenartlandscapes.com/sitemap-index.xml`,
    {
      headers: {
        'Content-Type': 'text/plain',
      },
    }
  );
}