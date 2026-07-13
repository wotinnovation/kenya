"use client";
import React, { Suspense } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Header5 from "@/components/headers/Header5";
import Topbar1 from "@/components/headers/Topbar1";
import Footer1 from "@/components/footers/Footer1";
import ProductsGrid from "@/components/products/ProductsGrid";
import { useCategoryBySlugQuery } from "@/graphql/generated";
import NetworkCategorySidebar, {
  isNetworkCategory,
} from "@/components/products/NetworkCategorySidebar";
import { NETWORK_TREE } from "@/utlis/networkTree";
import FilterOptions from "@/components/products/FilterOptions";
import { useCategoryFilter } from "@/hooks/useCategoryFilter";

export default function CategoryProductsPageClient() {
  const { category: categorySlug } = useParams();
  const { data, loading } = useCategoryBySlugQuery({
    variables: { slug: categorySlug },
  });

  const isNetwork = isNetworkCategory(categorySlug);
  const { filterProps, filterCriteria } = useCategoryFilter();

  let staticCategory = null;
  if (isNetwork) {
    if (categorySlug === NETWORK_TREE.slug) {
      staticCategory = {
        name: NETWORK_TREE.name,
        slug: NETWORK_TREE.slug,
        children: NETWORK_TREE.children,
      };
    } else {
      const sub = NETWORK_TREE.children.find((c) => c.slug === categorySlug);
      if (sub) {
        staticCategory = { name: sub.name, slug: sub.slug, children: [] };
      }
    }
  }

  const category = data?.category || staticCategory;

  return (
    <>
      <Topbar1 parentClass="tf-topbar" />
      <Header5 />
      <div className="tf-sp-1">
        <div className="container">
          <ul className="breakcrumbs">
            <li>
              <Link href="/" className="body-small link">
                Home
              </Link>
            </li>
            <li className="d-flex align-items-center">
              <i className="icon icon-arrow-right" />
            </li>
            <li>
              <Link href="/products" className="body-small link">
                Products
              </Link>
            </li>
            <li className="d-flex align-items-center">
              <i className="icon icon-arrow-right" />
            </li>
            <li>
              <span className="body-small">
                {loading && !category
                  ? ""
                  : (category?.name || categorySlug).replace(
                      /\s*\(.*\)\s*$/,
                      ""
                    )}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <section className="tf-sp-2">
        <div className="container">
          {!loading && !category && (
            <p className="text-center py-5">Category not found.</p>
          )}
          {category && (
            <div className="row g-4">
              {/* Left sidebar — always shown on desktop */}
              <div className="col-xl-3 col-lg-3 d-none d-lg-block">
                <div className="sidebar-filter-wrap">
                  {isNetwork && (
                    <div className="mb-4">
                      <NetworkCategorySidebar />
                    </div>
                  )}
                  <div className="card-sidebar bg-white p-3 border rounded-3">
                    <h6 className="fw-semibold mb-3 pb-2 border-bottom">
                      Filters
                    </h6>
                    <FilterOptions allProps={filterProps} />
                    <button
                      onClick={filterProps.clearFilter}
                      className="tf-btn btn-reset w-100 mt-3"
                    >
                      <span className="caption text-white">Reset Filters</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Main content */}
              <div className="col-xl-9 col-lg-9 col-12">
                {/* Mobile filter toggle */}
                <div className="d-flex d-lg-none mb-3">
                  <button
                    className="tf-btn-filter d-flex align-items-center gap-2"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#mobileFilterSidebar"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={20}
                      height={20}
                      fill="#121212"
                      viewBox="0 0 256 256"
                    >
                      <path d="M176,80a8,8,0,0,1,8-8h32a8,8,0,0,1,0,16H184A8,8,0,0,1,176,80ZM40,88H144v16a8,8,0,0,0,16,0V56a8,8,0,0,0-16,0V72H40a8,8,0,0,0,0,16Zm176,80H120a8,8,0,0,0,0,16h96a8,8,0,0,0,0-16ZM88,144a8,8,0,0,0-8,8v16H40a8,8,0,0,0,0,16H80v16a8,8,0,0,0,16,0V152A8,8,0,0,0,88,144Z" />
                    </svg>
                    <span className="body-md-2 fw-medium">Filter</span>
                  </button>
                </div>

                <div className="flat-title wow fadeInUp mb-4">
                  <h5 className="fw-semibold">
                    {category.name.replace(/\s*\(.*\)\s*$/, "")}
                  </h5>
                  {category.description && (
                    <p className="body-text-3 mt-2">{category.description}</p>
                  )}
                </div>

                {category?.children?.length > 0 && (
                  <ul
                    className="d-flex flex-wrap gap-2 mb-4"
                    style={{ listStyle: "none", padding: 0 }}
                  >
                    {category.children.map((child) => (
                      <li key={child.id || child.slug}>
                        <Link
                          href={`/products/${child.slug}`}
                          className="tf-btn btn-line"
                        >
                          {child.name.replace(/\s*\(.*\)\s*$/, "")}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}

                <Suspense
                  fallback={
                    <p className="text-center py-5">Loading products...</p>
                  }
                >
                  <ProductsGrid
                    categorySlug={categorySlug}
                    filterCriteria={filterCriteria}
                  />
                </Suspense>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Mobile filter offcanvas */}
      <div
        className="offcanvas offcanvas-start canvas-sidebar canvas-filter-product"
        id="mobileFilterSidebar"
        tabIndex="-1"
      >
        <div className="canvas-wrapper">
          <div className="canvas-header d-flex justify-content-between align-items-center">
            <h5 className="title mb-0">Filter</h5>
            <button
              className="icon-close link"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            />
          </div>
          <div className="canvas-body">
            <FilterOptions allProps={filterProps} />
          </div>
          <div className="canvas-bottom">
            <button
              onClick={filterProps.clearFilter}
              className="tf-btn btn-reset w-100"
              data-bs-dismiss="offcanvas"
            >
              <span className="caption text-white">Reset Filters</span>
            </button>
          </div>
        </div>
      </div>

      <Footer1 />
    </>
  );
}
