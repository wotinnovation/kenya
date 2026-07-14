"use client";
import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useGetCustomerOrdersQuery } from "@/graphql/generated";
import { formatPrice } from "@/utlis/price";

const DELIVERED_STATUSES = ["completed", "shipped"];

function formatDate(value) {
  if (!value) return "";
  const date = new Date(Number(value) || value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

export default function AccountOrders() {
  const { customer } = useAuth();
  const { data, loading, error } = useGetCustomerOrdersQuery({
    variables: { customer: customer?.id },
    skip: !customer?.id,
  });

  const orders = data?.orders ?? [];

  return (
    <div className="my-account-content account-dashboard">
      <h4 className="fw-semibold mb-20">Order History</h4>
      <div className="tf-order_history-table">
        {loading ? (
          <p className="body-text-3">Loading your orders…</p>
        ) : error ? (
          <p className="body-text-3">Could not load your orders. Please try again.</p>
        ) : !orders.length ? (
          <p className="body-text-3">
            You haven&apos;t placed any orders yet.{" "}
            <Link href="/products" className="link text-secondary">
              Start shopping
            </Link>
            .
          </p>
        ) : (
          <table className="table_def">
            <thead>
              <tr>
                <th className="title-sidebar fw-medium">Order ID</th>
                <th className="title-sidebar fw-medium">Date</th>
                <th className="title-sidebar fw-medium">Status</th>
                <th className="title-sidebar fw-medium">Total</th>
                <th className="title-sidebar fw-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const itemCount = order.items?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0;
                return (
                  <tr key={order.id} className="td-order-item">
                    <td className="body-text-3">{order.orderID}</td>
                    <td className="body-text-3">{formatDate(order.createdAt)}</td>
                    <td
                      className={`body-text-3 ${
                        DELIVERED_STATUSES.includes(order.status) ? "text-delivered" : "text-on-the-way"
                      }`}
                    >
                      {order.status}
                    </td>
                    <td className="body-text-3">
                      {formatPrice(order.totalAmount)} / {itemCount} item{itemCount === 1 ? "" : "s"}
                    </td>
                    <td>
                      <Link
                        href={`/checkout/confirmation?id=${order.id}`}
                        className="tf-btn btn-small d-inline-flex"
                      >
                        <span className="text-white">Detail</span>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
