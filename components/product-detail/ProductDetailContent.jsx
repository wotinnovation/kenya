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
  const { addProductToCart, isAddedToCartProducts, addToWishlist, isAddedtoWishlist } = useContextElement();
  const product = data?.product;
  const [activeImage, setActiveImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  const images = product ? [product.image, ...(product.gallery || [])].filter(Boolean) : [];
  const currentImage = activeImage || images[0];
  const price = product?.salePrice || product?.price;
  const hasPrice = typeof price === "number" && price > 0;
  const hasDiscount = Boolean(product?.salePrice && product?.regularPrice && product.salePrice < product.regularPrice);
  const primaryCategory = product?.categories?.[0];
  const parentCategory = primaryCategory?.parent;

  const [selectedVariations, setSelectedVariations] = useState({});
  const variationAttrs = product?.attributes?.filter((a) => a.variation && a.options?.length) ?? [];
  const dummyVariations = variationAttrs.length === 0
    ? [
        { name: "Color", options: ["Graphite Black", "Silver", "Space Grey"] },
        { name: "Storage", options: ["256GB", "512GB", "1TB"] },
      ]
    : [];
  const allVariations = [...variationAttrs, ...dummyVariations];

  const keyFeaturesList = product?.keyFeatures
    ? Array.isArray(product.keyFeatures)
      ? product.keyFeatures
      : String(product.keyFeatures).split(/\n|•/).map((s) => s.trim()).filter(Boolean)
    : [];

  const descriptionList = product?.description
    ? product.description.split(/\n|•|·|-(?=\s)/).map((s) => s.trim()).filter(Boolean)
    : [];

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
                <li><Link href={`/products/${parentCategory.slug}`} className="body-small link">{parentCategory.name}</Link></li>
              </>
            )}
            {primaryCategory && (
              <>
                <li className="d-flex align-items-center"><i className="icon icon-arrow-right" /></li>
                <li><Link href={`/products/${primaryCategory.slug}`} className="body-small link">{primaryCategory.name}</Link></li>
              </>
            )}
            <li className="d-flex align-items-center"><i className="icon icon-arrow-right" /></li>
            <li><span className="body-small">{loading ? "" : product?.name || slug}</span></li>
          </ul>
        </div>
      </div>

      {/* Main product section */}
      <section className="tf-sp-2">
        <div className="container">
          {loading && <ProductDetailShimmer />}
          {!loading && (error || !product) && (
            <p className="text-center py-5">Product not found.</p>
          )}
          {product && (
            <div className="row g-4">

              {/* Col 1: Image gallery */}
              <div className="col-lg-5">
                <div className="product-detail-gallery sticky-top" style={{ top: 80 }}>
                  <div className="main-image-wrap border rounded-3 overflow-hidden d-flex align-items-center justify-content-center mb-3"
                    style={{ background: "#ffffff", minHeight: 380 }}>
                    <Image
                      src={backendImageUrl(currentImage)}
                      alt={product.name}
                      width={560}
                      height={560}
                      style={{ width: "100%", height: "auto", objectFit: "contain", maxHeight: 460 }}
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
                            padding: 0, background: "none", cursor: "pointer", width: 72, height: 72,
                          }}
                        >
                          <Image src={backendImageUrl(img)} alt="" width={72} height={72}
                            style={{ objectFit: "contain", width: "100%", height: "100%" }} />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Col 2: Product info */}
              <div className="col-lg-4">
                {product.categories?.length > 0 && (
                  <p className="body-text-3 mb-1">
                    {product.categories.map((c, i) => (
                      <React.Fragment key={c.id || c.slug}>
                        <Link href={`/products/${c.slug}`} className="link text-primary">{c.name}</Link>
                        {i < product.categories.length - 1 ? ", " : ""}
                      </React.Fragment>
                    ))}
                  </p>
                )}

                <h4 className="fw-semibold mb-2">{product.name}</h4>

                {hasPrice && (
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <span className="h4 fw-bold text-primary mb-0">{formatPrice(price)}</span>
                    {hasDiscount && (
                      <span className="h6 fw-normal text-main-2 text-decoration-line-through mb-0">
                        {formatPrice(product.regularPrice)}
                      </span>
                    )}
                  </div>
                )}

                {/* Key details table */}
                {(product.brand || product.sku || product.model || product.specifications?.length > 0) && (
                  <div className="mb-3 pb-3 border-bottom">
                    <table className="w-100 product-detail-key-table">
                      <tbody>
                        {product.brand && (
                          <tr>
                            <td className="key-label">Brand</td>
                            <td className="key-value">{product.brand.name}</td>
                          </tr>
                        )}
                        {product.model && (
                          <tr>
                            <td className="key-label">Model</td>
                            <td className="key-value">{product.model}</td>
                          </tr>
                        )}
                        {product.sku && (
                          <tr>
                            <td className="key-label">SKU</td>
                            <td className="key-value">{product.sku}</td>
                          </tr>
                        )}
                        {product.specifications?.slice(0, 5).map((spec, i) => (
                          <tr key={i}>
                            <td className="key-label">{spec.name}</td>
                            <td className="key-value">{spec.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Variations */}
                {allVariations.length > 0 && (
                  <div className="mb-3 pb-3 border-bottom">
                    {allVariations.map((attr) => (
                      <div key={attr.name} className="mb-3">
                        <p className="body-text-3 fw-semibold mb-2">
                          {attr.name}
                          {selectedVariations[attr.name] && (
                            <span className="fw-normal text-main-2 ms-2">{selectedVariations[attr.name]}</span>
                          )}
                        </p>
                        <div className="d-flex flex-wrap gap-2">
                          {attr.options.map((option) => {
                            const isSelected = selectedVariations[attr.name] === option;
                            return (
                              <button
                                key={option}
                                type="button"
                                className={`variation-chip-detail${isSelected ? " active" : ""}`}
                                onClick={() => setSelectedVariations((prev) => ({ ...prev, [attr.name]: option }))}
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

                {/* About this item */}
                {keyFeaturesList.length > 0 && (
                  <div className="mb-3">
                    <h6 className="fw-semibold mb-2">About this item</h6>
                    <ul className="product-feature-list">
                      {keyFeaturesList.map((f, i) => (
                        <li key={i} className="body-text-3">{f}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {!keyFeaturesList.length && product.shortDescription && (
                  <p className="body-text-3 text-main-2"
                    dangerouslySetInnerHTML={{ __html: product.shortDescription }} />
                )}

                {/* About this product */}
                <div className="about-product-section mt-3 pt-3 border-top">
                  <h6 className="fw-semibold mb-3">About this product</h6>
                  <ul className="about-product-list">
                    <li><span className="body-text-3">Genuine product with full manufacturer warranty coverage</span></li>
                    <li><span className="body-text-3">Fast delivery available — ships within 1–3 business days</span></li>
                    <li><span className="body-text-3">30-day hassle-free return and refund policy</span></li>
                    <li><span className="body-text-3">Dedicated after-sales support team available Mon–Sat</span></li>
                    <li><span className="body-text-3">Secure checkout with buyer protection on all orders</span></li>
                  </ul>
                </div>
              </div>

              {/* Col 3: Sticky purchase sidebar */}
              <div className="col-lg-3">
                <div className="product-purchase-sidebar sticky-top border rounded-3 p-3" style={{ top: 80 }}>
                  {hasPrice ? (
                    <div className="h4 fw-bold text-primary mb-1">{formatPrice(price)}</div>
                  ) : (
                    <div className="h6 fw-medium text-muted mb-1">Contact for price</div>
                  )}

                  <p className="body-text-3 text-success mb-1 d-flex align-items-center gap-1">
                    <i className="icon-shipping" /> Free shipping
                  </p>

                  <div className="border-top pt-3 mt-2">
                    <p className="body-text-3 fw-semibold mb-2">Quantity</p>
                    <div className="d-flex align-items-center border rounded-2 overflow-hidden mb-3" style={{ width: "fit-content" }}>
                      <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="btn btn-light px-3 py-2 rounded-0 border-0">−</button>
                      <span className="px-3 fw-semibold">{quantity}</span>
                      <button type="button" onClick={() => setQuantity((q) => q + 1)}
                        className="btn btn-light px-3 py-2 rounded-0 border-0">+</button>
                    </div>

                    {hasPrice ? (
                      <>
                        <a href="#shoppingCart" data-bs-toggle="offcanvas"
                          onClick={() => addProductToCart(product, quantity)}
                          className="card-product-cta-btn mb-2">
                          <span className="caption">
                            {isAddedToCartProducts(product.id) ? "Added to Cart" : "Add to Cart"}
                          </span>
                        </a>
                        <a href="#shoppingCart" data-bs-toggle="offcanvas"
                          onClick={() => addProductToCart(product, quantity)}
                          className="card-product-cta-btn mb-2"
                          style={{ backgroundColor: "#121212", borderColor: "#121212" }}>
                          <span className="caption">Buy Now</span>
                        </a>
                      </>
                    ) : (
                      <a href="#shoppingCart" data-bs-toggle="offcanvas"
                        onClick={() => addProductToCart(product, quantity)}
                        className="card-product-cta-btn mb-2">
                        <i className="icon-cart" />
                        <span className="caption">
                          {isAddedToCartProducts(product.id) ? "Added to Cart" : "Get a Quote"}
                        </span>
                      </a>
                    )}

                    <button type="button" onClick={() => addToWishlist(product)}
                      className="tf-btn btn-line w-100 justify-content-center mb-3">
                      <span className={`icon ${isAddedtoWishlist(product.id) ? "icon-trash" : "icon-heart2"} me-1`} />
                      <span className="caption">{isAddedtoWishlist(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}</span>
                    </button>
                  </div>

                  <div className="border-top pt-3">
                    <p className="body-text-3 fw-semibold mb-1">Details</p>
                    <p className="body-text-3 text-main-2 mb-1">
                      Return policy: Eligible for Return, Refund or Replacement within 30 days of receipt
                    </p>
                    {product.stockStatus === "instock" && (
                      <p className="body-text-3 text-success mb-0">In Stock</p>
                    )}
                    {product.stockStatus === "outofstock" && (
                      <p className="body-text-3 text-danger mb-0">Out of Stock</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Tabs: Usually Bought Together | Description | Product Information | Reviews */}
      {product && (
        <section className="tf-sp-2 pt-0">
          <div className="container">
            <div className="product-detail-tabs">
              <ul className="product-detail-tab-nav d-flex gap-0 border-bottom mb-4">
                {[
                  { key: "together", label: "Usually Bought Together" },
                  { key: "description", label: "Description" },
                  { key: "information", label: "Product information" },
                  { key: "reviews", label: "Reviews" },
                ].map((tab) => (
                  <li key={tab.key}>
                    <button
                      type="button"
                      className={`product-detail-tab-btn${activeTab === tab.key ? " active" : ""}`}
                      onClick={() => setActiveTab(tab.key)}
                    >
                      {tab.label}
                    </button>
                  </li>
                ))}
              </ul>

              {activeTab === "together" && (
                <div className="py-3">
                  <p className="body-text-3 text-main-2">Related products coming soon.</p>
                </div>
              )}

              {activeTab === "description" && (
                <div className="py-2">
                  {descriptionList.length > 0 ? (
                    <ul className="product-feature-list">
                      {descriptionList.map((item, i) => (
                        <li key={i} className="body-text-3">{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="body-text-3 text-main-2">No description available.</p>
                  )}
                </div>
              )}

              {activeTab === "information" && (
                <div className="py-2">
                  {product.specifications?.length > 0 ? (
                    <table className="table table-bordered w-100" style={{ maxWidth: 600 }}>
                      <tbody>
                        {product.specifications.map((spec, i) => (
                          <tr key={i}>
                            <td className="fw-semibold body-text-3" style={{ width: "40%", background: "#f8f9fa" }}>{spec.name}</td>
                            <td className="body-text-3">{spec.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="body-text-3 text-main-2">No specifications available.</p>
                  )}
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="py-3">
                  <p className="body-text-3 text-main-2">No reviews yet.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Related products */}
      {product?.categories?.[0]?.slug && (
        <CategoryProductsSwiper categorySlug={product.categories[0].slug} />
      )}

      <Footer1 />
    </>
  );
}
