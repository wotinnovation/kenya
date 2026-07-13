"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import { Navigation, Pagination } from "swiper/modules";
import { useContextElement } from "@/context/Context";
import ProductCardShimmer from "@/components/productCards/ProductCardShimmer";
import { useCategoryBySlugQuery, useProductsListQuery } from "@/graphql/generated";
import { backendImageUrl } from "@/graphql/imageUrl";
import { formatPrice } from "@/utlis/price";

export default function CategoryProductsSwiper({
  categorySlug,
  limit = 10,
  parentClass = "tf-sp-2 pt-0",
}) {
  const isGaming = categorySlug === "gaming-pc-and-case";

  const { data: categoryData } = useCategoryBySlugQuery({
    variables: { slug: categorySlug },
  });
  const { data: productsData, loading } = useProductsListQuery({
    variables: {
      category: categorySlug,
      limit,
      status: "publish",
    },
  });

  const category = categoryData?.category;
  const products = productsData?.products?.products ?? [];

  const displayName =
    category?.name ||
    categorySlug
      .replace(/-/g, " ")
      .replace(/\band\b/g, "&")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const prevClass = `nav-prev-${categorySlug}`;
  const nextClass = `nav-next-${categorySlug}`;
  const dotsClass = `dots-${categorySlug}`;

  const { addProductToCart, isAddedToCartProducts, setQuoteProduct, setQuickviewProduct, addToWishlist, isAddedtoWishlist } = useContextElement();
  const hasPrice = (p) => typeof p === "number" && p > 0;

  if (loading) {
    return (
      <section className={parentClass}>
        <div className="container">
          <div className="flat-title wow fadeInUp" data-wow-delay="0s">
            <h5 className="fw-semibold">{displayName}</h5>
            <div className="d-flex align-items-center gap-3">
              <Link href={`/products/${categorySlug}`} className="link body-text-3">
                View all
              </Link>
              <div className="box-btn-slide relative">
                <div className={`swiper-button-prev nav-swiper nav-prev-products ${prevClass} swiper-button-disabled`}>
                  <i className="icon-arrow-left-lg" />
                </div>
                <div className={`swiper-button-next nav-swiper nav-next-products ${nextClass} swiper-button-disabled`}>
                  <i className="icon-arrow-right-lg" />
                </div>
              </div>
            </div>
          </div>
          <Swiper
            modules={[Navigation, Pagination]}
            pagination={{ clickable: true, el: `.${dotsClass}` }}
            navigation={{ prevEl: `.${prevClass}`, nextEl: `.${nextClass}` }}
            className="swiper tf-sw-products"
            breakpoints={{
              0: { slidesPerView: 2 },
              575: { slidesPerView: 3 },
              768: { slidesPerView: 4, spaceBetween: 20 },
              992: { slidesPerView: 5, spaceBetween: 30 },
              1200: { slidesPerView: 6, spaceBetween: 30 },
            }}
            spaceBetween={15}
          >
            {Array.from({ length: 6 }, (_, i) => (
              <SwiperSlide key={i} className="swiper-slide">
                <ProductCardShimmer />
              </SwiperSlide>
            ))}
            <div className={`d-flex d-xl-none sw-dot-default sw-pagination-products justify-content-center ${dotsClass}`} />
          </Swiper>
        </div>
      </section>
    );
  }

  if (!products.length) {
    return (
      <section className={parentClass}>
        <div className="container">
          <div className="flat-title wow fadeInUp" data-wow-delay="0s">
            <h5 className="fw-semibold">{displayName}</h5>
          </div>
          <div className="text-center py-5 border rounded-3">
            <p className="body-text-3 mb-0">Coming soon</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={parentClass}>
      <div className="container">
        <div className="flat-title wow fadeInUp" data-wow-delay="0s">
          <h5 className="fw-semibold">{displayName}</h5>
          <div className="d-flex align-items-center gap-3">
            <Link href={`/products/${categorySlug}`} className="link body-text-3">
              View all
            </Link>
            <div className="box-btn-slide relative">
              <div className={`swiper-button-prev nav-swiper nav-prev-products ${prevClass}`}>
                <i className="icon-arrow-left-lg" />
              </div>
              <div className={`swiper-button-next nav-swiper nav-next-products ${nextClass}`}>
                <i className="icon-arrow-right-lg" />
              </div>
            </div>
          </div>
        </div>
        <Swiper
          modules={[Navigation, Pagination]}
          pagination={{ clickable: true, el: `.${dotsClass}` }}
          navigation={{ prevEl: `.${prevClass}`, nextEl: `.${nextClass}` }}
          className="swiper tf-sw-products"
          breakpoints={{
            0: { slidesPerView: 2 },
            575: { slidesPerView: 3 },
            768: { slidesPerView: 4, spaceBetween: 20 },
            992: { slidesPerView: 5, spaceBetween: 30 },
            1200: { slidesPerView: 6, spaceBetween: 30 },
          }}
          spaceBetween={15}
        >
          {products.map((product) => {
            const price = product.salePrice || product.price;
            return (
              <SwiperSlide key={product.id} className="swiper-slide">
                <div className="card-product style-border d-flex flex-column">
                  <div className="card-product-wrapper">
                    <Link href={`/product/${product.slug}`} className="product-img d-block">
                      <Image
                        className="img-product lazyload"
                        src={backendImageUrl(product.image)}
                        alt={product.name}
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
                    <div className="box-title flex-grow-1">
                      <Link
                        href={`/product/${product.slug}`}
                        className="name-product body-md-2 fw-semibold text-secondary link"
                      >
                        {product.name}
                      </Link>
                      {hasPrice(price) && (
                        <p className="price-wrap fw-medium mt-1">
                          <span className="new-price price-text fw-medium mb-0">
                            {formatPrice(price)}
                          </span>
                          {product.salePrice > 0 && product.regularPrice > product.salePrice && (
                            <span className="old-price body-md-2 text-main-2 fw-normal ms-2">
                              ${product.regularPrice.toFixed(2)}
                            </span>
                          )}
                        </p>
                      )}
                    </div>
                    <div className="mt-2">
                      {hasPrice(price) ? (
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
              </SwiperSlide>
            );
          })}
          <div className={`d-flex d-xl-none sw-dot-default sw-pagination-products justify-content-center ${dotsClass}`} />
        </Swiper>
      </div>
    </section>
  );
}
