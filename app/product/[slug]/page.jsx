import ProductDetailContent from "@/components/product-detail/ProductDetailContent";
import { backendImageUrl } from "@/graphql/imageUrl";
import { SITE_URL, SITE_NAME } from "@/utlis/seo";

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
            slug
            description
            shortDescription
            metaTitle
            metaDescription
            image
            sku
            price
            regularPrice
            salePrice
            stock
            stockStatus
            brand { name }
            categories { name slug }
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
    return { title: `Product Not Found || ${SITE_NAME}` };
  }

  const title = product.metaTitle || `${product.name} || ${SITE_NAME}`;
  const description =
    product.metaDescription || product.shortDescription || undefined;
  const canonical = `${SITE_URL}/product/${product.slug || slug}`;
  const image = product.image ? [backendImageUrl(product.image)] : undefined;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      images: image,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image,
    },
  };
}

function buildProductJsonLd(product, slug) {
  const price = product.salePrice || product.price || product.regularPrice;
  const availability = "https://schema.org/InStock";

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.metaDescription || product.shortDescription || product.description || undefined,
    image: product.image ? [backendImageUrl(product.image)] : undefined,
    sku: product.sku || undefined,
    brand: product.brand?.name
      ? { "@type": "Brand", name: product.brand.name }
      : undefined,
    category: product.categories?.[0]?.name || undefined,
    offers: price
      ? {
          "@type": "Offer",
          url: `${SITE_URL}/product/${product.slug || slug}`,
          priceCurrency: "KES",
          price,
          availability,
        }
      : undefined,
  };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = await fetchProductMeta(slug);

  return (
    <>
      {product && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildProductJsonLd(product, slug)),
          }}
        />
      )}
      <ProductDetailContent slug={slug} />
    </>
  );
}
