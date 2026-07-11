"use client";

import { useContextElement } from "@/context/Context";

export default function AddToCart({ productId, product, quantity, tooltipClass = "" }) {
  const { addProductToCart, isAddedToCartProducts } = useContextElement();
  const id = product ? product.id : productId;
  return (
    <>
      <a
        href="#shoppingCart"
        data-bs-toggle="offcanvas"
        onClick={() => addProductToCart(product || productId, quantity)}
        className={`box-icon add-to-cart btn-icon-action hover-tooltip ${tooltipClass}`}
      >
        <span className="icon icon-cart2" />
        <span className="tooltip">
          {isAddedToCartProducts(id) ? "Already Added" : "Add to Cart"}
        </span>
      </a>
    </>
  );
}
