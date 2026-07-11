const GRAPHQL_BACKEND_URL =
  process.env.GRAPHQL_BACKEND_URL || "http://10.255.254.100:4401/gql";

export const PRODUCTS_PER_SITEMAP = 2000;

export function toValidDate(value) {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

async function graphqlFetch(query, variables) {
  try {
    const res = await fetch(GRAPHQL_BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 3600 },
    });
    const json = await res.json();
    return json?.data || null;
  } catch {
    return null;
  }
}

export async function fetchProductTotal() {
  const data = await graphqlFetch(`query SitemapProductTotal {
    products(page: 1, limit: 1) { total }
  }`);
  return data?.products?.total || 0;
}

const PRODUCT_CHUNK_QUERY = `query SitemapProducts($page: Int, $limit: Int) {
  products(page: $page, limit: $limit) {
    products { slug updatedAt }
  }
}`;

// The backend has no index supporting sort+skip on a 50k+ row collection,
// so deep-paginated queries intermittently hit MongoDB's in-memory sort
// limit and return null. Retry a few times before giving up on the chunk.
export async function fetchProductChunk(page, attempts = 3) {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const data = await graphqlFetch(PRODUCT_CHUNK_QUERY, {
      page,
      limit: PRODUCTS_PER_SITEMAP,
    });
    const products = data?.products?.products;
    if (products) return products;
  }
  return [];
}

export async function fetchAllCategories() {
  const data = await graphqlFetch(`query SitemapCategories {
    categories { slug createdAt }
  }`);
  return data?.categories || [];
}

export async function countProductChunks() {
  const total = await fetchProductTotal();
  return Math.max(1, Math.ceil(total / PRODUCTS_PER_SITEMAP));
}
