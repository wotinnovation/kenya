"use client";

import { useContextElement } from "@/context/Context";

export default function AddToCompare({ productId, product, tooltipClass = "" }) {
  const { addToCompareItem, isAddedtoCompareItem } = useContextElement();
  const id = product ? product.id : productId;
  return (
    <a
      href="#compare"
      data-bs-toggle="offcanvas"
      onClick={() => addToCompareItem(product || productId)}
      className={`box-icon btn-icon-action hover-tooltip ${tooltipClass}`}
    >
      <span className="icon icon-compare1" />
      <span className="tooltip">
        {" "}
        {isAddedtoCompareItem(id) ? "Compared" : "Compare"}
      </span>
    </a>
  );
}
