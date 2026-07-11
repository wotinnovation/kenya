"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import Header5 from "@/components/headers/Header5";
import Topbar1 from "@/components/headers/Topbar1";
import Footer1 from "@/components/footers/Footer1";
import AddToCart from "@/components/common/AddToCart";
import RequestQuoteButton from "@/components/common/RequestQuoteButton";
import CategoryProductsSwiper from "@/components/common/CategoryProductsSwiper";
import ProductDetailShimmer from "@/components/product-detail/ProductDetailShimmer";
import { useProductBySlugQuery } from "@/graphql/generated";
import { backendImageUrl } from "@/graphql/imageUrl";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const { data, loading, error } = useProductBySlugQuery({
    variables: { slug },
  });
  const product = data?.product;
  const [activeImage, setActiveImage] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const images = product
    ? [product.image, ...(product.gallery || [])].filter(Boolean)
    : [];
  const currentImage = activeImage || images[0];
  const price = product?.salePrice || product?.price;
  const hasDiscount =
    product?.salePrice &&
    product?.regularPrice &&
    product.salePrice < product.regularPrice;

  return (
    <>
      <Topbar1 parentClass="tf-topbar" />
      <Header5 />
      <div className="tf-sp-1">
        <div className="container">
          <ul className="breakcrumbs">
            <li>
              <Link href={`/`} className="body-small link">
                {" "}
                Home{" "}
              </Link>
            </li>
            <li className="d-flex align-items-center">
              <i className="icon icon-arrow-right" />
            </li>
            <li>
              <Link href={`/products`} className="body-small link">
                {" "}
                Products{" "}
              </Link>
            </li>
            <li className="d-flex align-items-center">
              <i className="icon icon-arrow-right" />
            </li>
            <li>
              <span className="body-small">{loading ? "" : product?.name || slug}</span>
            </li>
          </ul>
        </div>
      </div>
      <section className="tf-sp-2">
        <div className="container">
          {loading && <ProductDetailShimmer />}
          {!loading && (error || !product) && (
            <p className="text-center py-5">Product not found.</p>
          )}
          {product && (
            <div className="row g-4">
              <div className="col-md-6">
                <div className="mb-3">
                  <Image
                    src={backendImageUrl(currentImage)}
                    alt={product.name}
                    width={600}
                    height={600}
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
                {images.length > 1 && (
                  <div className="d-flex gap-2 flex-wrap">
                    {images.map((img, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setActiveImage(img)}
                        style={{
                          border:
                            img === currentImage
                              ? "2px solid #333"
                              : "1px solid #ddd",
                          padding: 0,
                          background: "none",
                          cursor: "pointer",
                        }}
                      >
                        <Image
                          src={backendImageUrl(img)}
                          alt=""
                          width={80}
                          height={80}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="col-md-6">
                <h3 className="mb-2">{product.name}</h3>
                {product.brand && (
                  <p className="body-text-3 mb-2">Brand: {product.brand.name}</p>
                )}
                <p className="price-wrap fw-medium mb-3">
                  <span className="new-price h3 fw-normal text-primary mb-0">
                    ${typeof price === "number" ? price.toFixed(2) : price}
                  </span>
                  {hasDiscount && (
                    <span className="old-price price-text text-main-2 ms-2">
                      ${product.regularPrice.toFixed(2)}
                    </span>
                  )}
                </p>
                <p className="mb-3">
                  {product.stockStatus === "instock" ? (
                    <span className="text-success">
                      In stock{product.stock ? ` (${product.stock} available)` : ""}
                    </span>
                  ) : (
                    <span className="text-danger">Out of stock</span>
                  )}
                </p>
                {product.shortDescription && (
                  <p className="mb-3">{product.shortDescription}</p>
                )}
                {product.sku && (
                  <p className="body-text-3 mb-3">SKU: {product.sku}</p>
                )}
                <div className="d-flex align-items-center gap-3 mb-3">
                  <input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, Number(e.target.value)))
                    }
                    style={{ width: 70 }}
                  />
                  <AddToCart product={product} quantity={quantity} />
                  <RequestQuoteButton product={product} />
                </div>
                {product.categories?.length > 0 && (
                  <p className="body-text-3">
                    Categories:{" "}
                    {product.categories.map((c, i) => (
                      <React.Fragment key={c.id}>
                        <Link href={`/products/${c.slug}`} className="link">
                          {c.name}
                        </Link>
                        {i < product.categories.length - 1 ? ", " : ""}
                      </React.Fragment>
                    ))}
                  </p>
                )}
              </div>
              {product.description && (
                <div className="col-12 mt-4">
                  <h5>Description</h5>
                  <p>{product.description}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
      {product?.categories?.[0]?.slug && (
        <CategoryProductsSwiper categorySlug={product.categories[0].slug} />
      )}
      <Footer1 />
    </>
  );
}
