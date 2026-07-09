import Footer1 from "@/components/footers/Footer1";
import Header5 from "@/components/headers/Header5";
import Topbar1 from "@/components/headers/Topbar1";
import Faqs from "@/components/otherPages/Faqs";
import React from "react";
import Link from "next/link";
export const metadata = {
  title: "Faq || Kanyha - Multipurpose React Nextjs eCommerce",
  description: "Kanyha - Multipurpose React Nextjs eCommerce",
};
export default function page() {
  return (
    <>
      {" "}
      <Topbar1 parentClass="tf-topbar" />
      <Header5 />
      <div className="tf-sp-3">
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
              <span className="body-small">Faqs</span>
            </li>
          </ul>
        </div>
      </div>
      <Faqs />
      <Footer1 />
    </>
  );
}
