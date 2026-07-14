"use client";

import { useContextElement } from "@/context/Context";

export default function RequestQuoteButton({ product, tooltipClass = "" }) {
  const { addProductToCart, isAddedToCartProducts } = useContextElement();
  return (
    <a
      href="#shoppingCart"
      data-bs-toggle="offcanvas"
      onClick={() => addProductToCart(product)}
      className={`box-icon request-quote btn-icon-action hover-tooltip ${tooltipClass}`}
    >
      <span className="icon icon-cart" />
      <span className="tooltip">
        {isAddedToCartProducts(product.id) ? "Added to Cart" : "Get a Quote"}
      </span>
    </a>
  );
}
