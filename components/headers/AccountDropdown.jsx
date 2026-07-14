"use client";
import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function AccountDropdown({ light = false }) {
  const { isAuthenticated, customer, logout } = useAuth();

  if (!isAuthenticated) {
    return (
      <a
        href="#log"
        data-bs-toggle="modal"
        className={`tf-cur-item link ${light ? "text-white" : ""}`}
      >
        <i className="icon-user-3" />
        <span className="body-small">My account:</span>
        <i className="icon-arrow-down" />
      </a>
    );
  }

  return (
    <div className="dropdown tf-cur-item">
      <a
        href="#"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        onClick={(e) => e.preventDefault()}
        className={`link ${light ? "text-white" : ""}`}
      >
        <i className="icon-user-3" />
        <span className="body-small">
          {customer?.firstName ? `Hi, ${customer.firstName}` : "My account"}
        </span>
        <i className="icon-arrow-down" />
      </a>
      <ul className="dropdown-menu dropdown-menu-end">
        <li>
          <Link href="/account" className="dropdown-item">
            My Account
          </Link>
        </li>
        <li>
          <Link href="/account/orders" className="dropdown-item">
            Orders
          </Link>
        </li>
        <li>
          <Link href="/account/edit#profile-details" className="dropdown-item">
            Profile
          </Link>
        </li>
        <li>
          <Link href="/account/edit#change-password" className="dropdown-item">
            Change Password
          </Link>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <button type="button" className="dropdown-item" onClick={logout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}
