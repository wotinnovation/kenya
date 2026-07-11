"use client";
import React, { Suspense } from "react";
import Link from "next/link";
import Header5 from "@/components/headers/Header5";
import Topbar1 from "@/components/headers/Topbar1";
import Footer1 from "@/components/footers/Footer1";
import ProductsGrid from "@/components/products/ProductsGrid";

export default function ProductsPage() {
  return (
    <>
      <Topbar1 parentClass="tf-topbar" />
      <Header5 />
      <div className="tf-sp-1">
        <div className="container">
          <ul className="breakcrumbs">
            <li>
              <Link href={`/`} className="body-small link">
                {" "}
                Home{" "}
              </Link>
            </li>
            <li className="d-flex align-items-center">
              <i className="icon icon-arrow-right" />
            </li>
            <li>
              <span className="body-small">All Products</span>
            </li>
          </ul>
        </div>
      </div>
      <section className="tf-sp-2">
        <div className="container">
          <Suspense fallback={<p className="text-center py-5">Loading products...</p>}>
            <ProductsGrid />
          </Suspense>
        </div>
      </section>
      <Footer1 />
    </>
  );
}
