import ProductDetailContent from "@/components/product-detail/ProductDetailContent";
import { backendImageUrl } from "@/graphql/imageUrl";

const GRAPHQL_BACKEND_URL =
  process.env.GRAPHQL_BACKEND_URL || "http://10.255.254.100:4401/gql";

async function fetchProductMeta(slug) {
  try {
    const res = await fetch(GRAPHQL_BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `query ProductMeta($slug: String) {
          product(slug: $slug) {
            name
            shortDescription
            metaTitle
            metaDescription
            image
          }
        }`,
        variables: { slug },
      }),
      cache: "no-store",
    });
    const json = await res.json();
    return json?.data?.product || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await fetchProductMeta(slug);

  if (!product) {
    return { title: "Product Not Found || Kenya Store" };
  }

  const title = product.metaTitle || `${product.name} || Kenya Store`;
  const description = product.metaDescription || product.shortDescription || undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: product.image ? [backendImageUrl(product.image)] : undefined,
    },
  };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  return <ProductDetailContent slug={slug} />;
}
