"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import { Pagination } from "swiper/modules";
import { useTopLevelCategoriesQuery } from "@/graphql/generated";
import { backendImageUrl } from "@/graphql/imageUrl";

const FALLBACK_IMAGES = Array.from(
  { length: 10 },
  (_, i) => `/images/collection/category-${i + 1}.png`
);

export default function Categories({ parentClass = "" }) {
  const { data, loading } = useTopLevelCategoriesQuery();
  const categories = data?.categories ?? [];

  if (loading) {
    return (
      <section className={parentClass}>
        <div className="container">
          <div className="flat-title wow fadeInUp" data-wow-delay="0s">
            <h5 className="fw-semibold">Product Category</h5>
          </div>
          <div
            className="box-btn-slide-2 sw-nav-effect wow fadeInUp"
            data-wow-delay="0s"
          >
            <Swiper
              className="swiper tf-sw-products slider-category"
              breakpoints={{
                0: { slidesPerView: 2 },
                575: { slidesPerView: 4 },
                768: { slidesPerView: 7 },
                992: { slidesPerView: 10 },
              }}
            >
              {Array.from({ length: 10 }, (_, i) => (
                <SwiperSlide className="swiper-slide" key={i}>
                  <div className="wg-cls-2">
                    <div className="image img-style-2 overflow-visible shimmer shimmer-card-image mb-0" />
                    <div className="shimmer shimmer-line w-60 mx-auto mt-2" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    );
  }

  if (!categories.length) {
    return null;
  }

  return (
    <section className={parentClass}>
      <div className="container">
        <div className="flat-title wow fadeInUp" data-wow-delay="0s">
          <h5 className="fw-semibold">Product Category</h5>
          <div className="box-btn-slide relative">
            <div className="swiper-button-prev nav-swiper nav-prev-products">
              <i className="icon-arrow-left-lg" />
            </div>
            <div className="swiper-button-next nav-swiper nav-next-products">
              <i className="icon-arrow-right-lg" />
            </div>
          </div>
        </div>
        <div
          className="box-btn-slide-2 sw-nav-effect wow fadeInUp"
          data-wow-delay="0s"
        >
          <Swiper
            className="swiper tf-sw-products slider-category"
            breakpoints={{
              0: { slidesPerView: 2 },
              575: {
                slidesPerView: 4,
              },
              768: {
                slidesPerView: 7,
              },
              992: {
                slidesPerView: 10,
              },
            }}
            modules={[Pagination]}
            pagination={{
              clickable: true,
              el: ".spd2",
            }}
          >
            {categories.map((item, index) => (
              <SwiperSlide className="swiper-slide" key={item.id}>
                <div className="wg-cls-2 hover-img">
                  <Link
                    href={`/products/${item.slug}`}
                    className="image img-style-2 overflow-visible"
                  >
                    <span className="tf-overlay" />
                    <Image
                      src={
                        item.image
                          ? backendImageUrl(item.image)
                          : FALLBACK_IMAGES[index % FALLBACK_IMAGES.length]
                      }
                      alt={item.name}
                      width={296}
                      height={296}
                    />
                  </Link>
                  <Link href={`/products/${item.slug}`} className="link body-text-3">
                    {item.name}
                  </Link>
                </div>
              </SwiperSlide>
            ))}
            <div className="d-flex d-xl-none sw-dot-default sw-pagination-products justify-content-center spd2" />
          </Swiper>
        </div>
      </div>
    </section>
  );
}
