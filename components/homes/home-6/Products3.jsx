"use client";
import { products27 } from "@/data/products";
import React from "react";
import { Grid, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import AddToCart from "@/components/common/AddToCart";
import AddToWishlist from "@/components/common/AddToWishlist";
import AddToQuickview from "@/components/common/AddToQuickview";
export default function Products3() {
  return (
    <section className="tf-sp-2 pt-0">
      <div className="container">
        <div className="flat-title wow fadeInUp" data-wow-delay="0s">
          <h5 className="fw-semibold">Consumer Electronics</h5>
          <div className="box-btn-slide relative">
            <div className="swiper-button-prev nav-swiper nav-prev-products snbp56">
              <i className="icon-arrow-left-lg" />
            </div>
            <div className="swiper-button-next nav-swiper nav-next-products snbn56">
              <i className="icon-arrow-right-lg" />
            </div>
          </div>
        </div>
        <div className="slider-wrap style-2">
          <div
            className="width-item-1 banner-product-2 d-none d-xl-block wow fadeInLeft"
            data-wow-delay="0s"
          >
            <a href="#" className="image h-100">
              <Image
                src="/images/banner/banner-8.jpg"
                alt=""
                className="lazyload"
                width={550}
                height={500}
              />
            </a>
          </div>
          <Swiper
            modules={[Grid, Navigation, Pagination]}
            grid={{ rows: 2, fill: "row" }}
            pagination={{
              clickable: true,
              el: ".spd56",
            }}
            navigation={{
              prevEl: ".snbp56",
              nextEl: ".snbn56",
            }}
            className="swiper tf-sw-products"
            breakpoints={{
              0: { slidesPerView: 2, grid: { rows: 2 } },
              575: { slidesPerView: 2, grid: { rows: 2 } },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
                grid: { rows: 2 },
              },
              992: {
                slidesPerView: 3,
                spaceBetween: 30,
                grid: { rows: 2 },
              },
            }}
            spaceBetween={15}
          >
            {products27.map((product) => (
              <SwiperSlide key={product.id} className="swiper-slide">
                <div
                  className={`card-product wow ${product.animation}`}
                  data-wow-delay={product.delay}
                >
                  <div className="card-product-wrapper">
                    <Link
                      href={`/product-detail/${product.id}`}
                      className="product-img"
                    >
                      <Image
                        className="img-product lazyload"
                        src={product.imgHover}
                        alt="image-product"
                        width={product.width}
                        height={product.height}
                      />
                    </Link>
                    <ul className="list-product-btn">
                      <li>
                        <AddToCart
                          tooltipClass="tooltip-left"
                          productId={product.id}
                        />
                      </li>
                      <li className="d-none d-sm-block wishlist">
                        <AddToWishlist
                          tooltipClass="tooltip-left"
                          productId={product.id}
                        />
                      </li>
                      <li>
                        <AddToQuickview
                          productId={product.id}
                          tooltipClass="tooltip-left"
                        />
                      </li>
                    </ul>
                  </div>
                  <div className="card-product-info">
                    <div className="box-title">
                      <div className="d-flex flex-column">
                        <p className="caption text-main-2 font-2">
                          {product.category}
                        </p>
                        <Link
                          href={`/product-detail/${product.id}`}
                          className="name-product body-md-2 fw-semibold text-secondary link"
                        >
                          {product.title}
                        </Link>
                      </div>
                      <p className="price-wrap fw-medium">
                        <span className="new-price price-text fw-medium mb-0">
                          ${product.price.toFixed(3)}
                        </span>
                        <span className="old-price body-md-2 text-main-2 fw-normal">
                          ${product.oldPrice.toFixed(3)}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className="d-flex d-lg-none sw-dot-default sw-pagination-products justify-content-center spd56" />
          </Swiper>
        </div>
      </div>
    </section>
  );
}
