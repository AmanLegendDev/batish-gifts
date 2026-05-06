"use client";

import { useEffect,useState  } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import CategoryPills from "@/components/store/CategoryPills";
import ProductSection from "@/components/store/ProductSection";
import Footer from "@/components/layout/Footer";

export default function CategoryPage(){

 const paramsData = useParams();

const initialCategory = paramsData?.id || "all";


  const params = useSearchParams();
  const productId = params.get("product");
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  useEffect(() => {
    if(productId){
      const timer = setTimeout(() => {
        window.dispatchEvent(
          new CustomEvent("scrollToProduct", {
            detail: productId
          })
        );
      }, 400); // thoda fast
      return () => clearTimeout(timer);
    }
  }, [productId]);

  return(
    <section className="bg-white min-h-screen">

      <Navbar/>

      {/* HEADER */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="/category/banner.jpg" className="w-full h-full object-cover"/>
        </div>
        <div className="absolute inset-0 bg-black/50"/>
        <div className="relative z-10 px-5 py-10 text-center text-white">
          <h1 className="text-2xl font-semibold">Find Your Perfect Gift 🎁</h1>
          <h1>For your special onece</h1>
        </div>
      </div>

      <CategoryPills
  active={activeCategory}
  onChange={setActiveCategory}
/>

      <ProductSection categoryId={activeCategory} />
      <Footer/>

      
    </section>
  );
}