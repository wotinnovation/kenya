"use client";

import { useEffect, useRef, useState } from "react";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import Drift from "drift-zoom";
import Image from "next/image";

const fallbackImages = [
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=652&q=80&fit=crop",
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=652&q=80&fit=crop",
  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=652&q=80&fit=crop",
  "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=652&q=80&fit=crop",
  "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=652&q=80&fit=crop",
];

export default function Slider1({ firstIamge, thumbImages = [] }) {
  const [swiperThumb, setSwiperThumb] = useState(null);
  const lightboxRef = useRef(null);

  const extras = thumbImages.length > 0 ? thumbImages : fallbackImages;
  const imageSrcs = [firstIamge || extras[0], ...extras.slice(0, 4)];

  const images = imageSrcs.map((src) => ({ src, color: "gray" }));

  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: "#gallery-swiper-started",
      children: ".item",
      pswpModule: () => import("photoswipe"),
    });
    lightbox.init();
    lightboxRef.current = lightbox;
    return () => lightbox.destroy();
  }, []);

  useEffect(() => {
    const checkWindowSize = () => window.innerWidth >= 1200;
    if (!checkWindowSize()) return;

    const imageZoom = () => {
      const driftAll = document.querySelectorAll(".tf-image-zoom");
      const pane = document.querySelector(".tf-zoom-main");
      driftAll.forEach((el) => {
        new Drift(el, {
          zoomFactor: 2,
          paneContainer: pane,
          inlinePane: false,
          handleTouch: false,
          hoverBoundingBox: true,
          containInline: true,
        });
      });
    };
    imageZoom();
    const zoomElements = document.querySelectorAll(".tf-image-zoom");
    const handleMouseOver = (event) => {
      const parent = event.target.closest(".section-image-zoom");
      if (parent) parent.classList.add("zoom-active");
    };
    const handleMouseLeave = (event) => {
      const parent = event.target.closest(".section-image-zoom");
      if (parent) parent.classList.remove("zoom-active");
    };
    zoomElements.forEach((el) => {
      el.addEventListener("mouseover", handleMouseOver);
      el.addEventListener("mouseleave", handleMouseLeave);
    });
    return () => {
      zoomElements.forEach((el) => {
        el.removeEventListener("mouseover", handleMouseOver);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <Swiper
        className="swiper tf-product-media-main"
        id="gallery-swiper-started"
        thumbs={{ swiper: swiperThumb }}
        modules={[Thumbs]}
      >
        {images.map((item, i) => (
          <SwiperSlide key={i} className="swiper-slide" data-color={item.color}>
            <a
              href={item.src}
              target="_blank"
              className="item"
              data-pswp-width="600px"
              data-pswp-height="800px"
            >
              <Image
                className="tf-image-zoom lazyload"
                src={item.src}
                data-zoom={item.src}
                alt=""
                width={652}
                height={652}
              />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="container-swiper">
        <Swiper
          className="swiper tf-product-media-thumbs other-image-zoom"
          modules={[Navigation, Thumbs]}
          onSwiper={setSwiperThumb}
          spaceBetween={10}
          slidesPerView="auto"
          freeMode
          watchSlidesProgress
          observer
          observeParents
          direction="horizontal"
          navigation={{
            nextEl: ".thumbs-next",
            prevEl: ".thumbs-prev",
          }}
          breakpoints={{
            0: { direction: "horizontal" },
            1200: { direction: "horizontal" },
          }}
        >
          {images.map((item, index) => (
            <SwiperSlide
              key={index}
              className="swiper-slide stagger-item"
              data-color={item.color}
            >
              <div className="item">
                <Image
                  className="lazyload"
                  alt=""
                  src={item.src}
                  width={652}
                  height={652}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
