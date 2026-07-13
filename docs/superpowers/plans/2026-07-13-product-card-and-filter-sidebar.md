# Product Card Redesign + Category Filter Sidebar Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign `RealProductCard` with visible CTA buttons and add a persistent left filter sidebar to every `products/[category]` page.

**Architecture:** Three files change. `RealProductCard` loses its icon overlays and gains a bottom button row — "Add to Cart" when `price > 0`, "Get a Quote" otherwise. A new `useCategoryFilter` hook holds filter criteria state (no product arrays). `CategoryProductsPageClient` renders a permanent desktop sidebar using that hook + `FilterOptions`. `ProductsGrid` receives `filterCriteria` and applies client-side price filtering to whatever GraphQL returns.

**Tech Stack:** Next.js 13+ App Router, React hooks, existing `useContextElement`, existing `FilterOptions` component, existing CSS utility classes (`tf-btn`, `btn-fill`, `btn-outline`).

## Global Constraints

- No new npm packages.
- Keep existing `AddToCart.jsx` and `RequestQuoteButton.jsx` files — they are used elsewhere. Do NOT delete them.
- `FilterOptions` expects `allProps` with exact shape documented in Task 2. Do not change `FilterOptions.jsx`.
- Price default sentinel: `[0, 999999]` — filter is considered inactive when `price[1] === 999999`.
- Client-side price filtering uses `product.salePrice || product.price` as effective price.

---

### Task 1: Redesign `RealProductCard`

**Files:**
- Modify: `components/productCards/RealProductCard.jsx`

**Interfaces:**
- Consumes: `useContextElement()` → `{ addProductToCart, isAddedToCartProducts, setQuoteProduct }`
- Consumes: `formatPrice(price)` from `@/utlis/price`
- Consumes: `backendImageUrl(image)` from `@/graphql/imageUrl`
- No new exports. Same default export `RealProductCard({ product })`.

- [ ] **Step 1: Replace the file contents**

```jsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { useContextElement } from "@/context/Context";
import { backendImageUrl } from "@/graphql/imageUrl";
import { formatPrice } from "@/utlis/price";

export default function RealProductCard({ product }) {
  const { addProductToCart, isAddedToCartProducts, setQuoteProduct } =
    useContextElement();

  const price = product.salePrice || product.price;
  const hasPrice = typeof price === "number" && price > 0;
  const hasDiscount = Boolean(
    product.salePrice &&
      product.regularPrice &&
      product.salePrice < product.regularPrice
  );

  return (
    <div className="card-product style-border d-flex flex-column">
      <div className="card-product-wrapper">
        <Link href={`/product/${product.slug}`} className="card-image d-block">
          <Image
            alt={product.name}
            className="lazyload img-product"
            src={backendImageUrl(product.image)}
            width={300}
            height={300}
          />
        </Link>
      </div>
      <div className="card-product-info d-flex flex-column flex-grow-1">
        <div className="box-title gap-xl-12 flex-grow-1">
          <h6>
            <Link
              href={`/product/${product.slug}`}
              className="name-product fw-semibold text-secondary link"
            >
              {product.name}
            </Link>
          </h6>
          {hasPrice && (
            <p className="price-wrap fw-medium mt-1">
              <span className="new-price h5 fw-normal text-primary mb-0">
                {formatPrice(price)}
              </span>
              {hasDiscount && (
                <span className="old-price price-text text-main-2 ms-2">
                  ${product.regularPrice.toFixed(2)}
                </span>
              )}
            </p>
          )}
        </div>
        <div className="mt-2">
          {hasPrice ? (
            <a
              href="#shoppingCart"
              data-bs-toggle="offcanvas"
              onClick={() => addProductToCart(product)}
              className="tf-btn btn-fill w-100 justify-content-center"
            >
              <span className="caption text-white">
                {isAddedToCartProducts(product.id) ? "Added to Cart" : "Add to Cart"}
              </span>
            </a>
          ) : (
            <a
              href="#requestQuote"
              data-bs-toggle="modal"
              onClick={() => setQuoteProduct(product)}
              className="tf-btn btn-outline w-100 justify-content-center"
            >
              <span className="caption">Get a Quote</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify the card renders in the browser**

Navigate to any `/products/[category]` page. Confirm:
- No hover icon buttons appear
- Products with `price > 0` show the price + "Add to Cart" button
- Products with `price = 0` or no price show "Get a Quote" button
- Clicking "Add to Cart" opens the cart offcanvas
- Clicking "Get a Quote" opens the quote modal

- [ ] **Step 3: Commit**

```bash
git add components/productCards/RealProductCard.jsx
git commit -m "feat: redesign product card with visible CTA buttons"
```

---

### Task 2: Add `useCategoryFilter` hook

**Files:**
- Create: `hooks/useCategoryFilter.js`

**Interfaces:**
- Produces: `useCategoryFilter()` → `{ filterProps, filterCriteria }`
  - `filterProps` — full `allProps` object consumed by `FilterOptions`
  - `filterCriteria` — `{ price: [number, number], brands: string[] }` consumed by `ProductsGrid`

`allProps` shape (exact keys `FilterOptions` reads):
```js
{
  price: [number, number],   // default [0, 999999]
  isNew: "All" | true | false,
  deals: "All" | "All Discounts" | "Today's Deals",
  rating: "All" | number,
  brands: string[],
  setPrice: (value: [number, number]) => void,
  setDeals: (value: string) => void,
  setRating: (value: number | "All") => void,
  setIsNew: (value: boolean | "All") => void,
  setBrands: (brand: string) => void,
  removeBrand: (brand: string) => void,
  clearFilter: () => void,
}
```

- [ ] **Step 1: Create the hook**

```js
"use client";
import { useState } from "react";

