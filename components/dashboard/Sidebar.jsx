"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const NAV_ITEMS = [
  { href: "/account", label: "Dashboard" },
  { href: "/account/orders", label: "Orders" },
  { href: "/account/address", label: "Address" },
  { href: "/account/edit#profile-details", label: "Account Details", match: "/account/edit" },
  { href: "/account/edit#change-password", label: "Change Password", match: "/account/edit" },
  { href: "/wishlist", label: "Wishlist" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();
  return (
    <>
      {NAV_ITEMS.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className={`my-account-nav-item ${
              pathname === (item.match || item.href) ? "active" : ""
            }`}
          >
            {item.label}
          </Link>
        </li>
      ))}
      <li>
        <button type="button" className="my-account-nav-item" onClick={logout}>
          Logout
        </button>
      </li>
    </>
  );
}
