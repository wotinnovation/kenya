"use client";
import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
export default function MyAccount() {
  const { customer } = useAuth();
  return (
    <div className="my-account-content account-dashboard">
      <div className="mb_60">
        <h3 className="fw-semibold mb-20">
          Hello {customer?.firstName || "there"}
        </h3>
        <p>
          From your account dashboard you can view your
          <Link
            className="text-secondary link fw-medium"
            href={`/account/orders`}
          >
            recent orders
          </Link>
          , manage your
          <Link
            className="text-secondary link fw-medium"
            href={`/account/address`}
          >
            shipping and billing address
          </Link>
          , and
          <Link
            className="text-secondary link fw-medium"
            href={`/account/edit`}
          >
            edit your password and account details{" "}
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