const DEFAULT_PRICE = [0, 999999];

export function useCategoryFilter() {
  const [price, setPrice] = useState(DEFAULT_PRICE);
  const [isNew, setIsNew] = useState("All");
  const [deals, setDeals] = useState("All");
  const [rating, setRating] = useState("All");
  const [brands, setBrandsState] = useState([]);

  const setBrands = (brand) => {
    setBrandsState((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const removeBrand = (brand) => {
    setBrandsState((prev) => prev.filter((b) => b !== brand));
  };

  const handleSetDeals = (value) => {
    setDeals((prev) => (prev === value ? "All" : value));
  };

  const handleSetRating = (value) => {
    setRating((prev) => (prev === value ? "All" : value));
  };

  const clearFilter = () => {
    setPrice(DEFAULT_PRICE);
    setIsNew("All");
    setDeals("All");
    setRating("All");
    setBrandsState([]);
  };

  const filterProps = {
    price,
    isNew,
    deals,
    rating,
    brands,
    setPrice,
    setDeals: handleSetDeals,
    setRating: handleSetRating,
    setIsNew,
    setBrands,
    removeBrand,
    clearFilter,
  };

  const filterCriteria = { price, brands };

  return { filterProps, filterCriteria };
}
```

- [ ] **Step 2: Commit**

```bash
git add hooks/useCategoryFilter.js
git commit -m "feat: add useCategoryFilter hook for category page filter state"
```

---

### Task 3: Wire filter sidebar into `CategoryProductsPageClient`

**Files:**
- Modify: `components/products/CategoryProductsPageClient.jsx`

**Interfaces:**
- Consumes: `useCategoryFilter()` from `@/hooks/useCategoryFilter`
- Consumes: `FilterOptions` from `@/components/products/FilterOptions`
- Passes `filterCriteria` prop to `ProductsGrid`
- `NetworkCategorySidebar` moves into the shared left sidebar column

- [ ] **Step 1: Replace the file contents**

```jsx
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
```

- [ ] **Step 2: Verify layout in browser (desktop)**

Open any `/products/[category]` URL at viewport width ≥ 992px. Confirm:
- Left sidebar with "Filters" heading is visible
- Network categories also show `NetworkCategorySidebar` above the filters
- Product grid occupies the remaining right column

- [ ] **Step 3: Verify layout in browser (mobile)**

Resize to < 992px. Confirm:
- Sidebar is hidden
- "Filter" toggle button appears above the grid
- Tapping "Filter" opens the offcanvas panel with FilterOptions

- [ ] **Step 4: Commit**

```bash
git add components/products/CategoryProductsPageClient.jsx
git commit -m "feat: add persistent filter sidebar to category products page"
```

---

### Task 4: Apply filter criteria in `ProductsGrid`

**Files:**
- Modify: `components/products/ProductsGrid.jsx`

**Interfaces:**
- New prop: `filterCriteria?: { price: [number, number], brands: string[] }`
- Default: `undefined` — when absent, no client-side filtering (existing callers unaffected)
- Price filter active when `filterCriteria.price[1] < 999999`

- [ ] **Step 1: Add `filterCriteria` prop and apply price filter**

Replace the `export default function ProductsGrid({ categorySlug })` signature and the `products` derivation section. Full file:

```jsx
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

  const goToPage = (targetPage) => {
    if (targetPage < 1 || targetPage > totalPages || targetPage === page)
      return;
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
    return <p className="text-center py-5">No products found.</p>;
  }

  const visiblePages = getVisiblePages(page, totalPages);

  return (
    <>
      <div className="tf-grid-layout xxl-col-6 lg-col-4 md-col-3 sm-col-2 flat-grid-product wrapper-shop layout-tabgrid-1">
        {products.map((product) => (
          <RealProductCard key={product.id} product={product} />
        ))}
      </div>
      {totalPages > 1 && (
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
                <button
                  type="button"
                  onClick={() => goToPage(1)}
                  style={{ background: "none", border: "none" }}
                >
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
              {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
                <li>...</li>
              )}
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
    </>
  );
}
```

- [ ] **Step 2: Verify price filtering works**

On any category page, set a custom price range (e.g., $100 to $500) in the sidebar form and click "Go". Confirm the grid updates to show only products within that range. Reset filter and confirm all products return.

- [ ] **Step 3: Commit**

```bash
git add components/products/ProductsGrid.jsx
git commit -m "feat: apply client-side price filter in ProductsGrid"
```
