import CategoryProductsPageClient from "@/components/products/CategoryProductsPageClient";
import { backendImageUrl } from "@/graphql/imageUrl";
import { SITE_URL, SITE_NAME } from "@/utlis/seo";
import { NETWORK_TREE } from "@/utlis/networkTree";

const GRAPHQL_BACKEND_URL =
  process.env.GRAPHQL_BACKEND_URL || "http://10.255.254.100:4401/gql";

async function fetchCategoryMeta(slug) {
  try {
    const res = await fetch(GRAPHQL_BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `query CategoryMeta($slug: String) {
          category(slug: $slug) {
            name
            slug
            description
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
    return json?.data?.category || null;
  } catch {
    return null;
  }
}

function findNetworkCategoryName(slug) {
  if (slug === NETWORK_TREE.slug) return NETWORK_TREE.name;
  const sub = NETWORK_TREE.children.find((c) => c.slug === slug);
  return sub?.name;
}

export async function generateMetadata({ params }) {
  const { category: slug } = await params;
  const category = await fetchCategoryMeta(slug);
  const canonical = `${SITE_URL}/products/${slug}`;

  if (!category) {
    const staticName = findNetworkCategoryName(slug);
    if (!staticName) {
      return { title: `Category Not Found || ${SITE_NAME}` };
    }
    const title = `${staticName} || ${SITE_NAME}`;
    return {
      title,
      alternates: { canonical },
      openGraph: { title, url: canonical, siteName: SITE_NAME },
    };
  }

  const title = category.metaTitle || `${category.name} || ${SITE_NAME}`;
  const description =
    category.metaDescription || category.description || undefined;
  const image = category.image ? [backendImageUrl(category.image)] : undefined;

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

export default function CategoryProductsPage() {
  return <CategoryProductsPageClient />;
}
