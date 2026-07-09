import React from "react";
import Link from "next/link";
import Image from "next/image";
import SearchForm from "./SearchForm";
import CartLength from "../common/CartLength";
import WishlistLength from "../common/WishlistLength";
export default function Header5() {
  return (
    <header className="tf-header style-5">
      <div className="inner-header bg-gray">
        <div className="container">
          <div className="row">
            <div className="col-xl-2 col-md-3 col-7 d-flex align-items-center">
              <div className="logo-site">
                <Link href={`/`}>
                  <Image
                    alt="Logo"
                    src="/images/logo/logo-white.svg"
                    width={185}
                    height={41}
                  />
                </Link>
              </div>
            </div>
            <div className="col-xl-7 col-md-6 d-none d-md-block">
              <div className="header-center justify-content-center gap-10">
                <a
                  href="#mobileMenu"
                  className="btn-open-nav text-white link d-none d-xl-flex"
                  data-bs-toggle="offcanvas"
                  aria-controls="mobileMenu"
                >
                  <i className="icon-menu-dots fs-20" />
                </a>

                <SearchForm parentClass="form-search-product style-3 bg-white" />
              </div>
            </div>
            <div className="col-xl-3 col-md-3 col-5 d-flex align-items-center justify-content-end">
              <div className="header-right">
                <ul className="nav-icon style-2">
                  <li className="d-none d-sm-block">
                    <Link href={`/wishlist`} className="d-flex">
                      <i className="icon-hearth text-white fs-26 link" />
                      <span className="count-box">
                        {" "}
                        <WishlistLength />
                      </span>
                    </Link>
                  </li>
                  <li className="d-none d-sm-block">
                    <a
                      href="#shoppingCart"
                      data-bs-toggle="offcanvas"
                      className="d-flex"
                    >
                      <i className="icon-cart text-white fs-26 link" />
                      <span className="count-box">
                        <CartLength />
                      </span>
                    </a>
                  </li>
                  <li className="btn-mobile d-flex d-xl-none align-items-center">
                    <a
                      href="#mobileMenu"
                      className="mobile-button p-0"
                      data-bs-toggle="offcanvas"
                      aria-controls="mobileMenu"
                    >
                      <span />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
