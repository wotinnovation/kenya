"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AddToCart from "@/components/common/AddToCart";
import AddToWishlist from "@/components/common/AddToWishlist";
import RequestQuoteButton from "@/components/common/RequestQuoteButton";
import { useProductsListLazyQuery } from "@/graphql/generated";
import { backendImageUrl } from "@/graphql/imageUrl";

const POPULATED_CATEGORIES = [
  "it-accessories",
  "display",
  "home-smart-security",
  "hikvision-store",
];

function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function Hero() {
  const [heroProducts, setHeroProducts] = useState([]);
  const [fetchProducts] = useProductsListLazyQuery();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const categories = shuffle(POPULATED_CATEGORIES).slice(0, 3);
      const results = await Promise.all(
        categories.map((slug) =>
          fetchProducts({
            variables: { category: slug, limit: 12, status: "publish" },
          })
        )
      );
      if (cancelled) return;
      const picked = results
        .map((r) => {
          const list = r.data?.products?.products ?? [];
          return list[Math.floor(Math.random() * list.length)];
        })
        .filter(Boolean);
      setHeroProducts(picked);
    })();
    return () => {
      cancelled = true;
    };
    // Fetch once on mount; fetchProducts identity is stable across renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      className="has-bg-img tf-sp-5"
      style={{ backgroundImage: "url(https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=80&fit=crop)" }}
    >
      <div className="container">
        <div className="banner-product style-3 p-0 flex-md-nowrap">
          <div className="product-wrap">
            <div className="content">
              <div className="box-title">
                <h1 className="font-5 text-white">
                  Xiaomi <br />
                  Redmi Note 10 Pro
                </h1>
                <p className="property main-title-3 text-white">
                  Display: 6.7-inch AMOLED screen <br />
                  Resolution: 2400 x 1080 FHD+ 395 PPI
                </p>
              </div>
              <h1 className="fw-bold text-white">$798.00</h1>
            </div>
            <div className="box-btn">
              <Link
                href={`/products`}
                className="tf-btn style-3 hover-link-icon bg-primary"
              >
                <span className="caption fw-bold text-uppercase">Shop now</span>
                <i className="icon-arrow-right1 link-icon" />
              </Link>
            </div>
          </div>
          <div className="other-item">
            {heroProducts.map((product) => {
              const price = product.salePrice || product.price;
              return (
              <div
                key={product.id}
                className="card-product style-row row-small-2 bg-white radius-8"
              >
                <div className="card-product-wrapper">
                  <Link
                    href={`/product/${product.slug}`}
                    className="product-img"
                  >
                    <Image
                      className="img-product lazyload"
                      src={backendImageUrl(product.image)}
                      alt={product.name}
                      width={80}
                      height={80}
                    />
                  </Link>
                </div>
                <div className="card-product-info">
                  <div className="box-title">
                    <div className="bg-white relative z-5">
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
                    <div className="group-btn">
                      <p className="price-wrap fw-medium">
                        <span className="new-price price-text fw-medium">
                          ${price.toFixed(2)}
                        </span>
                      </p>
                      <ul className="list-product-btn flex-row">
                        {price > 0 && (
                          <li>
                            <AddToCart product={product} />
                          </li>
                        )}
                        <li className="wishlist">
                          <AddToWishlist productId={product.id} />
                        </li>
                        <li>
                          <RequestQuoteButton product={product} />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
