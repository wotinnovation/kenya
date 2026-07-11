import React, { Suspense } from "react";
import Header5 from "@/components/headers/Header5";
import Topbar1 from "@/components/headers/Topbar1";
import ProductsGrid from "@/components/products/ProductsGrid";
import RecentProducts from "@/components/common/RecentProducts";
import Features2 from "@/components/common/Features2";
import Footer1 from "@/components/footers/Footer1";
import Link from "next/link";

export const metadata = {
  title: "Products || Kanyha - Multipurpose React Nextjs eCommerce",
  description: "Kanyha - Multipurpose React Nextjs eCommerce",
};
export default function page() {
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
              <span className="body-small">Product Grid</span>
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
      <RecentProducts />
      <Features2 />
      <Footer1 />
      <div className="overlay-filter" id="overlay-filter" />
    </>
  );
}
