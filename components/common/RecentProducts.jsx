"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useProductsListQuery } from "@/graphql/generated";
import RealProductCard from "@/components/productCards/RealProductCard";
import ProductCardShimmer from "@/components/productCards/ProductCardShimmer";

export default function RecentProducts({
  parentClass = "tf-sp-2",
  fullWidth = false,
}) {
  const { data, loading } = useProductsListQuery({
    variables: { limit: 10, status: "publish" },
  });
  const products = data?.products?.products ?? [];

  if (!loading && !products.length) return null;

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
            575: { slidesPerView: 3 },
            768: { slidesPerView: 4, spaceBetween: 20 },
            992: { slidesPerView: 5, spaceBetween: 30 },
          }}
          spaceBetween={15}
          modules={[Navigation, Pagination]}
          pagination={{ clickable: true, el: ".spd12" }}
          navigation={{ prevEl: ".snbp12", nextEl: ".snbn12" }}
        >
          {loading
            ? Array.from({ length: 5 }, (_, i) => (
                <SwiperSlide key={i} className="swiper-slide" style={{ height: "auto", display: "flex" }}>
                  <ProductCardShimmer />
                </SwiperSlide>
              ))
            : products.map((product) => (
                <SwiperSlide key={product.id} className="swiper-slide" style={{ height: "auto", display: "flex" }}>
                  <RealProductCard product={product} />
                </SwiperSlide>
              ))}
          <div className="d-flex d-lg-none sw-dot-default sw-pagination-products justify-content-center spd12" />
        </Swiper>
      </div>
    </section>
  );
}
