"use client";
import React, { Suspense } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Header5 from "@/components/headers/Header5";
import Topbar1 from "@/components/headers/Topbar1";
import Footer1 from "@/components/footers/Footer1";
import ProductsGrid from "@/components/products/ProductsGrid";
import { useCategoryBySlugQuery } from "@/graphql/generated";
import NetworkCategorySidebar, { isNetworkCategory } from "@/components/products/NetworkCategorySidebar";

const NETWORK_TREE = {
  name: "NETWORK",
  slug: "networking-solution-dubai",
  children: [
    { name: "5G ROUTERS", slug: "5g-routers" },
    { name: "ACCESS POINT", slug: "access-point" },
    { name: "CONTROLLER", slug: "controller" },
    { name: "CONVERTER", slug: "converter" },
    { name: "DRONE", slug: "drone" },
    { name: "EXTENDER", slug: "extender" },
    { name: "FIREWALL", slug: "firewall" },
    { name: "INDUSTRIAL SWITCH", slug: "industrial-switch" },
    { name: "MESH ROUTER", slug: "mesh-router" },
    { name: "MIFI", slug: "mifi" },
    { name: "MOBILE ACCESSORIES", slug: "mobile-accessories" },
    { name: "MODULE", slug: "module" },
    { name: "MODULE SFP", slug: "module-sfp" },
    { name: "Omada Accessories", slug: "omada-accessories" },
    { name: "Omada Converter", slug: "omada-converter" },
    { name: "Omada Gateways", slug: "omada-gateways" },
    { name: "Omada Switches", slug: "omada-switches" },
    { name: "Omada Wireless", slug: "omada-wireless" },
    { name: "POE ADAPTER", slug: "poe-adapter" },
    { name: "Routers", slug: "routers" },
    { name: "SERVER RACK", slug: "server-rack" },
    { name: "SWITCHES", slug: "switches" },
    { name: "TRANSCEIVERS", slug: "transceivers" },
    { name: "USB DONGLE", slug: "usb-dongle" },
    { name: "WALKIE TALKIE", slug: "walkie-talkie" },
    { name: "VPN ROUTERS", slug: "vpn-routers" },
    { name: "4G ROUTERS", slug: "4g-routers" }
  ]
};

export default function CategoryProductsPage() {
  const { category: categorySlug } = useParams();
  const { data, loading } = useCategoryBySlugQuery({
    variables: { slug: categorySlug },
  });

  const isNetwork = isNetworkCategory(categorySlug);

  // Fallback category parsing for static network category tree
  let staticCategory = null;
  if (isNetwork) {
    if (categorySlug === NETWORK_TREE.slug) {
      staticCategory = {
        name: NETWORK_TREE.name,
        slug: NETWORK_TREE.slug,
        children: NETWORK_TREE.children
      };
    } else {
      const sub = NETWORK_TREE.children.find((c) => c.slug === categorySlug);
      if (sub) {
        staticCategory = {
          name: sub.name,
          slug: sub.slug,
          children: []
        };
      }
    }
  }

  const category = data?.category || staticCategory;

  return (
    <>
      <Topbar1 parentClass="tf-topbar" />
      <Header5 />
      <div className="tf-sp-1">
        <div className="container">
          <ul className="breakcrumbs">
            <li>
              <Link href={`/`} className="body-small link">
                Home
              </Link>
            </li>
            <li className="d-flex align-items-center">
              <i className="icon icon-arrow-right" />
            </li>
            <li>
              <Link href={`/products`} className="body-small link">
                Products
              </Link>
            </li>
            <li className="d-flex align-items-center">
              <i className="icon icon-arrow-right" />
            </li>
            <li>
              <span className="body-small">
                {loading && !category ? "" : (category?.name || categorySlug).replace(/\s*\(.*\)\s*$/, "")}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <section className="tf-sp-2">
        <div className="container">
          {!loading && !category && (
            <p className="text-center py-5">Category not found.</p>
          )}
          {category && (
            <div className="row">
              {isNetwork && (
                <div className="col-xl-3 col-lg-4 d-none d-lg-block mb-4">
                  <NetworkCategorySidebar />
                </div>
              )}
              <div className={isNetwork ? "col-xl-9 col-lg-8 col-12" : "col-12"}>
                <div className="flat-title wow fadeInUp mb-4">
                  <h5 className="fw-semibold">{category.name.replace(/\s*\(.*\)\s*$/, "")}</h5>
                  {category.description && (
                    <p className="body-text-3 mt-2">{category.description}</p>
                  )}
                </div>
                {category?.children?.length > 0 && (
                  <ul className="d-flex flex-wrap gap-2 mb-4" style={{ listStyle: "none", padding: 0 }}>
                    {category.children.map((child) => (
                      <li key={child.id || child.slug}>
                        <Link
                          href={`/products/${child.slug}`}
                          className="tf-btn btn-line"
                        >
                          {child.name.replace(/\s*\(.*\)\s*$/, "")}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
                <Suspense fallback={<p className="text-center py-5">Loading products...</p>}>
                  <ProductsGrid categorySlug={categorySlug} />
                </Suspense>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer1 />
    </>
  );
}
