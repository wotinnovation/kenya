"use client";

import { useContextElement } from "@/context/Context";
export default function AddToWishlist({ productId, product, tooltipClass = "" }) {
  const { addToWishlist, isAddedtoWishlist } = useContextElement();
  const id = product ? product.id : productId;
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        addToWishlist(product || productId);
      }}
      className={`box-icon btn-icon-action hover-tooltip ${tooltipClass}`}
    >
      <span
        className={`icon ${
          isAddedtoWishlist(id) ? "icon-trash" : "icon-heart2"
        } `}
      />
      <span className="tooltip">
        {" "}
        {isAddedtoWishlist(id) ? "Remove Wishlist" : "Add to Wishlist"}
      </span>
    </a>
  );
}
