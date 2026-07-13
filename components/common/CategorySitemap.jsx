"use client";
import Link from "next/link";
import { useQuery, gql } from "@apollo/client";

const CATEGORIES_WITH_CHILDREN = gql`
  query CategoriesWithChildren {
    categories(parent: null) {
      id
      name
      slug
      children {
        id
        name
        slug
      }
    }
  }
`;

export default function CategorySitemap() {
  const { data, loading } = useQuery(CATEGORIES_WITH_CHILDREN);
  const categories = data?.categories ?? [];

  if (loading || !categories.length) return null;

  return (
    <section className="tf-sp-2 pt-0 category-sitemap-section">
      <div className="container">
        <div className="category-sitemap-header mb-4">
          <h5 className="fw-semibold mb-1">Browse All Categories</h5>
          <p className="body-text-3 text-main-2 mb-0">Find products across all our departments</p>
        </div>
        <div className="row g-4">
          {categories.map((cat) => (
            <div key={cat.id} className="col-xl-3 col-lg-4 col-md-6 col-12">
              <div className="sitemap-cat-block">
                <Link href={`/products/${cat.slug}`} className="sitemap-cat-title">
                  <span className="icon icon-arrow-right me-1" />
                  {cat.name}
                </Link>
                {cat.children?.length > 0 && (
                  <ul className="sitemap-sub-list mt-2">
                    {cat.children.map((child) => (
                      <li key={child.id}>
                        <Link href={`/products/${child.slug}`} className="sitemap-sub-link">
                          {child.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
