"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useContextElement } from "@/context/Context";
import { useAuth } from "@/context/AuthContext";
import { useCreateOrderMutation } from "@/graphql/generated";
import { countries } from "@/data/countries";

const initialDelivery = {
  firstName: "",
  lastName: "",
  country: "Kenya",
  city: "",
  state: "",
  zip: "",
  address: "",
  note: "",
};

export default function Checkout() {
  const { cartProducts, setCartProducts, totalPrice } = useContextElement();
  const { customer } = useAuth();
  const [createOrder] = useCreateOrderMutation();
  const router = useRouter();

  const [email, setEmail] = useState(customer?.email || "");
  const [phone, setPhone] = useState(customer?.phone || "");
  const [delivery, setDelivery] = useState({
    ...initialDelivery,
    firstName: customer?.firstName || "",
    lastName: customer?.lastName || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasQuoteItems = cartProducts.some((product) => product.isQuote);
  const totalLabel = hasQuoteItems
    ? totalPrice > 0
      ? `$${totalPrice.toFixed(2)} + Quote`
      : "Quote"
    : `$${totalPrice.toFixed(2)}`;

  const updateDelivery = (field) => (e) =>
    setDelivery((prev) => ({ ...prev, [field]: e.target.value }));

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!cartProducts.length || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const address = {
        firstName: delivery.firstName,
        lastName: delivery.lastName,
        email,
        phone,
        address: delivery.address,
        city: delivery.city,
        state: delivery.state,
        zip: delivery.zip,
      };

      const { data } = await createOrder({
        variables: {
          input: {
            customerId: customer?.id,
            items: cartProducts.map((item) => ({
              productId: item.id,
              quantity: item.quantity,
              price: item.isQuote ? 0 : item.price,
            })),
            subtotalAmount: totalPrice,
            paymentMethod: "Get a Quote",
            orderSource: "web",
            note: delivery.note,
            billingAddress: address,
            shippingAddress: address,
          },
        },
      });

      const createdOrder = data?.createOrder;
      toast.success(
        createdOrder?.orderID
          ? `Order ${createdOrder.orderID} placed. We'll send you a quote soon.`
          : "Order placed. We'll send you a quote soon."
      );
      setCartProducts([]);
      router.push(
        createdOrder?.id
          ? `/checkout/confirmation?id=${createdOrder.id}`
          : "/checkout/confirmation"
      );
    } catch (error) {
      toast.error(error?.message || "Could not place your order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="tf-sp-2">
      <div className="container">
        <div className="checkout-status tf-sp-2 pt-0">
          <div className="checkout-wrap">
            <span className="checkout-bar next" />
            <div className="step-payment">
              <span className="icon">
                <i className="icon-shop-cart-1" />
              </span>
              <Link href={`/cart`} className="link body-text-3">
                Shopping Cart
              </Link>
            </div>
            <div className="step-payment">
              <span className="icon">
                <i className="icon-shop-cart-2" />
              </span>
              <Link
                href={`/checkout`}
                className="text-secondary link body-text-3"
              >
                Shopping &amp; Checkout
              </Link>
            </div>
            <div className="step-payment">
              <span className="icon">
                <i className="icon-shop-cart-3" />
              </span>
              <Link href={`/checkout/confirmation`} className="link body-text-3">
                Confirmation
              </Link>
            </div>
          </div>
        </div>
        <form onSubmit={handlePlaceOrder} className="pb-5">
          <div className="tf-checkout-wrap flex-lg-nowrap">
            <div className="page-checkout">
              <div className="wrap">
                <h5 className="title has-account">
                  <span className="fw-semibold">Billing &amp; Shipping Information</span>
                  <span className="body-text-3">
                    Have an account?
                    <a
                      href="#register"
                      data-bs-toggle="modal"
                      className="body-text-3 text-secondary link"
                    >
                      Login
                    </a>
                  </span>
                </h5>
                <div className="def">
                  <div className="cols">
                    <fieldset>
                      <label>Email</label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </fieldset>
                    <fieldset>
                      <label>Phone</label>
                      <input
                        type="tel"
                        placeholder="e.g. 0712345678"
                        pattern="[\d+\-\s()]{7,20}"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </fieldset>
                  </div>
                  <fieldset>
                    <label>Country/Region</label>
                    <div className="tf-select">
                      <select
                        value={delivery.country}
                        onChange={updateDelivery("country")}
                      >
                        {countries.map((country) => (
                          <option key={country} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                    </div>
                  </fieldset>
                  <div className="cols">
                    <fieldset>
                      <label>First name</label>
                      <input
                        type="text"
                        placeholder="e.g. Jonn"
                        value={delivery.firstName}
                        onChange={updateDelivery("firstName")}
                        required
                      />
                    </fieldset>
                    <fieldset>
                      <label>Last name</label>
                      <input
                        type="text"
                        placeholder="e.g. Doe"
                        value={delivery.lastName}
                        onChange={updateDelivery("lastName")}
                        required
                      />
                    </fieldset>
                  </div>
                  <div className="cols">
                    <fieldset>
                      <label>City</label>
                      <input
                        type="text"
                        placeholder="e.g. Nairobi"
                        value={delivery.city}
                        onChange={updateDelivery("city")}
                        required
                      />
                    </fieldset>
                    <fieldset>
                      <label>State</label>
                      <input
                        type="text"
                        placeholder="e.g. Nairobi County"
                        value={delivery.state}
                        onChange={updateDelivery("state")}
                      />
                    </fieldset>
                    <fieldset>
                      <label>ZIP code</label>
                      <input
                        type="text"
                        placeholder="e.g. 00100"
                        value={delivery.zip}
                        onChange={updateDelivery("zip")}
                      />
                    </fieldset>
                  </div>
                  <fieldset>
                    <label>Address</label>
                    <input
                      type="text"
                      placeholder="Your detailed address"
                      value={delivery.address}
                      onChange={updateDelivery("address")}
                      required
                    />
                  </fieldset>
                  <fieldset>
                    <label>Order note</label>
                    <textarea
                      placeholder="Note on your order"
                      value={delivery.note}
                      onChange={updateDelivery("note")}
                    />
                  </fieldset>
                </div>
                <p className="caption text-main-2 font-2">
                  No payment required now — we&apos;ll review your order and
                  send you a quote before anything is charged.
                </p>
                <div className="box-btn">
                  <button
                    type="submit"
                    className="tf-btn w-100"
                    disabled={!cartProducts.length || isSubmitting}
                  >
                    <span className="text-white">
                      {isSubmitting ? "Sending..." : "Request Quote"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div className="flat-sidebar-checkout">
              <div className="sidebar-checkout-content">
                <h5 className="fw-semibold">Order Summary</h5>
                {cartProducts.length ? (
                  <ul className="list-product">
                    {cartProducts.map((product, i) => (
                      <li key={i} className="item-product">
                        <a href="#" className="img-product">
                          <Image
                            alt=""
                            src={product.imgSrc}
                            width={500}
                            height={500}
                          />
                        </a>
                        <div className="content-box">
                          <a
                            href="#"
                            className="link-secondary body-md-2 fw-semibold"
                          >
                            {product.title}
                          </a>
                          <p className="price-quantity price-text fw-semibold">
                            {product.isQuote ? "Quote" : `$${product.price.toFixed(2)}`}
                            <span className="body-md-2 text-main-2 fw-normal">
                              X{product.quantity}
                            </span>
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-4">
                    <div className="col-4">
                      Your Cart is empty. Start adding favorite products to cart!{" "}
                    </div>
                    <Link
                      className="tf-btn mt-2 mb-3 text-white"
                      style={{ width: "fit-content" }}
                      href="/shop-default"
                    >
                      Explore Products
                    </Link>
                  </div>
                )}
                <div className="">
                  <p className="body-md-2 fw-semibold sub-type">Discount code</p>
                  <div className="ip-discount-code style-2">
                    <input
                      type="text"
                      className="def"
                      placeholder="Your code"
                    />
                    <button type="button" className="tf-btn btn-gray-2">
                      <span>Apply</span>
                    </button>
                  </div>
                </div>
                <ul className="sec-total-price">
                  <li>
                    <span className="body-text-3">Sub total</span>
                    <span className="body-text-3">{totalLabel}</span>
                  </li>
                  <li>
                    <span className="body-text-3">Shipping</span>
                    <span className="body-text-3">Free shipping</span>
                  </li>
                  <li>
                    <span className="body-md-2 fw-semibold">Total</span>
                    <span className="body-md-2 fw-semibold text-primary">
                      {totalLabel}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
