"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import CategoryPills from "@/components/store/CategoryPills";
import ProductSection from "@/components/store/ProductSection";
import { useSearchParams } from "next/navigation";


export default function CategoryPage(){
    
    const params = useSearchParams();
    const productId = params.get("product");

  const { id } = useParams();

  const [selected,setSelected] = useState("all");


  useEffect(() => {
  if (productId) {

    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("scrollToProduct", {
          detail: productId
        })
      );
    }, 500);

  }
}, [productId]);

  /*
  SET CATEGORY FROM URL
  */

  useEffect(()=>{
    if(id){
      setSelected(id);

      window.dispatchEvent(
        new CustomEvent("categorySelected",{ detail:id })
      );
    }
  },[id]);


  return(

    <section className="bg-white min-h-screen">

      <Navbar/>

   {/* 🔥 PREMIUM HEADER */}

<div className="relative overflow-hidden">


  {/* BACKGROUND IMAGE */}
  <div className="absolute inset-0">
    <img
      src="/category/banner.jpg"
      className="w-full h-full object-cover"
      alt="banner"
    />
  </div>


  {/* OVERLAY */}
  <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />


  {/* CONTENT */}
  <div className="relative z-10 px-5 py-10 text-center text-white">

    <p className="text-xs tracking-[3px] uppercase text-white/70">
      Explore Collection
    </p>

    <h1 className="text-2xl md:text-3xl font-semibold mt-2 leading-snug">
      Find Your Perfect Gift 🎁
    </h1>

    <p className="text-sm text-white/80 mt-2">
      Cute • Aesthetic • Premium Picks
    </p>

  </div>

</div>


      {/* 🔥 CATEGORY PILLS (IMPORTANT) */}
      <CategoryPills />


      {/* 🔥 PRODUCT LIST */}
      <ProductSection key={id}/>

    </section>

  );
}