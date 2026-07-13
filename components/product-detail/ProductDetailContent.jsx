"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header5 from "@/components/headers/Header5";
import Topbar1 from "@/components/headers/Topbar1";
import Footer1 from "@/components/footers/Footer1";
import CategoryProductsSwiper from "@/components/common/CategoryProductsSwiper";
import ProductDetailShimmer from "@/components/product-detail/ProductDetailShimmer";
import { useProductBySlugQuery } from "@/graphql/generated";
import { useContextElement } from "@/context/Context";
import { backendImageUrl } from "@/graphql/imageUrl";
import { formatPrice } from "@/utlis/price";

export default function ProductDetailContent({ slug }) {
  const { data, loading, error } = useProductBySlugQuery({ variables: { slug } });
  const { addProductToCart, isAddedToCartProducts, setQuoteProduct } = useContextElement();
  const product = data?.product;
  const [activeImage, setActiveImage] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const images = product
    ? [product.image, ...(product.gallery || [])].filter(Boolean)
    : [];
  const currentImage = activeImage || images[0];
  const price = product?.salePrice || product?.price;
  const hasPrice = typeof price === "number" && price > 0;
  const hasDiscount = Boolean(
    product?.salePrice && product?.regularPrice && product.salePrice < product.regularPrice
  );
  const primaryCategory = product?.categories?.[0];
  const parentCategory = primaryCategory?.parent;

  return (
    <>
      <Topbar1 parentClass="tf-topbar" />
      <Header5 />

      {/* Breadcrumb */}
      <div className="tf-sp-1">
        <div className="container">
          <ul className="breakcrumbs">
            <li><Link href="/" className="body-small link">Home</Link></li>
            <li className="d-flex align-items-center"><i className="icon icon-arrow-right" /></li>
            <li><Link href="/products" className="body-small link">Products</Link></li>
            {parentCategory && (
              <>
                <li className="d-flex align-items-center"><i className="icon icon-arrow-right" /></li>
                <li>
                  <Link href={`/products/${parentCategory.slug}`} className="body-small link">
                    {parentCategory.name}
                  </Link>
                </li>
              </>
            )}
            {primaryCategory && (
              <>
                <li className="d-flex align-items-center"><i className="icon icon-arrow-right" /></li>
                <li>
                  <Link href={`/products/${primaryCategory.slug}`} className="body-small link">
                    {primaryCategory.name}
                  </Link>
                </li>
              </>
            )}
            <li className="d-flex align-items-center"><i className="icon icon-arrow-right" /></li>
            <li><span className="body-small">{loading ? "" : product?.name || slug}</span></li>
          </ul>
        </div>
      </div>

      {/* Section 1: Image + Product Info */}
      <section className="tf-sp-2">
        <div className="container">
          {loading && <ProductDetailShimmer />}
          {!loading && (error || !product) && (
            <p className="text-center py-5">Product not found.</p>
          )}
          {product && (
            <div className="row g-5">
              {/* Left: image gallery */}
              <div className="col-lg-6">
                <div className="mb-3 border rounded-3 overflow-hidden d-flex align-items-center justify-content-center" style={{ background: "#f8f9fa", minHeight: 380 }}>
                  <Image
                    src={backendImageUrl(currentImage)}
                    alt={product.name}
                    width={560}
                    height={560}
                    style={{ width: "100%", height: "auto", objectFit: "contain", maxHeight: 480 }}
                  />
                </div>
                {images.length > 1 && (
                  <div className="d-flex gap-2 flex-wrap">
                    {images.map((img, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setActiveImage(img)}
                        className="rounded-2 overflow-hidden"
                        style={{
                          border: img === currentImage ? "2px solid var(--primary)" : "1px solid #ddd",
                          padding: 0,
                          background: "none",
                          cursor: "pointer",
                          width: 72,
                          height: 72,
                        }}
                      >
                        <Image src={backendImageUrl(img)} alt="" width={72} height={72} style={{ objectFit: "contain", width: "100%", height: "100%" }} />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right: product info */}
              <div className="col-lg-6">
                {/* Category + name */}
                {product.categories?.length > 0 && (
                  <p className="body-text-3 mb-1">
                    {product.categories.map((c, i) => (
                      <React.Fragment key={c.id || c.slug}>
                        <Link href={`/products/${c.slug}`} className="link text-primary">
                          {c.name}
                        </Link>
                        {i < product.categories.length - 1 ? ", " : ""}
                      </React.Fragment>
                    ))}
                  </p>
                )}
                <h3 className="fw-semibold mb-3">{product.name}</h3>

                {/* Price */}
                <div className="mb-3 pb-3 border-bottom">
                  {hasPrice ? (
                    <div className="d-flex align-items-center gap-3">
                      <span className="h3 fw-bold text-primary mb-0">{formatPrice(price)}</span>
                      {hasDiscount && (
                        <span className="h5 fw-normal text-main-2 text-decoration-line-through mb-0">
                          {formatPrice(product.regularPrice)}
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="h5 fw-medium text-muted">Contact for price</span>
                  )}
                </div>

                {/* Quick specs table */}
                {(product.brand || product.sku || product.model || product.specifications?.length > 0) && (
                  <div className="mb-3 pb-3 border-bottom">
                    <table className="w-100" style={{ borderCollapse: "collapse" }}>
                      <tbody>
                        {product.brand && (
                          <tr>
                            <td className="fw-semibold body-text-3 py-1" style={{ width: "35%", color: "#555" }}>Brand</td>
                            <td className="body-text-3 py-1">{product.brand.name}</td>
                          </tr>
                        )}
                        {product.model && (
                          <tr>
                            <td className="fw-semibold body-text-3 py-1" style={{ color: "#555" }}>Model</td>
                            <td className="body-text-3 py-1">{product.model}</td>
                          </tr>
                        )}
                        {product.sku && (
                          <tr>
                            <td className="fw-semibold body-text-3 py-1" style={{ color: "#555" }}>SKU</td>
                            <td className="body-text-3 py-1">{product.sku}</td>
                          </tr>
                        )}
                        {product.specifications?.slice(0, 5).map((spec, i) => (
                          <tr key={i}>
                            <td className="fw-semibold body-text-3 py-1" style={{ color: "#555" }}>{spec.name}</td>
                            <td className="body-text-3 py-1">{spec.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Quantity + CTA */}
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div className="d-flex align-items-center border rounded-2 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="btn btn-light px-3 py-2 rounded-0 border-0"
                    >
                      −
                    </button>
                    <span className="px-3 fw-semibold">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="btn btn-light px-3 py-2 rounded-0 border-0"
                    >
                      +
                    </button>
                  </div>
                  {hasPrice ? (
                    <a
                      href="#shoppingCart"
                      data-bs-toggle="offcanvas"
                      onClick={() => addProductToCart(product, quantity)}
                      className="tf-btn btn-fill flex-grow-1 justify-content-center"
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
                      className="tf-btn btn-outline flex-grow-1 justify-content-center"
                    >
                      <span className="caption">Get a Quote</span>
                    </a>
                  )}
                </div>

                {/* Key features / short description */}
                {product.keyFeatures && (
                  <div className="mb-3">
                    <h6 className="fw-semibold mb-2">About this item</h6>
                    <ul className="mb-0" style={{ paddingLeft: "1.2rem" }}>
                      {(Array.isArray(product.keyFeatures)
                        ? product.keyFeatures
                        : String(product.keyFeatures).split(/\n|•/).map((s) => s.trim()).filter(Boolean)
                      ).map((f, i) => (
                        <li key={i} className="body-text-3 mb-1">{f}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {!product.keyFeatures?.length && product.shortDescription && (
                  <p className="body-text-3">{product.shortDescription}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Section 2: Description + Full Specs */}
      {product && (product.description || product.specifications?.length > 0) && (
        <section className="tf-sp-2 pt-0">
          <div className="container">
            <div className="row g-4">
              {product.description && (
                <div className={product.specifications?.length > 0 ? "col-lg-6" : "col-12"}>
                  <h5 className="fw-semibold mb-3">Description</h5>
                  <div className="body-text-3" style={{ whiteSpace: "pre-line" }}>
                    {product.description}
                  </div>
                </div>
              )}
              {product.specifications?.length > 0 && (
                <div className={product.description ? "col-lg-6" : "col-12"}>
                  <h5 className="fw-semibold mb-3">Specifications</h5>
                  <table className="table table-bordered w-100">
                    <tbody>
                      {product.specifications.map((spec, i) => (
                        <tr key={i}>
                          <td className="fw-semibold body-text-3" style={{ width: "40%" }}>{spec.name}</td>
                          <td className="body-text-3">{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Section 3: Related products */}
      {product?.categories?.[0]?.slug && (
        <CategoryProductsSwiper categorySlug={product.categories[0].slug} />
      )}

      <Footer1 />
    </>
  );
}
