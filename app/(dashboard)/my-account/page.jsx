import MyAccount from "@/components/dashboard/MyAccount";
import Sidebar from "@/components/dashboard/Sidebar";
import Footer1 from "@/components/footers/Footer1";
import Header5 from "@/components/headers/Header5";
import Topbar1 from "@/components/headers/Topbar1";
import React from "react";
import Link from "next/link";
export const metadata = {
  title: "My Account || Kanyha - Multipurpose React Nextjs eCommerce",
  description: "Kanyha - Multipurpose React Nextjs eCommerce",
};
export default function page() {
  return (
    <>
      <Topbar1 parentClass="tf-topbar" />
      <Header5 />
      <div className="tf-sp-1 pb-0">
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
              <span className="body-small">Account</span>
            </li>
          </ul>
        </div>
      </div>
      <section className="tf-sp-2">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 d-none d-lg-block">
              <div className="wrap-sidebar-account">
                <ul className="my-account-nav content-append">
                  <Sidebar />
                </ul>
              </div>
            </div>
            <div className="col-lg-9">
              <MyAccount />
            </div>
          </div>
        </div>
      </section>
      <Footer1 />
    </>
  );
}
