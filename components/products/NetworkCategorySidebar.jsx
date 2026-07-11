"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

const NETWORK_TREE = {
  name: "NETWORK",
  slug: "networking-solution-dubai",
  children: [
    {
      name: "5G ROUTERS",
      slug: "5g-routers",
      children: [
        { name: "D-LINK", slug: "d-link" },
        { name: "LINKSYS", slug: "linksys" },
      ]
    },
    {
      name: "ACCESS POINT",
      slug: "access-point",
      children: [
        { name: "ALTA", slug: "alta" },
        { name: "CAMBIUM", slug: "cambium" },
        { name: "D-LINK", slug: "d-link" },
        { name: "ENGENIUS", slug: "engenius" },
        { name: "FLYINGVOICE", slug: "flyingvoice" },
        { name: "Grandstream", slug: "grandstream" },
        { name: "HP ARUBA", slug: "hp-aruba" },
        { name: "LAMATEL", slug: "lamatel" },
        { name: "MESH SERIES", slug: "mesh-series" },
        { name: "NETGEAR", slug: "netgear" },
        { name: "RUIJIE", slug: "ruijie" },
        { name: "TENDA", slug: "tenda" },
        { name: "TP-LINK", slug: "tp-link" },
        { name: "UBIQUITI", slug: "ubiquiti" },
        { name: "Wi-Fi 4", slug: "wi-fi-4" },
        { name: "Wi-Fi 5", slug: "wi-fi-5" },
        { name: "Wi-Fi 6", slug: "wi-fi-6" },
        { name: "Wi-Fi 7", slug: "wi-fi-7" },
        { name: "WIRELESS AP", slug: "wireless-ap" },
        { name: "DRAYTEK", slug: "draytek" },
        { name: "MIKROTIK", slug: "mikrotik" },
        { name: "ZYXEL", slug: "zyxel" },
      ]
    },
    {
      name: "CONTROLLER",
      slug: "controller",
      children: [
        { name: "D-LINK", slug: "d-link" },
        { name: "DELL", slug: "dell" },
        { name: "HP", slug: "hp" },
        { name: "IP-COM", slug: "ip-com" },
        { name: "RUIJIE", slug: "ruijie" },
        { name: "TP-LINK", slug: "tp-link" },
        { name: "ZYXEL", slug: "zyxel" },
      ]
    },
    {
      name: "CONVERTER",
      slug: "converter",
      children: [
        { name: "MEDIA CONVERTER", slug: "media-converter" }
      ]
    },
    {
      name: "DRONE",
      slug: "drone",
    },
    {
      name: "EXTENDER",
      slug: "extender",
    },
    {
      name: "FIREWALL",
      slug: "firewall",
      children: [
        { name: "CYBEROAM", slug: "cyberoam" },
        { name: "DRAYTEK", slug: "draytek" },
        { name: "FORTINET", slug: "fortinet" },
        { name: "SONICWALL", slug: "sonicwall" },
        { name: "SOPHOS", slug: "sophos" },
        { name: "WATCHGUARD", slug: "watchguard" },
        { name: "ZYXEL", slug: "zyxel" },
      ]
    },
    {
      name: "INDUSTRIAL SWITCH",
      slug: "industrial-switch",
      children: [
        { name: "D-LINK", slug: "d-link" }
      ]
    },
    {
      name: "MESH ROUTER",
      slug: "mesh-router",
    },
    {
      name: "MIFI",
      slug: "mifi",
      children: [
        { name: "D-LINK", slug: "d-link" },
        { name: "HUAWEI", slug: "huawei" },
        { name: "TENDA", slug: "tenda" },
        { name: "TP-LINK", slug: "tp-link" },
      ]
    },
    {
      name: "MOBILE ACCESSORIES",
      slug: "mobile-accessories",
      children: [
        { name: "ANKER", slug: "anker" },
        { name: "PROMATE", slug: "promate" },
      ]
    },
    {
      name: "MODULE",
      slug: "module",
    },
    {
      name: "MODULE SFP",
      slug: "module-sfp",
      children: [
        { name: "NETWORK CABLE", slug: "network-cable" }
      ]
    },
    {
      name: "Omada Accessories",
      slug: "omada-accessories",
      children: [
        { name: "Omada by Tp-Link", slug: "omada-by-tp-link" }
      ]
    },
    {
      name: "Omada Converter",
      slug: "omada-converter",
    },
    {
      name: "Omada Gateways",
      slug: "omada-gateways",
      children: [
        { name: "Omada by Tp-Link", slug: "omada-by-tp-link" }
      ]
    },
    {
      name: "Omada Switches",
      slug: "omada-switches",
      children: [
        { name: "Omada by Tp-Link", slug: "omada-by-tp-link" }
      ]
    },
    {
      name: "Omada Wireless",
      slug: "omada-wireless",
      children: [
        { name: "Omada by Tp-Link", slug: "omada-by-tp-link" },
        { name: "Omada Wi-Fi 7", slug: "omada-wi-fi-7" }
      ]
    },
    {
      name: "POE ADAPTER",
      slug: "poe-adapter",
      children: [
        { name: "ENGENIUS", slug: "engenius" },
        { name: "J5CREATE", slug: "j5create" },
        { name: "TP-LINK", slug: "tp-link" },
        { name: "UBIQUITI", slug: "ubiquiti" },
        { name: "YEALINK", slug: "yealink" },
        { name: "LINKSYS", slug: "linksys" },
      ]
    },
    {
      name: "Routers",
      slug: "routers",
    },
    {
      name: "SERVER RACK",
      slug: "server-rack",
      children: [
        { name: "AVALON", slug: "avalon" },
        { name: "BEGIN", slug: "begin" },
        { name: "FINEN", slug: "finen" },
      ]
    },
    {
      name: "SWITCHES",
      slug: "switches",
      children: [
        { name: "ALLIED TELESIS", slug: "allied-telesis" },
        { name: "CISCO", slug: "cisco" },
        { name: "COMMANDO", slug: "commando" },
        { name: "D-LINK", slug: "d-link" },
        { name: "DAHUA", slug: "dahua" },
        { name: "DELL", slug: "dell" },
        { name: "DIGIUM", slug: "digium" },
        { name: "DRAYTEK", slug: "draytek" },
        { name: "FLYINGVOICE", slug: "flyingvoice" },
        { name: "FortiNet", slug: "fortinet" },
        { name: "GRANDSTREAM", slug: "grandstream" },
        { name: "HIKVISION", slug: "hikvision" },
        { name: "HUAWEI", slug: "huawei" },
        { name: "IP-COM", slug: "ip-com" },
        { name: "MIKROTIK", slug: "mikrotik" },
        { name: "NETGEAR", slug: "netgear" },
        { name: "OXION", slug: "oxion" },
        { name: "RUIJIE", slug: "ruijie" },
        { name: "TELESIS", slug: "telesis" },
        { name: "TP-LINK", slug: "tp-link" },
        { name: "UBIQUITI", slug: "ubiquiti" },
        { name: "ENGENIUS", slug: "engenius" },
        { name: "HP", slug: "hp" },
        { name: "ZYXEL", slug: "zyxel" },
      ]
    },
    {
      name: "TRANSCEIVERS",
      slug: "transceivers",
      children: [
        { name: "CISCO", slug: "cisco" },
        { name: "HP", slug: "hp" },
      ]
    },
    {
      name: "USB DONGLE",
      slug: "usb-dongle",
      children: [
        { name: "3G/4G/LTE", slug: "3g-4g-lte" },
        { name: "WIFI", slug: "wifi" },
      ]
    },
    {
      name: "WALKIE TALKIE",
      slug: "walkie-talkie",
      children: [
        { name: "MOTOROLA", slug: "motorola" }
      ]
    },
    {
      name: "VPN ROUTERS",
      slug: "vpn-routers",
      children: [
        { name: "D-LINK", slug: "d-link" },
        { name: "GRANDSTREAM", slug: "grandstream" },
        { name: "TP-LINK", slug: "tp-link" },
        { name: "DRAYTEK", slug: "draytek" },
      ]
    },
    {
      name: "4G ROUTERS",
      slug: "4g-routers",
      children: [
        { name: "ALINK", slug: "alink" },
        { name: "ASUS", slug: "asus" },
        { name: "CISCO", slug: "cisco" },
        { name: "D-LINK", slug: "d-link" },
        { name: "LB-LINK", slug: "lb-link" },
        { name: "LINKSYS", slug: "linksys" },
        { name: "MERCUSYS", slug: "mercusys" },
        { name: "MIKROTIK", slug: "mikrotik" },
        { name: "NETGEAR", slug: "netgear" },
        { name: "TP-LINK", slug: "tp-link" },
        { name: "XIAOMI", slug: "xiaomi" },
      ]
    }
  ]
};

