"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTopLevelCategoriesQuery } from "@/graphql/generated";

export default function SearchForm({
  parentClass = "form-search-product style-2",
}) {
  const router = useRouter();
  const { data } = useTopLevelCategoriesQuery();
  const categories = data?.categories ?? [];

  const [activeDropdown, setActiveDropdown] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All categories");
  const [activeCategorySlug, setActiveCategorySlug] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navRef = useRef(null);
  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(false); // Close the menu
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm.trim()) params.set("search", searchTerm.trim());
    const basePath = activeCategorySlug
      ? `/products/${activeCategorySlug}`
      : "/products";
    const query = params.toString();
    router.push(query ? `${basePath}?${query}` : basePath);
  };

  return (
    <form ref={navRef} onSubmit={handleSubmit} className={parentClass}>
      <div className={`select-category ${activeDropdown ? "active" : ""}`}>
        <div
          onClick={() => setActiveDropdown(true)}
          className="tf-select-custom"
        >
          {activeCategory}
        </div>
        <ul
          className="select-options"
          style={{ display: activeDropdown ? "block" : "none" }}
        >
          <div className="header-select-option">
            <span>Select Categories</span>
            <span
              className="close-option"
              onClick={() => setActiveDropdown(false)}
            >
              <i className="icon-close"></i>
            </span>
          </div>
          <li
            onClick={() => {
              setActiveCategory("All categories");
              setActiveCategorySlug("");
              setActiveDropdown(false);
            }}
          >
            All categories
          </li>
          {categories.map((item) => (
            <li
              key={item.id}
              onClick={() => {
                setActiveCategory(item.name);
                setActiveCategorySlug(item.slug);
                setActiveDropdown(false);
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
      <span className="br-line type-vertical bg-line"></span>
      <fieldset>
        <input
          type="text"
          placeholder="Search for products"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </fieldset>
      <button type="submit" className="btn-submit-form">
        <i className="icon-search"></i>
      </button>
    </form>
  );
}
