"use client";
import Link from "next/link";
import Image from "next/image";
import AddToCart from "@/components/common/AddToCart";
import RequestQuoteButton from "@/components/common/RequestQuoteButton";
import { backendImageUrl } from "@/graphql/imageUrl";

export default function RealProductCard({ product }) {
  const price = product.salePrice || product.price;
  const hasDiscount =
    product.salePrice &&
    product.regularPrice &&
    product.salePrice < product.regularPrice;

  return (
    <div className="card-product style-border">
      <div className="card-product-wrapper overflow-visible">
        <div className="product-thumb-image">
          <Link href={`/product/${product.slug}`} className="card-image">
            <Image
              alt={product.name}
              className="lazyload img-product"
              src={backendImageUrl(product.image)}
              width={300}
              height={300}
            />
          </Link>
        </div>
        <ul className="list-product-btn top-0 end-0">
          <li>
            <AddToCart product={product} tooltipClass="tooltip-left" />
          </li>
          <li>
            <RequestQuoteButton product={product} tooltipClass="tooltip-left" />
          </li>
        </ul>
        {product.stockStatus === "outofstock" && (
          <div className="box-sale-wrap top-0 start-0 z-5">
            <p className="small-text">Out of stock</p>
          </div>
        )}
      </div>
      <div className="card-product-info">
        <div className="box-title gap-xl-12">
          <h6>
            <Link
              href={`/product/${product.slug}`}
              className="name-product fw-semibold text-secondary link"
            >
              {product.name}
            </Link>
          </h6>
          <p className="price-wrap fw-medium">
            <span className="new-price h4 fw-normal text-primary mb-0">
              ${typeof price === "number" ? price.toFixed(2) : price}
            </span>
            {hasDiscount && (
              <span className="old-price price-text text-main-2">
                ${product.regularPrice.toFixed(2)}
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