export function isNetworkCategory(slug) {
  if (slug === NETWORK_TREE.slug) return true;
  return NETWORK_TREE.children.some(
    (c) => c.slug === slug || c.children?.some((gc) => gc.slug === slug)
  );
}

export default function NetworkCategorySidebar() {
  const { category: currentSlug } = useParams();
  const [expandedSub, setExpandedSub] = useState(
    NETWORK_TREE.children.reduce((acc, sub) => {
      // Auto-expand if the active category is this subcategory or one of its children
      const isActive =
        currentSlug === sub.slug ||
        sub.children?.some((gc) => gc.slug === currentSlug);
      acc[sub.slug] = isActive;
      return acc;
    }, {})
  );

  const toggleExpand = (subSlug, e) => {
    e.preventDefault();
    setExpandedSub((prev) => ({
      ...prev,
      [subSlug]: !prev[subSlug],
    }));
  };

  return (
    <div className="card-sidebar bg-white p-4 border rounded-3 sidebar-network">
      <div className="sidebar-item-title mb-3 pb-2 border-bottom">
        <Link
          href={`/products/${NETWORK_TREE.slug}`}
          className={`h5 fw-bold ${
            currentSlug === NETWORK_TREE.slug ? "text-primary" : "text-dark"
          }`}
        >
          {NETWORK_TREE.name}
        </Link>
      </div>
      <ul className="list-network-cats" style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {NETWORK_TREE.children.map((sub) => {
          const hasChildren = sub.children && sub.children.length > 0;
          const isSubActive =
            currentSlug === sub.slug ||
            sub.children?.some((gc) => gc.slug === currentSlug);

          return (
            <li key={sub.slug} className="mb-2">
              <div className="d-flex align-items-center justify-content-between">
                <Link
                  href={`/products/${sub.slug}`}
                  className={`body-md-2 fw-medium ${
                    isSubActive ? "text-primary fw-bold" : "text-secondary"
                  } hover-primary`}
                >
                  {sub.name}
                </Link>
                {hasChildren && (
                  <button
                    onClick={(e) => toggleExpand(sub.slug, e)}
                    className="btn btn-sm p-1 border-0 bg-transparent text-secondary"
                    style={{ outline: "none" }}
                    aria-label="Toggle subcategories"
                  >
                    <i
                      className={`icon fs-12 ${
                        expandedSub[sub.slug]
                          ? "icon-arrow-down"
                          : "icon-arrow-right"
                      }`}
                    />
                  </button>
                )}
              </div>
              {hasChildren && expandedSub[sub.slug] && (
                <ul
                  className="ps-3 mt-2 list-network-brands border-start border-light"
                  style={{ listStyle: "none", paddingLeft: "15px" }}
                >
                  {sub.children.map((gc) => {
                    const isBrandActive = currentSlug === gc.slug;
                    return (
                      <li key={gc.slug} className="mb-1">
                        <Link
                          href={`/products/${sub.slug}?search=${gc.name}`}
                          className={`body-small ${
                            isBrandActive ? "text-primary fw-bold" : "text-muted"
                          } hover-primary`}
                        >
                          {gc.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
