"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import { Navigation, Pagination } from "swiper/modules";
import AddToCart from "@/components/common/AddToCart";
import AddToWishlist from "@/components/common/AddToWishlist";
import RequestQuoteButton from "@/components/common/RequestQuoteButton";
import ProductCardShimmer from "@/components/productCards/ProductCardShimmer";
import { useCategoryBySlugQuery, useProductsListQuery } from "@/graphql/generated";
import { backendImageUrl } from "@/graphql/imageUrl";

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
                <div className="card-product">
                  <div className="card-product-wrapper">
                    <Link href={`/product/${product.slug}`} className="product-img">
                      <Image
                        className="img-product lazyload"
                        src={backendImageUrl(product.image)}
                        alt={product.name}
                        width={300}
                        height={300}
                      />
                    </Link>
                    <ul className="list-product-btn">
                      <li className="wishlist">
                        <AddToWishlist tooltipClass="tooltip-left" productId={product.id} />
                      </li>
                    </ul>
                  </div>
                  <div className="card-product-info">
                    <div className="box-title">
                      <div className="d-flex flex-column">
                        <Link
                          href={`/product/${product.slug}`}
                          className="name-product body-md-2 fw-semibold text-secondary link"
                        >
                          {product.name}
                        </Link>
                      </div>
                      <p className="price-wrap fw-medium">
                        <span className="new-price price-text fw-medium mb-0">
                          ${price.toFixed(2)}
                        </span>
                        {product.salePrice > 0 &&
                          product.regularPrice > product.salePrice && (
                            <span className="old-price body-md-2 text-main-2 fw-normal">
                              ${product.regularPrice.toFixed(2)}
                            </span>
                          )}
                      </p>
                      <div className="d-flex align-items-center gap-2 mt-2">
                        {price > 0 && (
                          <AddToCart tooltipClass="tooltip-left" product={product} />
                        )}
                        <RequestQuoteButton tooltipClass="tooltip-left" product={product} />
                      </div>
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
