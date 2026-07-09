import Footer1 from "@/components/footers/Footer1";
import Header5 from "@/components/headers/Header5";
import Topbar1 from "@/components/headers/Topbar1";
import Wishlist from "@/components/shop-cart/Wishlist";
import React from "react";
import Link from "next/link";
export const metadata = {
  title: "Wishlist || Kenya eCommerce",
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
              <span className="body-small"> Wishlist</span>
            </li>
          </ul>
        </div>
      </div>

      <Wishlist />
      <Footer1 />
    </>
  );
}
