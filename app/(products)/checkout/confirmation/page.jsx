import Features2 from "@/components/common/Features2";
import RecentProducts from "@/components/common/RecentProducts";
import Footer1 from "@/components/footers/Footer1";
import Header5 from "@/components/headers/Header5";
import Topbar1 from "@/components/headers/Topbar1";

import OrderDetails from "@/components/shop-cart/OrderDetails";
import Link from "next/link";
import React, { Suspense } from "react";

export const metadata = {
  title: "Order Confirmation || Kenya eCommerce",
  description: "Kenya eCommerce",
};
export default function page() {
  return (
    <>
      <Topbar1 parentClass="tf-topbar" />
      <Header5 />
      <div className="tf-sp-3 pb-0">
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
              <span className="body-small"> Order Confirmation</span>
            </li>
          </ul>
        </div>
      </div>

      <Suspense fallback={null}>
        <OrderDetails />
      </Suspense>

      <RecentProducts />
      <Features2 />
      <Footer1 />
    </>
  );
}
