import Header5 from "@/components/headers/Header5";
import Topbar1 from "@/components/headers/Topbar1";
import Categories from "@/components/common/Categories";
import Hero from "@/components/homes/home-6/Hero";
import React from "react";
import Collections from "@/components/homes/home-6/Collections";
import CategoryProductsSwiper from "@/components/common/CategoryProductsSwiper";
import BrandsSlider from "@/components/common/BrandsSlider";
import Footer1 from "@/components/footers/Footer1";
import Features2 from "@/components/common/Features2";
import CategorySitemap from "@/components/common/CategorySitemap";

export const metadata = {
  title: "Home || Kenya eCommerce",
  description: "Kenya eCommerce",
};
export default function Home() {
  return (
    <>
      <Topbar1 parentClass="tf-topbar" />
      <Header5 />
      <Hero />
      <Categories parentClass="tf-sp-7" />
      <Collections />
      <CategoryProductsSwiper categorySlug="it-accessories" />
      <CategoryProductsSwiper categorySlug="networking-solution-dubai" />
      <CategoryProductsSwiper categorySlug="display" />
      <CategoryProductsSwiper categorySlug="home-smart-security" />
      <BrandsSlider />
      <CategoryProductsSwiper categorySlug="hikvision-store" parentClass="tf-sp-2" />
      <CategoryProductsSwiper categorySlug="gaming-pc-and-case" />
      <CategoryProductsSwiper categorySlug="computers-and-laptops" />
      <CategoryProductsSwiper categorySlug="security-devices" />
      <CategorySitemap />
      <Features2 />
      <Footer1 />
    </>
  );
}
