"use client";

import { useContextElement } from "@/context/Context";

export default function RequestQuoteButton({ product, tooltipClass = "" }) {
  const { setQuoteProduct } = useContextElement();
  return (
    <a
      href="#requestQuote"
      data-bs-toggle="modal"
      onClick={() => setQuoteProduct(product)}
      className={`box-icon request-quote btn-icon-action hover-tooltip ${tooltipClass}`}
    >
      <span className="icon icon-quote" />
      <span className="tooltip">Request Quote</span>
    </a>
  );
}
