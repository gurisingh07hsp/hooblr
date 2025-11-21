export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

<url>
  <loc>https://www.hooblr.com/</loc>
  <lastmod>2025-11-21T06:16:27+00:00</lastmod>
  <priority>1.00</priority>
</url>
<url>
  <loc>https://www.hooblr.com/jobs</loc>
  <lastmod>2025-11-21T06:16:27+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://www.hooblr.com/login</loc>
  <lastmod>2025-11-21T06:16:27+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://www.hooblr.com/resources</loc>
  <lastmod>2025-11-21T06:16:27+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://www.hooblr.com/resume-builder</loc>
  <lastmod>2025-11-21T06:16:27+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://www.hooblr.com/interview-tips</loc>
  <lastmod>2025-11-21T06:16:27+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://www.hooblr.com/companies</loc>
  <lastmod>2025-11-21T06:16:27+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://www.hooblr.com/blog</loc>
  <lastmod>2025-11-21T06:16:27+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://www.hooblr.com/about</loc>
  <lastmod>2025-11-21T06:16:27+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://www.hooblr.com/mission</loc>
  <lastmod>2025-11-21T06:16:27+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://www.hooblr.com/careers</loc>
  <lastmod>2025-11-21T06:16:27+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://www.hooblr.com/contact</loc>
  <lastmod>2025-11-21T06:16:27+00:00</lastmod>
  <priority>0.80</priority>
</url>

</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
