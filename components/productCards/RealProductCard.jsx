"use client";
import { useState, useMemo, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useContextElement } from "@/context/Context";
import { backendImageUrl } from "@/graphql/imageUrl";
import { formatPrice } from "@/utlis/price";

function findVariation(variations, selectedOptions) {
  if (!variations?.length || !selectedOptions) return null;
  return variations.find((v) =>
    v.attributes?.every((a) => selectedOptions[a.name] === a.option)
  ) ?? null;
}

export default function RealProductCard({ product }) {
  const {
    addProductToCart,
    isAddedToCartProducts,
    setQuoteProduct,
    setQuickviewProduct,
    addToWishlist,
    isAddedtoWishlist,
  } = useContextElement();

  const variationAttrs = useMemo(
    () => (product.attributes ?? []).filter((a) => a.variation && a.options?.length),
    [product.attributes]
  );

  const defaultSelected = useMemo(() => {
    const map = {};
    variationAttrs.forEach((a) => { map[a.name] = a.options[0]; });
    return map;
  }, [variationAttrs]);

  const [selectedOptions, setSelectedOptions] = useState(defaultSelected);
  const [hoverOptions, setHoverOptions] = useState(null);
  const [cycleIdx, setCycleIdx] = useState(0);
  const cycleTimer = useRef(null);

  const galleryImages = useMemo(() => {
    const imgs = [product.image, ...(product.gallery ?? [])].filter(Boolean);
    return [...new Set(imgs)];
  }, [product.image, product.gallery]);

  const startCycle = useCallback(() => {
    if (galleryImages.length < 2) return;
    let idx = 0;
    cycleTimer.current = setInterval(() => {
      idx = (idx + 1) % galleryImages.length;
      setCycleIdx(idx);
    }, 800);
  }, [galleryImages]);

  const stopCycle = useCallback(() => {
    if (cycleTimer.current) {
      clearInterval(cycleTimer.current);
      cycleTimer.current = null;
    }
    setCycleIdx(0);
  }, []);

  const activeOptions = hoverOptions ?? selectedOptions;
  const activeVariation = findVariation(product.variations, activeOptions);

  const baseImage = activeVariation?.image || product.image;
  const displayImage = hoverOptions == null && !activeVariation && galleryImages.length > 1
    ? galleryImages[cycleIdx]
    : baseImage;
  const basePrice = product.salePrice || product.price;
  const activePrice = activeVariation
    ? (activeVariation.salePrice || activeVariation.price || basePrice)
    : basePrice;
  const activeRegular = activeVariation?.regularPrice || product.regularPrice;

  const hasPrice = typeof activePrice === "number" && activePrice > 0;
  const hasDiscount = hasPrice && activeRegular && activePrice < activeRegular;

  const selectOption = (name, option) => {
    setSelectedOptions((prev) => ({ ...prev, [name]: option }));
  };

  const cartProduct = activeVariation
    ? { ...product, image: activeVariation.image || product.image, price: activePrice, salePrice: activeVariation.salePrice, selectedOptions }
    : product;

  return (
    <div
      className="card-product style-border d-flex flex-column"
      onMouseEnter={startCycle}
      onMouseLeave={stopCycle}
    >
      <div className="card-product-wrapper">
        <Link href={`/product/${product.slug}`} className="card-image d-block">
          <Image
            alt={product.name}
            className="lazyload img-product"
            src={backendImageUrl(displayImage)}
            width={300}
            height={300}
          />
        </Link>
        <ul className="list-product-btn">
          <li>
            <a
              href="#realProductQuickview"
              data-bs-toggle="modal"
              onClick={() => setQuickviewProduct(product)}
              className="box-icon quickview btn-icon-action hover-tooltip tooltip-left"
            >
              <span className="icon icon-view" />
              <span className="tooltip">Quick View</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); addToWishlist(product); }}
              className="box-icon wishlist btn-icon-action hover-tooltip tooltip-left"
            >
              <span className={`icon ${isAddedtoWishlist(product.id) ? "icon-trash" : "icon-heart2"}`} />
              <span className="tooltip">{isAddedtoWishlist(product.id) ? "Remove" : "Wishlist"}</span>
            </a>
          </li>
        </ul>
      </div>

      <div className="card-product-info d-flex flex-column flex-grow-1">
        <div className="box-title gap-xl-12 flex-grow-1">

          {/* Brand + stock row */}
          <div className="d-flex align-items-center justify-content-between mb-1">
            {product.brand?.name && (
              <span className="card-brand-label">{product.brand.name}</span>
            )}
            {product.stockStatus === "instock" && (
              <span className="card-stock-badge instock ms-auto">In Stock</span>
            )}
            {product.stockStatus === "onbackorder" && (
              <span className="card-stock-badge backorder ms-auto">On Order</span>
            )}
          </div>

          <h6>
            <Link
              href={`/product/${product.slug}`}
              className="name-product fw-semibold text-secondary link"
            >
              {product.name}
            </Link>
          </h6>

          {(product.sku || product.model) && (
            <p className="card-sku mb-0">
              {product.model && <span>Model: {product.model}</span>}
              {product.model && product.sku && <span className="mx-1">·</span>}
              {product.sku && <span>SKU: {product.sku}</span>}
            </p>
          )}

          {hasPrice && (
            <p className="price-wrap fw-medium mt-1 mb-0">
              <span className="new-price h5 fw-normal text-primary mb-0">
                {formatPrice(activePrice)}
              </span>
              {hasDiscount && (
                <span className="old-price price-text text-main-2 ms-2">
                  ${activeRegular.toFixed(2)}
                </span>
              )}
              {!hasPrice && product.priceRange?.display && (
                <span className="body-text-3 text-main-2">{product.priceRange.display}</span>
              )}
            </p>
          )}

          {variationAttrs.length > 0 && (
            <div className="card-variations mt-2">
              {variationAttrs.map((attr) => (
                <div key={attr.name} className="variation-row mb-1">
                  <span className="variation-attr-label">{attr.name}:</span>
                  <div className="d-flex flex-wrap gap-1 mt-1">
                    {attr.options.map((option) => {
                      const isSelected = selectedOptions[attr.name] === option;
                      const isHovered = hoverOptions?.[attr.name] === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          className={`variation-chip${isSelected ? " active" : ""}${isHovered ? " hovered" : ""}`}
                          onClick={() => selectOption(attr.name, option)}
                          onMouseEnter={() => setHoverOptions({ ...selectedOptions, [attr.name]: option })}
                          onMouseLeave={() => setHoverOptions(null)}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {product.specifications?.length > 0 && (
            <table className="card-specs-table mt-2">
              <tbody>
                {product.specifications.slice(0, 6).map((spec) => (
                  <tr key={spec.name}>
                    <td className="spec-label">{spec.name}:</td>
                    <td className="spec-value">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {product.shortDescription && (
            <p className="card-short-desc mt-2 mb-0">
              {product.shortDescription.replace(/<[^>]*>/g, "").slice(0, 100)}
              {product.shortDescription.replace(/<[^>]*>/g, "").length > 100 ? "…" : ""}
            </p>
          )}
        </div>

        <div className="mt-2">
          {hasPrice ? (
            <a
              href="#shoppingCart"
              data-bs-toggle="offcanvas"
              onClick={() => addProductToCart(cartProduct)}
              className="card-product-cta-btn"
            >
              <span className="caption">
                {isAddedToCartProducts(product.id) ? "Added to Cart" : "Add to Cart"}
              </span>
            </a>
          ) : (
            <a
              href="#requestQuote"
              data-bs-toggle="modal"
              onClick={() => setQuoteProduct(product)}
              className="card-product-cta-btn"
            >
              <span className="caption">Get a Quote</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
