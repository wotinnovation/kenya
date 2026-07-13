"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useProductsListQuery } from "@/graphql/generated";
import RealProductCard from "@/components/productCards/RealProductCard";
import ProductCardShimmer from "@/components/productCards/ProductCardShimmer";

const PAGE_SIZE = 18;
const MAX_VISIBLE_PAGES = 10;

function getVisiblePages(current, total) {
  if (total <= MAX_VISIBLE_PAGES) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  let start = Math.max(1, current - Math.floor(MAX_VISIBLE_PAGES / 2));
  let end = start + MAX_VISIBLE_PAGES - 1;
  if (end > total) {
    end = total;
    start = end - MAX_VISIBLE_PAGES + 1;
  }
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function applyFilters(products, filterCriteria) {
  if (!filterCriteria) return products;
  const { price } = filterCriteria;
  let result = products;
  if (price && price[1] < 999999) {
    result = result.filter((p) => {
      const effectivePrice = p.salePrice || p.price || 0;
      return effectivePrice >= price[0] && effectivePrice <= price[1];
    });
  }
  return result;
}

export default function ProductsGrid({ categorySlug, filterCriteria }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || undefined;

  const isGaming = categorySlug === "gaming-pc-and-case";
  const { data, loading, error } = useProductsListQuery({
    variables: {
      category: isGaming ? undefined : categorySlug,
      page,
      limit: PAGE_SIZE,
      search: isGaming ? (search ? `${search} Gaming` : "Gaming") : search,
      status: "publish",
    },
  });

  const rawProducts = data?.products?.products ?? [];
  const products = applyFilters(rawProducts, filterCriteria);
  const totalPages = data?.products?.pages ?? 1;
  const isFiltered = Boolean(filterCriteria && filterCriteria.price[1] < 999999);

  const goToPage = (targetPage) => {
    if (targetPage < 1 || targetPage > totalPages || targetPage === page) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(targetPage));
    router.push(`?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="tf-grid-layout xxl-col-6 lg-col-4 md-col-3 sm-col-2 flat-grid-product wrapper-shop layout-tabgrid-1">
        {Array.from({ length: PAGE_SIZE }, (_, i) => (
          <ProductCardShimmer key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center py-5 text-danger">
        Could not load products. Please try again.
      </p>
    );
  }

  if (!products.length) {
    return (
      <p className="text-center py-5">
        {isFiltered
          ? "No products match this price range on this page. Try adjusting the filter or go to a different page."
          : "No products found."}
      </p>
    );
  }

  const visiblePages = getVisiblePages(page, totalPages);

  return (
    <>
      <div className="tf-grid-layout xxl-col-6 lg-col-4 md-col-3 sm-col-2 flat-grid-product wrapper-shop layout-tabgrid-1">
        {products.map((product) => (
          <RealProductCard key={product.id} product={product} />
        ))}
      </div>
      {!isFiltered && totalPages > 1 && (
        <ul className="wg-pagination justify-content-center mt-5">
          <li className={page === 1 ? "disabled" : ""}>
            <button
              type="button"
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
              style={{ background: "none", border: "none" }}
              aria-label="Previous page"
            >
              <i className="icon icon-arrow-left-lg" />
            </button>
          </li>
          {visiblePages[0] > 1 && (
            <>
              <li>
                <button type="button" onClick={() => goToPage(1)} style={{ background: "none", border: "none" }}>
                  1
                </button>
              </li>
              {visiblePages[0] > 2 && <li>...</li>}
            </>
          )}
          {visiblePages.map((p) => (
            <li key={p} className={p === page ? "active" : ""}>
              <button
                type="button"
                onClick={() => goToPage(p)}
                style={{ background: "none", border: "none" }}
              >
                {p}
              </button>
            </li>
          ))}
          {visiblePages[visiblePages.length - 1] < totalPages && (
            <>
              {visiblePages[visiblePages.length - 1] < totalPages - 1 && <li>...</li>}
              <li>
                <button
                  type="button"
                  onClick={() => goToPage(totalPages)}
                  style={{ background: "none", border: "none" }}
                >
                  {totalPages}
                </button>
              </li>
            </>
          )}
          <li className={page === totalPages ? "disabled" : ""}>
            <button
              type="button"
              onClick={() => goToPage(page + 1)}
              disabled={page === totalPages}
              style={{ background: "none", border: "none" }}
              aria-label="Next page"
            >
              <i className="icon icon-arrow-right-lg" />
            </button>
          </li>
        </ul>
      )}
      {isFiltered && (
        <p className="text-center text-muted body-text-3 mt-4">
          Price filter applied — showing results from current page only.
        </p>
      )}
    </>
  );
}
