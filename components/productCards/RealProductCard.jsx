"use client";
import Link from "next/link";
import Image from "next/image";
import { useContextElement } from "@/context/Context";
import { backendImageUrl } from "@/graphql/imageUrl";
import { formatPrice } from "@/utlis/price";

export default function RealProductCard({ product }) {
  const { addProductToCart, isAddedToCartProducts, setQuoteProduct } =
    useContextElement();

  const price = product.salePrice || product.price;
  const hasPrice = typeof price === "number" && price > 0;
  const hasDiscount = Boolean(
    product.salePrice &&
      product.regularPrice &&
      product.salePrice < product.regularPrice
  );

  return (
    <div className="card-product style-border d-flex flex-column">
      <div className="card-product-wrapper">
        <Link href={`/product/${product.slug}`} className="card-image d-block">
          <Image
            alt={product.name}
            className="lazyload img-product"
            src={backendImageUrl(product.image)}
            width={300}
            height={300}
          />
        </Link>
      </div>
      <div className="card-product-info d-flex flex-column flex-grow-1">
        <div className="box-title gap-xl-12 flex-grow-1">
          <h6>
            <Link
              href={`/product/${product.slug}`}
              className="name-product fw-semibold text-secondary link"
            >
              {product.name}
            </Link>
          </h6>
          {hasPrice && (
            <p className="price-wrap fw-medium mt-1">
              <span className="new-price h5 fw-normal text-primary mb-0">
                {formatPrice(price)}
              </span>
              {hasDiscount && (
                <span className="old-price price-text text-main-2 ms-2">
                  ${product.regularPrice.toFixed(2)}
                </span>
              )}
            </p>
          )}
        </div>
        <div className="mt-2">
          {hasPrice ? (
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
  );
}
