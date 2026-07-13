# Product Card Redesign + Category Filter Sidebar

**Date:** 2026-07-13

## Scope

Two changes:
1. Redesign `RealProductCard` — remove icon overlays, add visible CTA buttons
2. Add permanent filter sidebar to `products/[category]` page

---

## 1. Product Card (`RealProductCard.jsx`)

### Current behavior
- Image with hover-triggered icon overlays (AddToCart icon + RequestQuote icon)
- Product name and price below image

### New behavior
- Remove `ul.list-product-btn` overlay entirely
- Clean image area, no hover icons
- Below image: product name
- **If `price > 0`:** show formatted price + full-width "Add to Cart" button
- **If `price = 0` or no price:** hide price, show full-width "Get a Quote" button

### Button behavior
- "Add to Cart" uses existing `addProductToCart` from context, opens `#shoppingCart` offcanvas
- "Get a Quote" uses existing `setQuoteProduct` from context, opens `#requestQuote` modal
- Buttons are `<button>` or `<a>` elements rendered directly in card body — not icon anchors

---

## 2. Filter Sidebar (`products/[category]` page)

### Current behavior
- `CategoryProductsPageClient` has no filter state
- `ProductsGrid` fetches from GraphQL with category + page + search only
- `NetworkCategorySidebar` occupies `col-lg-3` for network categories only
- Non-network categories use `col-12` with no sidebar at all

### New behavior
- `CategoryProductsPageClient` gains `useReducer` filter state (same shape as `Products1`)
- Desktop: permanent `col-lg-3` left column renders `FilterOptions` for all categories
- Network categories: `NetworkCategorySidebar` moves inside or below `FilterOptions` in the same sidebar column
- Mobile: "Filter" toggle button above grid opens canvas offcanvas with `FilterOptions`
- `ProductsGrid` receives filter state as props, applies client-side filtering to products returned from current GraphQL page

### Layout
```
[col-lg-3: FilterOptions + NetworkCategorySidebar (if network)]  [col-lg-9: title + subcategory pills + ProductsGrid]
```

### Files changed
- `components/productCards/RealProductCard.jsx` — card redesign
- `components/products/CategoryProductsPageClient.jsx` — add filter state + sidebar layout
- `components/products/ProductsGrid.jsx` — accept + apply filter props
