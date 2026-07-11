"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import { Navigation, Pagination } from "swiper/modules";
import AddToCart from "./AddToCart";
import AddToWishlist from "./AddToWishlist";
import RequestQuoteButton from "./RequestQuoteButton";
import { useProductsListQuery } from "@/graphql/generated";
import { backendImageUrl } from "@/graphql/imageUrl";
import { formatPrice } from "@/utlis/price";

export default function RecentProducts({
  parentClass = "tf-sp-2",
  fullWidth = false,
}) {
  const { data, loading } = useProductsListQuery({
    variables: { limit: 10, status: "publish" },
  });
  const products = data?.products?.products ?? [];

  if (loading || !products.length) {
    return null;
  }

  return (
    <section className={parentClass}>
      <div className={`container${fullWidth ? "-full" : ""}`}>
        <div className="flat-title wow fadeInUp" data-wow-delay="0s">
          <h5 className="fw-semibold">New Arrivals</h5>
          <div className="box-btn-slide relative">
            <div className="swiper-button-prev nav-swiper nav-prev-products snbp12">
              <i className="icon-arrow-left-lg" />
            </div>
            <div className="swiper-button-next nav-swiper nav-next-products snbn12">
              <i className="icon-arrow-right-lg" />
            </div>
          </div>
        </div>
        <Swiper
          className="swiper tf-sw-products"
          breakpoints={{
            0: { slidesPerView: 2 },
            575: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            992: {
              slidesPerView: 5,
              spaceBetween: 30,
            },
          }}
          spaceBetween={15}
          modules={[Navigation, Pagination]}
          pagination={{
            clickable: true,
            el: ".spd12",
          }}
          navigation={{
            prevEl: ".snbp12",
            nextEl: ".snbn12",
          }}
        >
          {products.map((product) => {
            const price = product.salePrice || product.price;
            return (
            <SwiperSlide className="swiper-slide" key={product.id}>
              <div className="card-product style-img-border">
                <div className="card-product-wrapper">
                  <Link
                    href={`/product/${product.slug}`}
                    className="product-img">
                    <Image
                      className="img-product lazyload"
                      src={backendImageUrl(product.image)}
                      alt={product.name}
                      width={300}
                      height={300}
                    />
                  </Link>
                  <ul className="list-product-btn">
                    <li className="d-none d-sm-block wishlist">
                      <AddToWishlist tooltipClass="tooltip-left" product={product} />
                    </li>
                  </ul>
                </div>
                <div className="card-product-info">
                  <div className="box-title">
                    <div className="d-flex flex-column">
                      <p className="caption text-main-2 font-2">
                        {product.categories?.[0]?.name}
                      </p>
                      <Link
                        href={`/product/${product.slug}`}
                        className="name-product body-md-2 fw-semibold text-secondary link"
                      >
                        {product.name}
                      </Link>
                    </div>
                    <p className="price-wrap fw-medium">
                      <span className="new-price price-text fw-medium">
                        {formatPrice(price)}
                      </span>
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
          <div className="d-flex d-lg-none sw-dot-default sw-pagination-products justify-content-center spd12" />
        </Swiper>
      </div>
    </section>
  );
}
