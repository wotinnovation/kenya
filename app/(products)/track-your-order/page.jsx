import Features2 from "@/components/common/Features2";
import RecentProducts from "@/components/common/RecentProducts";
import Footer1 from "@/components/footers/Footer1";
import Header5 from "@/components/headers/Header5";
import Topbar1 from "@/components/headers/Topbar1";
import OrderTraking from "@/components/shop-cart/OrderTraking";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Track Your Order || Kanyha - Multipurpose React Nextjs eCommerce",
  description: "Kanyha - Multipurpose React Nextjs eCommerce",
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
              <p className="body-small">Track Your Order</p>
            </li>
          </ul>
        </div>
      </div>

      <OrderTraking />

      <RecentProducts />
      <Features2 />
      <Footer1 />
    </>
  );
}
