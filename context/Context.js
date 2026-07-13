"use client";
import { allProducts } from "@/data/products";
import { backendImageUrl } from "@/graphql/imageUrl";
// import { openCartModal } from "@/utlis/openCartModal";
// import { openWistlistModal } from "@/utlis/openWishlist";

import React, { useEffect } from "react";
import { useContext, useState } from "react";
const dataContext = React.createContext();
export const useContextElement = () => {
  return useContext(dataContext);
};

export default function Context({ children }) {
  const [cartProducts, setCartProducts] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [compareItem, setCompareItem] = useState([]);
  const [quickViewItem, setQuickViewItem] = useState(allProducts[0]);
  const [quickAddItem, setQuickAddItem] = useState(1);
  const [quoteProduct, setQuoteProduct] = useState(null);
  const [quickviewProduct, setQuickviewProduct] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    const subtotal = cartProducts.reduce((accumulator, product) => {
      return accumulator + product.quantity * product.price;
    }, 0);
    setTotalPrice(subtotal);
  }, [cartProducts]);

  const isAddedToCartProducts = (id) => {
    if (cartProducts.filter((elm) => elm.id == id)[0]) {
      return true;
    }
    return false;
  };
  const addProductToCart = (productOrId, qty, isModal = true) => {
    const isRealProduct = typeof productOrId === "object" && productOrId !== null;
    const isNormalizedItem = isRealProduct && "imgSrc" in productOrId;
    const id = isRealProduct ? productOrId.id : productOrId;
    if (!isAddedToCartProducts(id)) {
      const item = isNormalizedItem
        ? { ...productOrId, quantity: qty ? qty : 1 }
        : isRealProduct
        ? {
            id: productOrId.id,
            title: productOrId.name,
            slug: productOrId.slug,
            imgSrc: backendImageUrl(productOrId.image),
            price: productOrId.salePrice || productOrId.price,
            quantity: qty ? qty : 1,
          }
        : {
            ...allProducts.filter((elm) => elm.id == id)[0],
            quantity: qty ? qty : 1,
          };
      setCartProducts((pre) => [...pre, item]);
      if (isModal) {
        // openCartModal();
      }
    }
  };

  const updateQuantity = (id, qty) => {
    if (isAddedToCartProducts(id) && qty >= 1) {
      let item = cartProducts.filter((elm) => elm.id == id)[0];
      let items = [...cartProducts];
      const itemIndex = items.indexOf(item);

      item.quantity = qty / 1;
      items[itemIndex] = item;
      setCartProducts(items);
    }
  };

  const toListItem = (productOrId) => {
    const isRealProduct = typeof productOrId === "object" && productOrId !== null;
    if (!isRealProduct) {
      return allProducts.find((elm) => elm.id == productOrId) || null;
    }
    const price = productOrId.salePrice || productOrId.price;
    return {
      id: productOrId.id,
      title: productOrId.name,
      slug: productOrId.slug,
      imgSrc: backendImageUrl(productOrId.image),
      price,
      oldPrice:
        productOrId.regularPrice > price ? productOrId.regularPrice : undefined,
    };
  };

  const isAddedtoWishlist = (id) => wishList.some((elm) => elm.id == id);
  const isAddedtoCompareItem = (id) => compareItem.some((elm) => elm.id == id);

  const addToWishlist = (productOrId) => {
    const id = typeof productOrId === "object" && productOrId !== null ? productOrId.id : productOrId;
    if (isAddedtoWishlist(id)) {
      setWishList((pre) => pre.filter((elm) => elm.id != id));
      return;
    }
    const item = toListItem(productOrId);
    if (item) setWishList((pre) => [...pre, item]);
  };

  const removeFromWishlist = (id) => {
    setWishList((pre) => pre.filter((elm) => elm.id != id));
  };
  const addToCompareItem = (productOrId) => {
    const id = typeof productOrId === "object" && productOrId !== null ? productOrId.id : productOrId;
    if (isAddedtoCompareItem(id)) return;
    const item = toListItem(productOrId);
    if (item) setCompareItem((pre) => [...pre, item]);
  };
  const removeFromCompareItem = (id) => {
    setCompareItem((pre) => pre.filter((elm) => elm.id != id));
  };
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartList"));
    if (items?.length) {
      setCartProducts(items);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartList", JSON.stringify(cartProducts));
  }, [cartProducts]);
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("wishlist"));
    if (items?.length) {
      setWishList(items);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishList));
  }, [wishList]);

  const contextElement = {
    cartProducts,
    setCartProducts,
    totalPrice,
    addProductToCart,
    isAddedToCartProducts,
    removeFromWishlist,
    addToWishlist,
    isAddedtoWishlist,
    quickViewItem,
    wishList,
    setQuickViewItem,
    quickAddItem,
    setQuickAddItem,
    quoteProduct,
    setQuoteProduct,
    quickviewProduct,
    setQuickviewProduct,
    addToCompareItem,
    isAddedtoCompareItem,
    removeFromCompareItem,
    compareItem,
    setCompareItem,
    updateQuantity,
  };
  return (
    <dataContext.Provider value={contextElement}>
      {children}
    </dataContext.Provider>
  );
}
