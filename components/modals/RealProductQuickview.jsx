"use client";
import Image from "next/image";
import Link from "next/link";
import { useContextElement } from "@/context/Context";
import { backendImageUrl } from "@/graphql/imageUrl";
import { formatPrice } from "@/utlis/price";

export default function RealProductQuickview() {
  const {
    quickviewProduct: product,
    addProductToCart,
    isAddedToCartProducts,
    setQuoteProduct,
  } = useContextElement();

  if (!product) return null;

  const price = product.salePrice || product.price;
  const hasPrice = typeof price === "number" && price > 0;
  const hasDiscount = Boolean(
    product.salePrice && product.regularPrice && product.salePrice < product.regularPrice
  );

  return (
    <div
      className="modal fade modalCentered modal-def modal-quick-view"
      id="realProductQuickview"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content flex-md-row">
          <span
            className="icon-close icon-close-popup link"
            data-bs-dismiss="modal"
          />
          {/* Image */}
          <div className="d-flex align-items-center justify-content-center p-4 bg-light" style={{ minWidth: 280, flex: "0 0 40%" }}>
            <Image
              src={backendImageUrl(product.image)}
              alt={product.name}
              width={300}
              height={300}
              style={{ width: "100%", height: "auto", objectFit: "contain", maxHeight: 320 }}
            />
          </div>
          {/* Info */}
          <div className="p-4 d-flex flex-column justify-content-center flex-grow-1">
            {product.categories?.length > 0 && (
              <p className="body-text-3 mb-1">
                {product.categories.map((c, i) => (
                  <span key={c.id || c.slug}>
                    <Link href={`/products/${c.slug}`} className="link text-primary" data-bs-dismiss="modal">
                      {c.name}
                    </Link>
                    {i < product.categories.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
            )}
            <h4 className="fw-semibold mb-2">{product.name}</h4>
            {hasPrice ? (
              <div className="d-flex align-items-center gap-3 mb-3">
                <span className="h4 fw-bold text-primary mb-0">{formatPrice(price)}</span>
                {hasDiscount && (
                  <span className="h6 fw-normal text-muted text-decoration-line-through mb-0">
                    {formatPrice(product.regularPrice)}
                  </span>
                )}
              </div>
            ) : (
              <p className="body-text-3 text-muted mb-3">Contact for price</p>
            )}
            {product.shortDescription && (
              <p className="body-text-3 mb-3">{product.shortDescription}</p>
            )}
            <div className="d-flex flex-column gap-2">
              {hasPrice ? (
                <a
                  href="#shoppingCart"
                  data-bs-toggle="offcanvas"
                  onClick={() => addProductToCart(product)}
                  className="tf-btn btn-fill w-100 justify-content-center"
                  data-bs-dismiss="modal"
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
                  data-bs-dismiss="modal"
                >
                  <span className="caption">Get a Quote</span>
                </a>
              )}
              <Link
                href={`/product/${product.slug}`}
                className="tf-btn btn-line w-100 justify-content-center"
                data-bs-dismiss="modal"
              >
                <span className="caption">View Full Details</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
