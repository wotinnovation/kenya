"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useQuery, gql } from "@apollo/client";

const MOBILE_CATEGORIES = gql`
  query MobileMenuCategories {
    categories(parent: null) {
      id
      name
      slug
      children {
        id
        name
        slug
      }
    }
  }
`;

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "All Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function MobileMenu() {
  const pathname = usePathname();
  const { data } = useQuery(MOBILE_CATEGORIES);
  const categories = data?.categories ?? [];

  return (
    <div className="offcanvas offcanvas-start canvas-mb" id="mobileMenu">
      <span className="icon-close btn-close-mb link" data-bs-dismiss="offcanvas" />
      <div className="logo-site">
        <Link href="/">
          <Image alt="Logo" src="/images/logo/logo.svg" width={185} height={41} />
        </Link>
      </div>

      <div className="mb-canvas-content">
        <div className="mb-body">
          <div className="flat-animate-tab">
            <div className="flat-title-tab-nav-mobile">
              <ul className="menu-tab-line" role="tablist">
                <li className="nav-tab-item" role="presentation">
                  <a href="#mb-main-menu" className="tab-link link fw-semibold active" data-bs-toggle="tab">
                    Menu
                  </a>
                </li>
                <li className="br-line type-vertical bg-line h23" />
                <li className="nav-tab-item" role="presentation">
                  <a href="#mb-categories" className="tab-link link fw-semibold" data-bs-toggle="tab">
                    Categories
                  </a>
                </li>
              </ul>
            </div>

            <div className="tab-content">
              {/* Menu tab */}
              <div className="tab-pane active show" id="mb-main-menu" role="tabpanel">
                <div className="mb-content-top">
                  <ul className="nav-ul-mb" id="wrapper-menu-navigation">
                    {NAV_LINKS.map((link) => (
                      <li key={link.href} className={`nav-mb-item ${pathname === link.href ? "active" : ""}`}>
                        <Link href={link.href} className="mb-menu-link" data-bs-dismiss="offcanvas">
                          <span>{link.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Categories tab */}
              <div className="tab-pane" id="mb-categories" role="tabpanel">
                <div className="mb-content-top">
                  <ul className="nav-ul-mb">
                    {categories.map((cat) => (
                      <li key={cat.id} className="nav-mb-item">
                        {cat.children?.length > 0 ? (
                          <>
                            <a
                              href={`#mb-cat-${cat.id}`}
                              className="collapsed mb-menu-link"
                              data-bs-toggle="collapse"
                              aria-expanded="false"
                              aria-controls={`mb-cat-${cat.id}`}
                            >
                              <span>{cat.name}</span>
                              <span className="btn-open-sub" />
                            </a>
                            <div id={`mb-cat-${cat.id}`} className="collapse">
                              <ul className="sub-nav-menu">
                                <li>
                                  <Link
                                    href={`/products/${cat.slug}`}
                                    className="sub-nav-link fw-semibold"
                                    data-bs-dismiss="offcanvas"
                                  >
                                    All {cat.name}
                                  </Link>
                                </li>
                                {cat.children.map((child) => (
                                  <li key={child.id}>
                                    <Link
                                      href={`/products/${child.slug}`}
                                      className="sub-nav-link"
                                      data-bs-dismiss="offcanvas"
                                    >
                                      {child.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </>
                        ) : (
                          <Link
                            href={`/products/${cat.slug}`}
                            className="mb-menu-link"
                            data-bs-dismiss="offcanvas"
                          >
                            <span>{cat.name}</span>
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
