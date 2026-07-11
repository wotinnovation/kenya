import { SITE_URL } from "@/utlis/seo";
import {
  toValidDate,
  fetchProductChunk,
  fetchAllCategories,
} from "@/utlis/sitemapData";
import { buildUrlsetXml } from "@/utlis/sitemapXml";

export const revalidate = 3600;

async function buildEntries(id) {
  if (id === 0) {
    const categories = await fetchAllCategories();

    const staticRoutes = [
      { url: `${SITE_URL}/`, changeFrequency: "daily", priority: 1 },
      { url: `${SITE_URL}/products`, changeFrequency: "daily", priority: 0.9 },
    ];

    const categoryRoutes = categories
      .filter((c) => c?.slug)
      .map((c) => ({
        url: `${SITE_URL}/products/${c.slug}`,
        lastModified: toValidDate(c.createdAt),
        changeFrequency: "weekly",
        priority: 0.8,
      }));

    return [...staticRoutes, ...categoryRoutes];
  }

  const products = await fetchProductChunk(id);

  return products
    .filter((p) => p?.slug)
    .map((p) => ({
      url: `${SITE_URL}/product/${p.slug}`,
      lastModified: toValidDate(p.updatedAt),
      changeFrequency: "weekly",
      priority: 0.7,
    }));
}

export async function GET(request, { params }) {
  const { id: rawId } = await params;
  const id = parseInt(String(rawId).replace(/\.xml$/, ""), 10);

  if (Number.isNaN(id) || id < 0) {
    return new Response("Not found", { status: 404 });
  }

  const entries = await buildEntries(id);

  return new Response(buildUrlsetXml(entries), {
    headers: { "Content-Type": "application/xml" },
  });
}
