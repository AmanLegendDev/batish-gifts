"use client";

import { useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import CategoryPills from "@/components/store/CategoryPills";
import ProductSection from "@/components/store/ProductSection";
import Footer from "@/components/layout/Footer";

export default function CategoryPage(){

  const { id } = useParams();
  const params = useSearchParams();
  const productId = params.get("product");

  /*
  🔥 SCROLL FIX
  */
  useEffect(() => {

    if(productId){

      const timer = setTimeout(() => {

        window.dispatchEvent(
          new CustomEvent("scrollToProduct", {
            detail: productId
          })
        );

      }, 600);

      return () => clearTimeout(timer);
    }

  }, [productId]);


  return(

    <section className="bg-white min-h-screen">

      <Navbar/>

      {/* HEADER */}
      <div className="relative overflow-hidden">

        <div className="absolute inset-0">
          <img
            src="/category/banner.jpg"
            className="w-full h-full object-cover"
            alt="banner"
          />
        </div>

        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

        <div className="relative z-10 px-5 py-10 text-center text-white">
          <p className="text-xs tracking-[3px] uppercase text-white/70">
            Explore Collection
          </p>

          <h1 className="text-2xl font-semibold mt-2">
            Find Your Perfect Gift 🎁
          </h1>
        </div>

      </div>

      {/* 🔥 PILLS */}
      <CategoryPills active={id || "all"} />

      {/* 🔥 PRODUCTS */}
      <ProductSection categoryId={id || "all"} />
      <Footer/>

    </section>
  );
}