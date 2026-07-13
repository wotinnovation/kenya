"use client";
import { useState } from "react";

const DEFAULT_PRICE = [0, 999999];

export function useCategoryFilter() {
  const [price, setPrice] = useState(DEFAULT_PRICE);
  const [isNew, setIsNew] = useState("All");
  const [deals, setDeals] = useState("All");
  const [rating, setRating] = useState("All");
  const [brands, setBrandsState] = useState([]);

  const setBrands = (brand) => {
    setBrandsState((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const removeBrand = (brand) => {
    setBrandsState((prev) => prev.filter((b) => b !== brand));
  };

  const handleSetDeals = (value) => {
    setDeals((prev) => (prev === value ? "All" : value));
  };

  const handleSetRating = (value) => {
    setRating((prev) => (prev === value ? "All" : value));
  };

  const clearFilter = () => {
    setPrice(DEFAULT_PRICE);
    setIsNew("All");
    setDeals("All");
    setRating("All");
    setBrandsState([]);
  };

  const filterProps = {
    price,
    isNew,
    deals,
    rating,
    brands,
    setPrice,
    setDeals: handleSetDeals,
    setRating: handleSetRating,
    setIsNew,
    setBrands,
    removeBrand,
    clearFilter,
  };

  const filterCriteria = { price, brands };

  return { filterProps, filterCriteria };
}
