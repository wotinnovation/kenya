"use client";
import { useState } from "react";
import LayoutHandler from "./LayoutHandler";

const PAGE_SIZE_OPTIONS = [10, 20, 30, 50];
const SORT_OPTIONS = ["Default", "Price: Low to High", "Price: High to Low", "Name: A-Z", "Name: Z-A"];

export default function ProductsToolbar({
  total = 0,
  page = 1,
  pageSize = 18,
  onPageSizeChange,
  sortOption = "Default",
  onSortChange,
}) {
  const [showOpen, setShowOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  return (
    <div className="tf-shop-control flex-wrap gap-10 mb-4 d-flex align-items-center justify-content-between">
      <p className="body-text-3 d-none d-lg-block">
        {total > 0 ? (
          <>{from}–{to} of <strong>{total}</strong> results</>
        ) : (
          <>{total} results</>
        )}
      </p>

      <div className="tf-control-view flat-title-tab-product d-flex align-items-center flex-wrap gap-10">
        <LayoutHandler />

        {/* Show per page */}
        <div className="tf-my-dropdown nice-select relative" tabIndex={0} style={{ minWidth: 100 }}>
          <div className="btn-select" onClick={() => { setShowOpen((v) => !v); setSortOpen(false); }}>
            <i className="icon-menu-dots" />
            <p className="body-text-3 w-100 current">Show: {pageSize}</p>
            <i className="icon-arrow-down fs-10" />
          </div>
          {showOpen && (
            <ul className="list" style={{ position: "absolute", top: "100%", left: 0, zIndex: 99, border: "1px solid var(--gray-5)", background: "#fff", minWidth: "100%" }}>
              {PAGE_SIZE_OPTIONS.map((n) => (
                <li
                  key={n}
                  className={`option select-item ${pageSize === n ? "selected focus" : ""}`}
                  onClick={() => { onPageSizeChange(n); setShowOpen(false); }}
                >
                  <span className="text-value-item">Show: {n}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Sort by */}
        <div className="tf-my-dropdown nice-select relative" tabIndex={0} style={{ minWidth: 160 }}>
          <div className="btn-select" onClick={() => { setSortOpen((v) => !v); setShowOpen(false); }}>
            <i className="icon-sort" />
            <p className="body-text-3 w-100 current">Sort: {sortOption}</p>
            <i className="icon-arrow-down fs-10" />
          </div>
          {sortOpen && (
            <ul className="list" style={{ position: "absolute", top: "100%", left: 0, zIndex: 99, border: "1px solid var(--gray-5)", background: "#fff", minWidth: "100%" }}>
              {SORT_OPTIONS.map((opt) => (
                <li
                  key={opt}
                  className={`option select-item ${sortOption === opt ? "selected focus" : ""}`}
                  onClick={() => { onSortChange(opt); setSortOpen(false); }}
                >
                  <span className="text-value-item">{opt}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
