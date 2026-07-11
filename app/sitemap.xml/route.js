import { SITE_URL } from "@/utlis/seo";
import { countProductChunks } from "@/utlis/sitemapData";

export const revalidate = 3600;

export async function GET() {
  const productChunks = await countProductChunks();
  const chunkIds = Array.from({ length: productChunks + 1 }, (_, id) => id);

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${chunkIds
  .map((id) => `<sitemap><loc>${SITE_URL}/sitemap/${id}.xml</loc></sitemap>`)
  .join("\n")}
</sitemapindex>`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml" },
  });
}
